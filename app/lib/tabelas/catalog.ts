export const TABELAS_BASE = "/tabelas";

export function tabelaHref(slug: string): string {
  return `${TABELAS_BASE}/${slug}`;
}

export type Tabela = {
  slug: string;
  href: string;
  title: string;
  description: string;
  metaDescription: string;
};

export const tabelas: Tabela[] = [
  {
    slug: "inss",
    href: tabelaHref("inss"),
    title: "INSS",
    description: "Alíquotas progressivas e teto de contribuição",
    metaDescription:
      "Tabela INSS 2026: alíquotas de 7,5% a 14%, faixas salariais e teto de R$ 8.475,55 para empregados CLT.",
  },
  {
    slug: "irrf",
    href: tabelaHref("irrf"),
    title: "IRRF",
    description: "Faixas, alíquotas e parcela a deduzir na folha",
    metaDescription:
      "Tabela IRRF 2026: faixas de imposto de renda retido na fonte, alíquotas de 7,5% a 27,5% e desconto simplificado.",
  },
  {
    slug: "salario-minimo",
    href: tabelaHref("salario-minimo"),
    title: "Salário mínimo",
    description: "Valor nacional vigente e impacto na folha",
    metaDescription:
      "Salário mínimo 2026: R$ 1.621,00 nacional, vigência a partir de janeiro e relação com INSS e seguro-desemprego.",
  },
  {
    slug: "seguro-desemprego",
    href: tabelaHref("seguro-desemprego"),
    title: "Seguro-desemprego",
    description: "Piso, teto e faixas do benefício",
    metaDescription:
      "Tabela seguro-desemprego 2026: piso, teto, faixas de 80% e reajuste pelo INPC após demissão sem justa causa.",
  },
];

export function getTabelaBySlug(slug: string): Tabela | undefined {
  return tabelas.find((tabela) => tabela.slug === slug);
}
