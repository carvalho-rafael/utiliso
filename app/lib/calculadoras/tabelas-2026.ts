/** Tabelas INSS e IRRF vigentes a partir de janeiro/2026. */

/** Portaria Interministerial MPS/MF nº 13/2026 — empregado, doméstico e avulso. */
export const INSS_FAIXAS_EMPREGADO = [
  { limite: 1621, aliquota: 0.075 },
  { limite: 2902.84, aliquota: 0.09 },
  { limite: 4354.27, aliquota: 0.12 },
  { limite: 8475.55, aliquota: 0.14 },
] as const;

export const INSS_TETO_EMPREGADO = 8475.55;

const INSS_FAIXAS = INSS_FAIXAS_EMPREGADO;

export type FaixaINSSTabela = {
  de: number;
  ate: number;
  aliquota: number;
};

/** Faixas formatadas para exibição em tabelas e guias. */
export function listarFaixasINSSTabela(): FaixaINSSTabela[] {
  let anterior = 0;
  return INSS_FAIXAS_EMPREGADO.map((faixa) => {
    const de = anterior === 0 ? 0 : round2(anterior + 0.01);
    const row = { de, ate: faixa.limite, aliquota: faixa.aliquota };
    anterior = faixa.limite;
    return row;
  });
}

const IRRF_FAIXAS = [
  { limite: 2428.8, aliquota: 0, deducao: 0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { limite: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { limite: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { limite: Infinity, aliquota: 0.275, deducao: 908.73 },
] as const;

export const DESCONTO_SIMPLIFICADO_IRRF = 607.2;
export const DEDUCAO_DEPENDENTE_IRRF = 189.59;

export function calcularINSS(base: number): number {
  if (base <= 0) return 0;

  let restante = base;
  let anterior = 0;
  let total = 0;

  for (const faixa of INSS_FAIXAS) {
    const faixaBase = Math.min(restante, faixa.limite - anterior);
    if (faixaBase <= 0) break;
    total += faixaBase * faixa.aliquota;
    restante -= faixaBase;
    anterior = faixa.limite;
  }

  return round2(total);
}

/**
 * IRRF mensal (ou exclusivo do 13º).
 * `rendimentoTributavel` = bruto da verba (redutor Lei 15.270).
 * `inss` = INSS já calculado sobre essa mesma verba.
 * Usa o maior entre deduções legais (INSS + dependentes) e o desconto simplificado.
 */
export function calcularIRRF(
  rendimentoTributavel: number,
  inss = 0,
  dependentes = 0,
): number {
  if (rendimentoTributavel <= 0) return 0;

  const deducoesLegais = inss + dependentes * DEDUCAO_DEPENDENTE_IRRF;
  const deducaoEfetiva = Math.max(deducoesLegais, DESCONTO_SIMPLIFICADO_IRRF);
  const base = Math.max(0, rendimentoTributavel - deducaoEfetiva);
  if (base <= IRRF_FAIXAS[0].limite) return 0;

  let imposto = 0;
  for (const faixa of IRRF_FAIXAS) {
    if (base <= faixa.limite) {
      imposto = base * faixa.aliquota - faixa.deducao;
      break;
    }
  }

  imposto = Math.max(0, imposto);

  let reducao = 0;
  if (rendimentoTributavel <= 5000) {
    reducao = Math.min(312.89, imposto);
  } else if (rendimentoTributavel <= 7350) {
    reducao = Math.max(0, 978.62 - 0.133145 * rendimentoTributavel);
    reducao = Math.min(reducao, imposto);
  }

  return round2(Math.max(0, imposto - reducao));
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export const TABELAS_ANO = 2026;
