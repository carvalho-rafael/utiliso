"use client";

import { useState } from "react";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import {
  calcularHoraExtra,
  JORNADAS,
  type HoraExtraResultado,
} from "../../lib/calculadoras/hora-extra";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "salarioBruto"
  | "jornadaCustom"
  | "horas50"
  | "horas100"
  | "diasUteis"
  | "diasDsr"
  | "dependentes";

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

export function HoraExtraForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [jornada, setJornada] = useState<number | "custom">(220);
  const [jornadaCustom, setJornadaCustom] = useState("");
  const [horas50, setHoras50] = useState("");
  const [horas100, setHoras100] = useState("");
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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const salario = parseMoeda(salarioBruto);
    const numHoras50 = parseHoras(horas50);
    const numHoras100 = parseHoras(horas100);
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

    if (Number.isNaN(numHoras50) || numHoras50 < 0) {
      reportarErro("Informe horas extras 50% válidas (0 ou mais).", [
        "horas50",
      ]);
      return;
    }

    if (Number.isNaN(numHoras100) || numHoras100 < 0) {
      reportarErro("Informe horas extras 100% válidas (0 ou mais).", [
        "horas100",
      ]);
      return;
    }

    if (numHoras50 === 0 && numHoras100 === 0) {
      reportarErro("Informe ao menos uma hora extra (50% ou 100%).", [
        "horas50",
        "horas100",
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
        horas50: numHoras50,
        horas100: numHoras100,
        incluirDsr,
        diasUteis: numDiasUteis,
        diasDsr: numDiasDsr,
        dependentes: numDependentes,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            Remuneração mensal habitual usada como base da hora normal.
          </span>
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Jornada mensal
          </legend>
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
          {jornada === "custom" && (
            <label className="flex flex-col gap-2 pl-7">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Horas extras 50%
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={horas50}
              onChange={(event) => {
                setHoras50(event.target.value);
                limparResultado();
              }}
              className={classeCampo(campoComErro("horas50"))}
              placeholder="0"
              aria-invalid={campoComErro("horas50")}
              aria-describedby={erro ? "hora-extra-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Dias úteis e horas além da jornada (adicional mínimo de 50%).
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Horas extras 100%
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={horas100}
              onChange={(event) => {
                setHoras100(event.target.value);
                limparResultado();
              }}
              className={classeCampo(campoComErro("horas100"))}
              placeholder="0"
              aria-invalid={campoComErro("horas100")}
              aria-describedby={erro ? "hora-extra-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Domingos e feriados não compensados (adicional de 100%).
            </span>
          </label>
        </div>

        <fieldset className="flex flex-col gap-3">
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
            <div className="grid grid-cols-1 gap-4 pl-7 sm:grid-cols-2">
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
            className={`${classeCampo(campoComErro("dependentes"))} max-w-[7rem]`}
            aria-invalid={campoComErro("dependentes")}
            aria-describedby={erro ? "hora-extra-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Filhos, cônjuge ou outros dependentes aceitos pela Receita Federal
            (R$ 189,59 cada na dedução do IRRF).
          </span>
        </label>

        {erro && (
          <p id="hora-extra-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular hora extra
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado da hora extra"
          className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6"
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
            <p className="mt-1">
              Hora extra 50%:{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHora50)}
              </span>
            </p>
            <p className="mt-1">
              Hora extra 100%:{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHora100)}
              </span>
            </p>
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

          <aside
            aria-label="Guia de cálculo do INSS"
            className="rounded-lg border border-border bg-background p-4"
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
