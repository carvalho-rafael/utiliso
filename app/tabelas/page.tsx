import type { Metadata } from "next";
import { TabelaCard } from "../components/tabela-card";
import { tabelas } from "../lib/tabelas/catalog";
import { hubs } from "../lib/hubs/catalog";

export const metadata: Metadata = {
  title: "Tabelas — Utiliso",
  description:
    "Tabelas oficiais de INSS, IRRF, salário mínimo, seguro-desemprego e alíquotas de teste de IBS/CBS, com fontes e vigência.",
};

export default function TabelasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabelas
        </h1>
        <p className="text-lg text-muted">
          Valores oficiais usados nas calculadoras do Utiliso, com vigência e
          fonte.
        </p>
      </div>

      {hubs.map((hub) => {
        const items = tabelas.filter((tabela) => tabela.hub === hub.slug);
        if (items.length === 0) return null;

        return (
          <section
            key={hub.slug}
            aria-labelledby={`tabelas-${hub.slug}`}
            className="flex flex-col gap-4"
          >
            <h2
              id={`tabelas-${hub.slug}`}
              className="text-sm font-medium text-highlight"
            >
              {hub.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((tabela) => (
                <TabelaCard key={tabela.slug} tabela={tabela} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-sm text-muted">
        Os valores são atualizados quando o governo publica nova tabela ou lei.
        Os resultados das calculadoras são estimativas e não substituem
        orientação de contador, advogado ou assessoria fiscal.
      </p>
    </main>
  );
}
