import { describe, expect, it } from "vitest";
import { calcularDsrSobreComissoes } from "./dsr-sobre-comissoes";

describe("calcularDsrSobreComissoes", () => {
  it("R$ 2.000, 25 úteis e 5 dias de DSR", () => {
    const resultado = calcularDsrSobreComissoes({
      comissoesMes: 2000,
      diasUteis: 25,
      diasDsr: 5,
    });

    expect(resultado.mediaDiaria).toBe(80);
    expect(resultado.dsr).toBe(400);
    expect(resultado.totalComissoesMaisDsr).toBe(2400);
    expect(resultado.verbas).toHaveLength(2);
  });

  it("zero dias de DSR", () => {
    const resultado = calcularDsrSobreComissoes({
      comissoesMes: 2000,
      diasUteis: 25,
      diasDsr: 0,
    });

    expect(resultado.dsr).toBe(0);
    expect(resultado.totalComissoesMaisDsr).toBe(2000);
    expect(resultado.verbas).toHaveLength(1);
  });

  it("arredonda média e DSR", () => {
    const resultado = calcularDsrSobreComissoes({
      comissoesMes: 2500,
      diasUteis: 26,
      diasDsr: 6,
    });

    expect(resultado.mediaDiaria).toBe(96.15);
    expect(resultado.dsr).toBe(576.92);
    expect(resultado.totalComissoesMaisDsr).toBe(3076.92);
  });
});
