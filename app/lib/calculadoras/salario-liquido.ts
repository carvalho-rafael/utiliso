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

export type SalarioLiquidoInput = {
  salarioBruto: number;
  dependentes: number;
  descontaValeTransporte: boolean;
  /** Custo mensal do transporte; se omitido, usa 6% do salário básico. */
  custoValeTransporte?: number;
};

export type SalarioLiquidoResultado = {
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
};

/** Lei 7.418/1985, art. 4º parágrafo único: até 6% do salário básico. */
const LIMITE_VT_PERCENTUAL = 0.06;

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

function calcularDescontoValeTransporte(
  salarioBruto: number,
  custoValeTransporte?: number,
): number {
  const limiteLegal = round2(salarioBruto * LIMITE_VT_PERCENTUAL);
  const custo = custoValeTransporte ?? limiteLegal;
  return round2(Math.min(limiteLegal, custo));
}

export function calcularSalarioLiquido(
  input: SalarioLiquidoInput,
): SalarioLiquidoResultado {
  const {
    salarioBruto,
    dependentes,
    descontaValeTransporte,
    custoValeTransporte,
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  verbas.push({
    label: "Salário bruto",
    valor: salarioBruto,
    tipo: "verba",
  });

  const inss = calcularINSS(salarioBruto);
  if (inss > 0) {
    descontos.push({
      label: "INSS",
      valor: inss,
      tipo: "desconto",
    });
  }

  const irrf = calcularIRRF(salarioBruto, inss, dependentes);
  descontos.push({
    label: "IRRF",
    valor: irrf,
    tipo: "desconto",
  });

  if (descontaValeTransporte) {
    const vt = calcularDescontoValeTransporte(
      salarioBruto,
      custoValeTransporte,
    );
    if (vt > 0) {
      descontos.push({
        label: "Vale-transporte (até 6% do salário básico)",
        valor: vt,
        tipo: "desconto",
      });
    }
  }

  const fgtsValor = round2(salarioBruto * ALIQUOTA_FGTS);
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
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
  };
}
