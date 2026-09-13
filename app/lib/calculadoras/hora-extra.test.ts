import { describe, expect, it } from "vitest";
import { calcularHoraExtra } from "./hora-extra";

const base = {
  salarioBruto: 3000,
  jornadaMensal: 220,
  incluirDsr: true,
  diasUteis: 25,
  diasDsr: 5,
  dependentes: 0,
};

describe("calcularHoraExtra", () => {
  it("10h a 50% com DSR 25/5", () => {
    const resultado = calcularHoraExtra({
      ...base,
      linhas: [{ horas: 10, adicionalPercentual: 50 }],
    });

    expect(resultado.valorHora).toBe(13.64);
    expect(resultado.valoresHoraExtra).toEqual([
      { adicionalPercentual: 50, valor: 20.46 },
    ]);
    expect(resultado.verbas).toEqual([
      { label: "Hora extra 50% (10h)", valor: 204.6, tipo: "verba" },
      { label: "DSR sobre horas extras (5 dias)", valor: 40.92, tipo: "verba" },
    ]);
    expect(resultado.descontos).toEqual([
      { label: "INSS", valor: 29.46, tipo: "desconto" },
    ]);
    expect(resultado.fgts[0]?.valor).toBe(19.64);
    expect(resultado.totalVerbas).toBe(245.52);
    expect(resultado.totalDescontos).toBe(29.46);
    expect(resultado.liquido).toBe(216.06);
    expect(resultado.tabelasAno).toBe(2026);
  });

  it("não inclui DSR quando desmarcado", () => {
    const resultado = calcularHoraExtra({
      ...base,
      incluirDsr: false,
      linhas: [{ horas: 10, adicionalPercentual: 50 }],
    });

    expect(resultado.verbas.some((verba) => verba.label.startsWith("DSR"))).toBe(
      false,
    );
    expect(resultado.totalVerbas).toBe(204.6);
    expect(resultado.descontos[0]?.valor).toBe(24.55);
    expect(resultado.liquido).toBe(180.05);
  });

  it("8h a 100%", () => {
    const resultado = calcularHoraExtra({
      ...base,
      linhas: [{ horas: 8, adicionalPercentual: 100 }],
    });

    expect(resultado.valoresHoraExtra[0]?.valor).toBe(27.28);
    expect(resultado.totalVerbas).toBe(261.89);
    expect(resultado.liquido).toBe(230.46);
  });

  it("adicional de CCT 70%", () => {
    const resultado = calcularHoraExtra({
      ...base,
      linhas: [{ horas: 10, adicionalPercentual: 70 }],
    });

    expect(resultado.valoresHoraExtra[0]?.valor).toBe(23.19);
    expect(resultado.totalVerbas).toBe(278.28);
    expect(resultado.liquido).toBe(244.89);
  });

  it("soma 50% e 100% no DSR", () => {
    const resultado = calcularHoraExtra({
      ...base,
      linhas: [
        { horas: 10, adicionalPercentual: 50 },
        { horas: 8, adicionalPercentual: 100 },
      ],
    });

    expect(resultado.totalVerbas).toBe(507.41);
    expect(resultado.liquido).toBe(446.52);
  });

  it("INSS incremental é 0 no teto; FGTS e IRRF continuam", () => {
    const resultado = calcularHoraExtra({
      ...base,
      salarioBruto: 8475.55,
      linhas: [{ horas: 10, adicionalPercentual: 50 }],
    });

    expect(resultado.descontos.find((item) => item.label === "INSS")).toBeUndefined();
    expect(resultado.descontos.find((item) => item.label === "IRRF")?.valor).toBe(
      190.74,
    );
    expect(resultado.fgts[0]?.valor).toBe(55.49);
    expect(resultado.liquido).toBe(502.86);
  });

  it("Lei 15.270: extras que passam de R$ 5.000 carregam o IRRF do mês", () => {
    const resultado = calcularHoraExtra({
      ...base,
      salarioBruto: 4900,
      linhas: [{ horas: 20, adicionalPercentual: 50 }],
    });

    expect(resultado.descontos.find((item) => item.label === "IRRF")?.valor).toBe(
      272.85,
    );
    expect(resultado.liquido).toBe(416.73);
  });

  it("divisor 200", () => {
    const resultado = calcularHoraExtra({
      ...base,
      jornadaMensal: 200,
      incluirDsr: false,
      linhas: [{ horas: 10, adicionalPercentual: 50 }],
    });

    expect(resultado.valorHora).toBe(15);
    expect(resultado.totalVerbas).toBe(225);
    expect(resultado.liquido).toBe(198);
  });

  it("hora fracionada 1,5h", () => {
    const resultado = calcularHoraExtra({
      ...base,
      incluirDsr: false,
      linhas: [{ horas: 1.5, adicionalPercentual: 50 }],
    });

    expect(resultado.verbas[0]?.valor).toBe(30.69);
    expect(resultado.liquido).toBe(27.01);
  });
});
