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

export type DecimoTerceiroInput = {
  salarioBruto: number;
  /** Média de horas extras, comissões etc. incluída na base do 13º. */
  mediaVariaveis?: number;
  /** Meses com 15 dias ou mais trabalhados no ano (1–12). */
  mesesTrabalhados: number;
  dependentes: number;
  /** Rescisão ou saída no ano: um único líquido com INSS e IRRF, sem 1ª/2ª parcela. */
  modoPagamento?: ModoPagamentoDecimo;
};

export type DecimoTerceiroResultado = {
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
  avos: number;
  bruto: number;
  primeiraParcela: number;
  prazoPrimeiraParcela: string;
  segundaParcela: number;
  prazoSegundaParcela: string;
  modoPagamento: ModoPagamentoDecimo;
};

/** Lei 4.749/1965: 1ª parcela entre 1º de fevereiro e 30 de novembro. */
export const PRAZO_PRIMEIRA_PARCELA = "Até 30 de novembro";

/** Lei 4.749/1965: 2ª parcela até 20 de dezembro. */
export const PRAZO_SEGUNDA_PARCELA = "Até 20 de dezembro";

/** Lei 8.036/1990, art. 15: 8% depositado pelo empregador (não desconta do líquido). */
const ALIQUOTA_FGTS = 0.08;

/**
 * Avos do 13º entre duas datas no ano civil: 1/12 por mês com mais de 14 dias
 * (Lei 4.090/1962). Datas fora do `ano` são limitadas a 1/1 e 31/12.
 */
export function avosDecimoTerceiroNoPeriodo(
  admissao: Date,
  dataFim: Date,
  ano = TABELAS_ANO,
): number {
  const inicioAno = new Date(ano, 0, 1);
  const fimAno = new Date(ano, 11, 31);
  if (dataFim < inicioAno || admissao > fimAno) return 0;
  const inicio = admissao > inicioAno ? admissao : inicioAno;
  const fim = dataFim < fimAno ? dataFim : fimAno;
  if (fim < inicio) return 0;
  return Math.min(12, contarAvos(inicio, fim));
}

/**
 * Avos do 13º no ano civil: da admissão (ou 1º de janeiro) até 31 de dezembro.
 */
export function avosDecimoTerceiroNoAno(
  admissao: Date,
  ano = TABELAS_ANO,
): number {
  const fimAno = new Date(ano, 11, 31);
  return avosDecimoTerceiroNoPeriodo(admissao, fimAno, ano);
}

export type ModoPagamentoDecimo = "duas-parcelas" | "acerto";

export function calcularDecimoTerceiro(
  input: DecimoTerceiroInput,
): DecimoTerceiroResultado {
  const {
    salarioBruto,
    mediaVariaveis = 0,
    mesesTrabalhados,
    dependentes,
    modoPagamento = "duas-parcelas",
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  const base = round2(salarioBruto + mediaVariaveis);
  const avos = Math.min(12, Math.max(0, mesesTrabalhados));
  const bruto = round2((base / 12) * avos);

  const inss = calcularINSS(bruto);
  const irrf = calcularIRRF(bruto, inss, dependentes);

  const primeiraParcela =
    modoPagamento === "acerto" ? 0 : round2(bruto / 2);
  const segundaParcela =
    modoPagamento === "acerto"
      ? round2(Math.max(0, bruto - inss - irrf))
      : round2(Math.max(0, bruto - primeiraParcela - inss - irrf));

  verbas.push({
    label: `13º salário (${avos}/12 avos)`,
    valor: bruto,
    tipo: "verba",
  });

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

  const fgtsValor = round2(bruto * ALIQUOTA_FGTS);
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
  const liquido =
    modoPagamento === "acerto"
      ? segundaParcela
      : round2(primeiraParcela + segundaParcela);

  return {
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
    avos,
    bruto,
    primeiraParcela,
    prazoPrimeiraParcela: PRAZO_PRIMEIRA_PARCELA,
    segundaParcela,
    prazoSegundaParcela: PRAZO_SEGUNDA_PARCELA,
    modoPagamento,
  };
}
