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

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

export type RegimeSobreaviso = "sobreaviso" | "prontidao" | "ambos";

export type SobreavisoInput = {
  salarioBruto: number;
  jornadaMensal: number;
  regime: RegimeSobreaviso;
  horasSobreaviso: number;
  horasProntidao: number;
  dependentes: number;
};

export type SobreavisoResultado = {
  valorHora: number;
  valorHoraSobreaviso: number;
  valorHoraProntidao: number;
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
};

export function calcularSobreaviso(input: SobreavisoInput): SobreavisoResultado {
  const {
    salarioBruto,
    jornadaMensal,
    regime,
    horasSobreaviso,
    horasProntidao,
    dependentes,
  } = input;

  const valorHora = round2(salarioBruto / jornadaMensal);
  const valorHoraSobreaviso = round2(valorHora / 3);
  const valorHoraProntidao = round2((valorHora * 2) / 3);

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  let adicionalTotal = 0;

  if (
    (regime === "sobreaviso" || regime === "ambos") &&
    horasSobreaviso > 0
  ) {
    const valor = round2(valorHoraSobreaviso * horasSobreaviso);
    verbas.push({
      label: `Sobreaviso 1/3 (${formatarHorasLabel(horasSobreaviso)}h)`,
      valor,
      tipo: "verba",
    });
    adicionalTotal = round2(adicionalTotal + valor);
  }

  if ((regime === "prontidao" || regime === "ambos") && horasProntidao > 0) {
    const valor = round2(valorHoraProntidao * horasProntidao);
    verbas.push({
      label: `Prontidão 2/3 (${formatarHorasLabel(horasProntidao)}h)`,
      valor,
      tipo: "verba",
    });
    adicionalTotal = round2(adicionalTotal + valor);
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
    valorHoraSobreaviso,
    valorHoraProntidao,
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
