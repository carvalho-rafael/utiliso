import type { Metadata } from "next";
import { CalculatorStubPage } from "../components/calculator-stub-page";
import { getCalculadoraBySlug } from "../lib/calculadoras/catalog";

const calculadora = getCalculadoraBySlug("salario-liquido")!;

export const metadata: Metadata = {
  title: `${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function SalarioLiquidoPage() {
  return <CalculatorStubPage calculadora={calculadora} />;
}
