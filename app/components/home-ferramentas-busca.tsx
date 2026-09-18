"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buscarFerramentas } from "../lib/busca-ferramentas";
import { HomeHubs } from "./home-hubs";

type ItemBusca = {
  slug: string;
  href: string;
  title: string;
  description: string;
};

function GrupoResultados({
  titulo,
  items,
}: {
  titulo: string;
  items: ItemBusca[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pt-3 text-sm font-medium text-highlight">{titulo}</p>
      <ul className="flex flex-col pb-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
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

export function HomeFerramentasBusca() {
  const [query, setQuery] = useState("");
  const resultado = useMemo(() => buscarFerramentas(query), [query]);
  const isSearching = query.trim().length > 0;

  const total =
    resultado.calculadoras.length +
    resultado.guias.length +
    resultado.tabelas.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="home-busca-ferramenta"
          className="text-sm font-medium text-foreground"
        >
          Buscar ferramenta
        </label>
        <div className="overflow-hidden rounded-lg border border-border bg-surface focus-within:ring-2 focus-within:ring-accent">
          <input
            id="home-busca-ferramenta"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Calculadoras, guias ou tabelas..."
            className="w-full border-0 bg-transparent px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none"
            role="combobox"
            aria-expanded={isSearching}
            aria-controls="home-busca-resultados"
            autoComplete="off"
          />

          {isSearching ? (
            <div
              id="home-busca-resultados"
              role="listbox"
              aria-label="Resultados da busca"
              className="border-t border-border"
            >
              {total > 0 ? (
                <>
                  <GrupoResultados
                    titulo="Calculadoras"
                    items={resultado.calculadoras}
                  />
                  <GrupoResultados titulo="Guias" items={resultado.guias} />
                  <GrupoResultados titulo="Tabelas" items={resultado.tabelas} />
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

      {!isSearching ? <HomeHubs /> : null}
    </div>
  );
}
