import type { HubSlug } from "../hubs/types";

export const UTILITARIOS_BASE = "/utilitarios";

export function utilitarioHref(slug: string): string {
  return `${UTILITARIOS_BASE}/${slug}`;
}

export type Utilitario = {
  slug: string;
  href: string;
  hub: HubSlug;
  title: string;
  description: string;
  metaDescription: string;
};

export const utilitarios: Utilitario[] = [
  {
    slug: "validador-nfe",
    href: utilitarioHref("validador-nfe"),
    hub: "reforma-tributaria",
    title: "Validador XML NF-e grátis - Schema 4.00",
    description: "Valide gratuitamente o XML da Nota Fiscal Eletrônica contra o schema 4.00 modelo 55 e identifique erros de estrutura antes do envio.",
    metaDescription:
      "Validador de XML NF-e online: valide gratuitamente o XML da Nota Fiscal Eletrônica contra o schema 4.00 modelo 55 e identifique erros de estrutura antes do envio.",
  },
  {
    slug: "consulta-cclasstrib-cst",
    href: utilitarioHref("consulta-cclasstrib-cst"),
    hub: "reforma-tributaria",
    title: "Consulta cClassTrib e CST (IBS/CBS)",
    description:
      "Busque códigos de classificação tributária e CST do IBS e da CBS na tabela do Informe Técnico 2025.002.",
    metaDescription:
      "Consulta cClassTrib e CST do IBS e CBS: busque códigos da tabela oficial do Informe Técnico 2025.002 v.1.60 para NF-e na reforma tributária.",
  },
  {
    slug: "criar-favicon",
    href: utilitarioHref("criar-favicon"),
    hub: "web",
    title: "Criar favicon a partir de PNG",
    description:
      "Gere favicon.ico, ícones 16–512 px e apple-touch-icon a partir de uma imagem PNG — download de cada arquivo.",
    metaDescription:
      "Gerador de favicon online: envie um PNG e baixe favicon.ico, favicon-32x32, apple-touch-icon e ícones Android Chrome, tudo no navegador.",
  },
];

export function getUtilitarioBySlug(slug: string): Utilitario | undefined {
  return utilitarios.find((item) => item.slug === slug);
}

export function utilitariosPorHub(hub: HubSlug): Utilitario[] {
  return utilitarios.filter((item) => item.hub === hub);
}
