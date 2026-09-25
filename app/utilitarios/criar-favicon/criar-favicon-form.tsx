"use client";

import { useEffect, useRef, useState } from "react";
import {
  blobParaUint8Array,
  isAssinaturaPng,
  MAX_PNG_BYTES,
  redimensionarPngQuadrado,
} from "../../lib/utilitarios/favicon/gerar-cliente";
import { montarIco } from "../../lib/utilitarios/favicon/ico";
import {
  FAVICON_ICO_FILENAME,
  FAVICON_SAIDAS_PNG,
  montarTagsLinkHtml,
} from "../../lib/utilitarios/favicon/tamanhos";

type ArquivoGerado = {
  filename: string;
  sizePx: number;
  url: string;
  kind: "png" | "ico";
};

function isArquivoPng(file: File): boolean {
  return (
    file.name.toLowerCase().endsWith(".png") || file.type === "image/png"
  );
}

export function CriarFaviconForm() {
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const [arquivos, setArquivos] = useState<ArquivoGerado[]>([]);
  const [avisoUpscale, setAvisoUpscale] = useState(false);
  const [nomeOriginal, setNomeOriginal] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  function revogarUrls() {
    for (const url of urlsRef.current) {
      URL.revokeObjectURL(url);
    }
    urlsRef.current = [];
  }

  useEffect(() => {
    return () => {
      revogarUrls();
    };
  }, []);

  function limparResultado() {
    revogarUrls();
    setArquivos([]);
    setAvisoUpscale(false);
    setNomeOriginal(null);
    setErro(null);
  }

  async function processarPng(file: File) {
    limparResultado();

    if (!isArquivoPng(file)) {
      setErro("Selecione um arquivo PNG (.png).");
      return;
    }

    if (file.size > MAX_PNG_BYTES) {
      setErro("O PNG é grande demais. O limite é 8 MB.");
      return;
    }

    setCarregando(true);
    let bitmap: ImageBitmap | null = null;

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      if (!isAssinaturaPng(bytes)) {
        setErro("O arquivo não parece ser um PNG válido.");
        return;
      }

      bitmap = await createImageBitmap(file);
      setNomeOriginal(file.name);
      setAvisoUpscale(Math.max(bitmap.width, bitmap.height) < 512);

      const gerados: ArquivoGerado[] = [];
      const novasUrls: string[] = [];
      const blobsIco: { width: number; height: number; data: Uint8Array }[] =
        [];

      for (const saida of FAVICON_SAIDAS_PNG) {
        const blob = await redimensionarPngQuadrado(bitmap, saida.size);
        const url = URL.createObjectURL(blob);
        novasUrls.push(url);
        gerados.push({
          filename: saida.filename,
          sizePx: saida.size,
          url,
          kind: "png",
        });

        if (saida.incluirNoIco) {
          const data = await blobParaUint8Array(blob);
          blobsIco.push({
            width: saida.size,
            height: saida.size,
            data,
          });
        }
      }

      const icoBytes = montarIco(blobsIco);
      const icoBlob = new Blob([new Uint8Array(icoBytes)], {
        type: "image/x-icon",
      });
      const icoUrl = URL.createObjectURL(icoBlob);
      novasUrls.push(icoUrl);
      gerados.push({
        filename: FAVICON_ICO_FILENAME,
        sizePx: 0,
        url: icoUrl,
        kind: "ico",
      });

      urlsRef.current = novasUrls;
      setArquivos(gerados);
    } catch {
      setErro("Não foi possível processar a imagem. Tente outro PNG.");
      revogarUrls();
    } finally {
      bitmap?.close();
      setCarregando(false);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    void processarPng(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (carregando) return;
    setArrastando(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setArrastando(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setArrastando(false);
    if (carregando) return;

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    void processarPng(file);
  }

  const tagsHtml = montarTagsLinkHtml();
  const dropzoneDisabled = carregando;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">
          Imagem PNG de origem
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          role="button"
          tabIndex={dropzoneDisabled ? -1 : 0}
          aria-disabled={dropzoneDisabled}
          aria-busy={carregando}
          onClick={() => {
            if (!dropzoneDisabled) fileInputRef.current?.click();
          }}
          onKeyDown={(event) => {
            if (dropzoneDisabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={
            dropzoneDisabled
              ? "flex w-full cursor-not-allowed flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background px-4 py-10 text-center opacity-60"
              : arrastando
                ? "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-accent bg-background px-4 py-10 text-center ring-2 ring-accent/30"
                : "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background px-4 py-10 text-center transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          }
        >
          <span className="text-base font-semibold text-foreground">
            {carregando ? "Gerando favicons…" : "Selecionar PNG"}
          </span>
          {!carregando && (
            <span className="text-sm text-muted">
              ou arraste o arquivo aqui
            </span>
          )}
        </div>

        <p className="text-xs text-muted">
          Quadrado ou retangular; processamento no navegador — o arquivo não é
          enviado ao servidor.
        </p>

        {nomeOriginal && (
          <p className="text-sm text-muted">
            Origem:{" "}
            <span className="font-medium text-foreground">{nomeOriginal}</span>
          </p>
        )}

        {erro && (
          <p className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        {avisoUpscale && arquivos.length > 0 && (
          <p className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted">
            A imagem tem menos de 512 px no maior lado; ícones maiores serão
            ampliados e podem ficar menos nítidos.
          </p>
        )}
      </div>

      {arquivos.length > 0 && (
        <>
          <section
            aria-label="Arquivos gerados"
            className="flex flex-col gap-4 border-t border-border pt-6"
          >
            <h2 className="text-base font-medium text-foreground">
              Downloads
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {arquivos.map((arquivo) => (
                <li
                  key={arquivo.filename}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    {arquivo.kind === "png" ? (
                      // eslint-disable-next-line @next/next/no-img-element -- URL temporária no cliente
                      <img
                        src={arquivo.url}
                        alt=""
                        width={arquivo.sizePx}
                        height={arquivo.sizePx}
                        className="size-12 shrink-0 rounded border border-border bg-surface object-contain p-1"
                      />
                    ) : (
                      <span
                        className="flex size-12 shrink-0 items-center justify-center rounded border border-border bg-surface text-xs font-medium text-muted"
                        aria-hidden="true"
                      >
                        ICO
                      </span>
                    )}
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <span className="truncate font-mono text-sm text-foreground">
                        {arquivo.filename}
                      </span>
                      {arquivo.kind === "png" && (
                        <span className="text-xs text-muted">
                          {arquivo.sizePx}×{arquivo.sizePx} px
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={arquivo.url}
                    download={arquivo.filename}
                    className="cursor-pointer text-sm font-medium text-accent hover:underline"
                  >
                    Baixar {arquivo.filename}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2 border-t border-border pt-6">
            <h2 className="text-base font-medium text-foreground">
              Tags para o HTML
            </h2>
            <p className="text-sm text-muted">
              Cole no <code className="text-foreground">&lt;head&gt;</code> do
              site (ajuste o caminho se os arquivos não ficarem na raiz).
            </p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              {tagsHtml}
            </pre>
          </section>
        </>
      )}
    </div>
  );
}
