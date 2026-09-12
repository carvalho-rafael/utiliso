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

export const JORNADAS = [
  { horas: 220, label: "44h semanais (divisor 220)" },
  { horas: 200, label: "40h semanais (divisor 200)" },
  { horas: 180, label: "36h semanais (divisor 180)" },
] as const;

/** CF art. 7º, XVI; CLT art. 59, §1º — mínimo 50% em dias úteis. */
export const ADICIONAL_50 = 0.5;

/** Lei 605/1949; Súmula 146 TST — 100% em domingos e feriados não compensados. */
export const ADICIONAL_100 = 1;

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

export type HoraExtraInput = {
  salarioBruto: number;
  jornadaMensal: number;
  horas50: number;
  horas100: number;
  incluirDsr: boolean;
  diasUteis: number;
  diasDsr: number;
  dependentes: number;
};

export type HoraExtraResultado = {
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
  valorHora: number;
  valorHora50: number;
  valorHora100: number;
};

export function calcularHoraExtra(input: HoraExtraInput): HoraExtraResultado {
  const {
    salarioBruto,
    jornadaMensal,
    horas50,
    horas100,
    incluirDsr,
    diasUteis,
    diasDsr,
    dependentes,
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  const valorHora = round2(salarioBruto / jornadaMensal);
  const valorHora50 = round2(valorHora * (1 + ADICIONAL_50));
  const valorHora100 = round2(valorHora * (1 + ADICIONAL_100));

  const he50 = round2(horas50 * valorHora50);
  const he100 = round2(horas100 * valorHora100);
  const extras = round2(he50 + he100);

  const dsr =
    incluirDsr && diasUteis > 0
      ? round2((extras / diasUteis) * diasDsr)
      : 0;

  const adicionalTotal = round2(extras + dsr);

  if (he50 > 0) {
    verbas.push({
      label: `Hora extra 50% (${horas50}h)`,
      valor: he50,
      tipo: "verba",
    });
  }

  if (he100 > 0) {
    verbas.push({
      label: `Hora extra 100% (${horas100}h)`,
      valor: he100,
      tipo: "verba",
    });
  }

  if (dsr > 0) {
    verbas.push({
      label: `DSR sobre horas extras (${diasDsr} dias)`,
      valor: dsr,
      tipo: "verba",
    });
  }

  const inssSalario = calcularINSS(salarioBruto);
  const inssComHe = calcularINSS(round2(salarioBruto + adicionalTotal));
  const inss = round2(Math.max(0, inssComHe - inssSalario));

  const irrfSalario = calcularIRRF(salarioBruto, inssSalario, dependentes);
  const irrfComHe = calcularIRRF(
    round2(salarioBruto + adicionalTotal),
    inssComHe,
    dependentes,
  );
  const irrf = round2(Math.max(0, irrfComHe - irrfSalario));

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
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
    valorHora,
    valorHora50,
    valorHora100,
  };
}
