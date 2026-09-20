"use client";

import { useState } from "react";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import { CalculadoraResultadoAviso } from "../../components/calculadora-resultado-aviso";
import {
  calcularDescontoPorFalta,
  DIVISOR_DIA_MENSALISTA,
  MAX_SEMANAS_DSR_MES,
  semanasComFaltaPadrao,
  type DescontoPorFaltaResultado,
} from "../../lib/calculadoras/desconto-por-falta";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import {
  linhasMonetarias,
  montarTextoResultado,
} from "../../lib/calculadoras/resultado-texto";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario = "salarioBruto" | "faltas" | "semanasComFalta";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function DescontoPorFaltaForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [faltas, setFaltas] = useState("1");
  const [incluirDsr, setIncluirDsr] = useState(true);
  const [semanasComFalta, setSemanasComFalta] = useState("1");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<DescontoPorFaltaResultado | null>(
    null,
  );

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

  function handleFaltasChange(value: string) {
    const faltasAnteriores = Number.parseInt(faltas, 10);
    setFaltas(value);
    const num = Number.parseInt(value, 10);
    if (!Number.isNaN(num) && num >= 1 && num <= 31) {
      if (!Number.isNaN(faltasAnteriores) && num > faltasAnteriores) {
        setSemanasComFalta(String(semanasComFaltaPadrao()));
      } else {
        const semanasAtual = Number.parseInt(semanasComFalta, 10);
        if (!Number.isNaN(semanasAtual) && semanasAtual > num) {
          setSemanasComFalta(String(num));
        }
      }
    }
    limparResultado();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const salario = parseMoeda(salarioBruto);
    const numFaltas = Number.parseInt(faltas, 10);
    const numSemanas = Number.parseInt(semanasComFalta, 10);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    if (
      Number.isNaN(numFaltas) ||
      numFaltas < 1 ||
      numFaltas > 31 ||
      !Number.isInteger(numFaltas)
    ) {
      reportarErro("Informe de 1 a 31 faltas injustificadas.", ["faltas"]);
      return;
    }

    if (incluirDsr) {
      if (
        Number.isNaN(numSemanas) ||
        numSemanas < 1 ||
        numSemanas > MAX_SEMANAS_DSR_MES ||
        !Number.isInteger(numSemanas)
      ) {
        reportarErro(
          `Informe de 1 a ${MAX_SEMANAS_DSR_MES} semanas com falta.`,
          ["semanasComFalta"],
        );
        return;
      }

      if (numSemanas > numFaltas) {
        reportarErro(
          "Semanas com falta não pode ser maior que o número de faltas.",
          ["semanasComFalta", "faltas"],
        );
        return;
      }
    }

    setResultado(
      calcularDescontoPorFalta({
        salarioBruto: salario,
        faltas: numFaltas,
        incluirDsr,
        semanasComFalta: incluirDsr ? numSemanas : 0,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Salário bruto mensal
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={salarioBruto}
            onChange={(event) => {
              setSalarioBruto(formatarMoedaInput(event.target.value));
              limparResultado();
            }}
            className={classeCampo(campoComErro("salarioBruto"))}
            aria-invalid={campoComErro("salarioBruto")}
            aria-describedby={erro ? "desconto-falta-erro" : undefined}
          />
        </label>

        <label className="flex flex-col gap-2 sm:max-w-[12rem]">
          <span className="text-sm font-medium text-foreground">
            Faltas injustificadas no mês
          </span>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            value={faltas}
            onChange={(event) => handleFaltasChange(event.target.value)}
            className={classeCampo(campoComErro("faltas"))}
            aria-invalid={campoComErro("faltas")}
            aria-describedby={erro ? "desconto-falta-erro" : undefined}
          />
        </label>

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
            Incluir perda de DSR (Lei 605/1949)
          </label>

          {incluirDsr && (
            <div className="flex flex-col gap-2 pl-7">
              <label className="flex flex-col gap-2 sm:max-w-[12rem]">
                <span className="text-sm text-muted">Semanas com falta</span>
                <input
                  type="number"
                  min={1}
                  max={MAX_SEMANAS_DSR_MES}
                  step={1}
                  value={semanasComFalta}
                  onChange={(event) => {
                    setSemanasComFalta(event.target.value);
                    limparResultado();
                  }}
                  className={classeCampo(campoComErro("semanasComFalta"))}
                  aria-invalid={campoComErro("semanasComFalta")}
                  aria-describedby={erro ? "desconto-falta-erro" : undefined}
                />
              </label>
              <span className="text-xs text-muted">
                Várias faltas na mesma semana geram apenas 1 DSR dessa semana.
              </span>
            </div>
          )}
        </fieldset>

        {erro && (
          <p
            id="desconto-falta-erro"
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
          Calcular desconto por falta
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do desconto por falta"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso variant="clt" />
          </div>

          <BreakdownGroup title="Referência" linhas={resultado.info} />
          <BreakdownGroup
            title="Descontos estimados"
            linhas={resultado.descontos}
            isDesconto
          />

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Total descontado</span>
              <span>- {formatarMoeda(resultado.totalDescontado)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Salário bruto após desconto</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.salarioAposDesconto)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              INSS, IRRF e outros descontos do holerite não entram nesta conta —
              use a calculadora de salário líquido para o líquido do mês.
            </p>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoResultado({
              tituloCalculadora: "Calculadora de desconto por falta",
              path: "/calculadoras/desconto-por-falta",
              paragrafos: [
                `Divisor do dia: salário ÷ ${DIVISOR_DIA_MENSALISTA}.`,
              ],
              secoes: [
                {
                  titulo: "Referência",
                  linhas: linhasMonetarias(resultado.info),
                },
                {
                  titulo: "Descontos",
                  linhas: linhasMonetarias(resultado.descontos, true),
                },
              ],
              destaque: {
                label: "Salário bruto após desconto",
                valor: formatarMoeda(resultado.salarioAposDesconto),
              },
            })}
          />
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
