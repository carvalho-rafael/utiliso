import { formatarAliquota } from "../tabelas/format";
import { round2 } from "./tabelas-2026";

/** Fatos geradores em 2026 — alíquotas fixadas na LC 214/2025. */
export const IBS_CBS_ANO = 2026;

/** Art. 346, LC 214/2025 — CBS de teste em 2026. */
export const ALIQUOTA_CBS_2026 = 0.009;

/** Art. 343, LC 214/2025 — IBS estadual de teste em 2026. */
export const ALIQUOTA_IBS_UF_2026 = 0.001;

/** IBS municipal de teste em 2026. */
export const ALIQUOTA_IBS_MUN_2026 = 0;

export type RegimeIbsCbs = "integral" | "reducao60" | "reducao30" | "zero";

export function fatorRegimeIbsCbs(regime: RegimeIbsCbs): number {
  switch (regime) {
    case "integral":
      return 1;
    case "reducao60":
      return 0.6;
    case "reducao30":
      return 0.3;
    case "zero":
      return 0;
  }
}

export type AliquotasIbsCbs = {
  aliquotaCbs: number;
  aliquotaIbsUf: number;
  aliquotaIbsMun: number;
};

export function aliquotasEfetivasParaRegime(
  regime: RegimeIbsCbs,
): AliquotasIbsCbs {
  const fator = fatorRegimeIbsCbs(regime);
  return {
    aliquotaCbs: ALIQUOTA_CBS_2026 * fator,
    aliquotaIbsUf: ALIQUOTA_IBS_UF_2026 * fator,
    aliquotaIbsMun: ALIQUOTA_IBS_MUN_2026 * fator,
  };
}

/** Exibe 0% em vez de “Isento” para alíquota zero de tributo. */
export function formatarAliquotaTributo(aliquota: number): string {
  if (aliquota === 0) return "0%";
  return formatarAliquota(aliquota);
}

export type LinhaIbsCbs = {
  label: string;
  valor: number;
  aliquota: number;
};

export type IbsCbsInput = {
  valorOperacao: number;
  regime: RegimeIbsCbs;
};

export type IbsCbsResultado = {
  ano: number;
  regime: RegimeIbsCbs;
  valorOperacao: number;
  cbs: number;
  ibsUf: number;
  ibsMun: number;
  tributos: LinhaIbsCbs[];
  totalTributos: number;
  totalComTributos: number;
  aliquotaCbs: number;
  aliquotaIbsUf: number;
  aliquotaIbsMun: number;
};

export function calcularIbsCbs(input: IbsCbsInput): IbsCbsResultado {
  const { aliquotaCbs, aliquotaIbsUf, aliquotaIbsMun } =
    aliquotasEfetivasParaRegime(input.regime);

  const cbs = round2(input.valorOperacao * aliquotaCbs);
  const ibsUf = round2(input.valorOperacao * aliquotaIbsUf);
  const ibsMun = round2(input.valorOperacao * aliquotaIbsMun);
  const totalTributos = round2(cbs + ibsUf + ibsMun);

  const tributos: LinhaIbsCbs[] = [
    { label: "CBS", valor: cbs, aliquota: aliquotaCbs },
    { label: "IBS estadual (UF)", valor: ibsUf, aliquota: aliquotaIbsUf },
    { label: "IBS municipal", valor: ibsMun, aliquota: aliquotaIbsMun },
  ];

  return {
    ano: IBS_CBS_ANO,
    regime: input.regime,
    valorOperacao: input.valorOperacao,
    cbs,
    ibsUf,
    ibsMun,
    tributos,
    totalTributos,
    totalComTributos: round2(input.valorOperacao + totalTributos),
    aliquotaCbs,
    aliquotaIbsUf,
    aliquotaIbsMun,
  };
}
