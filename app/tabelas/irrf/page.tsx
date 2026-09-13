import type { Metadata } from "next";
import { TabelaCalculadoraCta } from "../../components/tabela-calculadora-cta";
import { TabelasRelacionadas } from "../../components/tabelas-relacionadas";
import { formatarMoeda } from "../../lib/calculadoras/format";
import {
  DEDUCAO_DEPENDENTE_IRRF,
  DESCONTO_SIMPLIFICADO_IRRF,
  listarFaixasIRRFTabela,
  TABELAS_ANO,
} from "../../lib/calculadoras/tabelas-2026";
import { getTabelaBySlug } from "../../lib/tabelas/catalog";
import { formatarAliquota, formatarFaixa } from "../../lib/tabelas/format";

const tabela = getTabelaBySlug("irrf")!;
const faixas = listarFaixasIRRFTabela();

export const metadata: Metadata = {
  title: `Tabela ${tabela.title} ${TABELAS_ANO} — Utiliso`,
  description: tabela.metaDescription,
};

export default function TabelaIrrfPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabela IRRF {TABELAS_ANO}
        </h1>
        <p className="text-lg text-muted">
          Faixas de imposto de renda retido na fonte na folha de pagamento,
          vigentes a partir de janeiro de {TABELAS_ANO}.
        </p>
      </div>

      <TabelaCalculadoraCta
        title="Calcule o desconto no seu salário"
        description={`Use a calculadora de salário líquido para ver o INSS, o IRRF e o valor que sobra no contracheque com as tabelas de ${TABELAS_ANO}.`}
        href="/calculadoras/salario-liquido"
        label="Calcular salário líquido"
      />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Tabela mensal {TABELAS_ANO}
        </h2>
        <p>
          O IRRF segue a tabela mensal da{" "}
          <strong className="text-foreground">Receita Federal</strong>. O imposto
          é calculado sobre a base de cálculo após deduções. Na folha, usa-se o
          maior entre as deduções legais (INSS + dependentes) e o{" "}
          <strong className="text-foreground">desconto simplificado</strong> de{" "}
          {formatarMoeda(DESCONTO_SIMPLIFICADO_IRRF)}.
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[24rem] text-left text-sm">
            <caption className="sr-only">
              Tabela de IRRF mensal em {TABELAS_ANO}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Base de cálculo
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Alíquota
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Parcela a deduzir
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {faixas.map((faixa) => (
                <tr key={faixa.de}>
                  <td className="px-4 py-3 text-muted">
                    {formatarFaixa(faixa.de, faixa.ate)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatarAliquota(faixa.aliquota)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {faixa.deducao === 0
                      ? "—"
                      : formatarMoeda(faixa.deducao)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          A dedução por <strong className="text-foreground">dependente</strong>{" "}
          é de {formatarMoeda(DEDUCAO_DEPENDENTE_IRRF)} por pessoa. Rendimentos
          tributáveis de até {formatarMoeda(5000)} têm o IRRF zerado pela{" "}
          <strong className="text-foreground">Lei 15.270/2025</strong>. Entre{" "}
          {formatarMoeda(5000.01)} e {formatarMoeda(7350)}, a redução diminui
          progressivamente até zerar.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O IRRF é calculado sobre o salário bruto?
            </dt>
            <dd>
              Não. Primeiro se subtraem as deduções (INSS, dependentes ou
              desconto simplificado). O imposto incide sobre a base resultante,
              aplicando a alíquota da faixa e subtraindo a parcela a deduzir.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Até quanto não pago IRRF em {TABELAS_ANO}?
            </dt>
            <dd>
              Rendimentos tributáveis de até {formatarMoeda(5000)} por mês têm o
              imposto zerado pela redução da Lei 15.270/2025, mesmo que a base
              de cálculo caia em faixa tributável.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Esta tabela substitui o departamento pessoal?
            </dt>
            <dd>
              Não. É material informativo com base nas tabelas vigentes. Outros
              descontos, rendimentos e ajustes anuais podem alterar o valor
              retido. Consulte um profissional para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>

      <TabelasRelacionadas slugAtual="irrf" />
    </main>
  );
}
