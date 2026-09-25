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

/** CLT art. 73 — piso urbano; CCT pode ser maior. */
export const ADICIONAL_NOTURNO_URBANO_MINIMO = 20;

/** Lei 5.889/1973, art. 7º — piso rural. */
export const ADICIONAL_NOTURNO_RURAL_MINIMO = 25;

/** CLT art. 73, § 1º — 52 min 30 s = 1 h noturna. */
export const FATOR_HORA_REDUZIDA = 60 / 52.5;

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

export type CategoriaNoturna = "urbano" | "rural";

export type AdicionalNoturnoInput = {
  salarioBruto: number;
  jornadaMensal: number;
  categoria: CategoriaNoturna;
  horasRelogio: number;
  adicionalPercentual: number;
  aplicarHoraReduzida: boolean;
  incluirDsr: boolean;
  diasUteis: number;
  diasDsr: number;
  dependentes: number;
};

export type AdicionalNoturnoResultado = {
  valorHora: number;
  valorHoraNoturna: number;
  horasComputadas: number;
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
};

export function pisoAdicionalNoturno(categoria: CategoriaNoturna): number {
  return categoria === "rural"
    ? ADICIONAL_NOTURNO_RURAL_MINIMO
    : ADICIONAL_NOTURNO_URBANO_MINIMO;
}

export function horasNoturnasComputadas(
  horasRelogio: number,
  aplicarHoraReduzida: boolean,
): number {
  if (!aplicarHoraReduzida) return horasRelogio;
  return round2(horasRelogio * FATOR_HORA_REDUZIDA);
}

export function calcularAdicionalNoturno(
  input: AdicionalNoturnoInput,
): AdicionalNoturnoResultado {
  const {
    salarioBruto,
    jornadaMensal,
    horasRelogio,
    adicionalPercentual,
    aplicarHoraReduzida,
    incluirDsr,
    diasUteis,
    diasDsr,
    dependentes,
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  const valorHora = round2(salarioBruto / jornadaMensal);
  const horasComputadas = horasNoturnasComputadas(
    horasRelogio,
    aplicarHoraReduzida,
  );
  const valorHoraNoturna = round2(
    valorHora * (1 + adicionalPercentual / 100),
  );

  const valorAdicional = round2(
    valorHora * (adicionalPercentual / 100) * horasComputadas,
  );

  verbas.push({
    label: `Adicional noturno ${adicionalPercentual}% (${formatarHorasLabel(horasComputadas)}h computadas)`,
    valor: valorAdicional,
    tipo: "verba",
  });

  const extras = valorAdicional;

  const dsr =
    incluirDsr && diasUteis > 0
      ? round2((extras / diasUteis) * diasDsr)
      : 0;

  const adicionalTotal = round2(extras + dsr);

  if (dsr > 0) {
    verbas.push({
      label: `DSR sobre adicional noturno (${diasDsr} dias)`,
      valor: dsr,
      tipo: "verba",
    });
  }

  const inssSalario = calcularINSS(salarioBruto);
  const inssComVerba = calcularINSS(round2(salarioBruto + adicionalTotal));
  const inss = round2(Math.max(0, inssComVerba - inssSalario));

  const irrfSalario = calcularIRRF(salarioBruto, inssSalario, dependentes);
  const irrfComVerba = calcularIRRF(
    round2(salarioBruto + adicionalTotal),
    inssComVerba,
    dependentes,
  );
  const irrf = round2(Math.max(0, irrfComVerba - irrfSalario));

  if (inss > 0) {
    descontos.push({ label: "INSS", valor: inss, tipo: "desconto" });
  }

  if (irrf > 0) {
    descontos.push({ label: "IRRF", valor: irrf, tipo: "desconto" });
  }

  const fgtsValor = round2(adicionalTotal * ALIQUOTA_FGTS);
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
    valorHora,
    valorHoraNoturna,
    horasComputadas,
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
  };
}

function formatarHorasLabel(horas: number): string {
  return Number.isInteger(horas) ? String(horas) : horas.toFixed(2);
}
