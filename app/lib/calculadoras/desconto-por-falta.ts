import { round2 } from "./tabelas-2026";

export type LinhaBreakdown = {
  label: string;
  valor: number;
  tipo: "desconto" | "info";
};

/** Lei 605/1949, art. 7º, § 2º — descontos do mensalista na base de 30 diárias. */
export const DIVISOR_DIA_MENSALISTA = 30;

/** Teto prático de semanas com falta no mês (até 5). */
export const MAX_SEMANAS_DSR_MES = 5;

export type DescontoPorFaltaInput = {
  salarioBruto: number;
  faltas: number;
  incluirDsr: boolean;
  semanasComFalta: number;
};

export type DescontoPorFaltaResultado = {
  valorDia: number;
  descontoFaltas: number;
  descontoDsr: number;
  totalDescontado: number;
  salarioAposDesconto: number;
  info: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
};

/** Ao subir o número de faltas, o formulário mantém 1 semana (mesma semana). */
export function semanasComFaltaPadrao(): number {
  return 1;
}

export function calcularDescontoPorFalta(
  input: DescontoPorFaltaInput,
): DescontoPorFaltaResultado {
  const { salarioBruto, faltas, incluirDsr, semanasComFalta } = input;

  const valorDia = round2(salarioBruto / DIVISOR_DIA_MENSALISTA);
  const descontoFaltas = round2(valorDia * faltas);
  const semanas = incluirDsr ? semanasComFalta : 0;
  const descontoDsr = round2(valorDia * semanas);
  const totalDescontado = round2(descontoFaltas + descontoDsr);
  const salarioAposDesconto = round2(salarioBruto - totalDescontado);

  const info: LinhaBreakdown[] = [
    {
      label: `Valor do dia (salário ÷ ${DIVISOR_DIA_MENSALISTA})`,
      valor: valorDia,
      tipo: "info",
    },
  ];

  const descontos: LinhaBreakdown[] = [
    {
      label: `Faltas injustificadas (${faltas} ${faltas === 1 ? "dia" : "dias"})`,
      valor: descontoFaltas,
      tipo: "desconto",
    },
  ];

  if (incluirDsr && descontoDsr > 0) {
    descontos.push({
      label: `Perda de DSR (${semanasComFalta} ${semanasComFalta === 1 ? "semana" : "semanas"})`,
      valor: descontoDsr,
      tipo: "desconto",
    });
  }

  return {
    valorDia,
    descontoFaltas,
    descontoDsr,
    totalDescontado,
    salarioAposDesconto,
    info,
    descontos,
  };
}
