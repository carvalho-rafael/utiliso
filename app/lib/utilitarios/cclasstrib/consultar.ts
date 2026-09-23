import {
  cclasstribRegistros,
  cclasstribPorCodigo,
  type CClassTribRegistro,
} from "./tabela";

export type ConsultaCClassTribOpcoes = {
  incluirEncerrados?: boolean;
};

export type ConsultaCClassTribResultado = {
  itens: CClassTribRegistro[];
  /** Código de 6 dígitos informado, mas ausente na tabela. */
  codigoInexistente: string | null;
  /** Código existe, mas está encerrado e o filtro padrão o oculta. */
  codigoEncerrado: string | null;
};

function normalizarTexto(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

function vigente(
  item: CClassTribRegistro,
  incluirEncerrados: boolean,
): boolean {
  if (incluirEncerrados) return true;
  return item.fimVigencia == null;
}

function filtrarVigentes(
  itens: CClassTribRegistro[],
  incluirEncerrados: boolean,
): CClassTribRegistro[] {
  return itens.filter((item) => vigente(item, incluirEncerrados));
}

export function consultarCClassTrib(
  consulta: string,
  opcoes: ConsultaCClassTribOpcoes = {},
): ConsultaCClassTribResultado {
  const incluirEncerrados = opcoes.incluirEncerrados ?? false;
  const trimmed = consulta.trim();

  if (!trimmed) {
    return { itens: [], codigoInexistente: null, codigoEncerrado: null };
  }

  const apenasDigitos = trimmed.replace(/\D/g, "");

  if (/^\d{6}$/.test(apenasDigitos)) {
    const item = cclasstribPorCodigo.get(apenasDigitos);
    if (!item) {
      return {
        itens: [],
        codigoInexistente: apenasDigitos,
        codigoEncerrado: null,
      };
    }
    if (!vigente(item, incluirEncerrados)) {
      return {
        itens: incluirEncerrados ? [item] : [],
        codigoInexistente: null,
        codigoEncerrado: incluirEncerrados ? null : apenasDigitos,
      };
    }
    return {
      itens: [item],
      codigoInexistente: null,
      codigoEncerrado: null,
    };
  }

  if (/^\d{3}$/.test(apenasDigitos)) {
    const itens = cclasstribRegistros.filter(
      (item) => item.cst === apenasDigitos,
    );
    return {
      itens: filtrarVigentes(itens, incluirEncerrados),
      codigoInexistente: null,
      codigoEncerrado: null,
    };
  }

  const needle = normalizarTexto(trimmed);
  const itens = cclasstribRegistros.filter((item) => {
    const haystack = normalizarTexto(
      `${item.cclasstrib} ${item.cst} ${item.nome} ${item.descricao} ${item.cstDescricao}`,
    );
    return haystack.includes(needle);
  });

  return {
    itens: filtrarVigentes(itens, incluirEncerrados),
    codigoInexistente: null,
    codigoEncerrado: null,
  };
}
