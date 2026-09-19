import Link from "next/link";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-2 md:grid md:h-14 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-x-3 md:py-0">
        <div className="flex h-11 items-center justify-between md:contents">
          <Link href="/" className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Utiliso"
              width={85}
              height={24}
              className="h-6 w-auto dark:brightness-0 dark:invert"
            />
          </Link>
          <div className="shrink-0 md:col-start-3 md:row-start-1">
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-2 flex justify-center border-t border-border pt-2 md:col-start-2 md:row-start-1 md:mt-0 md:border-t-0 md:pt-0">
          <SiteNav />
        </div>
      </div>
    </header>
  );
}
