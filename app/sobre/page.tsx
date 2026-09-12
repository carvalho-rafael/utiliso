import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/site";

export const metadata: Metadata = {
  title: "Sobre — Utiliso",
  description:
    "Conheça o Utiliso: calculadoras trabalhistas gratuitas para empregados, empregadores e RH.",
};

export default function SobrePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Sobre o Utiliso
      </h1>

      <div className="flex flex-col gap-4 text-muted">
        <p>
          O Utiliso é um portal brasileiro de ferramentas de utilitários e
          guias. No MVP, oferecemos calculadoras trabalhistas gratuitas e guias
          para ajudar nas contas e dúvidas do dia a dia.
        </p>
        <p>
          O público é amplo: empregados, empregadores e profissionais de RH
          podem usar as mesmas ferramentas para estimar valores com base na CLT
          e nas tabelas vigentes.
        </p>
        <p>
          Os resultados são estimativas e não substituem orientação de contador,
          advogado ou departamento pessoal.
        </p>
        <p>
          Contato:{" "}
          <a
            href={CONTACT_MAILTO}
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/calculadoras"
          className="cursor-pointer text-sm font-medium text-accent hover:underline"
        >
          Ver calculadoras
        </Link>
        <Link
          href="/guias"
          className="cursor-pointer text-sm font-medium text-accent hover:underline"
        >
          Ver guias
        </Link>
      </div>
    </main>
  );
}
