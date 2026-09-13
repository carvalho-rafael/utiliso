import type { Metadata } from "next";
import Link from "next/link";
import { TabelaCalculadoraCta } from "../../components/tabela-calculadora-cta";
import { TabelasRelacionadas } from "../../components/tabelas-relacionadas";
import { formatarMoeda } from "../../lib/calculadoras/format";
import {
  calcularINSS,
  INSS_TETO_EMPREGADO,
  listarFaixasINSSTabela,
  TABELAS_ANO,
} from "../../lib/calculadoras/tabelas-2026";
import { getTabelaBySlug } from "../../lib/tabelas/catalog";
import { formatarAliquota, formatarFaixa } from "../../lib/tabelas/format";

const tabela = getTabelaBySlug("inss")!;
const faixas = listarFaixasINSSTabela();
const inssMaximo = calcularINSS(INSS_TETO_EMPREGADO);

export const metadata: Metadata = {
  title: `Tabela ${tabela.title} ${TABELAS_ANO} — Utiliso`,
  description: tabela.metaDescription,
};

export default function TabelaInssPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabela INSS {TABELAS_ANO}
        </h1>
        <p className="text-lg text-muted">
          Alíquotas progressivas de contribuição previdenciária para empregados
          CLT, vigentes a partir de janeiro de {TABELAS_ANO}.
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
          Tabela progressiva {TABELAS_ANO}
        </h2>
        <p>
          As alíquotas seguem a{" "}
          <strong className="text-foreground">
            Portaria Interministerial MPS/MF nº 13/{TABELAS_ANO}
          </strong>
          . Cada faixa tem sua alíquota aplicada apenas sobre a parcela do
          salário dentro daquela faixa — não sobre o bruto inteiro. Para entender
          o cálculo passo a passo, veja o{" "}
          <Link
            href="/guias/calculo-inss"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            guia do cálculo do INSS
          </Link>
          .
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <caption className="sr-only">
              Tabela de contribuição do INSS para empregados em {TABELAS_ANO}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Salário de contribuição
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Alíquota
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {faixas.map((faixa) => (
                <tr key={faixa.ate}>
                  <td className="px-4 py-3 text-muted">
                    {formatarFaixa(faixa.de, faixa.ate)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatarAliquota(faixa.aliquota)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          O <strong className="text-foreground">teto do INSS</strong> em{" "}
          {TABELAS_ANO} é de {formatarMoeda(INSS_TETO_EMPREGADO)}. Salários
          acima desse valor têm a contribuição limitada ao teto — o desconto
          máximo do empregado é de {formatarMoeda(inssMaximo)}.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O INSS é calculado sobre o salário bruto inteiro?
            </dt>
            <dd>
              Não. Só a parcela dentro de cada faixa paga a alíquota daquela
              faixa. Quem ganha R$ 3.000 não paga 12% sobre os R$ 3.000.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Qual o desconto máximo em {TABELAS_ANO}?
            </dt>
            <dd>
              {formatarMoeda(inssMaximo)}, para salários iguais ou superiores ao
              teto de {formatarMoeda(INSS_TETO_EMPREGADO)}.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Esta tabela substitui o departamento pessoal?
            </dt>
            <dd>
              Não. É material informativo com base nas tabelas vigentes. Acordos,
              categorias especiais e competências retroativas podem exigir
              análise de contador ou advogado trabalhista.
            </dd>
          </div>
        </dl>
      </section>

      <TabelasRelacionadas slugAtual="inss" />
    </main>
  );
}
