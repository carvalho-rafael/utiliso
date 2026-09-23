"use client";

import { useMemo, useState } from "react";
import { consultarCClassTrib } from "../../lib/utilitarios/cclasstrib/consultar";
import type { CClassTribRegistro } from "../../lib/utilitarios/cclasstrib/tabela";
import {
  cclasstribRegistros,
  listarCstDistintos,
} from "../../lib/utilitarios/cclasstrib/tabela";
import { formatarDataAtualizacao } from "../../lib/tabelas/format";

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function formatarVigencia(
  inicio: string | null,
  fim: string | null,
): string {
  const partes: string[] = [];
  if (inicio) {
    partes.push(`desde ${formatarDataAtualizacao(inicio)}`);
  }
  if (fim) {
    partes.push(`até ${formatarDataAtualizacao(fim)}`);
  }
  if (partes.length === 0) return "Vigência não informada na tabela";
  return partes.join(", ");
}

function ResultadoItem({ item }: { item: CClassTribRegistro }) {
  const encerrado = item.fimVigencia != null;

  return (
    <article
      className={`rounded-lg border p-4 ${
        encerrado
          ? "border-border bg-background"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-medium text-foreground">
          <span className="font-mono">{item.cclasstrib}</span>
          <span className="text-muted"> · CST {item.cst}</span>
        </h3>
        {encerrado ? (
          <span className="text-xs font-medium text-danger">Encerrado</span>
        ) : (
          <span className="text-xs font-medium text-success">Vigente</span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{item.nome}</p>
      <p className="mt-1 text-sm text-muted">{item.descricao}</p>
      <dl className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
        <div>
          <dt className="font-medium text-foreground">CST</dt>
          <dd>
            {item.cst} — {item.cstDescricao || "—"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Tipo de alíquota</dt>
          <dd>{item.tipoAliquota}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Redução IBS</dt>
          <dd>{item.pRedIbs}%</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Redução CBS</dt>
          <dd>{item.pRedCbs}%</dd>
        </div>
        {item.lc214 ? (
          <div className="sm:col-span-2">
            <dt className="font-medium text-foreground">LC 214/2025</dt>
            <dd>{item.lc214}</dd>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <dt className="font-medium text-foreground">Vigência</dt>
          <dd>{formatarVigencia(item.inicioVigencia, item.fimVigencia)}</dd>
        </div>
      </dl>
    </article>
  );
}

export function ConsultaCClassTribCstForm() {
  const [consulta, setConsulta] = useState("");
  const [incluirEncerrados, setIncluirEncerrados] = useState(false);

  const cstAtalhos = useMemo(() => listarCstDistintos(), []);

  const resultado = useMemo(
    () =>
      consultarCClassTrib(consulta, {
        incluirEncerrados,
      }),
    [consulta, incluirEncerrados],
  );

  const consultaVazia = consulta.trim().length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-surface p-6">
        <label
          htmlFor="consulta-cclasstrib"
          className="text-sm font-medium text-foreground"
        >
          Código ou texto
        </label>
        <p className="mt-1 text-sm text-muted">
          Informe o cClassTrib (6 dígitos), o CST (3 dígitos) ou parte do nome /
          descrição.
        </p>
        <input
          id="consulta-cclasstrib"
          type="search"
          value={consulta}
          onChange={(event) => setConsulta(event.target.value)}
          placeholder="Ex.: 000001, 000 ou tributação integral"
          className={`${fieldClass} mt-3`}
          autoComplete="off"
          spellCheck={false}
        />
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={incluirEncerrados}
            onChange={(event) => setIncluirEncerrados(event.target.checked)}
            className="cursor-pointer rounded border-border text-accent focus-visible:ring-accent"
          />
          Incluir códigos encerrados
        </label>
        <p className="mt-3 text-xs text-muted">
          A busca roda só no seu navegador; nenhum dado é enviado ao servidor nem
          ao Google Analytics.
        </p>
      </div>

      {consultaVazia ? (
        <section
          aria-labelledby="cst-atalhos"
          className="flex flex-col gap-3"
        >
          <h2
            id="cst-atalhos"
            className="text-sm font-medium text-highlight"
          >
            Atalhos por CST
          </h2>
          <p className="text-sm text-muted">
            {cclasstribRegistros.length} códigos cClassTrib na tabela. Escolha um
            CST para filtrar:
          </p>
          <ul className="flex flex-wrap gap-2">
            {cstAtalhos.map((item) => (
              <li key={item.cst}>
                <button
                  type="button"
                  onClick={() => setConsulta(item.cst)}
                  className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-mono font-medium">{item.cst}</span>
                  <span className="text-muted"> — {item.descricao}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {!consultaVazia && resultado.codigoInexistente ? (
        <p className="text-sm text-danger" role="status">
          O código{" "}
          <span className="font-mono">{resultado.codigoInexistente}</span> não
          consta na tabela do Informe Técnico 2025.002 v.1.60.
        </p>
      ) : null}

      {!consultaVazia && resultado.codigoEncerrado ? (
        <p className="text-sm text-muted" role="status">
          O código{" "}
          <span className="font-mono text-foreground">
            {resultado.codigoEncerrado}
          </span>{" "}
          existe na tabela, mas está encerrado. Marque{" "}
          <strong className="font-medium text-foreground">
            Incluir códigos encerrados
          </strong>{" "}
          para ver os detalhes.
        </p>
      ) : null}

      {!consultaVazia &&
      !resultado.codigoInexistente &&
      !resultado.codigoEncerrado &&
      resultado.itens.length === 0 ? (
        <p className="text-sm text-muted" role="status">
          Nenhum resultado para essa busca com os filtros atuais.
        </p>
      ) : null}

      {resultado.itens.length > 0 ? (
        <section
          aria-labelledby="resultados-cclasstrib"
          className="flex flex-col gap-4"
        >
          <h2
            id="resultados-cclasstrib"
            className="text-sm font-medium text-highlight"
          >
            {resultado.itens.length === 1
              ? "1 resultado"
              : `${resultado.itens.length} resultados`}
          </h2>
          <div className="flex flex-col gap-4">
            {resultado.itens.map((item) => (
              <ResultadoItem key={item.cclasstrib} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
