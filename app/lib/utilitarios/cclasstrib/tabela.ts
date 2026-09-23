import type { EditorialMetaFields } from "../../../components/tabela-meta";
import { fo } from "../../editorial/fontes-oficiais";
import registrosJson from "./registros.json";

export const CCLASSTRIB_INFORME = registrosJson.informeTecnico;
export const CCLASSTRIB_VERSAO = registrosJson.versao;
export const CCLASSTRIB_PUBLICADO_EM = registrosJson.publicadoEm;

export type CClassTribRegistro = {
  cclasstrib: string;
  cst: string;
  nome: string;
  descricao: string;
  cstDescricao: string;
  tipoAliquota: string;
  pRedIbs: number;
  pRedCbs: number;
  lc214: string;
  inicioVigencia: string | null;
  fimVigencia: string | null;
};

export const cclasstribRegistros: CClassTribRegistro[] =
  registrosJson.registros as CClassTribRegistro[];

export const cclasstribPorCodigo = new Map(
  cclasstribRegistros.map((item) => [item.cclasstrib, item]),
);

export const cclasstribEditorialMeta: EditorialMetaFields = {
  vigencia: `conforme tabela do Informe Técnico ${CCLASSTRIB_INFORME} v.${CCLASSTRIB_VERSAO} (publicado em 22/06/2026)`,
  atualizadoEm: "2026-09-23",
  fonte: [fo.it2025_002_v160, fo.lc214, fo.nt2025_002_rtc],
};

export type CstResumo = {
  cst: string;
  descricao: string;
};

/** Um resumo por CST para atalhos na consulta sem texto digitado. */
export function listarCstDistintos(): CstResumo[] {
  const map = new Map<string, string>();
  for (const item of cclasstribRegistros) {
    if (!map.has(item.cst)) {
      map.set(item.cst, item.cstDescricao);
    }
  }
  return [...map.entries()]
    .map(([cst, descricao]) => ({ cst, descricao }))
    .sort((a, b) => a.cst.localeCompare(b.cst));
}
