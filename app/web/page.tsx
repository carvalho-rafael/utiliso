import type { Metadata } from "next";
import Link from "next/link";
import { UtilitarioCard } from "../components/utilitario-card";
import { getHubBySlug, utilitariosPorHub } from "../lib/hubs/catalog";

const hub = getHubBySlug("web")!;

export const metadata: Metadata = {
  title: `${hub.title} — Utiliso`,
  description: hub.metaDescription,
};

export default function WebHubPage() {
  const utilitarios = utilitariosPorHub("web");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {hub.title}
        </h1>
        <p className="text-lg text-muted">{hub.description}</p>
      </div>

      <section className="flex flex-col gap-3 text-sm text-muted">
        <p>
          Os <strong className="font-medium text-foreground">utilitários</strong>{" "}
          rodam no navegador: você envia um arquivo ou preenche um formulário e
          recebe o resultado na hora, sem cadastro.
        </p>
      </section>

      {utilitarios.length > 0 && (
        <section
          aria-labelledby="web-utilitarios"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="web-utilitarios"
              className="text-sm font-medium text-highlight"
            >
              Utilitários
            </h2>
            <Link
              href="/utilitarios"
              className="cursor-pointer text-sm font-medium text-accent hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {utilitarios.map((utilitario) => (
              <UtilitarioCard key={utilitario.slug} utilitario={utilitario} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
