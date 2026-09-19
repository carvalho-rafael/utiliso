/** Pacote de schemas em app/lib/utilitarios/nfe/xsd/ */
export const NFE_XSD_PACOTE = "PL_010_V1.30";

export const NFE_NAMESPACE = "http://www.portalfiscal.inf.br/nfe";

/** Limite de upload (5 MB) para evitar abuso no servidor. */
export const NFE_XML_MAX_BYTES = 5 * 1024 * 1024;

export type TipoDocumentoNfe = "nfeProc" | "NFe" | "enviNFe";

export const SCHEMA_POR_RAIZ: Record<TipoDocumentoNfe, string> = {
  nfeProc: "procNFe_v4.00.xsd",
  NFe: "nfe_v4.00.xsd",
  enviNFe: "enviNFe_v4.00.xsd",
};

export const LABEL_POR_RAIZ: Record<TipoDocumentoNfe, string> = {
  nfeProc: "NF-e processada (nfeProc)",
  NFe: "NF-e (NFe)",
  enviNFe: "Lote de envio (enviNFe)",
};
