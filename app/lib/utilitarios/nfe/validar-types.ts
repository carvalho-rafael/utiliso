import type { TipoDocumentoNfe } from "./constants";

export type ValidacaoNfeErro = {
  mensagem: string;
  /** Original do libxml, quando a mensagem foi traduzida. */
  mensagemTecnica?: string;
  linha?: number;
  coluna?: number;
};

export type ValidacaoNfeResultado =
  | {
      ok: true;
      tipo: TipoDocumentoNfe;
      tipoLabel: string;
      schema: string;
      pacote: string;
    }
  | {
      ok: false;
      tipo?: TipoDocumentoNfe;
      tipoLabel?: string;
      schema?: string;
      pacote: string;
      erros: ValidacaoNfeErro[];
    };
