import { describe, expect, it } from "vitest";
import { buildBreadcrumbs } from "./breadcrumbs";

describe("buildBreadcrumbs", () => {
  it("returns empty on home", () => {
    expect(buildBreadcrumbs("/")).toEqual([]);
  });

  it("builds calculadora detail trail", () => {
    expect(buildBreadcrumbs("/calculadoras/rescisao")).toEqual([
      { href: "/", label: "Início" },
      { href: "/calculadoras", label: "Calculadoras" },
      { label: "Rescisão" },
    ]);
  });

  it("builds section index without link on current page", () => {
    expect(buildBreadcrumbs("/tabelas")).toEqual([
      { href: "/", label: "Início" },
      { label: "Tabelas" },
    ]);
  });

  it("builds guia detail from catalog title", () => {
    expect(buildBreadcrumbs("/guias/calculo-inss")).toEqual([
      { href: "/", label: "Início" },
      { href: "/guias", label: "Guias" },
      { label: "Cálculo do INSS" },
    ]);
  });
});
