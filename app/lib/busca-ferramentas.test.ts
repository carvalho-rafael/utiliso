import { describe, expect, it } from "vitest";
import { buscarFerramentas, totalBuscaFerramentas } from "./busca-ferramentas";

describe("buscarFerramentas", () => {
  it("returns empty when query is blank", () => {
    const resultado = buscarFerramentas("   ");
    expect(totalBuscaFerramentas(resultado)).toBe(0);
  });

  it("finds calculadoras, guias and tabelas in one search", () => {
    const resultado = buscarFerramentas("inss");
    expect(resultado.calculadoras.some((c) => c.slug === "salario-liquido")).toBe(
      true,
    );
    expect(resultado.guias.some((g) => g.slug === "calculo-inss")).toBe(true);
    expect(resultado.tabelas.some((t) => t.slug === "inss")).toBe(true);
  });

  it("matches guia title", () => {
    const resultado = buscarFerramentas("demissão");
    expect(
      resultado.guias.some((g) => g.slug === "pedido-de-demissao-o-que-recebo"),
    ).toBe(true);
  });
});
