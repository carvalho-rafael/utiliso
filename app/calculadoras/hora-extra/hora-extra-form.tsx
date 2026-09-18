"use client";

import { useState } from "react";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import {
  ADICIONAL_MINIMO,
  calcularHoraExtra,
  JORNADAS,
  type HoraExtraResultado,
} from "../../lib/calculadoras/hora-extra";
import { montarTextoBreakdownCalculadora } from "../../lib/calculadoras/resultado-texto";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type LinhaFormulario = {
  horas: string;
  adicional: string;
};

type CampoFormulario =
  | "salarioBruto"
  | "jornadaCustom"
  | "diasUteis"
  | "diasDsr"
  | "dependentes"
  | `horas-${number}`
  | `adicional-${number}`;

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

function parseHoras(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return Number.parseFloat(trimmed.replace(",", "."));
}

function parseAdicional(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  return Number.parseFloat(trimmed.replace(",", "."));
}

export function HoraExtraForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [jornada, setJornada] = useState<number | "custom">(220);
  const [jornadaCustom, setJornadaCustom] = useState("");
  const [linhas, setLinhas] = useState<LinhaFormulario[]>([
    { horas: "", adicional: "50" },
    { horas: "", adicional: "100" },
  ]);
  const [incluirDsr, setIncluirDsr] = useState(true);
  const [diasUteis, setDiasUteis] = useState("25");
  const [diasDsr, setDiasDsr] = useState("5");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<HoraExtraResultado | null>(null);

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

  function atualizarLinha(
    indice: number,
    campo: keyof LinhaFormulario,
    valor: string,
  ) {
    setLinhas((atuais) =>
      atuais.map((linha, i) =>
        i === indice ? { ...linha, [campo]: valor } : linha,
      ),
    );
    limparResultado();
  }

  function adicionarLinha() {
    setLinhas((atuais) => [...atuais, { horas: "", adicional: "50" }]);
    limparResultado();
  }

  function removerLinha(indice: number) {
    setLinhas((atuais) => atuais.filter((_, i) => i !== indice));
    limparResultado();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const salario = parseMoeda(salarioBruto);
    const numDependentes = Number.parseInt(dependentes, 10);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    let jornadaMensal: number;
    if (jornada === "custom") {
      jornadaMensal = Number.parseInt(jornadaCustom, 10);
      if (
        Number.isNaN(jornadaMensal) ||
        jornadaMensal <= 0 ||
        !Number.isInteger(jornadaMensal)
      ) {
        reportarErro("Informe uma jornada mensal válida (horas inteiras).", [
          "jornadaCustom",
        ]);
        return;
      }
    } else {
      jornadaMensal = jornada;
    }

    const linhasCalculadas: { horas: number; adicionalPercentual: number }[] =
      [];

    for (const [indice, linha] of linhas.entries()) {
      const horas = parseHoras(linha.horas);
      const campoHoras = `horas-${indice}` as const;
      const campoAdicional = `adicional-${indice}` as const;

      if (Number.isNaN(horas) || horas < 0) {
        reportarErro("Informe horas extras válidas (0 ou mais).", [campoHoras]);
        return;
      }

      if (horas === 0) {
        continue;
      }

      const adicional = parseAdicional(linha.adicional);
      if (Number.isNaN(adicional) || adicional < ADICIONAL_MINIMO) {
        reportarErro(
          `Informe um adicional de pelo menos ${ADICIONAL_MINIMO}% (piso da CF/CLT; a convenção pode ser maior).`,
          [campoAdicional],
        );
        return;
      }

      linhasCalculadas.push({ horas, adicionalPercentual: adicional });
    }

    if (linhasCalculadas.length === 0) {
      reportarErro("Informe ao menos uma hora extra.", [
        ...linhas.map((_, indice) => `horas-${indice}` as const),
      ]);
      return;
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

    let numDiasUteis = 25;
    let numDiasDsr = 5;

    if (incluirDsr) {
      numDiasUteis = Number.parseInt(diasUteis, 10);
      numDiasDsr = Number.parseInt(diasDsr, 10);

      if (
        Number.isNaN(numDiasUteis) ||
        numDiasUteis < 1 ||
        !Number.isInteger(numDiasUteis)
      ) {
        reportarErro("Informe dias úteis válidos (1 ou mais).", ["diasUteis"]);
        return;
      }

      if (
        Number.isNaN(numDiasDsr) ||
        numDiasDsr < 0 ||
        !Number.isInteger(numDiasDsr)
      ) {
        reportarErro("Informe dias de DSR válidos (0 ou mais).", ["diasDsr"]);
        return;
      }
    }

    setResultado(
      calcularHoraExtra({
        salarioBruto: salario,
        jornadaMensal,
        linhas: linhasCalculadas,
        incluirDsr,
        diasUteis: numDiasUteis,
        diasDsr: numDiasDsr,
        dependentes: numDependentes,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              aria-describedby={erro ? "hora-extra-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Remuneração mensal habitual usada como base da hora normal
              (salário-base e adicionais habituais).
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Dependentes
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
              aria-describedby={erro ? "hora-extra-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Filhos, cônjuge ou outros dependentes aceitos pela Receita Federal
              (R$ 189,59 cada na dedução do IRRF).
            </span>
          </label>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Jornada mensal
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {JORNADAS.map((item) => (
            <label
              key={item.horas}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            >
              <input
                type="radio"
                name="jornada"
                checked={jornada === item.horas}
                onChange={() => {
                  setJornada(item.horas);
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              {item.label}
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="jornada"
              checked={jornada === "custom"}
              onChange={() => {
                setJornada("custom");
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Outra jornada
          </label>
          </div>
          {jornada === "custom" && (
            <label className="flex flex-col gap-2 sm:pl-7">
              <span className="text-sm text-muted">Horas mensais</span>
              <input
                type="number"
                min={1}
                step={1}
                value={jornadaCustom}
                onChange={(event) => {
                  setJornadaCustom(event.target.value);
                  limparResultado();
                }}
                className={`${classeCampo(campoComErro("jornadaCustom"))} max-w-[7rem]`}
                placeholder="Ex.: 220"
                aria-invalid={campoComErro("jornadaCustom")}
                aria-describedby={erro ? "hora-extra-erro" : undefined}
              />
            </label>
          )}
          <span className="text-xs text-muted">
            Hora normal = salário ÷ jornada mensal (ex.: 44h/semana = divisor
            220).
          </span>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Horas extras
          </legend>
          {linhas.map((linha, indice) => (
            <div
              key={indice}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end"
            >
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Horas</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={linha.horas}
                  onChange={(event) =>
                    atualizarLinha(indice, "horas", event.target.value)
                  }
                  className={classeCampo(campoComErro(`horas-${indice}`))}
                  placeholder="0"
                  aria-invalid={campoComErro(`horas-${indice}`)}
                  aria-describedby={erro ? "hora-extra-erro" : undefined}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Adicional (%)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={linha.adicional}
                  onChange={(event) =>
                    atualizarLinha(indice, "adicional", event.target.value)
                  }
                  className={classeCampo(campoComErro(`adicional-${indice}`))}
                  placeholder={`${ADICIONAL_MINIMO}`}
                  aria-invalid={campoComErro(`adicional-${indice}`)}
                  aria-describedby={erro ? "hora-extra-erro" : undefined}
                />
              </label>
              {linhas.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removerLinha(indice)}
                  className="cursor-pointer self-end pb-2 text-sm font-medium text-accent hover:underline"
                >
                  Remover
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          ))}
          <span className="text-xs text-muted">
            {`Piso legal de ${ADICIONAL_MINIMO}% em dias úteis (CF art. 7º, XVI; CLT art. 59, §1º). Convenção coletiva pode ser maior (60%, 70%…). Domingos e feriados não compensados costumam usar 100%.`}
          </span>
          <button
            type="button"
            onClick={adicionarLinha}
            className="cursor-pointer self-start text-sm font-medium text-accent hover:underline"
          >
            Adicionar outra alíquota
          </button>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">DSR</legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={incluirDsr}
              onChange={(event) => {
                setIncluirDsr(event.target.checked);
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Incluir DSR sobre horas extras (Súmula 172 TST)
          </label>

          {incluirDsr && (
            <div className="grid grid-cols-1 gap-3 pl-7 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Dias úteis no mês</span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={diasUteis}
                  onChange={(event) => {
                    setDiasUteis(event.target.value);
                    limparResultado();
                  }}
                  className={`${classeCampo(campoComErro("diasUteis"))} max-w-[7rem]`}
                  aria-invalid={campoComErro("diasUteis")}
                  aria-describedby={erro ? "hora-extra-erro" : undefined}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Dias de DSR</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={diasDsr}
                  onChange={(event) => {
                    setDiasDsr(event.target.value);
                    limparResultado();
                  }}
                  className={`${classeCampo(campoComErro("diasDsr"))} max-w-[7rem]`}
                  aria-invalid={campoComErro("diasDsr")}
                  aria-describedby={erro ? "hora-extra-erro" : undefined}
                />
              </label>
            </div>
          )}
        </fieldset>

        {erro && (
          <p id="hora-extra-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular hora extra
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado da hora extra"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso ano={resultado.tabelasAno} />
          </div>

          <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted">
            <p>
              Hora normal:{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHora)}
              </span>
            </p>
            {resultado.valoresHoraExtra.map((item) => (
              <p key={item.adicionalPercentual} className="mt-1">
                Hora extra {item.adicionalPercentual}%:{" "}
                <span className="font-medium text-foreground">
                  {formatarMoeda(item.valor)}
                </span>
              </p>
            ))}
          </div>

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
                das horas extras.
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
              <span>Valor líquido das horas extras</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoBreakdownCalculadora({
              tituloCalculadora: "Calculadora de hora extra",
              path: "/calculadoras/hora-extra",
              tabelasAno: resultado.tabelasAno,
              extraSecoes: [
                {
                  titulo: "Valores por hora",
                  linhas: [
                    {
                      label: "Hora normal",
                      valor: formatarMoeda(resultado.valorHora),
                    },
                    ...resultado.valoresHoraExtra.map((item) => ({
                      label: `Hora extra ${item.adicionalPercentual}%`,
                      valor: formatarMoeda(item.valor),
                    })),
                  ],
                },
              ],
              verbas: resultado.verbas,
              descontos: resultado.descontos,
              fgts: resultado.fgts,
              totalVerbas: resultado.totalVerbas,
              totalDescontos: resultado.totalDescontos,
              liquidoLabel: "Valor líquido das horas extras",
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
              do salário dentro da faixa. Os descontos aqui são a diferença
              entre o mês com horas extras e o mês sem elas.
            </p>
            <CalculadoraInssLinks ano={resultado.tabelasAno} />
          </aside>
        </section>
      )}
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
        {linhas.map((linha, indice) => (
          <li
            key={`${linha.label}-${indice}`}
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
