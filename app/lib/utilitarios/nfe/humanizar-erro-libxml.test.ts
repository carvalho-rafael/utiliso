import { describe, expect, it } from "vitest";
import { humanizarMensagemErroXml } from "./humanizar-erro-libxml";

describe("humanizarMensagemErroXml", () => {
  it("traduz elemento inesperado com lista de esperados", () => {
    const raw =
      "Element '{http://www.portalfiscal.inf.br/nfe}IBSCBS': This element is not expected. Expected is ( COFINSST, ICMSUFDest ).";
    const { mensagem, mensagemTecnica } = humanizarMensagemErroXml(raw);
    expect(mensagem).toContain('A tag "IBSCBS"');
    expect(mensagem).toContain("COFINSST, ICMSUFDest");
    expect(mensagemTecnica).toBe(raw);
  });

  it("traduz invalid child element estilo ACBr", () => {
    const raw =
      "invalid child element 'IBSCBS' in element 'imposto'. List of possible elements expected: 'COFINSST, ICMSUFDest'.";
    const { mensagem } = humanizarMensagemErroXml(raw);
    expect(mensagem).toContain('"IBSCBS"');
    expect(mensagem).toContain("COFINSST, ICMSUFDest");
  });

  it("traduz facet pattern", () => {
    const raw =
      "[facet 'pattern'] The value 'NFe123' is not accepted by the pattern 'NFe[0-9]{44}'.";
    const { mensagem } = humanizarMensagemErroXml(raw);
    expect(mensagem).toContain("NFe123");
    expect(mensagem).toContain("formato");
  });

  it("traduz tag mismatch", () => {
    const raw =
      "Opening and ending tag mismatch: infNFe line 12 and NFe";
    const { mensagem } = humanizarMensagemErroXml(raw);
    expect(mensagem).toContain("infNFe");
    expect(mensagem).toContain("NFe");
  });

  it("mantém mensagem já em português sem técnica duplicada", () => {
    const raw = "Informe o conteúdo XML da NF-e.";
    const { mensagem, mensagemTecnica } = humanizarMensagemErroXml(raw);
    expect(mensagem).toContain("estrutura");
    expect(mensagemTecnica).toBe(raw);
  });
});
