import { describe, expect, it } from "vitest";
import { consultarCClassTrib } from "./consultar";

describe("consultarCClassTrib", () => {
  it("encontra 000001 com tributação integral e sem redução", () => {
    const { itens, codigoInexistente } = consultarCClassTrib("000001");
    expect(codigoInexistente).toBeNull();
    expect(itens).toHaveLength(1);
    expect(itens[0]?.cclasstrib).toBe("000001");
    expect(itens[0]?.cstDescricao).toMatch(/integral/i);
    expect(itens[0]?.pRedIbs).toBe(0);
    expect(itens[0]?.pRedCbs).toBe(0);
  });

  it("lista códigos do CST 000", () => {
    const { itens } = consultarCClassTrib("000");
    expect(itens.length).toBeGreaterThan(1);
    expect(itens.every((item) => item.cst === "000")).toBe(true);
  });

  it("oculta 220001 encerrado por padrão", () => {
    const oculto = consultarCClassTrib("220001");
    expect(oculto.itens).toHaveLength(0);
    expect(oculto.codigoEncerrado).toBe("220001");
    expect(oculto.codigoInexistente).toBeNull();

    const visivel = consultarCClassTrib("220001", {
      incluirEncerrados: true,
    });
    expect(visivel.itens).toHaveLength(1);
    expect(visivel.itens[0]?.fimVigencia).toBe("2026-07-09");
  });

  it("informa código inexistente", () => {
    const { itens, codigoInexistente } = consultarCClassTrib("999999");
    expect(itens).toHaveLength(0);
    expect(codigoInexistente).toBe("999999");
  });
});
