import type { HubSlug } from "../hubs/types";

export const TABELAS_BASE = "/tabelas";

export function tabelaHref(slug: string): string {
  return `${TABELAS_BASE}/${slug}`;
}

export type Tabela = {
  slug: string;
  href: string;
  hub: HubSlug;
  title: string;
  description: string;
  metaDescription: string;
  /** Quando a tabela oficial passou a valer (texto para exibição). */
  vigencia: string;
  /**
   * Data em que a página foi revisada (ISO YYYY-MM-DD).
   * Atualizar só quando números, fonte ou texto relevante mudarem — não a cada deploy.
   */
  atualizadoEm: string;
  /** Ato oficial / órgão (ex.: Portaria, Receita, MTE). */
  fonte: string;
};

export const tabelas: Tabela[] = [
  {
    slug: "inss",
    href: tabelaHref("inss"),
    hub: "trabalho",
    title: "INSS",
    description: "Alíquotas progressivas e teto de contribuição",
    metaDescription:
      "Tabela INSS 2026: alíquotas de 7,5% a 14%, faixas salariais e teto de R$ 8.475,55 para empregados CLT.",
    vigencia: "a partir de janeiro de 2026",
    atualizadoEm: "2026-09-12",
    fonte: "Portaria Interministerial MPS/MF nº 13/2026",
  },
  {
    slug: "irrf",
    href: tabelaHref("irrf"),
    hub: "trabalho",
    title: "IRRF",
    description: "Faixas, alíquotas e parcela a deduzir na folha",
    metaDescription:
      "Tabela IRRF 2026: faixas de imposto de renda retido na fonte, alíquotas de 7,5% a 27,5% e desconto simplificado.",
    vigencia: "a partir de janeiro de 2026",
    atualizadoEm: "2026-09-12",
    fonte: "Tabela mensal da Receita Federal; redutor da Lei 15.270/2025",
  },
  {
    slug: "salario-minimo",
    href: tabelaHref("salario-minimo"),
    hub: "trabalho",
    title: "Salário mínimo",
    description: "Valor nacional vigente e impacto na folha",
    metaDescription:
      "Salário mínimo 2026: R$ 1.621,00 nacional, vigência a partir de janeiro e relação com INSS e seguro-desemprego.",
    vigencia: "a partir de 1º de janeiro de 2026",
    atualizadoEm: "2026-09-12",
    fonte: "Salário mínimo nacional fixado para 2026",
  },
  {
    slug: "seguro-desemprego",
    href: tabelaHref("seguro-desemprego"),
    hub: "trabalho",
    title: "Seguro-desemprego",
    description: "Piso, teto e faixas do benefício",
    metaDescription:
      "Tabela seguro-desemprego 2026: piso, teto, faixas de 80% e reajuste pelo INPC após demissão sem justa causa.",
    vigencia: "a partir de 11 de janeiro de 2026",
    atualizadoEm: "2026-09-12",
    fonte:
      "Tabela MTE/CODEFAT (Lei 7.998/1990), reajustada pelo INPC; Resolução CODEFAT nº 957/2022",
  },
  {
    slug: "ibs-cbs",
    href: tabelaHref("ibs-cbs"),
    hub: "reforma-tributaria",
    title: "IBS e CBS",
    description: "Alíquotas de teste de 2026 na reforma do consumo",
    metaDescription:
      "Tabela IBS e CBS 2026: alíquotas de teste de 0,9% (CBS) e 0,1% (IBS estadual) para fatos geradores em 2026, LC 214/2025.",
    vigencia:
      "fatos geradores de 1º de janeiro a 31 de dezembro de 2026",
    atualizadoEm: "2026-09-18",
    fonte: "Lei Complementar nº 214/2025 (arts. 343 e 346)",
  },
];

export function getTabelaBySlug(slug: string): Tabela | undefined {
  return tabelas.find((tabela) => tabela.slug === slug);
}
