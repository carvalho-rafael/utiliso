"use client";

import { useState } from "react";
import {
  calculadoras,
  calculadorasPopulares,
  filterCalculadoras,
} from "../lib/calculadoras/catalog";
import { CalculatorCard } from "./calculator-card";

export function HomeCalculators() {
  const [query, setQuery] = useState("");
  const results = filterCalculadoras(query);
  const isSearching = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-8">
      <label className="flex flex-col gap-2">
        <span className="sr-only">Buscar uma calculadora</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar uma calculadora..."
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </label>

      {isSearching ? (
        <section aria-label="Resultados da busca" className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-highlight">
            Resultados da busca
          </h2>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {results.map((calculadora) => (
                <CalculatorCard
                  key={calculadora.slug}
                  calculadora={calculadora}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Nenhuma calculadora encontrada para &quot;{query.trim()}&quot;.
            </p>
          )}
        </section>
      ) : (
        <>
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-highlight">
              Calculadoras populares
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {calculadorasPopulares.map((calculadora) => (
                <CalculatorCard
                  key={calculadora.slug}
                  calculadora={calculadora}
                />
              ))}
            </div>
          </section>

          <section
            id="calculadoras"
            className="flex flex-col gap-4 scroll-mt-20"
          >
            <h2 className="text-sm font-medium text-foreground">
              Todas as calculadoras
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {calculadoras.map((calculadora) => (
                <CalculatorCard
                  key={calculadora.slug}
                  calculadora={calculadora}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
