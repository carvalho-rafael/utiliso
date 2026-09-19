"use client";

import { useMemo, useState } from "react";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import Link from "next/link";
import {
  avosDecimoTerceiroNoAno,
  avosDecimoTerceiroNoPeriodo,
  calcularDecimoTerceiro,
  type DecimoTerceiroResultado,
} from "../../lib/calculadoras/decimo-terceiro";
import { montarTextoBreakdownCalculadora } from "../../lib/calculadoras/resultado-texto";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import {
  formatarDataInput,
  parseDataInput,
} from "../../lib/calculadoras/rescisao";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type ModoAvos = "admissao-ano" | "data-saida" | "manual";

const MODOS_AVOS: { value: ModoAvos; label: string }[] = [
  {
    value: "admissao-ano",
    label: "Ainda no emprego (avos até 31/12)",
  },
  {
    value: "data-saida",
    label: "Saída no ano (avos até a data de saída)",
  },
  {
    value: "manual",
    label: "Informar avos (1 a 12)",
  },
];

type CampoFormulario =
  | "salarioBruto"
  | "mediaVariaveis"
  | "dataAdmissao"
  | "dataSaida"
  | "avosManual"
  | "dependentes";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function DecimoTerceiroForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [mediaVariaveis, setMediaVariaveis] = useState("");
  const [modoAvos, setModoAvos] = useState<ModoAvos>("admissao-ano");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [avosManual, setAvosManual] = useState("12");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<DecimoTerceiroResultado | null>(
    null,
  );

  const admissaoPreview = parseDataInput(dataAdmissao);
  const saidaPreview = parseDataInput(dataSaida);
  const avosPreview = useMemo(() => {
    if (modoAvos === "manual") {
      const n = Number.parseInt(avosManual, 10);
      if (Number.isNaN(n) || n < 1 || n > 12) return null;
      return n;
    }
    if (!admissaoPreview) return null;
    if (modoAvos === "data-saida") {
      if (!saidaPreview) return null;
      return avosDecimoTerceiroNoPeriodo(
        admissaoPreview,
        saidaPreview,
        TABELAS_ANO,
      );
    }
    return avosDecimoTerceiroNoAno(admissaoPreview, TABELAS_ANO);
  }, [admissaoPreview, avosManual, modoAvos, saidaPreview]);

  function campoComErro(campo: CampoFormulario) {
    return camposErro.includes(campo);
  }

  function reportarErro(mensagem: string, campos: CampoFormulario[]) {
    setErro(mensagem);
    setCamposErro(campos);
    setResultado(null);
  }

  function limparResultado() {
    setResultado(null);
    setErro(null);
    setCamposErro([]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const salario = parseMoeda(salarioBruto);
    const numDependentes = Number.parseInt(dependentes, 10);
    const admissao = parseDataInput(dataAdmissao);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    let media = 0;
    if (mediaVariaveis.trim()) {
      media = parseMoeda(mediaVariaveis);
      if (media < 0) {
        reportarErro("Informe uma média de variáveis válida.", [
          "mediaVariaveis",
        ]);
        return;
      }
    }

    if (
      Number.isNaN(numDependentes) ||
      numDependentes < 0 ||
      !Number.isInteger(numDependentes)
    ) {
      reportarErro("Informe um número válido de dependentes (0 ou mais).", [
        "dependentes",
      ]);
      return;
    }

    let numMeses = 0;
    let modoPagamento: "duas-parcelas" | "acerto" = "duas-parcelas";

    if (modoAvos === "manual") {
      numMeses = Number.parseInt(avosManual, 10);
      if (
        Number.isNaN(numMeses) ||
        numMeses < 1 ||
        numMeses > 12 ||
        !Number.isInteger(numMeses)
      ) {
        reportarErro("Informe um número de avos entre 1 e 12.", ["avosManual"]);
        return;
      }
    } else {
      if (!admissao) {
        reportarErro("Informe a data de admissão no formato DD/MM/AAAA.", [
          "dataAdmissao",
        ]);
        return;
      }

      if (modoAvos === "data-saida") {
        const saida = parseDataInput(dataSaida);
        if (!saida) {
          reportarErro("Informe a data de saída no formato DD/MM/AAAA.", [
            "dataSaida",
          ]);
          return;
        }
        if (saida.getFullYear() !== TABELAS_ANO) {
          reportarErro(
            `A data de saída deve ser em ${TABELAS_ANO} (ano das tabelas).`,
            ["dataSaida"],
          );
          return;
        }
        if (saida < admissao) {
          reportarErro("A data de saída não pode ser anterior à admissão.", [
            "dataSaida",
            "dataAdmissao",
          ]);
          return;
        }
        numMeses = avosDecimoTerceiroNoPeriodo(admissao, saida, TABELAS_ANO);
        modoPagamento = "acerto";
      } else {
        numMeses = avosDecimoTerceiroNoAno(admissao, TABELAS_ANO);
      }
    }

    if (numMeses <= 0) {
      reportarErro(
        `Não há avos de 13º proporcional em ${TABELAS_ANO} com essas datas.`,
        modoAvos === "data-saida"
          ? ["dataAdmissao", "dataSaida"]
          : ["dataAdmissao"],
      );
      return;
    }

    setResultado(
      calcularDecimoTerceiro({
        salarioBruto: salario,
        mediaVariaveis: media,
        mesesTrabalhados: numMeses,
        dependentes: numDependentes,
        modoPagamento,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Como contar os avos proporcionais
          </legend>
          <div className="flex flex-col gap-2">
            {MODOS_AVOS.map((item) => (
              <label
                key={item.value}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  type="radio"
                  name="modoAvos"
                  value={item.value}
                  checked={modoAvos === item.value}
                  onChange={() => {
                    setModoAvos(item.value);
                    limparResultado();
                  }}
                  className="h-4 w-4 accent-accent"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Salário bruto
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={salarioBruto}
              onChange={(event) => {
                setSalarioBruto(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("salarioBruto"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("salarioBruto")}
              aria-describedby={erro ? "decimo-terceiro-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Remuneração mensal habitual usada como base do 13º.
            </span>
          </label>

          {modoAvos !== "manual" ? (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Data de admissão
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={dataAdmissao}
                onChange={(event) => {
                  setDataAdmissao(formatarDataInput(event.target.value));
                  limparResultado();
                }}
                className={classeCampo(campoComErro("dataAdmissao"))}
                placeholder="DD/MM/AAAA"
                aria-invalid={campoComErro("dataAdmissao")}
                aria-describedby={
                  erro
                    ? "decimo-terceiro-erro"
                    : "decimo-terceiro-admissao-ajuda"
                }
              />
              <span
                id="decimo-terceiro-admissao-ajuda"
                className="text-xs text-muted"
              >
                {avosPreview !== null && avosPreview > 0
                  ? `${avosPreview}/12 avos em ${TABELAS_ANO}. Só entra o mês com 15 dias ou mais de trabalho.`
                  : `Os avos de ${TABELAS_ANO} são contados a partir desta data. Só entra o mês com 15 dias ou mais (Lei 4.090/1962).`}
              </span>
            </label>
          ) : (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Avos no ano (1 a 12)
              </span>
              <input
                type="number"
                min={1}
                max={12}
                step={1}
                value={avosManual}
                onChange={(event) => {
                  setAvosManual(event.target.value);
                  limparResultado();
                }}
                className={`${classeCampo(campoComErro("avosManual"))} sm:max-w-[7rem]`}
                aria-invalid={campoComErro("avosManual")}
                aria-describedby={
                  erro ? "decimo-terceiro-erro" : "decimo-terceiro-avos-ajuda"
                }
              />
              <span id="decimo-terceiro-avos-ajuda" className="text-xs text-muted">
                Cada avo equivale a 1/12 do salário. Use quando já sabe quantos
                meses contam no ano.
              </span>
            </label>
          )}

          {modoAvos === "data-saida" && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Data de saída
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={dataSaida}
                onChange={(event) => {
                  setDataSaida(formatarDataInput(event.target.value));
                  limparResultado();
                }}
                className={classeCampo(campoComErro("dataSaida"))}
                placeholder="DD/MM/AAAA"
                aria-invalid={campoComErro("dataSaida")}
                aria-describedby={
                  erro ? "decimo-terceiro-erro" : "decimo-terceiro-saida-ajuda"
                }
              />
              <span id="decimo-terceiro-saida-ajuda" className="text-xs text-muted">
                Rescisão ou fim do contrato em {TABELAS_ANO}. O 13º proporcional
                entra no acerto, com INSS e IRRF sobre o bruto.
              </span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Média de variáveis (opcional)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={mediaVariaveis}
              onChange={(event) => {
                setMediaVariaveis(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("mediaVariaveis"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("mediaVariaveis")}
              aria-describedby={erro ? "decimo-terceiro-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Média de horas extras, comissões ou outras parcelas habituais
              incluídas na base do 13º.
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Dependentes (opcional)
            </span>
            <input
              type="number"
              min={0}
              step={1}
              value={dependentes}
              onChange={(event) => {
                setDependentes(event.target.value);
                limparResultado();
              }}
              className={`${classeCampo(campoComErro("dependentes"))} sm:max-w-[7rem]`}
              aria-invalid={campoComErro("dependentes")}
              aria-describedby={erro ? "decimo-terceiro-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Filhos, cônjuge ou outros dependentes aceitos pela Receita Federal
              (R$ 189,59 cada na dedução do IRRF).
            </span>
          </label>
        </div>

        {erro && (
          <p
            id="decimo-terceiro-erro"
            className="text-sm text-danger"
            role="alert"
          >
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular 13º proporcional
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do 13º salário"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso ano={resultado.tabelasAno} />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4">
            <div className="flex justify-between text-sm text-muted">
              <span>13º bruto ({resultado.avos}/12 avos)</span>
              <span>{formatarMoeda(resultado.bruto)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-foreground">
              <span>
                {resultado.modoPagamento === "acerto"
                  ? "Líquido no acerto"
                  : "Total líquido no ano"}
              </span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>

          {resultado.modoPagamento === "acerto" ? (
            <p className="rounded-lg border border-border bg-background p-4 text-sm text-muted">
              Na saída, o 13º proporcional é pago de uma vez no acerto, com INSS
              e IRRF sobre o valor bruto. Para o líquido completo da rescisão
              (saldo, férias, FGTS etc.), use a{" "}
              <Link
                href="/calculadoras/rescisao"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                calculadora de rescisão
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <ParcelaCard
                titulo="1ª parcela"
                valor={resultado.primeiraParcela}
                prazo={resultado.prazoPrimeiraParcela}
                detalhe="Sem INSS nem IRRF"
              />
              <ParcelaCard
                titulo="2ª parcela"
                valor={resultado.segundaParcela}
                prazo={resultado.prazoSegundaParcela}
                detalhe="Com INSS e IRRF"
              />
            </div>
          )}

          <BreakdownGroup title="Proventos" linhas={resultado.verbas} />
          <BreakdownGroup
            title="Descontos"
            linhas={resultado.descontos}
            isDesconto
          />
          <div>
            <BreakdownGroup title="FGTS (estimativa)" linhas={resultado.fgts} />
            {resultado.fgts.length > 0 && (
              <p className="mt-2 text-xs text-muted">
                O FGTS é depositado pelo empregador e não entra no valor líquido
                do 13º.
              </p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Total de proventos</span>
              <span>{formatarMoeda(resultado.totalVerbas)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted">
              <span>Total de descontos</span>
              <span>- {formatarMoeda(resultado.totalDescontos)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>
                {resultado.modoPagamento === "acerto"
                  ? "Líquido no acerto"
                  : "Total líquido no ano"}
              </span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoBreakdownCalculadora({
              tituloCalculadora: "Calculadora de 13º salário proporcional",
              path: "/calculadoras/decimo-terceiro",
              tabelasAno: resultado.tabelasAno,
              extraSecoes: [
                {
                  titulo: "Resumo",
                  linhas: [
                    {
                      label: `13º bruto (${resultado.avos}/12 avos)`,
                      valor: formatarMoeda(resultado.bruto),
                    },
                  ...(resultado.modoPagamento === "acerto"
                    ? [
                        {
                          label: "Líquido no acerto",
                          valor: formatarMoeda(resultado.liquido),
                        },
                      ]
                    : [
                        {
                          label: "1ª parcela",
                          valor: formatarMoeda(resultado.primeiraParcela),
                        },
                        {
                          label: "2ª parcela",
                          valor: formatarMoeda(resultado.segundaParcela),
                        },
                      ]),
                ],
              },
            ],
              verbas: resultado.verbas,
              descontos: resultado.descontos,
              fgts: resultado.fgts,
              totalVerbas: resultado.totalVerbas,
              totalDescontos: resultado.totalDescontos,
              liquidoLabel:
                resultado.modoPagamento === "acerto"
                  ? "Líquido no acerto"
                  : "Total líquido no ano",
              liquido: resultado.liquido,
            })}
          />

          <aside
            aria-label="Guia de cálculo do INSS"
            className="print:hidden rounded-lg border border-border bg-background p-4"
          >
            <h3 className="text-sm font-medium text-foreground">
              Como o INSS é calculado?
            </h3>
            <p className="mt-2 text-sm text-muted">
              O desconto segue a tabela progressiva de {resultado.tabelasAno}:
              cada faixa salarial tem sua alíquota, aplicada só sobre a parcela
              do salário dentro da faixa.
            </p>
            <CalculadoraInssLinks ano={resultado.tabelasAno} />
          </aside>
        </section>
      )}
    </div>
  );
}

function ParcelaCard({
  titulo,
  valor,
  prazo,
  detalhe,
}: {
  titulo: string;
  valor: number;
  prazo: string;
  detalhe: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
      <h3 className="text-sm font-medium text-highlight">{titulo}</h3>
      <p className="text-xl font-semibold text-foreground">
        {formatarMoeda(valor)}
      </p>
      <p className="text-sm text-muted">{prazo}</p>
      <p className="text-xs text-muted">{detalhe}</p>
    </div>
  );
}

function BreakdownGroup({
  title,
  linhas,
  isDesconto = false,
}: {
  title: string;
  linhas: { label: string; valor: number }[];
  isDesconto?: boolean;
}) {
  if (linhas.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-highlight">{title}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {linhas.map((linha) => (
          <li
            key={linha.label}
            className="flex justify-between gap-4 text-sm text-foreground"
          >
            <span className="text-muted">{linha.label}</span>
            <span>
              {isDesconto ? "- " : ""}
              {formatarMoeda(linha.valor)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
