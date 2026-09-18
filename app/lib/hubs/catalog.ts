import { calculadoras } from "../calculadoras/catalog";
import { guias } from "../guias/catalog";
import { tabelas } from "../tabelas/catalog";
import type { HubSlug } from "./types";

export type Hub = {
  slug: HubSlug;
  href: string;
  title: string;
  description: string;
  metaDescription: string;
};

export const hubs: Hub[] = [
  {
    slug: "trabalho",
    href: "/trabalho",
    title: "Trabalho",
    description:
      "Calculadoras, guias e tabelas para salário, férias, rescisão, 13º e direitos trabalhistas.",
    metaDescription:
      "Hub de trabalho CLT: calculadoras de rescisão e salário líquido, guias de demissão e férias, tabelas de INSS e IRRF 2026.",
  },
];

export function getHubBySlug(slug: HubSlug): Hub | undefined {
  return hubs.find((hub) => hub.slug === slug);
}

export function calculadorasPorHub(slug: HubSlug) {
  return calculadoras.filter((item) => item.hub === slug);
}

export function guiasPorHub(slug: HubSlug) {
  return guias.filter((item) => item.hub === slug);
}

export function tabelasPorHub(slug: HubSlug) {
  return tabelas.filter((item) => item.hub === slug);
}
