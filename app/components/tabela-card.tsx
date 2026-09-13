import Link from "next/link";
import type { Tabela } from "../lib/tabelas/catalog";

type TabelaCardProps = {
  tabela: Tabela;
};

export function TabelaCard({ tabela }: TabelaCardProps) {
  return (
    <Link
      href={tabela.href}
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
      </svg>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-foreground">{tabela.title}</h3>
        <p className="text-sm text-muted">{tabela.description}</p>
      </div>
    </Link>
  );
}
