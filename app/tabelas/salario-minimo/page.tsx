import type { Metadata } from "next";
import Link from "next/link";
import { TabelaCalculadoraCta } from "../../components/tabela-calculadora-cta";
import { TabelaFonte, TabelaMeta } from "../../components/tabela-meta";
import { TabelasRelacionadas } from "../../components/tabelas-relacionadas";
import { formatarMoeda } from "../../lib/calculadoras/format";
import {
  INSS_TETO_EMPREGADO,
  SALARIO_MINIMO,
  TABELAS_ANO,
} from "../../lib/calculadoras/tabelas-2026";
import { SEGURO_TETO } from "../../lib/calculadoras/seguro-desemprego";
import { getTabelaBySlug } from "../../lib/tabelas/catalog";

const tabela = getTabelaBySlug("salario-minimo")!;

export const metadata: Metadata = {
  title: `Tabela ${tabela.title} ${TABELAS_ANO} — Utiliso`,
  description: tabela.metaDescription,
};

export default function TabelaSalarioMinimoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Salário mínimo {TABELAS_ANO}
        </h1>
        <p className="text-lg text-muted">
          Valor nacional vigente {tabela.vigencia} e relação com outras tabelas
          trabalhistas.
        </p>
        <TabelaMeta tabela={tabela} />
      </div>

      <TabelaCalculadoraCta
        title="Calcule o salário líquido"
        description={`Veja quanto sobra no contracheque com o salário mínimo de ${formatarMoeda(SALARIO_MINIMO)} e os descontos de INSS e IRRF em ${TABELAS_ANO}.`}
        href="/calculadoras/salario-liquido"
        label="Calcular salário líquido"
      />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Valor em {TABELAS_ANO}
        </h2>
        <p>
          O <strong className="text-foreground">salário mínimo nacional</strong>{" "}
          em {TABELAS_ANO} é de{" "}
          <strong className="text-foreground">
            {formatarMoeda(SALARIO_MINIMO)}
          </strong>
          , vigente a partir de 1º de janeiro. O reajuste é definido por lei e
          impacta a primeira faixa do INSS, o piso do seguro-desemprego e diversos
          benefícios e multas trabalhistas.
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <caption className="sr-only">
              Salário mínimo e referências em {TABELAS_ANO}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Referência
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-muted">Salário mínimo nacional</td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(SALARIO_MINIMO)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">
                  Primeira faixa do INSS (até)
                </td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(SALARIO_MINIMO)} (7,5%)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">
                  Piso do seguro-desemprego
                </td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(SALARIO_MINIMO)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">Teto do INSS (empregado)</td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(INSS_TETO_EMPREGADO)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">
                  Teto do seguro-desemprego
                </td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(SEGURO_TETO)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Para as alíquotas completas do INSS, veja a{" "}
          <Link
            href="/tabelas/inss"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            tabela INSS {TABELAS_ANO}
          </Link>
          . Para o benefício após demissão sem justa causa, consulte a{" "}
          <Link
            href="/tabelas/seguro-desemprego"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            tabela do seguro-desemprego
          </Link>
          .
        </p>

        <TabelaFonte tabela={tabela} />

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O salário mínimo é o mesmo em todo o Brasil?
            </dt>
            <dd>
              Sim, para a base nacional. Estados e municípios podem ter pisos
              regionais ou de categoria acima do mínimo federal, quando previsto
              em lei ou convenção.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Quem ganha o mínimo paga INSS?
            </dt>
            <dd>
              Sim. A contribuição é de 7,5% sobre o salário de contribuição, na
              primeira faixa da tabela progressiva.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Esta página substitui o departamento pessoal?
            </dt>
            <dd>
              Não. É material informativo com base nas tabelas vigentes.
              Consulte um profissional para valores oficiais do seu contrato.
            </dd>
          </div>
        </dl>
      </section>

      <TabelasRelacionadas slugAtual="salario-minimo" />
    </main>
  );
}
