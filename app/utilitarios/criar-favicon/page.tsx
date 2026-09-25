import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import { CriarFaviconForm } from "./criar-favicon-form";

const utilitario = getUtilitarioBySlug("criar-favicon")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${utilitario.title} — Utiliso`,
  description: utilitario.metaDescription,
};

export default function CriarFaviconPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Criar favicon
        </h1>
        <p className="text-lg text-muted">
          Envie um PNG e baixe favicon.ico, ícones em vários tamanhos e
          apple-touch-icon — cada arquivo com link de download separado.
        </p>
      </div>

      <CalculadoraPainel titulo="Criar favicon">
        <CriarFaviconForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            A imagem é encaixada num quadrado transparente (sem cortar), no
            estilo <strong className="text-foreground">contain</strong>.
          </li>
          <li>
            São gerados PNG de 16, 32, 48, 180, 192 e 512 px, além de um{" "}
            <strong className="text-foreground">favicon.ico</strong> com as
            versões 16, 32 e 48 embutidas.
          </li>
          <li>
            Tudo roda no seu navegador; a imagem{" "}
            <strong className="text-foreground">não é enviada</strong> ao
            servidor nem ao Google Analytics.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">Perguntas frequentes</h2>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="font-medium text-foreground">
              Preciso de imagem quadrada?
            </dt>
            <dd className="mt-1">
              Não. Retângulos ganham margem transparente para caber no quadrado
              de cada tamanho.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Onde coloco os arquivos no site?
            </dt>
            <dd className="mt-1">
              Em geral na raiz do domínio (mesmo nível do index.html). Use as
              tags sugeridas no resultado ou adapte os caminhos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Substituem contador ou designer?
            </dt>
            <dd className="mt-1">
              Não. É uma ferramenta prática para gerar tamanhos comuns; a
              identidade visual do projeto continua sendo decisão sua.
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
        <Link href="/utilitarios" className={linkClass}>
          Todos os utilitários
        </Link>
      </nav>
    </main>
  );
}
