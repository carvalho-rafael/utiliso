import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import { ContarCaracteresForm } from "./contar-caracteres-form";

const utilitario = getUtilitarioBySlug("contar-caracteres")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${utilitario.title} — Utiliso`,
  description: utilitario.metaDescription,
};

export default function ContarCaracteresPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Contar caracteres
        </h1>
        <p className="text-lg text-muted">
          Veja na hora quantos caracteres, palavras e linhas o seu texto tem —
          útil para bio, título e limites de campo.
        </p>
      </div>

      <CalculadoraPainel titulo="Contar caracteres">
        <ContarCaracteresForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Os totais atualizam enquanto você digita ou cola o texto — não
            precisa clicar em calcular.
          </li>
          <li>
            <strong className="text-foreground">Caracteres</strong> contam
            grafemas (o que aparece na tela): letras, números, símbolos e emoji
            composto contam como um.
          </li>
          <li>
            <strong className="text-foreground">Palavras</strong> são trechos
            separados por espaço em branco; linhas seguem as quebras de linha do
            texto.
          </li>
          <li>
            Tudo roda no seu navegador; o texto{" "}
            <strong className="text-foreground">não é enviado</strong> ao
            servidor nem ao Google Analytics.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="font-medium text-foreground">
              É o mesmo que o limite do Twitter ou do Instagram?
            </dt>
            <dd className="mt-1">
              Cada rede pode usar regras próprias (URL encurtada, menções,
              etc.). Use este contador como referência rápida do tamanho do
              texto que você colou aqui.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que “caracteres sem espaços”?
            </dt>
            <dd className="mt-1">
              Alguns formulários pedem o tamanho sem contar espaços. Mostramos
              os dois totais para você não precisar apagar os espaços na mão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O que conta como palavra?
            </dt>
            <dd className="mt-1">
              Sequências de letras ou números separadas por espaço, tab ou
              quebra de linha. Texto só com espaços não tem palavras.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Meu texto fica salvo no Utiliso?
            </dt>
            <dd className="mt-1">
              Não. Sem cadastro, o conteúdo permanece só na sua sessão no
              navegador até você limpar ou sair da página.
            </dd>
          </div>
        </dl>
      </section>

      <nav
        aria-label="Links relacionados"
        className="flex flex-wrap gap-x-4 gap-y-2 text-sm"
      >
        <Link href="/web" className={linkClass}>
          Hub Web
        </Link>
        <Link href="/utilitarios/criar-favicon" className={linkClass}>
          Criar favicon
        </Link>
        <Link href="/utilitarios" className={linkClass}>
          Todos os utilitários
        </Link>
      </nav>
    </main>
  );
}
