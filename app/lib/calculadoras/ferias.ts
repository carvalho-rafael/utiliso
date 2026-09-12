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

export type FeriasInput = {
  salarioBruto: number;
  /** Média de horas extras, comissões etc. incluída na base das férias. */
  mediaVariaveis?: number;
  diasGozo: number;
  venderAbono: boolean;
  dependentes: number;
  adiantarDecimo?: boolean;
};

export type FeriasResultado = {
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
};

/** CLT art. 130: direito a 30 dias de férias. */
export const DIAS_MES = 30;

/** CLT art. 143: abono pecuniário de até 1/3 do direito (10 dias). */
export const DIAS_ABONO = 10;

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

export function calcularFerias(input: FeriasInput): FeriasResultado {
  const {
    salarioBruto,
    mediaVariaveis = 0,
    diasGozo,
    venderAbono,
    dependentes,
    adiantarDecimo = false,
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  const base = round2(salarioBruto + mediaVariaveis);
  const valorDia = base / DIAS_MES;

  const ferias = round2(valorDia * diasGozo);
  const tercoFerias = round2(ferias / 3);
  const diasAbono = venderAbono ? DIAS_ABONO : 0;
  const abono = round2(valorDia * diasAbono);
  const tercoAbono = round2(abono / 3);
  const adiantamento13 = adiantarDecimo ? round2(base / 2) : 0;

  verbas.push({
    label: `Férias (${diasGozo} dias)`,
    valor: ferias,
    tipo: "verba",
  });
  verbas.push({
    label: "1/3 constitucional (férias)",
    valor: tercoFerias,
    tipo: "verba",
  });

  if (abono > 0) {
    verbas.push({
      label: `Abono pecuniário (${diasAbono} dias)`,
      valor: abono,
      tipo: "verba",
    });
    verbas.push({
      label: "1/3 constitucional (abono)",
      valor: tercoAbono,
      tipo: "verba",
    });
  }

  if (adiantamento13 > 0) {
    verbas.push({
      label: "Adiantamento 1ª parcela 13º salário",
      valor: adiantamento13,
      tipo: "verba",
    });
  }

  const baseINSS = round2(ferias + tercoFerias + abono + tercoAbono);
  const inss = calcularINSS(baseINSS);

  const rendimentoTributavel = round2(ferias + tercoFerias);
  const inssDedutivel =
    baseINSS > 0 ? round2(inss * (rendimentoTributavel / baseINSS)) : 0;
  const irrf = calcularIRRF(rendimentoTributavel, inssDedutivel, dependentes);

  if (inss > 0) {
    descontos.push({
      label: "INSS",
      valor: inss,
      tipo: "desconto",
    });
  }

  if (irrf > 0) {
    descontos.push({
      label: "IRRF",
      valor: irrf,
      tipo: "desconto",
    });
  }

  const fgtsValor = round2(baseINSS * ALIQUOTA_FGTS);
  if (fgtsValor > 0) {
    fgts.push({
      label: "FGTS (8% — depositado pelo empregador)",
      valor: fgtsValor,
      tipo: "info",
    });
  }

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
