import { describe, expect, it } from "vitest";
import {
  calcularDiasTrabalhados,
  contarDiasTrabalhados,
  salarioProporcionalIntervalo,
} from "./dias-trabalhados";

function data(dia: number, mes: number, ano: number): Date {
  return new Date(ano, mes - 1, dia);
}

describe("contarDiasTrabalhados", () => {
  it("conta dias inclusive no mesmo mês", () => {
    expect(contarDiasTrabalhados(data(1, 3, 2026), data(15, 3, 2026))).toBe(15);
    expect(contarDiasTrabalhados(data(12, 3, 2026), data(12, 3, 2026))).toBe(1);
  });
});

describe("salarioProporcionalIntervalo", () => {
  it("usa dias do mês civil", () => {
    const bruto = salarioProporcionalIntervalo(
      3100,
      data(1, 3, 2026),
      data(15, 3, 2026),
    );
    expect(bruto).toBe(roundExpected(3100, 31, 15));
  });
});

function roundExpected(salario: number, diasMes: number, dias: number): number {
  return Math.round(((salario / diasMes) * dias) * 100) / 100;
}

describe("calcularDiasTrabalhados", () => {
  it("15 dias em março com INSS e IRRF", () => {
    const resultado = calcularDiasTrabalhados({
      salarioBruto: 3000,
      dataInicio: data(1, 3, 2026),
      dataFim: data(15, 3, 2026),
      dependentes: 0,
    });

    expect(resultado.diasTrabalhados).toBe(15);
    expect(resultado.diasNoMes).toBe(31);
    expect(resultado.mesContaComoAvo).toBe(true);
    expect(resultado.brutoProporcional).toBe(roundExpected(3000, 31, 15));
    expect(resultado.verbas[0]?.valor).toBe(resultado.brutoProporcional);
    const totalDescontos =
      (resultado.descontos[0]?.valor ?? 0) +
      (resultado.descontos[1]?.valor ?? 0);
    expect(resultado.liquido).toBe(
      roundExpected(resultado.brutoProporcional - totalDescontos, 1, 1),
    );
    expect(resultado.tabelasAno).toBe(2026);
  });

  it("14 dias não gera avo", () => {
    const resultado = calcularDiasTrabalhados({
      salarioBruto: 3000,
      dataInicio: data(1, 3, 2026),
      dataFim: data(14, 3, 2026),
      dependentes: 0,
    });

    expect(resultado.diasTrabalhados).toBe(14);
    expect(resultado.mesContaComoAvo).toBe(false);
  });

  it("saldo de um dia no mês", () => {
    const resultado = calcularDiasTrabalhados({
      salarioBruto: 3000,
      dataInicio: data(1, 10, 2026),
      dataFim: data(1, 10, 2026),
      dependentes: 0,
    });

    expect(resultado.diasTrabalhados).toBe(1);
    expect(resultado.brutoProporcional).toBe(roundExpected(3000, 31, 1));
  });
});
