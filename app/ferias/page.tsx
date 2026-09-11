import type { Metadata } from "next";
import { CalculatorStubPage } from "../components/calculator-stub-page";
import { getCalculadoraBySlug } from "../lib/calculadoras/catalog";

const calculadora = getCalculadoraBySlug("ferias")!;

export const metadata: Metadata = {
  title: `${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function FeriasPage() {
  return <CalculatorStubPage calculadora={calculadora} />;
}
