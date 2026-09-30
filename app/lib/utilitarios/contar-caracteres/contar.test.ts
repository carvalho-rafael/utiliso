import { describe, expect, it } from "vitest";
import { contarCaracteres } from "./contar";

describe("contarCaracteres", () => {
  it("zera totais em texto vazio", () => {
    expect(contarCaracteres("")).toEqual({
      caracteres: 0,
      caracteresSemEspacos: 0,
      palavras: 0,
      linhas: 0,
    });
  });

  it("conta caracteres com acentos", () => {
    const resultado = contarCaracteres("ação");
    expect(resultado.caracteres).toBe(4);
    expect(resultado.caracteresSemEspacos).toBe(4);
    expect(resultado.palavras).toBe(1);
    expect(resultado.linhas).toBe(1);
  });

  it("conta emoji composto como um grafema", () => {
    const resultado = contarCaracteres("👨‍👩‍👧");
    expect(resultado.caracteres).toBe(1);
    expect(resultado.caracteresSemEspacos).toBe(1);
  });

  it("exclui espaços em caracteresSemEspacos", () => {
    const resultado = contarCaracteres("a b  c");
    expect(resultado.caracteres).toBe(6);
    expect(resultado.caracteresSemEspacos).toBe(3);
    expect(resultado.palavras).toBe(3);
  });

  it("conta palavras separadas por whitespace", () => {
    expect(contarCaracteres("  uma   duas\ttrês  ").palavras).toBe(3);
    expect(contarCaracteres("   ").palavras).toBe(0);
  });

  it("conta linhas com quebras Unix e Windows", () => {
    expect(contarCaracteres("a").linhas).toBe(1);
    expect(contarCaracteres("a\nb").linhas).toBe(2);
    expect(contarCaracteres("a\r\nb").linhas).toBe(2);
    expect(contarCaracteres("linha1\nlinha2\n").linhas).toBe(3);
  });
});
