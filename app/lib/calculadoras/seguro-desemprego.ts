import type { MotivoRescisao } from "./rescisao";
import { round2 } from "./tabelas-2026";

/** Tabela MTE/CODEFAT vigente a partir de 11/01/2026 (INPC 3,90%). Lei 7.998/1990. */
export const SEGURO_DESEMPREGO_ANO = 2026;
export const SEGURO_PISO = 1621;
export const SEGURO_TETO = 2518.65;
export const SEGURO_FAIXA1_LIMITE = 2222.17;
export const SEGURO_FAIXA2_LIMITE = 3703.99;
export const SEGURO_FAIXA2_BASE = 1777.74;

export type SolicitacaoSeguro = 1 | 2 | 3;

export type SeguroDesempregoInput = {
  motivo: MotivoRescisao;
  solicitacao: SolicitacaoSeguro;
  mesesUltimos36: number;
  salarios: number[];
};

export type SeguroDesempregoResultado = {
  elegivel: boolean;
  motivoInelegibilidade?: string;
  mediaSalarial: number;
  valorParcela: number;
  numeroParcelas: number;
  totalEstimado: number;
  tabelasAno: number;
};

const MOTIVO_INELEGIVEL: Record<
  Exclude<MotivoRescisao, "sem_justa_causa">,
  string
> = {
  pedido_demissao:
    "No pedido de demissão não há direito ao seguro-desemprego. O benefício é destinado a quem foi dispensado sem justa causa.",
  com_justa_causa:
    "Na demissão por justa causa não há direito ao seguro-desemprego.",
  acordo:
    "No acordo rescisório (art. 484-A) não há direito ao seguro-desemprego.",
};

function minimoMesesSolicitacao(solicitacao: SolicitacaoSeguro): number {
  switch (solicitacao) {
    case 1:
      return 12;
    case 2:
      return 9;
    case 3:
      return 6;
  }
}

function labelSolicitacao(solicitacao: SolicitacaoSeguro): string {
  switch (solicitacao) {
    case 1:
      return "primeira";
    case 2:
      return "segunda";
    case 3:
      return "terceira ou mais";
  }
}

export function calcularMediaSalarial(salarios: number[]): number {
  const validos = salarios.filter((salario) => salario > 0);
  if (validos.length === 0) return 0;
  return round2(
    validos.reduce((total, salario) => total + salario, 0) / validos.length,
  );
}

export function calcularValorParcela(media: number): number {
  if (media <= 0) return 0;

  let parcela: number;
  if (media <= SEGURO_FAIXA1_LIMITE) {
    parcela = media * 0.8;
  } else if (media <= SEGURO_FAIXA2_LIMITE) {
    parcela =
      SEGURO_FAIXA2_BASE + (media - SEGURO_FAIXA1_LIMITE) * 0.5;
  } else {
    parcela = SEGURO_TETO;
  }

  return round2(Math.min(SEGURO_TETO, Math.max(SEGURO_PISO, parcela)));
}

export function calcularNumeroParcelas(
  solicitacao: SolicitacaoSeguro,
  meses: number,
): { parcelas: number; inelegivel: boolean; motivo?: string } {
  const minimo = minimoMesesSolicitacao(solicitacao);

  if (meses < minimo) {
    return {
      parcelas: 0,
      inelegivel: true,
      motivo: `Para a ${labelSolicitacao(solicitacao)} solicitação, é necessário comprovar pelo menos ${minimo} meses de trabalho com carteira assinada nos últimos 36 meses antes da dispensa.`,
    };
  }

  if (meses >= 24) {
    return { parcelas: 5, inelegivel: false };
  }
  if (meses >= 12) {
    return { parcelas: 4, inelegivel: false };
  }
  return { parcelas: 3, inelegivel: false };
}

export function calcularSeguroDesemprego(
  input: SeguroDesempregoInput,
): SeguroDesempregoResultado {
  const { motivo, solicitacao, mesesUltimos36, salarios } = input;

  if (motivo !== "sem_justa_causa") {
    return {
      elegivel: false,
      motivoInelegibilidade: MOTIVO_INELEGIVEL[motivo],
      mediaSalarial: 0,
      valorParcela: 0,
      numeroParcelas: 0,
      totalEstimado: 0,
      tabelasAno: SEGURO_DESEMPREGO_ANO,
    };
  }

  const mediaSalarial = calcularMediaSalarial(salarios);
  if (mediaSalarial <= 0) {
    return {
      elegivel: false,
      motivoInelegibilidade: "Informe ao menos um salário válido.",
      mediaSalarial: 0,
      valorParcela: 0,
      numeroParcelas: 0,
      totalEstimado: 0,
      tabelasAno: SEGURO_DESEMPREGO_ANO,
    };
  }

  const { parcelas, inelegivel, motivo: motivoVinculo } =
    calcularNumeroParcelas(solicitacao, mesesUltimos36);

  if (inelegivel) {
    return {
      elegivel: false,
      motivoInelegibilidade: motivoVinculo,
      mediaSalarial,
      valorParcela: 0,
      numeroParcelas: 0,
      totalEstimado: 0,
      tabelasAno: SEGURO_DESEMPREGO_ANO,
    };
  }

  const valorParcela = calcularValorParcela(mediaSalarial);

  return {
    elegivel: true,
    mediaSalarial,
    valorParcela,
    numeroParcelas: parcelas,
    totalEstimado: round2(valorParcela * parcelas),
    tabelasAno: SEGURO_DESEMPREGO_ANO,
  };
}
