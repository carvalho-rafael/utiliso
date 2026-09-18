import Link from "next/link";
import { hubs } from "../lib/hubs/catalog";
import { getMaisUtilizadas } from "../lib/mais-utilizadas";

const cardClass =
  "flex cursor-pointer flex-col gap-2 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function HomeHubs() {
  const maisUtilizadas = getMaisUtilizadas();

  return (
    <div className="flex flex-col gap-8">
      <section aria-label="Temas" className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-highlight">Temas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {hubs.map((hub) => (
            <Link key={hub.slug} href={hub.href} className={cardClass}>
              <h3 className="text-lg font-semibold text-foreground">
                {hub.title}
              </h3>
              <p className="text-sm text-muted">{hub.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Em destaque" className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-highlight">Em destaque</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {maisUtilizadas.map((item) => (
            <Link
              key={`${item.categoria}-${item.slug}`}
              href={item.href}
              className={cardClass}
            >
              <span className="text-xs font-medium text-muted">
                {item.categoria}
              </span>
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
