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
    title: "Validador de NF-e",
    description: "Confira se o XML está conforme o schema 4.00",
    metaDescription:
      "Validador de NF-e online: verifique XML de nota fiscal eletrônica (nfeProc, NFe ou enviNFe) contra o pacote PL_010_V1.30.",
  },
];

export function getUtilitarioBySlug(slug: string): Utilitario | undefined {
  return utilitarios.find((item) => item.slug === slug);
}

export function utilitariosPorHub(hub: HubSlug): Utilitario[] {
  return utilitarios.filter((item) => item.hub === hub);
}
