import { formatarDataAtualizacao } from "../lib/tabelas/format";

/** Campos YMYL compartilhados por tabelas e guias. */
export type EditorialMetaFields = {
  vigencia: string;
  atualizadoEm: string;
  fonte: string;
};

type EditorialMetaProps = {
  conteudo: EditorialMetaFields;
};

/** Vigência oficial + data de revisão editorial (não usar new Date() no render). */
export function EditorialMeta({ conteudo }: EditorialMetaProps) {
  return (
    <p className="text-sm text-muted">
      Vigente {conteudo.vigencia}
      <span aria-hidden="true"> · </span>
      <span className="sr-only">. </span>
      Atualizado em {formatarDataAtualizacao(conteudo.atualizadoEm)}.
    </p>
  );
}

type EditorialFonteProps = {
  conteudo: EditorialMetaFields;
};

export function EditorialFonte({ conteudo }: EditorialFonteProps) {
  return (
    <>
      <h2 className="text-base font-medium text-foreground">Fonte</h2>
      <p>{conteudo.fonte}.</p>
    </>
  );
}

/** @deprecated Prefer EditorialMeta — mantido para páginas de tabelas. */
export function TabelaMeta({ tabela }: { tabela: EditorialMetaFields }) {
  return <EditorialMeta conteudo={tabela} />;
}

/** @deprecated Prefer EditorialFonte — mantido para páginas de tabelas. */
export function TabelaFonte({ tabela }: { tabela: EditorialMetaFields }) {
  return <EditorialFonte conteudo={tabela} />;
}
