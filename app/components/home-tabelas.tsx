import { tabelas } from "../lib/tabelas/catalog";
import { TabelaCard } from "./tabela-card";

export function HomeTabelas() {
  return (
    <section id="tabelas" className="flex flex-col gap-4 scroll-mt-20">
      <h2 className="text-sm font-medium text-foreground">Tabelas</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tabelas.map((tabela) => (
          <TabelaCard key={tabela.slug} tabela={tabela} />
        ))}
      </div>
    </section>
  );
}
