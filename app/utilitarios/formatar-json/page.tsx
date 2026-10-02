import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import { FormatarJsonForm } from "./formatar-json-form";

const utilitario = getUtilitarioBySlug("formatar-json")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${utilitario.title} — Utiliso`,
  description: utilitario.metaDescription,
};

export default function FormatarJsonPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Formatar e validar JSON
        </h1>
        <p className="text-lg text-muted">
          Cole um JSON, veja se a sintaxe está correta e formate ou minifique
          com um clique — útil para APIs, configs e depuração.
        </p>
      </div>

      <CalculadoraPainel titulo="Formatar e validar JSON">
        <FormatarJsonForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            A validação roda enquanto você digita ou cola o texto; o status
            indica se o JSON é válido ou onde a sintaxe falha.
          </li>
          <li>
            <strong className="text-foreground">Formatar</strong> reescreve o
            campo com indentação (2 ou 4 espaços).{" "}
            <strong className="text-foreground">Minificar</strong> remove
            espaços e quebras extras.
          </li>
          <li>
            Só vale JSON padrão (RFC 8252): chaves e strings entre aspas
            duplas, sem comentários nem vírgula após o último item.
          </li>
          <li>
            Tudo roda no seu navegador; o JSON{" "}
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
              Aceita vírgula no final ou JSON5?
            </dt>
            <dd className="mt-1">
              Não. O validador usa o mesmo parser do navegador (
              <code className="text-foreground">JSON.parse</code>), que não
              aceita vírgula trailing, comentários nem chaves sem aspas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E se a mesma chave aparecer duas vezes?
            </dt>
            <dd className="mt-1">
              O JSON pode ser analisado, mas o valor da última chave repetida
              prevalece — comportamento padrão do{" "}
              <code className="text-foreground">JSON.parse</code>.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso validar contra um schema (JSON Schema)?
            </dt>
            <dd className="mt-1">
              Esta ferramenta só verifica sintaxe. Para regras de campos e
              tipos, use um validador de schema à parte.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Meu JSON fica salvo no Utiliso?
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
        <Link href="/utilitarios/contar-caracteres" className={linkClass}>
          Contar caracteres
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
