export type CalculatorIcon =
  | "briefcase"
  | "money"
  | "beach"
  | "calendar"
  | "clock"
  | "umbrella";

export const CALCULADORAS_BASE = "/calculadoras";

export function calculadoraHref(slug: string): string {
  return `${CALCULADORAS_BASE}/${slug}`;
}

export type Calculadora = {
  slug: string;
  href: string;
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
    title: "Salário líquido",
    description: "Descubra quanto sobra no contracheque",
    metaDescription:
      "Calculadora de salário líquido com descontos de INSS e IRRF.",
    popular: true,
    icon: "money",
  },
  {
    slug: "ferias",
    href: calculadoraHref("ferias"),
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
    title: "13º salário",
    description: "Calcule o décimo terceiro proporcional",
    metaDescription:
      "Calculadora de 13º salário: valor integral e proporcional a partir da data de admissão.",
    popular: true,
    icon: "calendar",
  },
  {
    slug: "hora-extra",
    href: calculadoraHref("hora-extra"),
    title: "Hora extra",
    description: "Calcule o valor das horas extras",
    metaDescription:
      "Calculadora de hora extra com adicional livre (piso de 50%), DSR, INSS e IRRF.",
    popular: false,
    icon: "clock",
  },
  {
    slug: "seguro-desemprego",
    href: calculadoraHref("seguro-desemprego"),
    title: "Seguro-desemprego",
    description: "Estime parcelas e valor do benefício",
    metaDescription:
      "Calculadora de seguro-desemprego: parcelas e valor após demissão sem justa causa, com tabela MTE 2026.",
    popular: false,
    icon: "umbrella",
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
