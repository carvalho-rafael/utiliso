import Link from "next/link";
import type { Calculadora } from "../lib/calculadoras/catalog";
import { CalculatorIconGlyph } from "./calculator-icon";

type CalculatorCardProps = {
  calculadora: Calculadora;
};

export function CalculatorCard({ calculadora }: CalculatorCardProps) {
  return (
    <Link
      href={calculadora.href}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <CalculatorIconGlyph
        icon={calculadora.icon}
        className="h-6 w-6 text-highlight"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-foreground">{calculadora.title}</h3>
        <p className="text-sm text-muted">{calculadora.description}</p>
      </div>
    </Link>
  );
}
