"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function navLinkClass(isActive: boolean) {
  return isActive
    ? "text-sm font-medium text-accent"
    : "text-sm font-medium text-muted transition-colors hover:text-foreground";
}

export function SiteNav() {
  const pathname = usePathname();
  const isCalculadoras =
    pathname === "/calculadoras" || pathname.startsWith("/calculadoras/");
  const isGuias = pathname === "/guias" || pathname.startsWith("/guias/");
  const isSobre = pathname === "/sobre";

  return (
    <nav
      aria-label="Principal"
      className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
    >
      <Link href="/calculadoras" className={navLinkClass(isCalculadoras)}>
        Calculadoras
      </Link>
      <span className="text-muted" aria-hidden="true">|</span>
      <Link href="/guias" className={navLinkClass(isGuias)}>
        Guias
      </Link>
      <span className="text-muted" aria-hidden="true">|</span>
      <Link href="/sobre" className={navLinkClass(isSobre)}>
        Sobre
      </Link>
    </nav>
  );
}
