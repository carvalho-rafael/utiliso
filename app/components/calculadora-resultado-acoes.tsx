"use client";

import { useCallback, useState, type SVGProps } from "react";

const acaoClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CalculadoraResultadoAcoesProps = {
  texto: string;
};

export function CalculadoraResultadoAcoes({
  texto,
}: CalculadoraResultadoAcoesProps) {
  const [copied, setCopied] = useState(false);

  const copiar = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [texto]);

  const baixarPdf = useCallback(() => {
    window.print();
  }, []);

  return (
    <div
      className="flex flex-wrap justify-end gap-2 border-t border-border pt-4 print:hidden"
      aria-label="Ações do resultado"
    >
      <button type="button" onClick={copiar} className={acaoClassName}>
        {copied ? (
          <CheckIcon aria-hidden="true" />
        ) : (
          <CopyIcon aria-hidden="true" />
        )}
        {copied ? "Copiado" : "Copiar resultado"}
      </button>
      <button type="button" onClick={baixarPdf} className={acaoClassName}>
        <DownloadIcon aria-hidden="true" />
        Baixar PDF
      </button>
    </div>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      {...props}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" x2="12" y1="18" y2="12" />
      <polyline points="9 15 12 18 15 15" />
    </svg>
  );
}
