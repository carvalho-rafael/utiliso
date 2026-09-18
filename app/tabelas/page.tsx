import type { Metadata } from "next";
import { TabelaCard } from "../components/tabela-card";
import { tabelas } from "../lib/tabelas/catalog";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";

export const metadata: Metadata = {
  title: "Tabelas trabalhistas — Utiliso",
  description:
    `Tabelas oficiais de INSS, IRRF, salário mínimo e seguro-desemprego em ${TABELAS_ANO}, com fontes e vigência.`,
};

export default function TabelasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabelas trabalhistas
        </h1>
        <p className="text-lg text-muted">
          Valores oficiais de {TABELAS_ANO} usados nas calculadoras do Utiliso.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tabelas.map((tabela) => (
          <TabelaCard key={tabela.slug} tabela={tabela} />
        ))}
      </div>

      <p className="text-sm text-muted">
        Os valores são atualizados quando o governo publica nova tabela. Os
        resultados das calculadoras são estimativas e não substituem orientação
        de contador, advogado ou departamento pessoal.
      </p>
    </main>
  );
}
