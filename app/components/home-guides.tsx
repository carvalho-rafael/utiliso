import { guias } from "../lib/guias/catalog";
import { GuiaCard } from "./guia-card";

export function HomeGuides() {
  return (
    <section id="guias" className="flex flex-col gap-4 scroll-mt-20">
      <h2 className="text-sm font-medium text-foreground">Guias</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guias.map((guia) => (
          <GuiaCard key={guia.slug} guia={guia} />
        ))}
      </div>
    </section>
  );
}
