import { describe, expect, it } from "vitest";
import { montarTextoBreakdownCalculadora } from "./resultado-texto";

describe("montarTextoBreakdownCalculadora", () => {
  it("includes breakdown, total and disclaimer", () => {
    const texto = montarTextoBreakdownCalculadora({
      tituloCalculadora: "Calculadora de salário líquido",
      path: "/calculadoras/salario-liquido",
      tabelasAno: 2026,
      verbas: [{ label: "Salário bruto", valor: 3000 }],
      descontos: [{ label: "INSS", valor: 200 }],
      fgts: [],
      totalVerbas: 3000,
      totalDescontos: 200,
      liquidoLabel: "Salário líquido",
      liquido: 2800,
    });

    expect(texto).toContain("Utiliso — Calculadora de salário líquido");
    expect(texto).toContain("Salário bruto: R$\u00a03.000,00");
    expect(texto).toContain("Salário líquido: R$\u00a02.800,00");
    expect(texto).toContain("https://www.utiliso.com.br/calculadoras/salario-liquido");
    expect(texto).toContain("Não substitui contador");
  });
});
