"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function navLinkClass(isActive: boolean) {
  return isActive
    ? "text-sm font-medium text-accent"
    : "text-sm font-medium text-muted transition-colors hover:text-foreground";
}

const separatorClass = "hidden text-muted md:inline";

export function SiteNav() {
  const pathname = usePathname();
  const isCalculadoras =
    pathname === "/calculadoras" || pathname.startsWith("/calculadoras/");
  const isGuias = pathname === "/guias" || pathname.startsWith("/guias/");
  const isUtilitarios =
    pathname === "/utilitarios" || pathname.startsWith("/utilitarios/");
  const isTrabalho =
    pathname === "/trabalho" || pathname.startsWith("/trabalho/");
  const isReformaTributaria =
    pathname === "/reforma-tributaria" ||
    pathname.startsWith("/reforma-tributaria/");
  const isWeb = pathname === "/web" || pathname.startsWith("/web/");
  const isSobre = pathname === "/sobre";

  return (
    <nav
      aria-label="Principal"
      className="flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:gap-x-3 md:flex-nowrap"
    >
      <Link href="/trabalho" className={navLinkClass(isTrabalho)}>
        Trabalho
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link
        href="/reforma-tributaria"
        className={navLinkClass(isReformaTributaria)}
      >
        Reforma
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link href="/web" className={navLinkClass(isWeb)}>
        Web
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link href="/calculadoras" className={navLinkClass(isCalculadoras)}>
        Calculadoras
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link href="/guias" className={navLinkClass(isGuias)}>
        Guias
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link href="/utilitarios" className={navLinkClass(isUtilitarios)}>
        Utilitários
      </Link>
      <span className={separatorClass} aria-hidden="true">
        |
      </span>
      <Link href="/sobre" className={navLinkClass(isSobre)}>
        Sobre
      </Link>
    </nav>
  );
}
