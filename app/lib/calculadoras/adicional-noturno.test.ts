import { describe, expect, it } from "vitest";
import {
  calcularAdicionalNoturno,
  horasNoturnasComputadas,
  pisoAdicionalNoturno,
} from "./adicional-noturno";

const base = {
  salarioBruto: 2200,
  jornadaMensal: 220,
  categoria: "urbano" as const,
  horasRelogio: 7,
  adicionalPercentual: 20,
  aplicarHoraReduzida: true,
  incluirDsr: false,
  diasUteis: 25,
  diasDsr: 5,
  dependentes: 0,
};

describe("horasNoturnasComputadas", () => {
  it("aplica fator 8/7 quando hora reduzida", () => {
    expect(horasNoturnasComputadas(7, true)).toBe(8);
  });

  it("mantém horas de relógio sem hora reduzida", () => {
    expect(horasNoturnasComputadas(7, false)).toBe(7);
  });
});

describe("pisoAdicionalNoturno", () => {
  it("urbano 20% e rural 25%", () => {
    expect(pisoAdicionalNoturno("urbano")).toBe(20);
    expect(pisoAdicionalNoturno("rural")).toBe(25);
  });
});

describe("calcularAdicionalNoturno", () => {
  it("urbano com hora reduzida (exemplo do plano)", () => {
    const resultado = calcularAdicionalNoturno(base);

    expect(resultado.valorHora).toBe(10);
    expect(resultado.valorHoraNoturna).toBe(12);
    expect(resultado.horasComputadas).toBe(8);
    expect(resultado.verbas).toHaveLength(1);
    expect(resultado.totalVerbas).toBe(16);
  });

  it("sem hora reduzida", () => {
    const resultado = calcularAdicionalNoturno({
      ...base,
      aplicarHoraReduzida: false,
      horasRelogio: 8,
    });

    expect(resultado.horasComputadas).toBe(8);
    expect(resultado.verbas).toHaveLength(1);
    expect(resultado.totalVerbas).toBe(16);
  });

  it("rural 25% sem hora reduzida", () => {
    const resultado = calcularAdicionalNoturno({
      ...base,
      salarioBruto: 3000,
      categoria: "rural",
      adicionalPercentual: 25,
      aplicarHoraReduzida: false,
      horasRelogio: 10,
    });

    expect(resultado.valorHora).toBe(13.64);
    expect(resultado.totalVerbas).toBe(34.1);
  });

  it("inclui DSR", () => {
    const resultado = calcularAdicionalNoturno({
      ...base,
      incluirDsr: true,
    });

    expect(resultado.verbas).toHaveLength(2);
    expect(resultado.totalVerbas).toBe(19.2);
  });

  it("desconta INSS sobre o acréscimo", () => {
    const resultado = calcularAdicionalNoturno({
      ...base,
      salarioBruto: 8000,
      horasRelogio: 40,
      aplicarHoraReduzida: false,
      incluirDsr: true,
    });

    expect(resultado.descontos.some((d) => d.label === "INSS")).toBe(true);
    expect(resultado.fgts.length).toBe(1);
    expect(resultado.tabelasAno).toBe(2026);
  });
});
