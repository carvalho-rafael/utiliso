import Link from "next/link";
import { tabelas } from "../lib/tabelas/catalog";

type TabelasRelacionadasProps = {
  slugAtual: string;
};

export function TabelasRelacionadas({ slugAtual }: TabelasRelacionadasProps) {
  const outras = tabelas.filter((tabela) => tabela.slug !== slugAtual);

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6">
      <p className="text-sm text-muted">Outras tabelas:</p>
      <div className="flex flex-wrap gap-4">
        {outras.map((tabela) => (
          <Link
            key={tabela.slug}
            href={tabela.href}
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            {tabela.title}
          </Link>
        ))}
        <Link
          href="/tabelas"
          className="cursor-pointer text-sm font-medium text-accent hover:underline"
        >
          Todas as tabelas
        </Link>
      </div>
    </div>
  );
}
