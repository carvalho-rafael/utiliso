import type { MetadataRoute } from "next";
import {
  CALCULADORAS_BASE,
  calculadoras,
} from "./lib/calculadoras/catalog";
import { guias } from "./lib/guias/catalog";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    CALCULADORAS_BASE,
    ...calculadoras.map((calculadora) => calculadora.href),
    "/calculadoras/seguro-desemprego",
    "/guias",
    "/sobre",
    "/privacidade",
    ...guias.map((guia) => guia.href),
  ];

  return paginas.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
