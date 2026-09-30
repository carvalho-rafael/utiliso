"use client";

import { useMemo, useState } from "react";
import { contarCaracteres } from "../../lib/utilitarios/contar-caracteres/contar";

const fieldClass =
  "w-full min-h-[12rem] resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type MetricaProps = {
  label: string;
  valor: number;
};

function Metrica({ label, valor }: MetricaProps) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
        {valor.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}

export function ContarCaracteresForm() {
  const [texto, setTexto] = useState("");

  const contagem = useMemo(() => contarCaracteres(texto), [texto]);

  function limpar() {
    setTexto("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="texto-contagem" className="text-sm font-medium text-foreground">
          Seu texto
        </label>
        <textarea
          id="texto-contagem"
          className={fieldClass}
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          placeholder="Cole ou digite o texto aqui…"
          spellCheck={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metrica label="Caracteres" valor={contagem.caracteres} />
        <Metrica
          label="Caracteres sem espaços"
          valor={contagem.caracteresSemEspacos}
        />
        <Metrica label="Palavras" valor={contagem.palavras} />
        <Metrica label="Linhas" valor={contagem.linhas} />
      </div>

      <div>
        <button
          type="button"
          onClick={limpar}
          className="cursor-pointer rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Limpar texto
        </button>
      </div>
    </div>
  );
}
