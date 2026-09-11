import Link from "next/link";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="relative mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-foreground"
        >
          Utiliso
        </Link>
        <SiteNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
