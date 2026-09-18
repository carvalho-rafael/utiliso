"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  buildBreadcrumbListJsonLd,
  buildBreadcrumbs,
} from "../lib/breadcrumbs";
import { SITE_URL } from "../lib/site";

export function SiteBreadcrumbBar() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  if (items.length === 0) {
    return null;
  }

  const jsonLd = buildBreadcrumbListJsonLd(pathname, items, SITE_URL);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-8 pb-2">
      <nav aria-label="Trilha">
        <ol className="flex flex-wrap items-center gap-y-1 text-sm text-muted">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="inline-flex items-center">
              {index > 0 ? (
                <span className="mx-2 text-muted" aria-hidden="true">
                  ·
                </span>
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="cursor-pointer font-medium text-accent hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
