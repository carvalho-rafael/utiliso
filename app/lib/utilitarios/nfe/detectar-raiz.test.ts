import { describe, expect, it } from "vitest";
import {
  detectarRaizNfeHeuristica,
  detectarRaizNfePorNome,
} from "./detectar-raiz";
import { NFE_NAMESPACE } from "./constants";

describe("detectarRaizNfePorNome", () => {
  it("aceita nfeProc no namespace oficial", () => {
    const raiz = detectarRaizNfePorNome("nfeProc", NFE_NAMESPACE);
    expect(raiz?.tipo).toBe("nfeProc");
    expect(raiz?.schema).toBe("procNFe_v4.00.xsd");
  });

  it("rejeita raiz com namespace diferente", () => {
    expect(detectarRaizNfePorNome("NFe", "http://example.com")).toBeNull();
  });
});

describe("detectarRaizNfeHeuristica", () => {
  it("detecta nfeProc", () => {
    const xml = `<?xml version="1.0"?><nfeProc xmlns="${NFE_NAMESPACE}" versao="4.00"></nfeProc>`;
    expect(detectarRaizNfeHeuristica(xml)?.tipo).toBe("nfeProc");
  });

  it("detecta enviNFe antes de confundir com NFe", () => {
    const xml = `<?xml version="1.0"?><enviNFe xmlns="${NFE_NAMESPACE}" versao="4.00"></enviNFe>`;
    expect(detectarRaizNfeHeuristica(xml)?.tipo).toBe("enviNFe");
  });
});
