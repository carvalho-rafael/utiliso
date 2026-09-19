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
  {
    slug: "reforma-tributaria",
    href: "/reforma-tributaria",
    title: "Reforma tributária",
    description:
      "Calculadoras, guias e tabelas sobre IBS, CBS e a transição da reforma do consumo (LC 214/2025).",
    metaDescription:
      "Hub da reforma tributária: calculadora de IBS e CBS, guia da NF-e 2026, alíquotas de teste e tabelas oficiais.",
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
