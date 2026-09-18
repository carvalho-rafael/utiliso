import {
  getCalculadoraBySlug,
  type Calculadora,
} from "./calculadoras/catalog";
import { getGuiaBySlug, type Guia } from "./guias/catalog";

const MAIS_UTILIZADAS_CALCULADORAS = ["rescisao", "ferias"] as const;

const MAIS_UTILIZADAS_GUIAS = ["primeira-parcela-decimo-terceiro"] as const;

export type MaisUtilizadaCategoria = "Calculadora" | "Guia";

export type MaisUtilizada = {
  categoria: MaisUtilizadaCategoria;
  slug: string;
  href: string;
  title: string;
  description: string;
};

export function getMaisUtilizadas(): MaisUtilizada[] {
  const calculadoras: MaisUtilizada[] = getMaisUtilizadasCalculadoras().map(
    (item) => ({
      categoria: "Calculadora",
      slug: item.slug,
      href: item.href,
      title: item.title,
      description: item.description,
    }),
  );
  const guias: MaisUtilizada[] = getMaisUtilizadasGuias().map((item) => ({
    categoria: "Guia",
    slug: item.slug,
    href: item.href,
    title: item.title,
    description: item.description,
  }));
  return [...calculadoras, ...guias];
}

export function getMaisUtilizadasCalculadoras(): Calculadora[] {
  return MAIS_UTILIZADAS_CALCULADORAS.map((slug) =>
    getCalculadoraBySlug(slug),
  ).filter((item): item is Calculadora => item !== undefined);
}

export function getMaisUtilizadasGuias(): Guia[] {
  return MAIS_UTILIZADAS_GUIAS.map((slug) => getGuiaBySlug(slug)).filter(
    (item): item is Guia => item !== undefined,
  );
}
