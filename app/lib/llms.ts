import {
  CALCULADORAS_BASE,
  calculadoras,
} from "./calculadoras/catalog";
import { guias } from "./guias/catalog";
import { hubs } from "./hubs/catalog";
import { SITE_URL } from "./site";
import { TABELAS_BASE, tabelas } from "./tabelas/catalog";
import { UTILITARIOS_BASE, utilitarios } from "./utilitarios/catalog";

type LinkItem = {
  title: string;
  href: string;
  note: string;
};

function absoluteUrl(href: string): string {
  return href === "/" ? `${SITE_URL}/` : `${SITE_URL}${href}`;
}

function markdownLink({ title, href, note }: LinkItem): string {
  const cleanNote = note.replace(/\s+/g, " ").trim();
  return `- [${title}](${absoluteUrl(href)}): ${cleanNote}`;
}

function section(title: string, items: LinkItem[]): string {
  return [`## ${title}`, "", ...items.map(markdownLink)].join("\n");
}

export function buildLlmsTxt(): string {
  const body = [
    "# Utiliso",
    "",
    "> Calculadoras, tabelas, guias e utilitários gratuitos em português para trabalho (CLT), reforma tributária (IBS e CBS) e ferramentas Web.",
    "",
    "Os resultados das calculadoras são estimativas e não substituem contador, advogado ou departamento pessoal. O cálculo das calculadoras roda no navegador. Tabelas e guias indicam a vigência da norma e a fonte oficial.",
    "",
    section(
      "Hubs",
      hubs.map((hub) => ({
        title: hub.title,
        href: hub.href,
        note: hub.metaDescription,
      })),
    ),
    "",
    section(
      "Calculadoras",
      calculadoras.map((calculadora) => ({
        title: calculadora.title,
        href: calculadora.href,
        note: calculadora.metaDescription,
      })),
    ),
    "",
    section(
      "Guias",
      guias.map((guia) => ({
        title: guia.title,
        href: guia.href,
        note: guia.metaDescription,
      })),
    ),
    "",
    section(
      "Tabelas",
      tabelas.map((tabela) => ({
        title: tabela.title,
        href: tabela.href,
        note: tabela.metaDescription,
      })),
    ),
    "",
    section(
      "Utilitários",
      utilitarios.map((utilitario) => ({
        title: utilitario.title,
        href: utilitario.href,
        note: utilitario.metaDescription,
      })),
    ),
    "",
    section("Optional", [
      {
        title: "Início",
        href: "/",
        note: "Página inicial com calculadoras, tabelas, guias e utilitários.",
      },
      {
        title: "Calculadoras",
        href: CALCULADORAS_BASE,
        note: "Índice das calculadoras.",
      },
      {
        title: "Guias",
        href: "/guias",
        note: "Índice dos guias.",
      },
      {
        title: "Tabelas",
        href: TABELAS_BASE,
        note: "Índice das tabelas oficiais.",
      },
      {
        title: "Utilitários",
        href: UTILITARIOS_BASE,
        note: "Índice dos utilitários.",
      },
      {
        title: "Sobre",
        href: "/sobre",
        note: "O que o Utiliso publica e como os cálculos funcionam.",
      },
      {
        title: "Privacidade",
        href: "/privacidade",
        note: "Cookies, Google Analytics e o XML enviado ao validador de NF-e.",
      },
      {
        title: "Metodologia",
        href: "/metodologia",
        note:
          "Fontes oficiais, testes das calculadoras, arredondamento, atualização de tabelas e limites dos resultados.",
      },
      {
        title: "Sitemap",
        href: "/sitemap.xml",
        note: "Todas as URLs indexáveis do site.",
      },
    ]),
    "",
  ];

  return body.join("\n");
}
