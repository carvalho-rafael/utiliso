import Link from "next/link";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CalculadoraResultadoAvisoProps = {
  ano: number;
  variant?: "inss-irrf" | "seguro" | "ibs-cbs";
};

/** Aviso pós-resultado com links para as tabelas — sem bloco extra de fontes. */
export function CalculadoraResultadoAviso({
  ano,
  variant = "inss-irrf",
}: CalculadoraResultadoAvisoProps) {
  if (variant === "seguro") {
    return (
      <p className="mt-1 text-sm text-muted">
        Estimativa com{" "}
        <Link href="/tabelas/seguro-desemprego" className={linkClass}>
          tabela MTE {ano}
        </Link>{" "}
        (INPC). Não substitui contador, advogado ou departamento pessoal.
      </p>
    );
  }

  if (variant === "ibs-cbs") {
    return (
      <p className="mt-1 text-sm text-muted">
        Estimativa com alíquotas de teste de {ano} (
        <Link href="/tabelas/ibs-cbs" className={linkClass}>
          tabela IBS/CBS
        </Link>
        ). Não substitui contador, advogado ou assessoria fiscal.
      </p>
    );
  }

  return (
    <p className="mt-1 text-sm text-muted">
      Estimativa com tabelas{" "}
      <Link href="/tabelas/inss" className={linkClass}>
        INSS
      </Link>
      /
      <Link href="/tabelas/irrf" className={linkClass}>
        IRRF
      </Link>{" "}
      {ano}. Não substitui contador, advogado ou departamento pessoal.
    </p>
  );
}

type CalculadoraInssLinksProps = {
  ano: number;
};

/** Links leves no callout “Como o INSS é calculado?”. */
export function CalculadoraInssLinks({ ano }: CalculadoraInssLinksProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
      <Link
        href="/guias/calculo-inss"
        className={`inline-block text-sm ${linkClass}`}
      >
        Ver guia do cálculo do INSS
      </Link>
      <Link
        href="/tabelas/inss"
        className={`inline-block text-sm ${linkClass}`}
      >
        Tabela INSS {ano}
      </Link>
    </div>
  );
}
