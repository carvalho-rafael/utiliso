"use client";

import { useRef, useState } from "react";
import type { ValidacaoNfeResultado } from "../../lib/utilitarios/nfe/validar-types";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const MAX_XML_CHARS = 5 * 1024 * 1024;

export function ValidadorNfeForm() {
  const [xml, setXml] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<ValidacaoNfeResultado | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function limparResultado() {
    setResultado(null);
    setErro(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    limparResultado();

    const trimmed = xml.trim();
    if (!trimmed) {
      setErro("Cole o XML ou selecione um arquivo .xml.");
      return;
    }

    if (trimmed.length > MAX_XML_CHARS) {
      setErro("O XML é grande demais. O limite é 5 MB.");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch("/api/utilitarios/validador-nfe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xml: trimmed }),
      });

      const data = (await response.json()) as ValidacaoNfeResultado;
      if (!response.ok && !data.ok) {
        setResultado(data);
        return;
      }
      setResultado(data);
    } catch {
      setErro(
        "Não foi possível validar agora. Verifique sua conexão e tente de novo.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".xml")) {
      setErro("Selecione um arquivo com extensão .xml.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_XML_CHARS) {
      setErro("O arquivo excede 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setXml(text);
      limparResultado();
    };
    reader.onerror = () => {
      setErro("Não foi possível ler o arquivo.");
    };
    reader.readAsText(file, "utf-8");
    event.target.value = "";
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">XML da NF-e</span>
          <textarea
            value={xml}
            onChange={(event) => {
              setXml(event.target.value);
              limparResultado();
            }}
            rows={14}
            spellCheck={false}
            className={fieldClassBase}
            placeholder='<?xml version="1.0" encoding="UTF-8"?>…'
            aria-describedby={erro ? "validador-nfe-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Aceita NF-e processada (nfeProc), nota (NFe) ou lote (enviNFe), modelo
            55, pacote PL_010_V1.30. O arquivo não é armazenado.
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml,application/xml,text/xml"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Carregar arquivo .xml
          </button>
        </div>

        {erro && (
          <p id="validador-nfe-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregando ? "Validando…" : "Validar XML"}
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado da validação"
          className={
            resultado.ok
              ? "flex flex-col gap-4 rounded-lg border border-success/40 bg-success/10 p-4"
              : "flex flex-col gap-4 rounded-lg border border-danger/40 bg-danger/10 p-4"
          }
        >
          <div>
            <h2
              className={
                resultado.ok
                  ? "text-lg font-semibold text-success"
                  : "text-lg font-semibold text-danger"
              }
            >
              {resultado.ok ? "XML válido" : "XML inválido"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pacote {resultado.pacote}
              {resultado.ok
                ? ` · ${resultado.tipoLabel} · ${resultado.schema}`
                : resultado.schema
                  ? ` · ${resultado.tipoLabel} · ${resultado.schema}`
                  : null}
            </p>
          </div>

          {resultado.ok ? (
            <p className="text-sm text-success" role="status">
              O XML está <strong className="font-medium">conforme</strong> o
              schema XSD selecionado.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-danger" role="status">
                O XML <strong className="font-medium">não está válido</strong>{" "}
                para o schema.
              </p>
              <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto text-sm text-muted">
                {resultado.erros.map((item, index) => (
                  <li
                    key={`${item.linha ?? 0}-${item.coluna ?? 0}-${index}`}
                    className="rounded-md border border-danger/30 bg-background px-3 py-2 font-mono text-xs text-foreground"
                  >
                    {item.linha ? (
                      <span className="text-danger">
                        Linha {item.linha}
                        {item.coluna ? `, coluna ${item.coluna}` : ""}:{" "}
                      </span>
                    ) : null}
                    {item.mensagem}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-muted">
            Validação estrutural (XSD). Não verifica assinatura digital, situação
            na Sefaz nem regras de negócio. Não substitui contador ou assessoria
            fiscal.
          </p>
        </section>
      )}
    </div>
  );
}
