import type { HubSlug } from "../hubs/types";

export type CalculatorIcon =
  | "briefcase"
  | "money"
  | "beach"
  | "calendar"
  | "clock"
  | "umbrella"
  | "percent";

export const CALCULADORAS_BASE = "/calculadoras";

export function calculadoraHref(slug: string): string {
  return `${CALCULADORAS_BASE}/${slug}`;
}

export type Calculadora = {
  slug: string;
  href: string;
  hub: HubSlug;
  title: string;
  description: string;
  metaDescription: string;
  popular: boolean;
  icon: CalculatorIcon;
};

export const calculadoras: Calculadora[] = [
  {
    slug: "rescisao",
    href: calculadoraHref("rescisao"),
    hub: "trabalho",
    title: "Rescisão",
    description: "Calcule quanto vai receber",
    metaDescription:
      "Calculadora de rescisão trabalhista: pedido de demissão, sem justa causa, com justa causa e acordo rescisório (art. 484-A).",
    popular: true,
    icon: "briefcase",
  },
  {
    slug: "salario-liquido",
    href: calculadoraHref("salario-liquido"),
    hub: "trabalho",
    title: "Salário líquido",
    description: "Descubra quanto sobra no contracheque",
    metaDescription:
      "Calculadora de salário líquido com descontos de INSS e IRRF.",
    popular: true,
    icon: "money",
  },
  {
    slug: "dias-trabalhados",
    href: calculadoraHref("dias-trabalhados"),
    hub: "trabalho",
    title: "Dias trabalhados",
    description: "Salário proporcional por dias no mês",
    metaDescription:
      "Calculadora de dias trabalhados: conte os dias no mês civil e estime o salário proporcional com INSS e IRRF.",
    popular: false,
    icon: "calendar",
  },
  {
    slug: "desconto-por-falta",
    href: calculadoraHref("desconto-por-falta"),
    hub: "trabalho",
    title: "Desconto por falta",
    description: "Estime o desconto de faltas injustificadas e DSR",
    metaDescription:
      "Calculadora de desconto por falta injustificada: valor do dia (salário ÷ 30), perda de DSR por semana e salário após desconto.",
    popular: false,
    icon: "calendar",
  },
  {
    slug: "ferias",
    href: calculadoraHref("ferias"),
    hub: "trabalho",
    title: "Férias",
    description: "Estime o valor das férias e do abono",
    metaDescription:
      "Calculadora de férias: valor proporcional, 1/3 constitucional e abono pecuniário.",
    popular: true,
    icon: "beach",
  },
  {
    slug: "decimo-terceiro",
    href: calculadoraHref("decimo-terceiro"),
    hub: "trabalho",
    title: "13º salário",
    description:
      "13º proporcional por avos; admitidos ou desligados no ano",
    metaDescription:
      "Calculadora de 13º salário proporcional: avos no ano civil para admitidos ou desligados no ano, 1ª e 2ª parcelas ou líquido no acerto, com INSS e IRRF.",
    popular: true,
    icon: "calendar",
  },
  {
    slug: "hora-extra",
    href: calculadoraHref("hora-extra"),
    hub: "trabalho",
    title: "Hora extra",
    description: "Calcule o valor das horas extras",
    metaDescription:
      "Calculadora de hora extra com adicional livre (piso de 50%), DSR, INSS e IRRF.",
    popular: false,
    icon: "clock",
  },
  {
    slug: "sobreaviso",
    href: calculadoraHref("sobreaviso"),
    hub: "trabalho",
    title: "Sobreaviso",
    description: "Estime sobreaviso e prontidão no mês",
    metaDescription:
      "Calculadora de sobreaviso e prontidão: 1/3 e 2/3 da hora normal (CLT art. 244, Súmula 428 TST), com INSS e IRRF.",
    popular: false,
    icon: "clock",
  },
  {
    slug: "dsr-sobre-comissoes",
    href: calculadoraHref("dsr-sobre-comissoes"),
    hub: "trabalho",
    title: "DSR sobre comissões",
    description: "Estime o repouso remunerado sobre comissões do mês",
    metaDescription:
      "Calculadora de DSR sobre comissões: média diária das comissões × domingos e feriados do mês (Súmula 27 TST).",
    popular: false,
    icon: "money",
  },
  {
    slug: "seguro-desemprego",
    href: calculadoraHref("seguro-desemprego"),
    hub: "trabalho",
    title: "Seguro-desemprego",
    description: "Estime parcelas e valor do benefício",
    metaDescription:
      "Calculadora de seguro-desemprego: parcelas e valor após demissão sem justa causa, com tabela MTE 2026.",
    popular: false,
    icon: "umbrella",
  },
  {
    slug: "ibs-cbs",
    href: calculadoraHref("ibs-cbs"),
    hub: "reforma-tributaria",
    title: "IBS e CBS",
    description: "Estime os tributos por fora sobre uma operação",
    metaDescription:
      "Calculadora de IBS e CBS 2026: alíquotas de teste da LC 214/2025 (0,9% CBS e 0,1% IBS) sobre o valor da operação.",
    popular: false,
    icon: "percent",
  },
];

export const calculadorasPopulares = calculadoras.filter(
  (calculadora) => calculadora.popular,
);

export function getCalculadoraBySlug(slug: string): Calculadora | undefined {
  return calculadoras.find((calculadora) => calculadora.slug === slug);
}

export function filterCalculadoras(query: string): Calculadora[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return calculadoras;

  return calculadoras.filter((calculadora) => {
    const haystack =
      `${calculadora.title} ${calculadora.description} ${calculadora.slug}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
