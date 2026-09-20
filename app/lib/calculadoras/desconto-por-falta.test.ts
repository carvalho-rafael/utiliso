import { describe, expect, it } from "vitest";
import { calcularDescontoPorFalta } from "./desconto-por-falta";

const base = {
  salarioBruto: 3000,
  incluirDsr: true,
};

describe("calcularDescontoPorFalta", () => {
  it("1 falta e 1 semana com DSR", () => {
    const resultado = calcularDescontoPorFalta({
      ...base,
      faltas: 1,
      semanasComFalta: 1,
    });

    expect(resultado.valorDia).toBe(100);
    expect(resultado.descontoFaltas).toBe(100);
    expect(resultado.descontoDsr).toBe(100);
    expect(resultado.totalDescontado).toBe(200);
    expect(resultado.salarioAposDesconto).toBe(2800);
    expect(resultado.descontos).toHaveLength(2);
  });

  it("2 faltas na mesma semana — 1 DSR", () => {
    const resultado = calcularDescontoPorFalta({
      ...base,
      faltas: 2,
      semanasComFalta: 1,
    });

    expect(resultado.descontoFaltas).toBe(200);
    expect(resultado.descontoDsr).toBe(100);
    expect(resultado.totalDescontado).toBe(300);
    expect(resultado.salarioAposDesconto).toBe(2700);
  });

  it("não inclui DSR quando desmarcado", () => {
    const resultado = calcularDescontoPorFalta({
      salarioBruto: 3000,
      faltas: 1,
      incluirDsr: false,
      semanasComFalta: 1,
    });

    expect(resultado.descontoDsr).toBe(0);
    expect(resultado.totalDescontado).toBe(100);
    expect(resultado.salarioAposDesconto).toBe(2900);
    expect(resultado.descontos).toHaveLength(1);
  });

  it("arredonda valor do dia", () => {
    const resultado = calcularDescontoPorFalta({
      salarioBruto: 3100,
      faltas: 1,
      incluirDsr: false,
      semanasComFalta: 1,
    });

    expect(resultado.valorDia).toBe(103.33);
    expect(resultado.descontoFaltas).toBe(103.33);
  });
});
