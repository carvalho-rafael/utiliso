import type { Metadata } from "next";
import { CalculatorCard } from "../components/calculator-card";
import { calculadoras } from "../lib/calculadoras/catalog";

export const metadata: Metadata = {
  title: "Calculadoras trabalhistas — Utiliso",
  description:
    "Calculadoras gratuitas de rescisão, salário líquido, férias, 13º salário, hora extra e seguro-desemprego.",
};

export default function CalculadorasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadoras trabalhistas
        </h1>
        <p className="text-lg text-muted">
          Ferramentas gratuitas para estimar verbas, descontos e benefícios da
          CLT.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {calculadoras.map((calculadora) => (
          <CalculatorCard key={calculadora.slug} calculadora={calculadora} />
        ))}
      </div>
    </main>
  );
}
