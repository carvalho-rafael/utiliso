"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../lib/calculadoras/format";
import {
  calcularDiasAviso,
  calcularRescisao,
  formatarDataExibicao,
  formatarDataInput,
  formatarIntervaloPeriodo,
  getSeguroDesempregoInfo,
  listarPeriodosAquisitivos,
  parseDataInput,
  resolverDataFimContrato,
  type AvisoPrevio,
  type MotivoRescisao,
  type RescisaoResultado,
} from "../lib/calculadoras/rescisao";

const MOTIVOS: { value: MotivoRescisao; label: string }[] = [
  { value: "pedido_demissao", label: "Pedido de demissão" },
  { value: "sem_justa_causa", label: "Demissão sem justa causa" },
  { value: "com_justa_causa", label: "Demissão por justa causa" },
  { value: "acordo", label: "Acordo entre empregado e empregador" },
];

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "salarioBruto"
  | "dataAdmissao"
  | "dataComunicacao"
  | "diasAvisoParcial";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function RescisaoForm() {
  const [motivo, setMotivo] = useState<MotivoRescisao>("sem_justa_causa");
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataComunicacao, setDataComunicacao] = useState("");
  const [periodosMarcados, setPeriodosMarcados] = useState<number[]>([]);
  const [avisoPrevio, setAvisoPrevio] = useState<AvisoPrevio>("trabalhado");
  const [avisoTodosDias, setAvisoTodosDias] = useState(true);
  const [diasAvisoParcial, setDiasAvisoParcial] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<RescisaoResultado | null>(null);

  function campoComErro(campo: CampoFormulario) {
    return camposErro.includes(campo);
  }

  function reportarErro(mensagem: string, campos: CampoFormulario[]) {
    setErro(mensagem);
    setCamposErro(campos);
    setResultado(null);
  }

  const avisoDesabilitado = motivo === "com_justa_causa";
  const avisoAtivo = avisoDesabilitado ? "trabalhado" : avisoPrevio;

  const periodosAquisitivos = useMemo(() => {
    const admissao = parseDataInput(dataAdmissao);
    const comunicacao = parseDataInput(dataComunicacao);
    if (!admissao || !comunicacao || comunicacao < admissao) return [];

    const fimContrato = resolverDataFimContrato({
      motivo,
      dataAdmissao: admissao,
      dataComunicacao: comunicacao,
      avisoPrevio: avisoAtivo,
    });

    return listarPeriodosAquisitivos(admissao, fimContrato);
  }, [dataAdmissao, dataComunicacao, motivo, avisoAtivo]);

  const feriasNaoGozadas = useMemo(() => {
    const indices = periodosAquisitivos.map((periodo) => periodo.indice);
    return periodosMarcados.filter((indice) => indices.includes(indice));
  }, [periodosAquisitivos, periodosMarcados]);

  const diasAvisoPrevisto = useMemo(() => {
    const admissao = parseDataInput(dataAdmissao);
    const comunicacao = parseDataInput(dataComunicacao);
    if (!admissao || !comunicacao || comunicacao < admissao) return 30;
    return calcularDiasAviso(motivo, admissao, comunicacao);
  }, [dataAdmissao, dataComunicacao, motivo]);

  const avisoTrabalhadoVisivel =
    !avisoDesabilitado && avisoPrevio === "trabalhado";

  function alternarPeriodoNaoGozado(indice: number) {
    setPeriodosMarcados((atual) =>
      atual.includes(indice)
        ? atual.filter((item) => item !== indice)
        : [...atual, indice],
    );
    limparResultado();
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
    const admissao = parseDataInput(dataAdmissao);
    const comunicacao = parseDataInput(dataComunicacao);
    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }
    if (!admissao) {
      reportarErro("Data de admissão inválida. Use DD/MM/AAAA.", [
        "dataAdmissao",
      ]);
      return;
    }
    if (!comunicacao) {
      reportarErro("Data da comunicação inválida. Use DD/MM/AAAA.", [
        "dataComunicacao",
      ]);
      return;
    }
    if (comunicacao < admissao) {
      reportarErro(
        "A data da comunicação deve ser igual ou posterior à admissão.",
        ["dataAdmissao", "dataComunicacao"],
      );
      return;
    }

    const diasAviso = calcularDiasAviso(motivo, admissao, comunicacao);
    let diasAvisoTrabalhados: number | null = null;

    if (!avisoDesabilitado && avisoPrevio === "trabalhado" && !avisoTodosDias) {
      const dias = Number.parseInt(diasAvisoParcial, 10);
      const maximoParcial = diasAviso - 1;
      if (
        Number.isNaN(dias) ||
        dias < 1 ||
        dias > maximoParcial
      ) {
        reportarErro(
          `Informe entre 1 e ${maximoParcial} dias de aviso a trabalhar.`,
          ["diasAvisoParcial"],
        );
        return;
      }
      diasAvisoTrabalhados = dias;
    }

    setResultado(
      calcularRescisao({
        motivo,
        salarioBruto: salario,
        dataAdmissao: admissao,
        dataComunicacao: comunicacao,
        feriasNaoGozadasIndices: feriasNaoGozadas,
        avisoPrevio: avisoDesabilitado ? "trabalhado" : avisoPrevio,
        diasAvisoTrabalhados,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Motivo da rescisão
          </legend>
          {MOTIVOS.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            >
              <input
                type="radio"
                name="motivo"
                value={item.value}
                checked={motivo === item.value}
                onChange={() => {
                  setMotivo(item.value);
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              {item.label}
            </label>
          ))}
        </fieldset>

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
            aria-describedby={erro ? "rescisao-erro" : undefined}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              aria-describedby={erro ? "rescisao-erro" : undefined}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Data da comunicação
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={dataComunicacao}
              onChange={(event) => {
                setDataComunicacao(formatarDataInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("dataComunicacao"))}
              placeholder="DD/MM/AAAA"
              aria-invalid={campoComErro("dataComunicacao")}
              aria-describedby={erro ? "rescisao-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Dia em que a rescisão foi comunicada. O aviso prévio, se houver,
              conta a partir desta data.
            </span>
          </label>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Férias não gozadas
          </legend>
          {periodosAquisitivos.length === 0 ? (
            <p className="text-sm text-muted">
              Nenhum período aquisitivo completo até a data do contrato. O
              período atual entra nas férias proporcionais.
            </p>
          ) : (
            periodosAquisitivos.map((periodo) => (
              <label
                key={periodo.indice}
                className="flex cursor-pointer items-start gap-3 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  checked={periodosMarcados.includes(periodo.indice)}
                  onChange={() => alternarPeriodoNaoGozado(periodo.indice)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span>
                  Período {periodo.indice} (
                  {formatarIntervaloPeriodo(periodo.inicio, periodo.fim)})
                  {periodo.emDobro ? (
                    <span className="text-highlight"> — em dobro</span>
                  ) : null}
                </span>
              </label>
            ))
          )}
          <span className="text-xs text-muted">
            Marque os períodos que você ainda não tirou. O período atual entra
            nas férias proporcionais. Períodos com concessão vencida (CLT art.
            137) são pagos em dobro.
          </span>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Aviso prévio</span>
          <select
            value={avisoDesabilitado ? "trabalhado" : avisoPrevio}
            onChange={(event) => {
              const valor = event.target.value as AvisoPrevio;
              setAvisoPrevio(valor);
              if (valor === "trabalhado") {
                setAvisoTodosDias(true);
                setDiasAvisoParcial("");
              }
              limparResultado();
            }}
            disabled={avisoDesabilitado}
            className={`${fieldClassBase} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="trabalhado">Trabalhado</option>
            <option value="indenizado">Indenizado</option>
          </select>
          {avisoDesabilitado ? (
            <span className="text-xs text-muted">
              Não há aviso prévio na demissão por justa causa.
            </span>
          ) : motivo === "acordo" ? (
            <span className="text-xs text-muted">
              Trabalhado: salário pago mês a mês no holerite (30 + 3 por ano,
              até 90 dias). Indenizado: 50% do aviso na rescisão. Multa FGTS de
              20% e saque de até 80%. Sem seguro-desemprego.
            </span>
          ) : (
            <span className="text-xs text-muted">
              Trabalhado: salário pago mês a mês no holerite (pedido: 30 dias;
              sem justa causa: 30 + 3 por ano, até 90). Indenizado: verba na
              demissão sem justa causa, ou desconto no pedido.
            </span>
          )}
        </label>

        {avisoTrabalhadoVisivel && (
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-foreground">
              Dias de aviso a trabalhar
            </legend>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                checked={avisoTodosDias}
                onChange={(event) => {
                  setAvisoTodosDias(event.target.checked);
                  if (event.target.checked) setDiasAvisoParcial("");
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              Todos ({diasAvisoPrevisto} dias)
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                min={1}
                max={Math.max(1, diasAvisoPrevisto - 1)}
                step={1}
                value={diasAvisoParcial}
                onChange={(event) => {
                  setDiasAvisoParcial(event.target.value);
                  if (event.target.value) setAvisoTodosDias(false);
                  limparResultado();
                }}
                className={`${classeCampo(campoComErro("diasAvisoParcial"))} max-w-[7rem] disabled:cursor-not-allowed disabled:opacity-60`}
                placeholder="Dias"
                aria-label="Dias de aviso a trabalhar"
                aria-invalid={campoComErro("diasAvisoParcial")}
                aria-describedby={erro ? "rescisao-erro" : undefined}
              />
            </div>
            <span className="text-xs text-muted">
              Se trabalhar menos que o aviso completo, os dias restantes entram
              como aviso indenizado na demissão sem justa causa ou no acordo. No
              pedido de demissão não há indenização dos dias não trabalhados.
            </span>
          </fieldset>
        )}

        {erro && (
          <p id="rescisao-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular rescisão
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado da rescisão"
          className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <p className="mt-1 text-sm text-muted">
              Estimativa com tabelas INSS/IRRF {resultado.tabelasAno}. Não
              substitui contador, advogado ou departamento pessoal.
            </p>
          </div>

          <aside
            aria-label="Prazo para pagamento das verbas rescisórias"
            className="rounded-lg border border-highlight bg-highlight/10 p-4"
          >
            <h3 className="text-sm font-semibold text-highlight">
              Prazo para pagamento
            </h3>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              Até {formatarDataExibicao(resultado.dataLimitePagamento)}
            </p>
            <p className="mt-2 text-sm text-muted">
              {resultado.origemPrazoPagamento === "fim_aviso_trabalhado"
                ? `Dez dias corridos após o último dia do aviso trabalhado (${formatarDataExibicao(resultado.dataInicioPrazoPagamento)}), conforme o art. 477, § 6º da CLT.`
                : `Dez dias corridos após a data da comunicação (${formatarDataExibicao(resultado.dataInicioPrazoPagamento)}), conforme o art. 477, § 6º da CLT.`}
              {resultado.avisoProjetaContrato &&
              resultado.origemPrazoPagamento === "data_comunicacao"
                ? " O aviso indenizado projeta o contrato para 13º, férias e FGTS, mas o pagamento não espera esses dias."
                : ""}{" "}
              Se a data cair em sábado, domingo ou feriado, o pagamento costuma
              ser no próximo dia útil. Atraso pode gerar multa de um salário ao
              empregado (art. 477, § 8º).
            </p>
            <p className="mt-2 text-sm text-foreground">
              Fim do contrato: {formatarDataExibicao(resultado.dataFimContrato)}
              {resultado.avisoProjetaContrato
                ? ` (aviso de ${resultado.diasAviso} dias)`
                : ""}
            </p>
            {resultado.origemPrazoPagamento === "fim_aviso_trabalhado" && (
              <p className="mt-2 text-xs text-muted">
                Aviso trabalhado: o salário dos dias de aviso é pago mês a mês
                no holerite. O saldo de salário refere-se aos dias do último
                mês trabalhado.
              </p>
            )}
          </aside>

          <BreakdownGroup title="Verbas" linhas={resultado.verbas} />
          <BreakdownGroup
            title="Descontos"
            linhas={resultado.descontos}
            isDesconto
          />
          <div>
            <BreakdownGroup title="FGTS (estimativa)" linhas={resultado.fgts} />
            {resultado.fgts.length > 0 && (
              <p className="mt-2 text-xs text-muted">
                Saldo e multa do FGTS não entram no líquido da rescisão.
              </p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Total de verbas</span>
              <span>{formatarMoeda(resultado.totalVerbas)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted">
              <span>Total de descontos</span>
              <span>- {formatarMoeda(resultado.totalDescontos)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Líquido a receber</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>

          <SeguroDesempregoCallout motivo={motivo} />
        </section>
      )}
    </div>
  );
}

function SeguroDesempregoCallout({ motivo }: { motivo: MotivoRescisao }) {
  const info = getSeguroDesempregoInfo(motivo);

  return (
    <aside
      aria-label={info.titulo}
      className="rounded-lg border border-border bg-background p-4"
    >
      <h3 className="text-sm font-medium text-foreground">{info.titulo}</h3>
      <p className="mt-2 text-sm text-muted">{info.texto}</p>
      <Link
        href={info.href}
        className={
          info.elegivel
            ? "mt-3 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            : "mt-3 inline-block cursor-pointer text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        }
      >
        {info.ctaLabel}
      </Link>
    </aside>
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
