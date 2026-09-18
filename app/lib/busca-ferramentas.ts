import { calculadoras, type Calculadora } from "./calculadoras/catalog";
import { guias, type Guia } from "./guias/catalog";
import { tabelas, type Tabela } from "./tabelas/catalog";

export type BuscaFerramentasResultado = {
  calculadoras: Calculadora[];
  guias: Guia[];
  tabelas: Tabela[];
};

function filtrarPorTexto<T>(
  items: T[],
  query: string,
  texto: (item: T) => string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return items.filter((item) =>
    texto(item).toLowerCase().includes(normalized),
  );
}

export function buscarFerramentas(query: string): BuscaFerramentasResultado {
  return {
    calculadoras: filtrarPorTexto(
      calculadoras,
      query,
      (calculadora) =>
        `${calculadora.title} ${calculadora.description} ${calculadora.metaDescription} ${calculadora.slug}`,
    ),
    guias: filtrarPorTexto(
      guias,
      query,
      (guia) =>
        `${guia.title} ${guia.description} ${guia.metaDescription} ${guia.slug}`,
    ),
    tabelas: filtrarPorTexto(
      tabelas,
      query,
      (tabela) =>
        `${tabela.title} ${tabela.description} ${tabela.metaDescription} ${tabela.slug}`,
    ),
  };
}

export function totalBuscaFerramentas(
  resultado: BuscaFerramentasResultado,
): number {
  return (
    resultado.calculadoras.length +
    resultado.guias.length +
    resultado.tabelas.length
  );
}
