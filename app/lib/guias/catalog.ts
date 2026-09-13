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
  {
    slug: "pedido-de-demissao-o-que-recebo",
    href: "/guias/pedido-de-demissao-o-que-recebo",
    title: "Pedido de demissão: o que recebo?",
    description: "Verbas, aviso, FGTS e o que não entra",
    metaDescription:
      "Guia do pedido de demissão: saldo, 13º e férias proporcionais, aviso de 30 dias, FGTS sem saque e sem seguro-desemprego.",
    icon: "briefcase",
    vigencia: "conforme a CLT em vigor",
    atualizadoEm: "2026-09-12",
    fonte:
      "CLT arts. 146, 147, 477 e 487; Súmula 171 do TST; Lei 4.090/1962; Lei 8.036/1990; Lei 7.998/1990",
  },
  {
    slug: "demissao-sem-justa-causa-o-que-recebo",
    href: "/guias/demissao-sem-justa-causa-o-que-recebo",
    title: "Demissão sem justa causa: o que recebo?",
    description: "Verbas, aviso, FGTS, multa de 40% e seguro",
    metaDescription:
      "Guia da demissão sem justa causa: saldo, 13º, férias, aviso prévio, multa de 40% do FGTS, saque e seguro-desemprego.",
    icon: "briefcase",
    vigencia: "conforme a CLT em vigor",
    atualizadoEm: "2026-09-12",
    fonte:
      "CLT arts. 146, 147, 477 e 487; Lei 12.506/2011; Súmula 171 do TST; Lei 4.090/1962; Lei 8.036/1990, art. 18; Lei 7.998/1990",
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((guia) => guia.slug === slug);
}
