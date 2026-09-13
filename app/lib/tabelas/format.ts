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
