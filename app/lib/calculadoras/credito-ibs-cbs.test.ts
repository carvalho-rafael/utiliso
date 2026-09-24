import { describe, expect, it } from "vitest";
import { calcularCreditoIbsCbs } from "./credito-ibs-cbs";

describe("calcularCreditoIbsCbs", () => {
  it("subtrai créditos informados do débito de teste de 2026", () => {
    const resultado = calcularCreditoIbsCbs({
      valorOperacao: 1000,
      regime: "integral",
      creditoCbs: 4,
      creditoIbsUf: 0.5,
      creditoIbsMun: 0,
      origemFornecedor: "regime-regular",
    });

    expect(resultado.totalDebito).toBe(10);
    expect(resultado.totalCredito).toBe(4.5);
    expect(resultado.totalSaldo).toBe(5.5);
    expect(resultado.totalExcessoCredito).toBe(0);
    expect(resultado.linhas[0]?.saldo).toBe(5);
    expect(resultado.linhas[1]?.saldo).toBe(0.5);
  });

  it("registra excesso de crédito sem saldo negativo", () => {
    const resultado = calcularCreditoIbsCbs({
      valorOperacao: 1000,
      regime: "integral",
      creditoCbs: 15,
      creditoIbsUf: 0,
      creditoIbsMun: 0,
      origemFornecedor: "regime-regular",
    });

    expect(resultado.linhas[0]?.saldo).toBe(0);
    expect(resultado.linhas[0]?.excessoCredito).toBe(6);
    expect(resultado.totalSaldo).toBe(1);
    expect(resultado.totalExcessoCredito).toBe(6);
  });
});
