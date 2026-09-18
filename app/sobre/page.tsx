import type { Metadata } from "next";
import Link from "next/link";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/site";

export const metadata: Metadata = {
  title: "Sobre — Utiliso",
  description:
    "O Utiliso publica calculadoras e guias trabalhistas em português, com base na CLT e nas tabelas oficiais vigentes. Cálculo no navegador, sem cadastro.",
};

export default function SobrePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Sobre o Utiliso
        </h1>
        <p className="text-lg text-muted">
          Calculadoras e guias trabalhistas em português, com base na CLT e nas
          tabelas oficiais vigentes.
        </p>
      </div>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">Quem somos</h2>
        <p>
          O Utiliso é um portal brasileiro de calculadoras trabalhistas e guias
          em português. As ferramentas são gratuitas, não exigem cadastro e
          servem a empregados, empregadores e profissionais de RH.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como calculamos
        </h2>
        <p>
          Os cálculos rodam{" "}
          <strong className="text-foreground">no seu navegador</strong>.
          Salário, datas e os demais campos do formulário{" "}
          <strong className="text-foreground">não são enviados</strong> aos
          nossos servidores nem ao Google Analytics. Usamos a CLT e as tabelas
          oficiais de {TABELAS_ANO} (INSS, IRRF, FGTS e seguro-desemprego).
        </p>

        <h2 className="text-base font-medium text-foreground">Fontes</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            INSS do empregado: Portaria Interministerial MPS/MF nº 13/{TABELAS_ANO}.
          </li>
          <li>
            IRRF: tabela mensal da Receita Federal, com o redutor da Lei
            15.270/2025.
          </li>
          <li>
            Seguro-desemprego: tabela MTE/CODEFAT (Lei 7.998/1990), atualizada
            pelo INPC.
          </li>
          <li>
            FGTS: Lei 8.036/1990. Hora extra e demais verbas seguem a CLT.
          </li>
        </ul>
        <p>
          Quando o governo publica nova tabela, atualizamos as ferramentas, as{" "}
          <Link
            href="/tabelas"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            tabelas
          </Link>{" "}
          e os{" "}
          <Link
            href="/guias"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            guias
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Estimativa, não laudo
        </h2>
        <p>
          O resultado é uma estimativa para o cenário informado. Não substitui
          orientação de contador, advogado ou departamento pessoal. Acordo
          coletivo, média de variáveis e o caso concreto podem alterar o valor.
        </p>

        <h2 className="text-base font-medium text-foreground">Privacidade</h2>
        <p>
          Não pedimos login. O uso de cookies de medição e, no futuro, de
          anúncios está descrito na{" "}
          <Link
            href="/privacidade"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            política de privacidade
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">Contato</h2>
        <p>
          Dúvidas sobre o site ou sobre as tabelas usadas podem ser enviadas
          para{" "}
          <a
            href={CONTACT_MAILTO}
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

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
        <Link
          href="/tabelas"
          className="cursor-pointer text-sm font-medium text-accent hover:underline"
        >
          Ver tabelas
        </Link>
      </div>
    </main>
  );
}
