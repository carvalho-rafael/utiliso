import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "../components/calculator-card";
import { GuiaCard } from "../components/guia-card";
import { TabelaCard } from "../components/tabela-card";
import { UtilitarioCard } from "../components/utilitario-card";
import { IBS_CBS_ANO } from "../lib/calculadoras/ibs-cbs";
import {
  calculadorasPorHub,
  getHubBySlug,
  guiasPorHub,
  tabelasPorHub,
  utilitariosPorHub,
} from "../lib/hubs/catalog";

const hub = getHubBySlug("reforma-tributaria")!;

export const metadata: Metadata = {
  title: `${hub.title} — Utiliso`,
  description: hub.metaDescription,
};

export default function ReformaTributariaHubPage() {
  const calculadoras = calculadorasPorHub("reforma-tributaria");
  const guias = guiasPorHub("reforma-tributaria");
  const tabelas = tabelasPorHub("reforma-tributaria");
  const utilitarios = utilitariosPorHub("reforma-tributaria");

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
          para estimar IBS e CBS; os{" "}
          <strong className="font-medium text-foreground">guias</strong> explicam
          a nota e a transição; as{" "}
          <strong className="font-medium text-foreground">tabelas</strong> trazem
          alíquotas fixadas em lei para {IBS_CBS_ANO}.
        </p>
        <p>
          Os resultados são estimativas e não substituem contador, advogado ou
          assessoria fiscal.
        </p>
      </section>

      <section
        aria-labelledby="reforma-calculadoras"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="reforma-calculadoras"
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

      {utilitarios.length > 0 && (
        <section
          aria-labelledby="reforma-utilitarios"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="reforma-utilitarios"
              className="text-sm font-medium text-highlight"
            >
              Utilitários
            </h2>
            <Link
              href="/utilitarios"
              className="cursor-pointer text-sm font-medium text-accent hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {utilitarios.map((utilitario) => (
              <UtilitarioCard key={utilitario.slug} utilitario={utilitario} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="reforma-guias" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="reforma-guias" className="text-sm font-medium text-highlight">
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

      <section aria-labelledby="reforma-tabelas" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="reforma-tabelas" className="text-sm font-medium text-highlight">
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
