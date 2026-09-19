import Link from "next/link";
import type { Utilitario } from "../lib/utilitarios/catalog";

type UtilitarioCardProps = {
  utilitario: Utilitario;
};

export function UtilitarioCard({ utilitario }: UtilitarioCardProps) {
  return (
    <Link
      href={utilitario.href}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-highlight"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-foreground">{utilitario.title}</h3>
        <p className="text-sm text-muted">{utilitario.description}</p>
      </div>
    </Link>
  );
}
