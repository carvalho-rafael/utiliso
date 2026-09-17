import Link from "next/link";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto] items-center gap-x-2 px-4 min-[360px]:h-14 min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link href="/" className="flex h-12 items-center min-[360px]:h-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Utiliso"
            width={85}
            height={24}
            className="h-6 w-auto dark:brightness-0 dark:invert"
          />
        </Link>
        <div className="col-start-2 row-start-1 flex h-12 items-center min-[360px]:col-start-3 min-[360px]:h-auto">
          <ThemeToggle />
        </div>
        <div className="col-span-2 flex justify-center pb-2 min-[360px]:col-span-1 min-[360px]:col-start-2 min-[360px]:row-start-1 min-[360px]:pb-0">
          <SiteNav />
        </div>
      </div>
    </header>
  );
}
