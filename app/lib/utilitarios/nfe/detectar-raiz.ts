import {
  LABEL_POR_RAIZ,
  NFE_NAMESPACE,
  SCHEMA_POR_RAIZ,
  type TipoDocumentoNfe,
} from "./constants";

const RAIZES_SUPORTADAS = new Set<string>(Object.keys(SCHEMA_POR_RAIZ));

export type RaizNfeDetectada = {
  tipo: TipoDocumentoNfe;
  schema: string;
  label: string;
};

export function detectarRaizNfePorNome(
  localName: string,
  namespaceUri: string | null | undefined,
): RaizNfeDetectada | null {
  if (!RAIZES_SUPORTADAS.has(localName)) return null;
  if (namespaceUri && namespaceUri !== NFE_NAMESPACE) return null;

  const tipo = localName as TipoDocumentoNfe;
  return {
    tipo,
    schema: SCHEMA_POR_RAIZ[tipo],
    label: LABEL_POR_RAIZ[tipo],
  };
}

/** Heurística para testes e pré-checagem sem parser XML. */
export function detectarRaizNfeHeuristica(xml: string): RaizNfeDetectada | null {
  const trimmed = xml.trim();
  const match = trimmed.match(
    /<(?:[\w.-]+:)?(nfeProc|enviNFe|NFe)\b[^>]*>/,
  );
  if (!match) return null;

  const tipo = match[1] as TipoDocumentoNfe;
  if (!RAIZES_SUPORTADAS.has(tipo)) return null;

  const hasNs =
    match[0].includes(NFE_NAMESPACE) ||
    trimmed.includes(`xmlns="${NFE_NAMESPACE}"`) ||
    trimmed.includes(`xmlns='${NFE_NAMESPACE}'`);

  if (!hasNs) return null;

  return {
    tipo,
    schema: SCHEMA_POR_RAIZ[tipo],
    label: LABEL_POR_RAIZ[tipo],
  };
}
