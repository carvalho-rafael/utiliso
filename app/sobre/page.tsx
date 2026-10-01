import type { Metadata } from "next";
import Link from "next/link";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/site";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Sobre — Utiliso",
  description:
    "O Utiliso publica calculadoras, tabelas, guias e utilitários em português. Cálculo no navegador, validador de NF-e no servidor, sem cadastro.",
};

export default function SobrePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Sobre o Utiliso
        </h1>
        <p className="text-lg text-muted">
          Calculadoras, tabelas, guias e utilitários em português, com base nas
          normas oficiais vigentes.
        </p>
      </div>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">Quem somos</h2>
        <p>
          O Utiliso é um portal brasileiro de ferramentas gratuitas:{" "}
          <Link href="/calculadoras" className={linkClass}>
            calculadoras
          </Link>
          ,{" "}
          <Link href="/tabelas" className={linkClass}>
            tabelas
          </Link>
          ,{" "}
          <Link href="/guias" className={linkClass}>
            guias
          </Link>{" "}
          e{" "}
          <Link href="/utilitarios" className={linkClass}>
            utilitários
          </Link>
          . Não exigimos cadastro. O conteúdo trabalhista serve a empregados,
          empregadores e RH; a reforma do consumo e o validador de NF-e também
          a quem emite ou confere nota.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como as ferramentas funcionam
        </h2>
        <p>
          As calculadoras (rescisão, salário líquido, férias, 13º, hora extra,
          seguro-desemprego, IBS/CBS e as demais no navegador) rodam{" "}
          <strong className="text-foreground">no seu dispositivo</strong>.
          Salário, datas e os demais campos{" "}
          <strong className="text-foreground">não são enviados</strong> aos
          nossos servidores nem ao Google Analytics. Usamos a CLT e as tabelas
          oficiais de {TABELAS_ANO} (INSS, IRRF, FGTS e seguro-desemprego).
        </p>
        <p>
          O{" "}
          <Link href="/utilitarios/validador-nfe" className={linkClass}>
            validador de NF-e
          </Link>{" "}
          envia o XML ao servidor só para conferir o schema XSD da Sefaz. O
          arquivo não é salvo e não vai ao Analytics. Detalhe na{" "}
          <Link href="/privacidade" className={linkClass}>
            política de privacidade
          </Link>
          .
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
          <li>
            IBS e CBS: Lei Complementar nº 214/2025. O leiaute da NF-e segue o
            pacote XSD da Sefaz (NT 2025.002-RTC).
          </li>
        </ul>
        <p>
          Quando o governo publica nova tabela ou schema, atualizamos as
          ferramentas, as{" "}
          <Link href="/tabelas" className={linkClass}>
            tabelas
          </Link>
          , os{" "}
          <Link href="/guias" className={linkClass}>
            guias
          </Link>{" "}
          e os{" "}
          <Link href="/utilitarios" className={linkClass}>
            utilitários
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Estimativa, não laudo
        </h2>
        <p>
          O resultado das calculadoras é uma estimativa para o cenário
          informado. Não substitui orientação de contador, advogado ou
          departamento pessoal. Acordo coletivo, média de variáveis e o caso
          concreto podem alterar o valor. O validador de NF-e confere o
          leiaute do XML, não a autorização na Sefaz.
        </p>

        <h2 className="text-base font-medium text-foreground">Privacidade</h2>
        <p>
          Não pedimos login. Cookies de medição, anúncios e o tratamento do XML
          no validador estão na{" "}
          <Link href="/privacidade" className={linkClass}>
            política de privacidade
          </Link>
          . Fontes, testes, arredondamento e limites dos resultados estão na{" "}
          <Link href="/metodologia" className={linkClass}>
            metodologia
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">Contato</h2>
        <p>
          Dúvidas sobre o site ou sobre as tabelas usadas podem ser enviadas
          para{" "}
          <a href={CONTACT_MAILTO} className={linkClass}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/calculadoras" className={linkClass}>
          Ver calculadoras
        </Link>
        <Link href="/guias" className={linkClass}>
          Ver guias
        </Link>
        <Link href="/tabelas" className={linkClass}>
          Ver tabelas
        </Link>
        <Link href="/utilitarios" className={linkClass}>
          Ver utilitários
        </Link>
      </div>
    </main>
  );
}
