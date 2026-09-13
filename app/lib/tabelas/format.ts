import { formatarMoeda } from "../calculadoras/format";

export function formatarAliquota(aliquota: number): string {
  if (aliquota === 0) return "Isento";

  return `${(aliquota * 100).toLocaleString("pt-BR", {
    minimumFractionDigits: aliquota * 100 % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })}%`;
}

export function formatarFaixa(de: number, ate: number | null): string {
  if (de === 0 && ate !== null) {
    return `Até ${formatarMoeda(ate)}`;
  }
  if (ate === null) {
    return `Acima de ${formatarMoeda(de)}`;
  }
  return `De ${formatarMoeda(de)} a ${formatarMoeda(ate)}`;
}

/** Formata ISO YYYY-MM-DD para exibição em pt-BR (ex.: 12 de setembro de 2026). */
export function formatarDataAtualizacao(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
