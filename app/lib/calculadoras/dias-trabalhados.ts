import { contarAvos } from "./rescisao";
import {
  calcularINSS,
  calcularIRRF,
  round2,
  TABELAS_ANO,
} from "./tabelas-2026";

export type LinhaBreakdown = {
  label: string;
  valor: number;
  tipo: "verba" | "desconto" | "info";
};

export type DiasTrabalhadosInput = {
  salarioBruto: number;
  dataInicio: Date;
  dataFim: Date;
  dependentes: number;
};

export type DiasTrabalhadosResultado = {
  diasTrabalhados: number;
  diasNoMes: number;
  mesContaComoAvo: boolean;
  brutoProporcional: number;
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
};

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function diasNoMesCalendario(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/** Dias corridos no intervalo, inclusive início e fim. */
export function contarDiasTrabalhados(inicio: Date, fim: Date): number {
  const start = startOfDay(inicio);
  const end = startOfDay(fim);
  if (end < start) return 0;
  return (
    Math.floor((end.getTime() - start.getTime()) / 86400000) + 1
  );
}

export function mesmoMesCalendario(inicio: Date, fim: Date): boolean {
  return (
    inicio.getFullYear() === fim.getFullYear() &&
    inicio.getMonth() === fim.getMonth()
  );
}

export function salarioProporcionalIntervalo(
  salario: number,
  inicio: Date,
  fim: Date,
): number {
  const dias = contarDiasTrabalhados(inicio, fim);
  const diasMes = diasNoMesCalendario(inicio);
  return round2((salario / diasMes) * dias);
}

export function calcularDiasTrabalhados(
  input: DiasTrabalhadosInput,
): DiasTrabalhadosResultado {
  const { salarioBruto, dataInicio, dataFim, dependentes } = input;

  const diasTrabalhados = contarDiasTrabalhados(dataInicio, dataFim);
  const diasNoMes = diasNoMesCalendario(dataInicio);
  const brutoProporcional = salarioProporcionalIntervalo(
    salarioBruto,
    dataInicio,
    dataFim,
  );
  const mesContaComoAvo = contarAvos(dataInicio, dataFim) > 0;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  verbas.push({
    label: `Salário proporcional (${diasTrabalhados} dias)`,
    valor: brutoProporcional,
    tipo: "verba",
  });

  const inss = calcularINSS(brutoProporcional);
  if (inss > 0) {
    descontos.push({
      label: "INSS",
      valor: inss,
      tipo: "desconto",
    });
  }

  const irrf = calcularIRRF(brutoProporcional, inss, dependentes);
  descontos.push({
    label: "IRRF",
    valor: irrf,
    tipo: "desconto",
  });

  const fgtsValor = round2(brutoProporcional * ALIQUOTA_FGTS);
  fgts.push({
    label: "FGTS (8% — depositado pelo empregador)",
    valor: fgtsValor,
    tipo: "info",
  });

  const totalVerbas = round2(
    verbas.reduce((sum, linha) => sum + linha.valor, 0),
  );
  const totalDescontos = round2(
    descontos.reduce((sum, linha) => sum + linha.valor, 0),
  );
  const liquido = round2(totalVerbas - totalDescontos);

  return {
    diasTrabalhados,
    diasNoMes,
    mesContaComoAvo,
    brutoProporcional,
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
  };
}
