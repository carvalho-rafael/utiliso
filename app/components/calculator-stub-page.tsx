import Link from "next/link";
import type { Calculadora } from "../lib/calculadoras/catalog";
import { CalculatorIconGlyph } from "./calculator-icon";

type CalculatorStubPageProps = {
  calculadora: Calculadora;
};

export function CalculatorStubPage({ calculadora }: CalculatorStubPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <div className="flex items-center gap-3">
        <CalculatorIconGlyph
          icon={calculadora.icon}
          className="h-7 w-7 text-highlight"
        />
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {calculadora.title}
        </h1>
      </div>

      <p className="text-lg text-muted">{calculadora.metaDescription}</p>

      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-foreground">Calculadora em breve.</p>
        <p className="mt-2 text-sm text-muted">
          Estamos preparando esta ferramenta. Os resultados serão estimativas e
          não substituem orientação de contador, advogado ou departamento
          pessoal.
        </p>
      </div>

      <Link
        href="/"
        className="text-sm font-medium text-accent hover:underline"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
