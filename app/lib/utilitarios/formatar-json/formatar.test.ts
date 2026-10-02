import { describe, expect, it } from "vitest";
import { diagnosticSintaxeJson, processarJson } from "./formatar";

describe("processarJson", () => {
  it("retorna null em entrada vazia ou só whitespace", () => {
    expect(processarJson("")).toBeNull();
    expect(processarJson("   \n\t  ")).toBeNull();
  });

  it("formata objeto com indentação de 2 espaços", () => {
    const resultado = processarJson('{"a":1,"b":[2,3]}', 2);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.formatado).toBe(
      `{
  "a": 1,
  "b": [
    2,
    3
  ]
}`,
    );
    expect(resultado.minificado).toBe('{"a":1,"b":[2,3]}');
  });

  it("formata com indentação de 4 espaços", () => {
    const resultado = processarJson('{"x":true}', 4);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.formatado).toBe(`{
    "x": true
}`);
  });

  it("aceita array e valores literais", () => {
    const resultado = processarJson("[1,null,false,\"ok\"]");
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.minificado).toBe('[1,null,false,"ok"]');
  });

  it("rejeita JSON com aspas faltando", () => {
    const resultado = processarJson('{nome:"teste"}');
    expect(resultado?.ok).toBe(false);
    if (!resultado || resultado.ok) return;
    expect(resultado.erro).toMatch(/JSON inválido/);
    expect(resultado.linha).toBeGreaterThan(0);
    expect(resultado.coluna).toBeGreaterThan(0);
  });

  it("rejeita vírgula extra", () => {
    const resultado = processarJson('{"a":1,}');
    expect(resultado?.ok).toBe(false);
    if (!resultado || resultado.ok) return;
    expect(resultado.erro).toMatch(/JSON inválido/);
  });

  it("informa linha e coluna quando o motor expõe posição", () => {
    const resultado = processarJson('{nome:"teste"}');
    expect(resultado?.ok).toBe(false);
    if (!resultado || resultado.ok) return;
    expect(resultado.linha).toBe(1);
    expect(resultado.coluna).toBe(2);
  });

  it("preserva inteiro maior que Number.MAX_SAFE_INTEGER", () => {
    const entrada = '{"id":9007199254740993}';
    const resultado = processarJson(entrada, 2);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.minificado).toBe(entrada);
    expect(resultado.formatado).toBe(`{
  "id": 9007199254740993
}`);
  });

  it("preserva inteiro inseguro dentro de array", () => {
    const entrada = "[9007199254740993]";
    const resultado = processarJson(entrada, 2);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.minificado).toBe(entrada);
    expect(resultado.formatado).toBe(`[
  9007199254740993
]`);
  });

  it("preserva literal não finito como 1e309", () => {
    const entrada = '{"big":1e309}';
    const resultado = processarJson(entrada);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.minificado).toBe(entrada);
  });

  it("mantém inteiro no limite seguro sem alterar", () => {
    const entrada = '{"id":9007199254740991}';
    const resultado = processarJson(entrada, 2);
    expect(resultado?.ok).toBe(true);
    if (!resultado || !resultado.ok) return;
    expect(resultado.minificado).toBe(entrada);
    expect(resultado.formatado).toBe(`{
  "id": 9007199254740991
}`);
  });
});

describe("diagnosticSintaxeJson", () => {
  it("retorna null em vazio ou JSON válido", () => {
    expect(diagnosticSintaxeJson("")).toBeNull();
    expect(diagnosticSintaxeJson('{"ok":true}')).toBeNull();
  });

  it("expõe mensagem e posição para o linter", () => {
    const d = diagnosticSintaxeJson('{nome:"teste"}');
    expect(d).toEqual({
      linha: 1,
      coluna: 2,
      mensagem: "JSON inválido na linha 1, coluna 2.",
    });
  });
});
