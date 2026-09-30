export type ContagemCaracteres = {
  caracteres: number;
  caracteresSemEspacos: number;
  palavras: number;
  linhas: number;
};

function contarGrafemas(texto: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("pt-BR", { granularity: "grapheme" });
    return [...segmenter.segment(texto)].map((part) => part.segment);
  }
  return [...texto];
}

function contarLinhas(texto: string): number {
  if (texto.length === 0) return 0;
  const normalizado = texto.replace(/\r\n/g, "\n");
  const partes = normalizado.split("\n");
  return partes.length;
}

function contarPalavras(texto: string): number {
  const trimmed = texto.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/u).length;
}

export function contarCaracteres(texto: string): ContagemCaracteres {
  const grafemas = contarGrafemas(texto);
  const caracteres = grafemas.length;
  const caracteresSemEspacos = grafemas.filter(
    (g) => !/^\s$/u.test(g),
  ).length;

  return {
    caracteres,
    caracteresSemEspacos,
    palavras: contarPalavras(texto),
    linhas: contarLinhas(texto),
  };
}
