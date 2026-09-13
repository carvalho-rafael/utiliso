import Link from "next/link";

type TabelaCalculadoraCtaProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function TabelaCalculadoraCta({
  title,
  description,
  href,
  label,
}: TabelaCalculadoraCtaProps) {
  return (
    <aside
      aria-label={title}
      className="rounded-lg border border-border bg-surface p-6"
    >
      <h2 className="text-base font-medium text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {label}
      </Link>
    </aside>
  );
}
