import type { HubSlug } from "../hubs/types";

export type GuiaIcon = "book" | "briefcase";

export type Guia = {
  slug: string;
  href: string;
  hub: HubSlug;
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
    hub: "trabalho",
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
    hub: "trabalho",
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
    slug: "ferias-proporcionais",
    href: "/guias/ferias-proporcionais",
    hub: "trabalho",
    title: "Férias proporcionais na rescisão",
    description: "Avos, 1/3, quando há direito e quando não",
    metaDescription:
      "Guia de férias proporcionais na rescisão: como contar os avos, o 1/3 constitucional, pedido de demissão, justa causa e a diferença para férias gozadas.",
    icon: "book",
    vigencia: "conforme a CLT em vigor",
    atualizadoEm: "2026-09-14",
    fonte:
      "CLT arts. 130, 146 e 147; CF art. 7º, XVII; Súmula 171 do TST; Lei 8.212/1991, art. 28, § 9º",
  },
  {
    slug: "primeira-parcela-decimo-terceiro",
    href: "/guias/primeira-parcela-decimo-terceiro",
    hub: "trabalho",
    title: "Primeira parcela do 13º salário",
    description: "Prazo, valor, descontos e adiantamento nas férias",
    metaDescription:
      "Guia da 1ª parcela do 13º salário: prazo de fevereiro a novembro, metade do 13º sem INSS nem IRRF, pedido com as férias e diferença para a 2ª parcela.",
    icon: "book",
    vigencia: "conforme as Leis 4.090/1962 e 4.749/1965",
    atualizadoEm: "2026-09-15",
    fonte:
      "Lei 4.090/1962; Lei 4.749/1965; Decreto 57.155/1965; CLT art. 145",
  },
  {
    slug: "segunda-parcela-decimo-terceiro",
    href: "/guias/segunda-parcela-decimo-terceiro",
    hub: "trabalho",
    title: "Segunda parcela do 13º salário",
    description: "Prazo, descontos de INSS e IRRF e o valor líquido",
    metaDescription:
      "Guia da 2ª parcela do 13º salário: prazo até 20 de dezembro, restante menos INSS e IRRF, diferença para a 1ª parcela e para a rescisão.",
    icon: "book",
    vigencia: "conforme as Leis 4.090/1962 e 4.749/1965",
    atualizadoEm: "2026-09-15",
    fonte:
      "Lei 4.090/1962; Lei 4.749/1965; Decreto 57.155/1965; Portaria Interministerial MPS/MF nº 13/2026; Lei 15.270/2025",
  },
  {
    slug: "pedido-de-demissao-o-que-recebo",
    href: "/guias/pedido-de-demissao-o-que-recebo",
    hub: "trabalho",
    title: "Pedido de demissão: o que recebo?",
    description: "Verbas, aviso, FGTS e o que não entra",
    metaDescription:
      "Guia do pedido de demissão: saldo, 13º e férias proporcionais, aviso de 30 dias, FGTS sem saque e sem seguro-desemprego.",
    icon: "briefcase",
    vigencia: "conforme a CLT em vigor",
    atualizadoEm: "2026-09-15",
    fonte:
      "CLT arts. 146, 147, 477 e 487; Súmula 171 do TST; Lei 4.090/1962; Lei 8.036/1990; Lei 7.998/1990",
  },
  {
    slug: "pedi-demissao-preciso-cumprir-aviso",
    href: "/guias/pedi-demissao-preciso-cumprir-aviso",
    hub: "trabalho",
    title: "Pedi demissão: preciso cumprir aviso?",
    description: "30 dias, dispensa pela empresa e desconto se não cumprir",
    metaDescription:
      "Guia do aviso no pedido de demissão: 30 dias, se a empresa pode dispensar, desconto se não cumprir e diferença para a demissão sem justa causa.",
    icon: "briefcase",
    vigencia: "conforme a CLT em vigor",
    atualizadoEm: "2026-09-15",
    fonte: "CLT arts. 477, 487 e 488; Lei 12.506/2011",
  },
  {
    slug: "demissao-sem-justa-causa-o-que-recebo",
    href: "/guias/demissao-sem-justa-causa-o-que-recebo",
    hub: "trabalho",
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
  {
    slug: "ibs-cbs-nfe-2026",
    href: "/guias/ibs-cbs-nfe-2026",
    hub: "reforma-tributaria",
    title: "Como IBS e CBS aparecem na NF-e em 2026",
    description: "Destaque informativo, XML e diferença para o total da nota",
    metaDescription:
      "Guia IBS e CBS na NF-e 2026: destaque informativo na transição, grupo por item na NT 2025.002, dispensa de recolhimento e diferença para a calculadora por fora.",
    icon: "book",
    vigencia:
      "fatos geradores de 1º de janeiro a 31 de dezembro de 2026",
    atualizadoEm: "2026-09-18",
    fonte:
      "Lei Complementar nº 214/2025 (arts. 343, 346 e 348); Nota Técnica 2025.002-RTC (NF-e/NFC-e)",
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((guia) => guia.slug === slug);
}
