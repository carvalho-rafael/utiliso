"use client";

import Link from "next/link";
import { useState } from "react";
import {
  calcularRescisao,
  formatarDataExibicao,
  formatarDataInput,
  formatarMoeda,
  formatarMoedaInput,
  getSeguroDesempregoInfo,
  parseDataInput,
  parseMoeda,
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

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function RescisaoForm() {
  const [motivo, setMotivo] = useState<MotivoRescisao>("sem_justa_causa");
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [dataAdmissao, setDataAdmissao] = useState("09/06/2021");
  const [dataComunicacao, setDataComunicacao] = useState("01/10/2026");
  const [feriasVencidas, setFeriasVencidas] = useState("0");
  const [avisoPrevio, setAvisoPrevio] = useState<AvisoPrevio>("trabalhado");
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<RescisaoResultado | null>(null);

  const avisoDesabilitado = motivo === "com_justa_causa";

  function limparResultado() {
    setResultado(null);
    setErro(null);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);

    const salario = parseMoeda(salarioBruto);
    const admissao = parseDataInput(dataAdmissao);
    const comunicacao = parseDataInput(dataComunicacao);
    const periodosVencidos = Number.parseInt(feriasVencidas, 10);

    if (salario <= 0) {
      setErro("Informe um salário bruto válido.");
      setResultado(null);
      return;
    }
    if (!admissao) {
      setErro("Data de admissão inválida. Use DD/MM/AAAA.");
      setResultado(null);
      return;
    }
    if (!comunicacao) {
      setErro("Data da comunicação inválida. Use DD/MM/AAAA.");
      setResultado(null);
      return;
    }
    if (comunicacao < admissao) {
      setErro("A data da comunicação deve ser igual ou posterior à admissão.");
      setResultado(null);
      return;
    }
    if (Number.isNaN(periodosVencidos) || periodosVencidos < 0) {
      setErro("Informe um número válido de períodos de férias vencidas.");
      setResultado(null);
      return;
    }

    setResultado(
      calcularRescisao({
        motivo,
        salarioBruto: salario,
        dataAdmissao: admissao,
        dataComunicacao: comunicacao,
        feriasVencidasPeriodos: periodosVencidos,
        avisoPrevio: avisoDesabilitado ? "trabalhado" : avisoPrevio,
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
            className={fieldClass}
            placeholder="R$ 0,00"
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
              className={fieldClass}
              placeholder="DD/MM/AAAA"
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
              className={fieldClass}
              placeholder="DD/MM/AAAA"
            />
            <span className="text-xs text-muted">
              Dia em que a rescisão foi comunicada. O aviso prévio, se houver,
              conta a partir desta data.
            </span>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Férias vencidas (períodos não gozados)
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={feriasVencidas}
            onChange={(event) => {
              setFeriasVencidas(event.target.value);
              limparResultado();
            }}
            className={fieldClass}
          />
          <span className="text-xs text-muted">
            Períodos aquisitivos já completos que você não tirou férias. O
            período atual é calculado pela data de admissão.
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Aviso prévio</span>
          <select
            value={avisoDesabilitado ? "trabalhado" : avisoPrevio}
            onChange={(event) => {
              setAvisoPrevio(event.target.value as AvisoPrevio);
              limparResultado();
            }}
            disabled={avisoDesabilitado}
            className={`${fieldClass} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
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

        {erro && (
          <p className="text-sm text-danger" role="alert">{erro}</p>
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
