"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  type IndentacaoJson,
  processarJson,
} from "../../lib/utilitarios/formatar-json/formatar";

const fieldClass =
  "w-full min-h-[14rem] resize-y rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const JsonCodemirrorEditor = dynamic(
  () =>
    import("./json-codemirror-editor").then((mod) => mod.JsonCodemirrorEditor),
  {
    ssr: false,
    loading: () => (
      <textarea
        className={fieldClass}
        readOnly
        placeholder="Carregando editor…"
        aria-hidden="true"
      />
    ),
  },
);

const botaoSecundarioClass =
  "cursor-pointer rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60";

export function FormatarJsonForm() {
  const [entrada, setEntrada] = useState("");
  const [indentacao, setIndentacao] = useState<IndentacaoJson>(2);
  const [avisoCopiar, setAvisoCopiar] = useState<string | null>(null);

  const resultado = useMemo(
    () => processarJson(entrada, indentacao),
    [entrada, indentacao],
  );

  function limpar() {
    setEntrada("");
    setAvisoCopiar(null);
  }

  function formatar() {
    if (!resultado?.ok) return;
    setEntrada(resultado.formatado);
    setAvisoCopiar(null);
  }

  function minificar() {
    if (!resultado?.ok) return;
    setEntrada(resultado.minificado);
    setAvisoCopiar(null);
  }

  async function copiar() {
    const texto = entrada.trim();
    if (!texto) return;

    try {
      await navigator.clipboard.writeText(texto);
      setAvisoCopiar("Copiado para a área de transferência.");
    } catch {
      setAvisoCopiar("Não foi possível copiar. Selecione o texto manualmente.");
    }
  }

  const status =
    resultado === null
      ? { texto: "Cole ou digite um JSON para validar.", classe: "text-muted" }
      : resultado.ok
        ? { texto: "JSON válido.", classe: "text-success" }
        : {
            texto: resultado.erro,
            classe: "text-danger",
          };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="json-entrada" className="text-sm font-medium text-foreground">
          JSON
        </label>
        <JsonCodemirrorEditor
          id="json-entrada"
          value={entrada}
          onChange={(value) => {
            setEntrada(value);
            setAvisoCopiar(null);
          }}
          aria-describedby="json-status"
        />
        <p id="json-status" className={`text-sm ${status.classe}`} role="status">
          {status.texto}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">Indentação ao formatar</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="json-indent"
              checked={indentacao === 2}
              onChange={() => setIndentacao(2)}
              className="cursor-pointer accent-accent"
            />
            2 espaços
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="json-indent"
              checked={indentacao === 4}
              onChange={() => setIndentacao(4)}
              className="cursor-pointer accent-accent"
            />
            4 espaços
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={formatar}
          disabled={!resultado?.ok}
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          Formatar
        </button>
        <button
          type="button"
          onClick={minificar}
          disabled={!resultado?.ok}
          className={botaoSecundarioClass}
        >
          Minificar
        </button>
        <button
          type="button"
          onClick={copiar}
          disabled={!entrada.trim()}
          className={botaoSecundarioClass}
        >
          Copiar
        </button>
        <button type="button" onClick={limpar} className={botaoSecundarioClass}>
          Limpar
        </button>
      </div>

      {avisoCopiar && (
        <p className="text-sm text-muted" role="status">
          {avisoCopiar}
        </p>
      )}
    </div>
  );
}
