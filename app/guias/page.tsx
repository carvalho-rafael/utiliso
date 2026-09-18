import type { Metadata } from "next";
import { GuiaCard } from "../components/guia-card";
import { guias } from "../lib/guias/catalog";

export const metadata: Metadata = {
  title: "Guias trabalhistas — Utiliso",
  description:
    "Guias em português sobre direitos trabalhistas: seguro-desemprego, rescisão e mais.",
};

export default function GuiasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Guias trabalhistas
        </h1>
        <p className="text-lg text-muted">
          Explicações claras sobre direitos e benefícios da CLT.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guias.map((guia) => (
          <GuiaCard key={guia.slug} guia={guia} />
        ))}
      </div>
    </main>
  );
}
