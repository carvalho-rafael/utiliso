"use client";

import { useMemo, useState } from "react";
import {
  contarDiasTrabalhados,
  diasNoMesCalendario,
  mesmoMesCalendario,
  salarioProporcionalIntervalo,
} from "../../lib/calculadoras/dias-trabalhados";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import {
  contarAvos,
  formatarDataInput,
  parseDataInput,
} from "../../lib/calculadoras/rescisao";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type EstadoCalculo =
  | { tipo: "incompleto" }
  | { tipo: "erro"; mensagem: string }
  | {
      tipo: "ok";
      dias: number;
      diasNoMes: number;
      bruto: number;
      mesContaComoAvo: boolean;
    };

export function SaldoExemplo() {
  const [salarioTexto, setSalarioTexto] = useState("R$ 3.100,00");
  const [dataInicio, setDataInicio] = useState("01/03/2026");
  const [dataFim, setDataFim] = useState("15/03/2026");

  const estado = useMemo((): EstadoCalculo => {
    const salario = parseMoeda(salarioTexto);
    const inicio = parseDataInput(dataInicio);
    const fim = parseDataInput(dataFim);

    if (salarioTexto.trim() && salario <= 0) {
      return { tipo: "erro", mensagem: "Informe um salário bruto válido." };
    }

    if (!dataInicio.trim() || !dataFim.trim()) {
      return { tipo: "incompleto" };
    }

    if (!inicio) {
      return {
        tipo: "erro",
        mensagem: "Informe a data inicial no formato DD/MM/AAAA.",
      };
    }

    if (!fim) {
      return {
        tipo: "erro",
        mensagem: "Informe a data final no formato DD/MM/AAAA.",
      };
    }

    if (fim < inicio) {
      return {
        tipo: "erro",
        mensagem: "A data final não pode ser anterior à data inicial.",
      };
    }

    if (!mesmoMesCalendario(inicio, fim)) {
      return {
        tipo: "erro",
        mensagem:
          "As datas devem estar no mesmo mês civil. Para períodos em meses diferentes, calcule mês a mês.",
      };
    }

    if (salario <= 0) {
      return { tipo: "incompleto" };
    }

    const dias = contarDiasTrabalhados(inicio, fim);
    const diasNoMes = diasNoMesCalendario(inicio);
    const bruto = salarioProporcionalIntervalo(salario, inicio, fim);

    return {
      tipo: "ok",
      dias,
      diasNoMes,
      bruto,
      mesContaComoAvo: contarAvos(inicio, fim) > 0,
    };
  }, [dataFim, dataInicio, salarioTexto]);

  const salario = parseMoeda(salarioTexto);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-2 sm:col-span-3">
          <span className="text-sm font-medium text-foreground">
            Salário bruto mensal
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={salarioTexto}
            onChange={(event) =>
              setSalarioTexto(formatarMoedaInput(event.target.value))
            }
            className={fieldClass}
            placeholder="R$ 0,00"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Data inicial
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={dataInicio}
            onChange={(event) =>
              setDataInicio(formatarDataInput(event.target.value))
            }
            className={fieldClass}
            placeholder="DD/MM/AAAA"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Data final
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={dataFim}
            onChange={(event) =>
              setDataFim(formatarDataInput(event.target.value))
            }
            className={fieldClass}
            placeholder="DD/MM/AAAA"
          />
        </label>
      </div>
      <span className="text-xs text-muted">
        Dias corridos, inclusive início e fim. Ex.: admissão ou último dia
        trabalhado no mês da rescisão.
      </span>

      {estado.tipo === "erro" && (
        <p className="text-sm text-danger" role="alert">{estado.mensagem}</p>
      )}

      {estado.tipo === "ok" && (
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium text-highlight">
            Saldo de salário (bruto)
          </p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {formatarMoeda(estado.bruto)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {estado.dias} dias em um mês de {estado.diasNoMes} —{" "}
            {formatarMoeda(salario)} ÷ {estado.diasNoMes} × {estado.dias}.
          </p>
          <p className="mt-3 text-xs text-muted">
            {estado.mesContaComoAvo
              ? "Este intervalo conta como 1/12 para 13º e férias proporcionais (mais de 14 dias)."
              : "Com 14 dias ou menos no intervalo, em geral o mês não conta como avo de 13º nem de férias proporcionais."}
          </p>
          <p className="mt-2 text-xs text-muted">
            INSS, IRRF e FGTS não entram neste exemplo — use a calculadora de
            dias trabalhados ou a de rescisão para o líquido.
          </p>
        </div>
      )}
    </div>
  );
}
