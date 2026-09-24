"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { FerramentasBuscaCampo, SearchIcon } from "./ferramentas-busca-campo";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeaderInner() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();
  const resultadosId = useId();

  useEffect(() => {
    if (!searchOpen || isHome) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, isHome]);

  useEffect(() => {
    if (!searchOpen || isHome) return;

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setSearchOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [searchOpen, isHome]);

  function closeSearch() {
    setSearchOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-2 md:grid md:h-14 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-x-3 md:py-0">
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
        <div className="flex shrink-0 items-center gap-2 md:col-start-3 md:row-start-1">
          {!isHome ? (
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Pesquisar"
              aria-expanded={searchOpen}
              aria-controls={searchOpen ? resultadosId : undefined}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
      <div className="mt-2 flex justify-center border-t border-border pt-2 md:col-start-2 md:row-start-1 md:mt-0 md:border-t-0 md:pt-0">
        <SiteNav />
      </div>

      {searchOpen && !isHome ? (
        <div
          ref={panelRef}
          className="absolute inset-x-0 top-full z-50 border-b border-border bg-surface px-4 py-3 shadow-sm md:px-4"
        >
          <FerramentasBuscaCampo
            inputId={inputId}
            resultadosId={resultadosId}
            inputRef={inputRef}
            onResultNavigate={closeSearch}
          />
        </div>
      ) : null}
    </div>
  );
}
