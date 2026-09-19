import { describe, expect, it } from "vitest";
import {
  getMaisUtilizadas,
  getMaisUtilizadasCalculadoras,
  getMaisUtilizadasGuias,
  getMaisUtilizadasUtilitarios,
} from "./mais-utilizadas";

describe("Em destaque", () => {
  it("lists rescisão and férias", () => {
    const slugs = getMaisUtilizadasCalculadoras().map((c) => c.slug);
    expect(slugs).toEqual(["rescisao", "ferias"]);
  });

  it("lists guia da primeira parcela do 13º", () => {
    const slugs = getMaisUtilizadasGuias().map((g) => g.slug);
    expect(slugs).toEqual(["primeira-parcela-decimo-terceiro"]);
  });

  it("lists validador de NF-e", () => {
    const slugs = getMaisUtilizadasUtilitarios().map((u) => u.slug);
    expect(slugs).toEqual(["validador-nfe"]);
  });

  it("includes utilitário na ordem após calculadoras e guias", () => {
    const categorias = getMaisUtilizadas().map((item) => item.categoria);
    expect(categorias).toEqual([
      "Calculadora",
      "Calculadora",
      "Guia",
      "Utilitário",
    ]);
  });
});
