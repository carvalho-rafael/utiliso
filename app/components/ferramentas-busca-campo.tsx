"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buscarFerramentas } from "../lib/busca-ferramentas";

type ItemBusca = {
  slug: string;
  href: string;
  title: string;
  description: string;
};

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function GrupoResultados({
  titulo,
  items,
  onResultNavigate,
  itemKey = "slug",
}: {
  titulo: string;
  items: ItemBusca[];
  onResultNavigate?: () => void;
  itemKey?: "slug" | "href";
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pt-3 text-sm font-medium text-highlight">{titulo}</p>
      <ul className="flex flex-col pb-1">
        {items.map((item) => (
          <li key={itemKey === "href" ? item.href : item.slug}>
            <Link
              href={item.href}
              onClick={onResultNavigate}
              className="flex cursor-pointer flex-col gap-0.5 rounded-md px-3 py-2 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <span className="font-medium text-foreground">{item.title}</span>
              <span className="text-sm text-muted">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FerramentasBuscaCampoProps = {
  inputId: string;
  resultadosId: string;
  showLabel?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onResultNavigate?: () => void;
  onQueryChange?: (query: string) => void;
};

export function FerramentasBuscaCampo({
  inputId,
  resultadosId,
  showLabel = false,
  inputRef,
  onResultNavigate,
  onQueryChange,
}: FerramentasBuscaCampoProps) {
  const [query, setQuery] = useState("");

  function handleQueryChange(value: string) {
    setQuery(value);
    onQueryChange?.(value);
  }
  const resultado = useMemo(() => buscarFerramentas(query), [query]);
  const isSearching = query.trim().length > 0;

  const total =
    resultado.calculadoras.length +
    resultado.utilitarios.length +
    resultado.guias.length +
    resultado.tabelas.length;

  return (
    <div className="flex flex-col gap-2">
      {showLabel ? (
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <SearchIcon className="h-4 w-4 text-highlight" />
          Pesquisar
        </label>
      ) : null}
      <div className="overflow-hidden rounded-lg border border-border bg-surface focus-within:ring-2 focus-within:ring-accent">
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Busque por uma ferramenta ou assunto..."
          className="w-full border-0 bg-transparent px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none"
          role="combobox"
          aria-expanded={isSearching}
          aria-controls={resultadosId}
          autoComplete="off"
        />

        {isSearching ? (
          <div
            id={resultadosId}
            role="listbox"
            aria-label="Resultados da busca"
            className="max-h-[min(24rem,70vh)] overflow-y-auto border-t border-border"
          >
            {total > 0 ? (
              <>
                <GrupoResultados
                  titulo="Calculadoras"
                  items={resultado.calculadoras}
                  onResultNavigate={onResultNavigate}
                />
                <GrupoResultados
                  titulo="Utilitários"
                  items={resultado.utilitarios}
                  onResultNavigate={onResultNavigate}
                  itemKey="href"
                />
                <GrupoResultados
                  titulo="Guias"
                  items={resultado.guias}
                  onResultNavigate={onResultNavigate}
                />
                <GrupoResultados
                  titulo="Tabelas"
                  items={resultado.tabelas}
                  onResultNavigate={onResultNavigate}
                />
              </>
            ) : (
              <p className="px-4 py-3 text-sm text-muted">
                Nenhuma ferramenta encontrada para &quot;{query.trim()}&quot;.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
