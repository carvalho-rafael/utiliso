export type GuiaIcon = "book" | "briefcase";

export type Guia = {
  slug: string;
  href: string;
  title: string;
  description: string;
  metaDescription: string;
  icon: GuiaIcon;
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
  },
  {
    slug: "calculo-inss",
    href: "/guias/calculo-inss",
    title: "Cálculo do INSS",
    description: "Tabela progressiva e como calcular o desconto",
    metaDescription:
      "Guia do cálculo do INSS na folha: tabela progressiva 2026, alíquotas de 7,5% a 14%, teto e exemplo passo a passo.",
    icon: "book",
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((guia) => guia.slug === slug);
}
