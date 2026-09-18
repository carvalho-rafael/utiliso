import { formatarMoeda } from "./format";
import { SITE_URL } from "../site";

export const AVISO_RESULTADO_TEXTO =
  "Estimativa. Não substitui contador, advogado ou departamento pessoal.";

export type LinhaTextoResultado = {
  label: string;
  valor: string;
};

export type SecaoTextoResultado = {
  titulo: string;
  linhas: LinhaTextoResultado[];
};

export function linhasMonetarias(
  linhas: { label: string; valor: number }[],
  isDesconto = false,
): LinhaTextoResultado[] {
  return linhas.map((linha) => ({
    label: linha.label,
    valor: `${isDesconto ? "- " : ""}${formatarMoeda(linha.valor)}`,
  }));
}

export function montarTextoResultado(params: {
  tituloCalculadora: string;
  path: string;
  secoes: SecaoTextoResultado[];
  destaque?: LinhaTextoResultado;
  paragrafos?: string[];
}): string {
  const url = `${SITE_URL}${params.path}`;
  const linhas: string[] = [`Utiliso — ${params.tituloCalculadora}`, ""];

  for (const paragrafo of params.paragrafos ?? []) {
    linhas.push(paragrafo, "");
  }

  for (const secao of params.secoes) {
    linhas.push(`${secao.titulo}:`);
    for (const linha of secao.linhas) {
      linhas.push(`- ${linha.label}: ${linha.valor}`);
    }
    linhas.push("");
  }

  if (params.destaque) {
    linhas.push(`${params.destaque.label}: ${params.destaque.valor}`, "");
  }

  linhas.push(AVISO_RESULTADO_TEXTO, url);

  return linhas.join("\n").trim();
}

export function montarTextoBreakdownCalculadora(params: {
  tituloCalculadora: string;
  path: string;
  tabelasAno: number;
  verbas: { label: string; valor: number }[];
  descontos: { label: string; valor: number }[];
  fgts: { label: string; valor: number }[];
  totalVerbas: number;
  totalDescontos: number;
  liquidoLabel: string;
  liquido: number;
  tituloVerbas?: string;
  tituloDescontos?: string;
  tituloFgts?: string;
  extraSecoes?: SecaoTextoResultado[];
  extraParagrafos?: string[];
}): string {
  const secoes: SecaoTextoResultado[] = [
    ...(params.extraSecoes ?? []),
  ];

  if (params.verbas.length > 0) {
    secoes.push({
      titulo: params.tituloVerbas ?? "Proventos",
      linhas: linhasMonetarias(params.verbas),
    });
  }

  if (params.descontos.length > 0) {
    secoes.push({
      titulo: params.tituloDescontos ?? "Descontos",
      linhas: linhasMonetarias(params.descontos, true),
    });
  }

  if (params.fgts.length > 0) {
    secoes.push({
      titulo: params.tituloFgts ?? "FGTS (estimativa)",
      linhas: linhasMonetarias(params.fgts),
    });
  }

  secoes.push({
    titulo: "Totais",
    linhas: [
      { label: "Total de proventos", valor: formatarMoeda(params.totalVerbas) },
      {
        label: "Total de descontos",
        valor: `- ${formatarMoeda(params.totalDescontos)}`,
      },
    ],
  });

  return montarTextoResultado({
    tituloCalculadora: params.tituloCalculadora,
    path: params.path,
    secoes,
    destaque: {
      label: params.liquidoLabel,
      valor: formatarMoeda(params.liquido),
    },
    paragrafos: [
      `Tabelas de ${params.tabelasAno}.`,
      ...(params.extraParagrafos ?? []),
    ],
  });
}
