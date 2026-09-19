import type { MetadataRoute } from "next";
import {
  CALCULADORAS_BASE,
  calculadoras,
} from "./lib/calculadoras/catalog";
import {
  UTILITARIOS_BASE,
  utilitarios,
} from "./lib/utilitarios/catalog";
import { guias } from "./lib/guias/catalog";
import { TABELAS_BASE, tabelas } from "./lib/tabelas/catalog";
import { SITE_URL } from "./lib/site";
import { hubs } from "./lib/hubs/catalog";

const lastModifiedByPath = new Map<string, Date>(
  [...guias, ...tabelas].map((item) => [item.href, new Date(item.atualizadoEm)]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    ...hubs.map((hub) => hub.href),
    CALCULADORAS_BASE,
    ...calculadoras.map((calculadora) => calculadora.href),
    UTILITARIOS_BASE,
    ...utilitarios.map((utilitario) => utilitario.href),
    "/guias",
    TABELAS_BASE,
    "/sobre",
    "/privacidade",
    ...guias.map((guia) => guia.href),
    ...tabelas.map((tabela) => tabela.href),
  ];

  return paginas.map((path) => {
    const lastModified = lastModifiedByPath.get(path);
    return {
      url: `${SITE_URL}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    };
  });
}
