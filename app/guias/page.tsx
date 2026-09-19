import type { Metadata } from "next";
import { GuiaCard } from "../components/guia-card";
import { guias } from "../lib/guias/catalog";
import { hubs } from "../lib/hubs/catalog";

export const metadata: Metadata = {
  title: "Guias — Utiliso",
  description:
    "Guias em português sobre direitos trabalhistas, reforma tributária e ferramentas do Utiliso.",
};

export default function GuiasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Guias
        </h1>
        <p className="text-lg text-muted">
          Explicações claras organizadas por tema.
        </p>
      </div>

      {hubs.map((hub) => {
        const items = guias.filter((guia) => guia.hub === hub.slug);
        if (items.length === 0) return null;

        return (
          <section
            key={hub.slug}
            aria-labelledby={`guias-${hub.slug}`}
            className="flex flex-col gap-4"
          >
            <h2
              id={`guias-${hub.slug}`}
              className="text-sm font-medium text-highlight"
            >
              {hub.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((guia) => (
                <GuiaCard key={guia.slug} guia={guia} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
