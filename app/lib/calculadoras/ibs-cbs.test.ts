import { describe, expect, it } from "vitest";
import {
  ALIQUOTA_CBS_2026,
  ALIQUOTA_IBS_UF_2026,
  calcularIbsCbs,
} from "./ibs-cbs";

describe("calcularIbsCbs", () => {
  it("applies 2026 test rates por fora on integral regime", () => {
    const resultado = calcularIbsCbs({
      valorOperacao: 1000,
      regime: "integral",
    });

    expect(resultado.cbs).toBe(9);
    expect(resultado.ibsUf).toBe(1);
    expect(resultado.ibsMun).toBe(0);
    expect(resultado.totalTributos).toBe(10);
    expect(resultado.totalComTributos).toBe(1010);
    expect(resultado.aliquotaCbs).toBe(ALIQUOTA_CBS_2026);
    expect(resultado.aliquotaIbsUf).toBe(ALIQUOTA_IBS_UF_2026);
  });

  it("reduces aliquotas with regime reducao60", () => {
    const resultado = calcularIbsCbs({
      valorOperacao: 1000,
      regime: "reducao60",
    });

    expect(resultado.cbs).toBe(5.4);
    expect(resultado.ibsUf).toBe(0.6);
    expect(resultado.totalTributos).toBe(6);
  });

  it("zeros tributos on aliquota zero regime", () => {
    const resultado = calcularIbsCbs({
      valorOperacao: 500,
      regime: "zero",
    });

    expect(resultado.totalTributos).toBe(0);
    expect(resultado.totalComTributos).toBe(500);
  });
});
