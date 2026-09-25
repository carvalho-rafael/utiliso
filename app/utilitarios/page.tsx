import type { Metadata } from "next";
import { UtilitarioCard } from "../components/utilitario-card";
import { hubs } from "../lib/hubs/catalog";
import { utilitarios } from "../lib/utilitarios/catalog";

export const metadata: Metadata = {
  title: "Utilitários — Utiliso",
  description:
    "Ferramentas gratuitas para XML, notas fiscais e tarefas do dia a dia além das calculadoras.",
};

export default function UtilitariosPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Utilitários
        </h1>
        <p className="text-lg text-muted">
          Ferramentas práticas para validar documentos, publicar sites e apoiar
          tarefas do dia a dia — sem cadastro.
        </p>
      </div>

      {hubs.map((hub) => {
        const items = utilitarios.filter((item) => item.hub === hub.slug);
        if (items.length === 0) return null;

        return (
          <section
            key={hub.slug}
            aria-labelledby={`utilitarios-${hub.slug}`}
            className="flex flex-col gap-4"
          >
            <h2
              id={`utilitarios-${hub.slug}`}
              className="text-sm font-medium text-highlight"
            >
              {hub.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((utilitario) => (
                <UtilitarioCard key={utilitario.slug} utilitario={utilitario} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
