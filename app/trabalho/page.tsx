import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "../components/calculator-card";
import { GuiaCard } from "../components/guia-card";
import { TabelaCard } from "../components/tabela-card";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";
import {
  calculadorasPorHub,
  getHubBySlug,
  guiasPorHub,
  tabelasPorHub,
} from "../lib/hubs/catalog";

const hub = getHubBySlug("trabalho")!;

export const metadata: Metadata = {
  title: `${hub.title} — Utiliso`,
  description: hub.metaDescription,
};

export default function TrabalhoHubPage() {
  const calculadoras = calculadorasPorHub("trabalho");
  const guias = guiasPorHub("trabalho");
  const tabelas = tabelasPorHub("trabalho");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {hub.title}
        </h1>
        <p className="text-lg text-muted">{hub.description}</p>
      </div>

      <section className="flex flex-col gap-3 text-sm text-muted">
        <p>
          Use as <strong className="font-medium text-foreground">calculadoras</strong>{" "}
          para estimar valores na folha ou na rescisão; os{" "}
          <strong className="font-medium text-foreground">guias</strong> explicam
          direitos e prazos; as{" "}
          <strong className="font-medium text-foreground">tabelas</strong> trazem
          alíquotas e valores oficiais de {TABELAS_ANO}.
        </p>
        <p>
          Os resultados são estimativas e não substituem contador, advogado ou
          departamento pessoal.
        </p>
      </section>

      <section aria-labelledby="trabalho-calculadoras" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="trabalho-calculadoras"
            className="text-sm font-medium text-highlight"
          >
            Calculadoras
          </h2>
          <Link
            href="/calculadoras"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {calculadoras.map((calculadora) => (
            <CalculatorCard key={calculadora.slug} calculadora={calculadora} />
          ))}
        </div>
      </section>

      <section aria-labelledby="trabalho-guias" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="trabalho-guias" className="text-sm font-medium text-highlight">
            Guias
          </h2>
          <Link
            href="/guias"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guias.map((guia) => (
            <GuiaCard key={guia.slug} guia={guia} />
          ))}
        </div>
      </section>

      <section aria-labelledby="trabalho-tabelas" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="trabalho-tabelas" className="text-sm font-medium text-highlight">
            Tabelas
          </h2>
          <Link
            href="/tabelas"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tabelas.map((tabela) => (
            <TabelaCard key={tabela.slug} tabela={tabela} />
          ))}
        </div>
      </section>
    </main>
  );
}
