/** Referência oficial (label + URL) para blocos Fonte em guias e tabelas YMYL. */
export type EditorialFonteRef = {
  label: string;
  href: string;
};

const CLT =
  "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm";
const LC214 =
  "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm";

/** Catálogo reutilizável — importe como `fo` nos catálogos de guias e tabelas. */
export const fo = {
  lei7998: {
    label: "Lei 7.998/1990",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l7998.htm",
  },
  codefat957: {
    label: "Resolução CODEFAT nº 957/2022",
    href:
      "https://www.in.gov.br/web/dou/-/resolucao-codefat-n-957-de-21-de-setembro-de-2022-431328890",
  },
  tabelaMteCodefatInpc: {
    label: "tabela MTE/CODEFAT reajustada pelo INPC",
    href:
      "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/seguro-desemprego",
  },
  portariaMpsMf13_2026: {
    label: "Portaria Interministerial MPS/MF nº 13/2026",
    href:
      "https://www.in.gov.br/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603",
  },
  clt130_146_147: {
    label: "CLT arts. 130, 146 e 147",
    href: `${CLT}#art130`,
  },
  clt146_147_477_487: {
    label: "CLT arts. 146, 147, 477 e 487",
    href: `${CLT}#art146`,
  },
  clt477_487_488: {
    label: "CLT arts. 477, 487 e 488",
    href: `${CLT}#art477`,
  },
  cfArt7_XVII: {
    label: "CF art. 7º, XVII",
    href:
      "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art7",
  },
  sumula171Tst: {
    label: "Súmula 171 do TST",
    href: "https://www.tst.jus.br/sumulas-de-jurisprudencia",
  },
  lei8212_art28_9: {
    label: "Lei 8.212/1991, art. 28, § 9º",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8212.htm#art28",
  },
  lei4090: {
    label: "Lei 4.090/1962",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l4090.htm",
  },
  lei4749: {
    label: "Lei 4.749/1965",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l4749.htm",
  },
  decreto10854_2021: {
    label: "Decreto 10.854/2021",
    href:
      "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10854.htm",
  },
  lei15270: {
    label: "Lei 15.270/2025",
    href:
      "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm",
  },
  lei8036: {
    label: "Lei 8.036/1990",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8036.htm",
  },
  lei8036_arts18_20A: {
    label: "Lei 8.036/1990, arts. 18 e 20-A",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8036.htm#art18",
  },
  lei12506: {
    label: "Lei 12.506/2011",
    href:
      "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm",
  },
  lc214: {
    label: "Lei Complementar nº 214/2025 (reforma do consumo)",
    href: LC214,
  },
  lc214_arts343_346: {
    label: "Lei Complementar nº 214/2025 (arts. 343 e 346)",
    href: `${LC214}#art343`,
  },
  lc214_arts343_346_348: {
    label: "Lei Complementar nº 214/2025 (arts. 343, 346 e 348)",
    href: `${LC214}#art343`,
  },
  ec132_adct124_130: {
    label: "EC 132/2023 (ADCT, arts. 124 a 130)",
    href:
      "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm",
  },
  lc214_arts342_349: {
    label: "Lei Complementar nº 214/2025 (arts. 342 a 349)",
    href: `${LC214}#art342`,
  },
  lc214_arts361_366: {
    label: "Lei Complementar nº 214/2025 (arts. 361 a 366)",
    href: `${LC214}#art361`,
  },
  lc214_art409: {
    label: "Lei Complementar nº 214/2025, art. 409 (Imposto Seletivo)",
    href: `${LC214}#art409`,
  },
  nt2025_002_rtc: {
    label: "Nota Técnica 2025.002-RTC (NF-e/NFC-e)",
    href: "https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=BMPFMBoln3w=",
  },
  tabelaIrrfReceita: {
    label: "Tabela mensal da Receita Federal",
    href:
      "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas",
  },
  decreto12797_2026: {
    label: "Decreto nº 12.797/2025 (salário mínimo nacional de 2026)",
    href:
      "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm",
  },
  tabelaMteCodefatLei7998: {
    label: "Tabela MTE/CODEFAT (Lei 7.998/1990), reajustada pelo INPC",
    href:
      "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/seguro-desemprego",
  },
} as const satisfies Record<string, EditorialFonteRef>;

export type FonteOficialId = keyof typeof fo;
