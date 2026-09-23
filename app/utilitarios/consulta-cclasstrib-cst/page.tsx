import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import {
  CCLASSTRIB_VERSAO,
  cclasstribEditorialMeta,
} from "../../lib/utilitarios/cclasstrib/tabela";
import { ConsultaCClassTribCstForm } from "./consulta-cclasstrib-cst-form";

const utilitario = getUtilitarioBySlug("consulta-cclasstrib-cst")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${utilitario.title} — Utiliso`,
  description: utilitario.metaDescription,
};

export default function ConsultaCClassTribCstPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Consulta de cClassTrib e CST
        </h1>
        <p className="text-lg text-muted">
          Busque códigos de classificação tributária e de situação tributária do
          IBS e da CBS usados no grupo da NF-e na reforma do consumo.
        </p>
        <EditorialMeta conteudo={cclasstribEditorialMeta} />
      </div>

      <ConsultaCClassTribCstForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            A consulta usa a tabela{" "}
            <strong className="text-foreground">cClassTrib</strong> do Informe
            Técnico 2025.002 v.{CCLASSTRIB_VERSAO}, a mesma referência do portal
            SVRS e do preenchimento do grupo{" "}
            <code className="text-foreground">IBSCBS</code> por item na NF-e.
          </li>
          <li>
            Os <strong className="text-foreground">três primeiros dígitos</strong>{" "}
            do cClassTrib correspondem ao{" "}
            <strong className="text-foreground">CST-IBS/CBS</strong>. Na nota,
            as tags <code className="text-foreground">CST</code> e{" "}
            <code className="text-foreground">cClassTrib</code> devem ser
            informadas de forma compatível.
          </li>
          <li>
            Os campos <strong className="text-foreground">pRedIBS</strong> e{" "}
            <strong className="text-foreground">pRedCBS</strong> mostram o
            percentual de <em>redução</em> da alíquota para aquele código — não
            são as alíquotas de teste de 2026 (0,9% CBS e 0,1% IBS estadual),
            que estão na{" "}
            <Link href="/tabelas/ibs-cbs" className={linkClass}>
              tabela IBS e CBS
            </Link>
            .
          </li>
          <li>
            Códigos <strong className="text-foreground">encerrados</strong>{" "}
            permanecem na tabela oficial com fim de vigência; por padrão esta
            consulta lista só os vigentes.
          </li>
        </ul>

        <p>
          O resultado é uma leitura da tabela publicada. Não substitui contador,
          assessoria fiscal nem a parametrização do seu ERP para escolher o par
          CST + cClassTrib da operação.
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que esta consulta não faz
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Não valida XML nem confere se o par CST × cClassTrib está correto
            para o NCM, CFOP ou regime da empresa — use o{" "}
            <Link href="/utilitarios/validador-nfe" className={linkClass}>
              validador de NF-e
            </Link>{" "}
            para estrutura do arquivo.
          </li>
          <li>
            Não inclui a tabela de{" "}
            <strong className="text-foreground">crédito presumido</strong> (
            <code className="text-foreground">cCredPres</code>) nem indicadores
            de grupos do leiaute (monofásico, diferimento, etc.) — consulte o
            Informe Técnico completo no portal da NF-e.
          </li>
          <li>
            Não calcula imposto: para simular alíquotas de teste em 2026, use a{" "}
            <Link href="/calculadoras/ibs-cbs" className={linkClass}>
              calculadora de IBS e CBS
            </Link>
            .
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Qual a diferença entre CST e cClassTrib?
            </dt>
            <dd>
              O CST resume a situação tributária do item (tributação integral,
              redução, isenção, etc.). O cClassTrib detalha a hipótese legal
              específica dentro dessa situação. Ambos vão no XML do grupo IBS/CBS.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que 000001 aparece com redução 0%?
            </dt>
            <dd>
              Porque é tributação integral sem redução de alíquota na tabela. As
              alíquotas de teste de 2026 são outro assunto — veja a{" "}
              <Link href="/tabelas/ibs-cbs" className={linkClass}>
                tabela IBS/CBS
              </Link>{" "}
              e o{" "}
              <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
                guia da NF-e em 2026
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Meus dados são enviados ao Utiliso?
            </dt>
            <dd>
              Não. A filtragem ocorre inteiramente no navegador; nada é gravado
              nem medido no Analytics.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={cclasstribEditorialMeta} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Links relacionados:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            IBS e CBS na NF-e em 2026
          </Link>
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            Tabela IBS e CBS
          </Link>
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            Calculadora de IBS e CBS
          </Link>
          <Link href="/utilitarios/validador-nfe" className={linkClass}>
            Validador de XML NF-e
          </Link>
          <Link href="/utilitarios" className={linkClass}>
            Todos os utilitários
          </Link>
        </div>
      </div>
    </main>
  );
}
