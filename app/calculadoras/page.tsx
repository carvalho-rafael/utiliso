import type { Metadata } from "next";
import { CalculatorCard } from "../components/calculator-card";
import { calculadoras } from "../lib/calculadoras/catalog";
import { hubs } from "../lib/hubs/catalog";

export const metadata: Metadata = {
  title: "Calculadoras — Utiliso",
  description:
    "Calculadoras gratuitas de trabalho CLT e reforma tributária: rescisão, salário líquido, IBS/CBS e mais.",
};

export default function CalculadorasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadoras
        </h1>
        <p className="text-lg text-muted">
          Ferramentas gratuitas organizadas por tema para estimar valores no
          trabalho e na reforma do consumo.
        </p>
      </div>

      {hubs.map((hub) => {
        const items = calculadoras.filter(
          (calculadora) => calculadora.hub === hub.slug,
        );
        if (items.length === 0) return null;

        return (
          <section
            key={hub.slug}
            aria-labelledby={`calculadoras-${hub.slug}`}
            className="flex flex-col gap-4"
          >
            <h2
              id={`calculadoras-${hub.slug}`}
              className="text-sm font-medium text-highlight"
            >
              {hub.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((calculadora) => (
                <CalculatorCard
                  key={calculadora.slug}
                  calculadora={calculadora}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
