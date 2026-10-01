"use client";

import Link from "next/link";
import { OPEN_COOKIE_SETTINGS_EVENT } from "../lib/analytics";
import { CONTACT_MAILTO } from "../lib/site";

export function SiteFooter() {
  function openCookieSettings() {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  }

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-6 text-sm text-muted">
        <a
          href={CONTACT_MAILTO}
          className="cursor-pointer font-medium text-accent hover:underline"
        >
          Contato
        </a>
        <span aria-hidden="true">·</span>
        <Link
          href="/privacidade"
          className="cursor-pointer font-medium text-accent hover:underline"
        >
          Privacidade
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href="/metodologia"
          className="cursor-pointer font-medium text-accent hover:underline"
        >
          Metodologia
        </Link>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={openCookieSettings}
          className="cursor-pointer font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Cookies
        </button>
      </div>
    </footer>
  );
}
