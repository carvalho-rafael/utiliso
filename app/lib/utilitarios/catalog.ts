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
];

export function getUtilitarioBySlug(slug: string): Utilitario | undefined {
  return utilitarios.find((item) => item.slug === slug);
}

export function utilitariosPorHub(hub: HubSlug): Utilitario[] {
  return utilitarios.filter((item) => item.hub === hub);
}
