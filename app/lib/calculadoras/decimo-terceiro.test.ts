import { describe, expect, it } from "vitest";
import {
  avosDecimoTerceiroNoAno,
  avosDecimoTerceiroNoPeriodo,
  calcularDecimoTerceiro,
} from "./decimo-terceiro";

function data(dia: number, mes: number, ano: number) {
  return new Date(ano, mes - 1, dia);
}

describe("avosDecimoTerceiroNoPeriodo", () => {
  it("conta avos da admissão até a data de saída no ano", () => {
    expect(
      avosDecimoTerceiroNoPeriodo(data(1, 1, 2026), data(30, 6, 2026), 2026),
    ).toBe(6);
  });

  it("ignora mês com 14 dias ou menos na admissão", () => {
    expect(
      avosDecimoTerceiroNoPeriodo(data(20, 3, 2026), data(31, 12, 2026), 2026),
    ).toBe(9);
  });

  it("equivale ao ano inteiro quando a saída é 31/12", () => {
    const admissao = data(15, 4, 2026);
    expect(avosDecimoTerceiroNoAno(admissao, 2026)).toBe(
      avosDecimoTerceiroNoPeriodo(admissao, data(31, 12, 2026), 2026),
    );
  });
});

describe("calcularDecimoTerceiro", () => {
  it("no acerto, líquido é bruto menos INSS e IRRF", () => {
    const resultado = calcularDecimoTerceiro({
      salarioBruto: 3000,
      mesesTrabalhados: 6,
      dependentes: 0,
      modoPagamento: "acerto",
    });
    expect(resultado.primeiraParcela).toBe(0);
    expect(resultado.liquido).toBe(resultado.segundaParcela);
    expect(resultado.liquido).toBeLessThan(resultado.bruto);
    expect(resultado.modoPagamento).toBe("acerto");
  });

  it("nas parcelas, líquido é soma da 1ª e 2ª", () => {
    const resultado = calcularDecimoTerceiro({
      salarioBruto: 3000,
      mesesTrabalhados: 12,
      dependentes: 0,
      modoPagamento: "duas-parcelas",
    });
    expect(resultado.liquido).toBe(
      resultado.primeiraParcela + resultado.segundaParcela,
    );
  });
});
