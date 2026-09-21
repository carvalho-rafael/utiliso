import { describe, expect, it } from "vitest";
import { calcularSobreaviso } from "./sobreaviso";

const base = {
  salarioBruto: 3000,
  jornadaMensal: 220,
  dependentes: 0,
};

describe("calcularSobreaviso", () => {
  it("24h de sobreaviso", () => {
    const resultado = calcularSobreaviso({
      ...base,
      regime: "sobreaviso",
      horasSobreaviso: 24,
      horasProntidao: 0,
    });

    expect(resultado.valorHora).toBe(13.64);
    expect(resultado.valorHoraSobreaviso).toBe(4.55);
    expect(resultado.totalVerbas).toBe(109.2);
    expect(resultado.verbas).toHaveLength(1);
    expect(resultado.tabelasAno).toBe(2026);
  });

  it("12h de prontidão", () => {
    const resultado = calcularSobreaviso({
      ...base,
      regime: "prontidao",
      horasSobreaviso: 0,
      horasProntidao: 12,
    });

    expect(resultado.valorHoraProntidao).toBe(9.09);
    expect(resultado.totalVerbas).toBe(109.08);
  });

  it("sobreaviso e prontidão no mesmo mês", () => {
    const resultado = calcularSobreaviso({
      ...base,
      regime: "ambos",
      horasSobreaviso: 8,
      horasProntidao: 6,
    });

    expect(resultado.verbas).toHaveLength(2);
    expect(resultado.totalVerbas).toBe(90.94);
  });

  it("jornada custom 200", () => {
    const resultado = calcularSobreaviso({
      ...base,
      jornadaMensal: 200,
      regime: "sobreaviso",
      horasSobreaviso: 10,
      horasProntidao: 0,
    });

    expect(resultado.valorHora).toBe(15);
    expect(resultado.valorHoraSobreaviso).toBe(5);
    expect(resultado.totalVerbas).toBe(50);
  });
});
