import Link from "next/link";
import type { Guia } from "../lib/guias/catalog";
import { GuiaIconGlyph } from "./guia-icon";

type GuiaCardProps = {
  guia: Guia;
};

export function GuiaCard({ guia }: GuiaCardProps) {
  return (
    <Link
      href={guia.href}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <GuiaIconGlyph icon={guia.icon} className="h-6 w-6 text-highlight" />
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-foreground">{guia.title}</h3>
        <p className="text-sm text-muted">{guia.description}</p>
      </div>
    </Link>
  );
}
