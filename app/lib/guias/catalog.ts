export type GuiaIcon = "book" | "briefcase";

export type Guia = {
  slug: string;
  href: string;
  title: string;
  description: string;
  metaDescription: string;
  icon: GuiaIcon;
  /** Quando a tabela/regra oficial citada no guia passou a valer. */
  vigencia: string;
  /**
   * Data em que o guia foi revisado (ISO YYYY-MM-DD).
   * Atualizar só quando conteúdo, fonte ou valores mudarem — não a cada deploy.
   */
  atualizadoEm: string;
  /** Ato/órgão oficial de referência. */
  fonte: string;
};

export const guias: Guia[] = [
  {
    slug: "seguro-desemprego",
    href: "/guias/seguro-desemprego",
    title: "Seguro-desemprego",
    description: "Quem tem direito, parcelas e como solicitar",
    metaDescription:
      "Guia de seguro-desemprego: requisitos, parcelas, valores, prazos e como pedir o benefício após a demissão sem justa causa.",
    icon: "book",
    vigencia: "a partir de 11 de janeiro de 2026 (tabela MTE)",
    atualizadoEm: "2026-09-12",
    fonte:
      "Lei 7.998/1990; tabela MTE/CODEFAT reajustada pelo INPC; Resolução CODEFAT nº 957/2022",
  },
  {
    slug: "calculo-inss",
    href: "/guias/calculo-inss",
    title: "Cálculo do INSS",
    description: "Tabela progressiva e como calcular o desconto",
    metaDescription:
      "Guia do cálculo do INSS na folha: tabela progressiva 2026, alíquotas de 7,5% a 14%, teto e exemplo passo a passo.",
    icon: "book",
    vigencia: "a partir de janeiro de 2026",
    atualizadoEm: "2026-09-12",
    fonte: "Portaria Interministerial MPS/MF nº 13/2026",
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((guia) => guia.slug === slug);
}
