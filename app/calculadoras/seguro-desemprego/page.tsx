import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-desemprego — Utiliso",
  description:
    "Calculadora de seguro-desemprego: estimativa de parcelas e valor do benefício após demissão sem justa causa.",
};

export default function SeguroDesempregoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Calculadora de Seguro-desemprego
      </h1>

      <p className="text-lg text-muted">
        Estime parcelas e valor do benefício após a demissão sem justa causa.
      </p>

      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-foreground">Calculadora em breve.</p>
        <p className="mt-2 text-sm text-muted">
          Enquanto isso, leia o{" "}
          <Link
            href="/guias/seguro-desemprego"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            guia de seguro-desemprego
          </Link>{" "}
          para entender requisitos, prazos e como solicitar.
        </p>
      </div>

      <Link
        href="/calculadoras/rescisao"
        className="cursor-pointer text-sm font-medium text-accent hover:underline"
      >
        Voltar para a calculadora de rescisão
      </Link>
    </main>
  );
}
