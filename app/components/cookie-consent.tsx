"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_KEY,
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  type CookieConsentValue,
} from "../lib/analytics";

function readStoredConsent(): CookieConsentValue | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
    return null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setVisible(readStoredConsent() === null);

    function handleOpenSettings() {
      setVisible(true);
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    grantAnalyticsConsent(true);
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    denyAnalyticsConsent();
    setVisible(false);
  }

  if (!hydrated || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-lg"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p
            id="cookie-consent-title"
            className="text-sm font-medium text-foreground"
          >
            Cookies e privacidade
          </p>
          <p id="cookie-consent-description" className="text-sm text-muted">
            Usamos cookies de medição (Google Analytics) para entender o uso do
            site. Você pode aceitar ou recusar.{" "}
            <Link
              href="/privacidade"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              Política de privacidade
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={reject}
            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={accept}
            className="cursor-pointer rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
