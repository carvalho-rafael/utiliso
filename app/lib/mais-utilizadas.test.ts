import { describe, expect, it } from "vitest";
import {
  getMaisUtilizadasCalculadoras,
  getMaisUtilizadasGuias,
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
});
