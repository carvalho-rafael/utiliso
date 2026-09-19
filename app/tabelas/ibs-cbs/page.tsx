import type { Metadata } from "next";
import Link from "next/link";
import { TabelaCalculadoraCta } from "../../components/tabela-calculadora-cta";
import { TabelaFonte, TabelaMeta } from "../../components/tabela-meta";
import { TabelasRelacionadas } from "../../components/tabelas-relacionadas";
import {
  ALIQUOTA_CBS_2026,
  ALIQUOTA_IBS_MUN_2026,
  ALIQUOTA_IBS_UF_2026,
  IBS_CBS_ANO,
} from "../../lib/calculadoras/ibs-cbs";
import { getTabelaBySlug } from "../../lib/tabelas/catalog";
import { formatarAliquota } from "../../lib/tabelas/format";

const tabela = getTabelaBySlug("ibs-cbs")!;

export const metadata: Metadata = {
  title: `Tabela ${tabela.title} ${IBS_CBS_ANO} — Utiliso`,
  description: tabela.metaDescription,
};

export default function TabelaIbsCbsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabela IBS e CBS {IBS_CBS_ANO}
        </h1>
        <p className="text-lg text-muted">
          Alíquotas de teste da reforma do consumo para fatos geradores em{" "}
          {IBS_CBS_ANO}, vigentes {tabela.vigencia}.
        </p>
        <TabelaMeta tabela={tabela} />
      </div>

      <TabelaCalculadoraCta
        title="Simule IBS e CBS sobre uma operação"
        description={`Use a calculadora para ver CBS, IBS estadual e municipal por fora do valor informado, com as alíquotas de teste de ${IBS_CBS_ANO}.`}
        href="/calculadoras/ibs-cbs"
        label="Calcular IBS e CBS"
      />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Alíquotas nominais de teste ({IBS_CBS_ANO})
        </h2>
        <p>
          Durante {IBS_CBS_ANO}, PIS, Cofins, ICMS, ISS e IPI convivem com IBS e
          CBS. As alíquotas abaixo são as fixadas na{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          para o ano de transição — não são as alíquotas-padrão do regime pleno,
          que ainda serão definidas por resolução do Senado Federal.
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <caption className="sr-only">
              Alíquotas de teste de IBS e CBS em {IBS_CBS_ANO}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Tributo
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Alíquota nominal
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Base legal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-foreground">CBS</td>
                <td className="px-4 py-3">{formatarAliquota(ALIQUOTA_CBS_2026)}</td>
                <td className="px-4 py-3">LC 214/2025, art. 346</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">IBS estadual (UF)</td>
                <td className="px-4 py-3">
                  {formatarAliquota(ALIQUOTA_IBS_UF_2026)}
                </td>
                <td className="px-4 py-3">LC 214/2025, art. 343</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">IBS municipal</td>
                <td className="px-4 py-3">
                  {formatarAliquota(ALIQUOTA_IBS_MUN_2026)}
                </td>
                <td className="px-4 py-3">Transição 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          O destaque na nota fiscal é informativo; o recolhimento em {IBS_CBS_ANO}{" "}
          fica dispensado se cumpridas as obrigações acessórias (art. 348, § 1º).
          Entenda como isso aparece na NF-e no{" "}
          <Link
            href="/guias/ibs-cbs-nfe-2026"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            guia IBS/CBS na NF-e
          </Link>
          . Para a mecânica por fora, veja a{" "}
          <Link
            href="/calculadoras/ibs-cbs"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            calculadora de IBS e CBS
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Estas são as alíquotas definitivas do novo sistema?
            </dt>
            <dd>
              Não. São alíquotas de teste de {IBS_CBS_ANO}. As alíquotas de
              referência do regime pleno serão fixadas em resolução do Senado
              (LC 214/2025, art. 349).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O Utiliso atualiza esta página quando?
            </dt>
            <dd>
              Quando a lei ou a fonte oficial alterar valores ou regras
              relevantes — a data “Atualizado em” reflete a revisão editorial, não
              o dia do acesso.
            </dd>
          </div>
        </dl>
      </section>

      <TabelaFonte tabela={tabela} />
      <TabelasRelacionadas slugAtual="ibs-cbs" />
    </main>
  );
}
