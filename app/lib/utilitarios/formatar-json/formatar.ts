export type FormatacaoJson =
  | { ok: true; formatado: string; minificado: string }
  | { ok: false; erro: string; linha?: number; coluna?: number };

export type IndentacaoJson = 2 | 4;

function indiceParaLinhaColuna(texto: string, indice: number): { linha: number; coluna: number } {
  const ate = Math.min(Math.max(0, indice), texto.length);
  let linha = 1;
  let coluna = 1;
  for (let i = 0; i < ate; i++) {
    if (texto[i] === "\n") {
      linha += 1;
      coluna = 1;
    } else {
      coluna += 1;
    }
  }
  return { linha, coluna };
}

function extrairPosicaoErro(mensagem: string): { linha?: number; coluna?: number; indice?: number } {
  const linhaColuna = /line (\d+) column (\d+)/i.exec(mensagem);
  if (linhaColuna) {
    return {
      linha: Number.parseInt(linhaColuna[1], 10),
      coluna: Number.parseInt(linhaColuna[2], 10),
    };
  }

  const position = /position (\d+)/i.exec(mensagem);
  if (position) {
    return { indice: Number.parseInt(position[1], 10) };
  }

  return {};
}

function mensagemErroJson(texto: string, cause: unknown): FormatacaoJson {
  if (!(cause instanceof SyntaxError)) {
    return { ok: false, erro: "JSON inválido." };
  }

  const pos = extrairPosicaoErro(cause.message);
  if (pos.linha !== undefined && pos.coluna !== undefined) {
    return {
      ok: false,
      erro: `JSON inválido na linha ${pos.linha}, coluna ${pos.coluna}.`,
      linha: pos.linha,
      coluna: pos.coluna,
    };
  }

  if (pos.indice !== undefined) {
    const { linha, coluna } = indiceParaLinhaColuna(texto, pos.indice);
    return {
      ok: false,
      erro: `JSON inválido na linha ${linha}, coluna ${coluna}.`,
      linha,
      coluna,
    };
  }

  return { ok: false, erro: "JSON inválido." };
}

type JsonReviverContext = { source?: string };

function numeroPrecisaLexemaOriginal(value: number): boolean {
  if (!Number.isFinite(value)) {
    return true;
  }
  return Number.isInteger(value) && !Number.isSafeInteger(value);
}

function reviverPreservarNumeros(
  _key: string,
  value: unknown,
  context?: JsonReviverContext,
): unknown {
  if (typeof value !== "number" || !numeroPrecisaLexemaOriginal(value)) {
    return value;
  }

  const source = context?.source;
  const rawJSON = (JSON as { rawJSON?: (text: string) => unknown }).rawJSON;
  if (typeof source !== "string" || typeof rawJSON !== "function") {
    return value;
  }

  return rawJSON(source);
}

/**
 * Valida o texto e, se for JSON válido, devolve versões formatada e minificada.
 * Retorna `null` quando a entrada está vazia (apenas espaços em branco).
 */
export type DiagnosticSintaxeJson = {
  linha: number;
  coluna: number;
  mensagem: string;
};

/** Posição de erro de sintaxe para linter do editor (1-based). */
export function diagnosticSintaxeJson(entrada: string): DiagnosticSintaxeJson | null {
  const resultado = processarJson(entrada);
  if (resultado === null || resultado.ok) {
    return null;
  }

  return {
    linha: resultado.linha ?? 1,
    coluna: resultado.coluna ?? 1,
    mensagem: resultado.erro,
  };
}

export function processarJson(
  entrada: string,
  indentacao: IndentacaoJson = 2,
): FormatacaoJson | null {
  const trimmed = entrada.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const valor = JSON.parse(trimmed, reviverPreservarNumeros) as unknown;
    const espacos = " ".repeat(indentacao);
    const formatado = JSON.stringify(valor, null, espacos);
    const minificado = JSON.stringify(valor);
    return { ok: true, formatado, minificado };
  } catch (cause) {
    return mensagemErroJson(entrada, cause);
  }
}
