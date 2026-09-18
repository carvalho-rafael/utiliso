import type { MetadataRoute } from "next";
import {
  CALCULADORAS_BASE,
  calculadoras,
} from "./lib/calculadoras/catalog";
import { guias } from "./lib/guias/catalog";
import { TABELAS_BASE, tabelas } from "./lib/tabelas/catalog";
import { SITE_URL } from "./lib/site";
import { hubs } from "./lib/hubs/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    ...hubs.map((hub) => hub.href),
    CALCULADORAS_BASE,
    ...calculadoras.map((calculadora) => calculadora.href),
    "/guias",
    TABELAS_BASE,
    "/sobre",
    "/privacidade",
    ...guias.map((guia) => guia.href),
    ...tabelas.map((tabela) => tabela.href),
  ];

  return paginas.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
