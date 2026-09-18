import { getCalculadoraBySlug } from "./calculadoras/catalog";
import { getGuiaBySlug } from "./guias/catalog";
import { getTabelaBySlug } from "./tabelas/catalog";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") {
    return [];
  }

  const items: BreadcrumbItem[] = [{ href: "/", label: "Início" }];
  const parts = pathname.split("/").filter(Boolean);
  const [section, slug] = parts;

  switch (section) {
    case "calculadoras":
      if (parts.length === 1) {
        items.push({ label: "Calculadoras" });
      } else if (slug) {
        items.push({ href: "/calculadoras", label: "Calculadoras" });
        items.push({
          label: getCalculadoraBySlug(slug)?.title ?? slugToLabel(slug),
        });
      }
      break;
    case "guias":
      if (parts.length === 1) {
        items.push({ label: "Guias" });
      } else if (slug) {
        items.push({ href: "/guias", label: "Guias" });
        items.push({
          label: getGuiaBySlug(slug)?.title ?? slugToLabel(slug),
        });
      }
      break;
    case "tabelas":
      if (parts.length === 1) {
        items.push({ label: "Tabelas" });
      } else if (slug) {
        items.push({ href: "/tabelas", label: "Tabelas" });
        items.push({
          label: getTabelaBySlug(slug)?.title ?? slugToLabel(slug),
        });
      }
      break;
    case "sobre":
      items.push({ label: "Sobre" });
      break;
    case "privacidade":
      items.push({ label: "Privacidade" });
      break;
    case "trabalho":
      items.push({ label: "Trabalho" });
      break;
    default:
      break;
  }

  return items;
}

export function buildBreadcrumbListJsonLd(
  pathname: string,
  items: BreadcrumbItem[],
  siteUrl: string,
): Record<string, unknown> {
  const origin = siteUrl.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${origin}${item.href}` : `${origin}${pathname}`,
    })),
  };
}
