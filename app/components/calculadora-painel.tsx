import Link from "next/link";
import type { ReactNode } from "react";

type CalculadoraPainelProps = {
  children: ReactNode;
  /** Título acessível da região (não visível). */
  titulo?: string;
};

export function CalculadoraPainel({
  children,
  titulo = "Calculadora",
}: CalculadoraPainelProps) {
  return (
    <section
      aria-label={titulo}
      className="rounded-lg border-2 border-border bg-surface p-4 sm:p-6"
    >
      {children}
    </section>
  );
}
