import type { MetadataRoute } from "next";
import { guias } from "./lib/guias/catalog";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    "/guias",
    "/sobre",
    "/privacidade",
    "/rescisao",
    "/salario-liquido",
    "/ferias",
    ...guias.map((guia) => guia.href),
  ];

  return paginas.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
