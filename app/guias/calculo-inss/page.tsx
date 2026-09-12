import type { Metadata } from "next";
import Link from "next/link";
import { formatarMoeda } from "../../lib/calculadoras/format";
import {
  calcularINSS,
  INSS_TETO_EMPREGADO,
  listarFaixasINSSTabela,
  round2,
  TABELAS_ANO,
} from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("calculo-inss")!;

const faixas = listarFaixasINSSTabela();
const inssMaximo = calcularINSS(INSS_TETO_EMPREGADO);

const exemploSalario = 3000;
const exemploParcelas = calcularParcelasINSS(exemploSalario);

export const metadata: Metadata = {
  title: `Guia de ${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

function formatarAliquota(aliquota: number): string {
  return `${(aliquota * 100).toLocaleString("pt-BR", {
    minimumFractionDigits: aliquota * 100 % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })}%`;
}

function formatarFaixa(de: number, ate: number): string {
  if (de === 0) {
    return `Até ${formatarMoeda(ate)}`;
  }
  return `De ${formatarMoeda(de)} a ${formatarMoeda(ate)}`;
}

function calcularParcelasINSS(salario: number) {
  let restante = salario;
  let anterior = 0;
  const parcelas: { faixa: string; base: number; aliquota: number; valor: number }[] =
    [];

  for (const faixa of faixas) {
    const limiteFaixa = faixa.ate - anterior;
    const base = Math.min(restante, limiteFaixa);
    if (base <= 0) break;

    parcelas.push({
      faixa: formatarFaixa(faixa.de, faixa.ate),
      base: round2(base),
      aliquota: faixa.aliquota,
      valor: round2(base * faixa.aliquota),
    });

    restante -= base;
    anterior = faixa.ate;
  }

  return parcelas;
}

export default function CalculoInssGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Guia de Cálculo do INSS
        </h1>
        <p className="text-lg text-muted">
          Entenda a tabela progressiva, as alíquotas e como o desconto é
          calculado na folha de pagamento.
        </p>
      </div>

      <aside
        aria-label="Calculadora de salário líquido"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Calcule o desconto no seu salário
        </h2>
        <p className="mt-2 text-sm text-muted">
          Use a calculadora de salário líquido para ver o INSS, o IRRF e o valor
          que sobra no contracheque com as tabelas de {TABELAS_ANO}.
        </p>
        <Link
          href="/salario-liquido"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular salário líquido
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que é o INSS na folha?
        </h2>
        <p>
          O INSS (Instituto Nacional do Seguro Social) é a contribuição
          previdenciária descontada do salário do trabalhador CLT, empregado
          doméstico e trabalhador avulso. O valor garante direitos como
          aposentadoria, auxílio-doença e salário-maternidade. O desconto é
          obrigatório e aparece no holerite todo mês.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Tabela progressiva {TABELAS_ANO}
        </h2>
        <p>
          Desde janeiro de {TABELAS_ANO}, as alíquotas seguem a{" "}
          <strong className="text-foreground">
            Portaria Interministerial MPS/MF nº 13/2026
          </strong>
          . O modelo é <strong className="text-foreground">progressivo</strong>:
          cada faixa salarial tem sua alíquota, aplicada apenas sobre a parcela
          do salário dentro daquela faixa — e não sobre o bruto inteiro de uma
          vez.
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
          Como calcular passo a passo
        </h2>
        <p>
          Para cada faixa, multiplique a parcela do salário que cai nela pela
          alíquota correspondente. Some os resultados de todas as faixas. <br /> 
         <b>  Exemplo com salário bruto de {formatarMoeda(exemploSalario)}:</b>
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[24rem] text-left text-sm">
            <caption className="sr-only">
              Exemplo de cálculo do INSS sobre {formatarMoeda(exemploSalario)}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Faixa
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Base
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
                  INSS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {exemploParcelas.map((parcela) => (
                <tr key={parcela.faixa}>
                  <td className="px-4 py-3 text-muted">{parcela.faixa}</td>
                  <td className="px-4 py-3 text-muted">
                    {formatarMoeda(parcela.base)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatarAliquota(parcela.aliquota)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {formatarMoeda(parcela.valor)}
                  </td>
                </tr>
              ))}
              <tr className="bg-surface font-medium">
                <td
                  colSpan={3}
                  className="px-4 py-3 text-foreground"
                >
                  Total descontado
                </td>
                <td className="px-4 py-3 text-highlight">
                  {formatarMoeda(calcularINSS(exemploSalario))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          A <strong className="text-foreground">alíquota efetiva</strong> é o
          percentual real sobre o salário bruto. No exemplo acima,{" "}
          {formatarMoeda(calcularINSS(exemploSalario))} sobre{" "}
          {formatarMoeda(exemploSalario)} equivale a cerca de{" "}
          {formatarAliquota(calcularINSS(exemploSalario) / exemploSalario)} —
          menor que qualquer alíquota isolada da tabela, porque as faixas
          inferiores pesam na média.
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
              faixa. Quem ganha R$ 3.000 não paga 12% sobre os R$ 3.000 — paga
              7,5% sobre a primeira faixa, 9% sobre a segunda e 12% apenas
              sobre o que ultrapassar R$ 2.902,84.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Qual o desconto máximo em {TABELAS_ANO}?
            </dt>
            <dd>
              {formatarMoeda(inssMaximo)}, aplicado a salários iguais ou
              superiores ao teto de {formatarMoeda(INSS_TETO_EMPREGADO)}. Valores
              acima do teto não aumentam a contribuição do empregado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O 13º salário também tem desconto de INSS?
            </dt>
            <dd>
              Sim. O décimo terceiro é tributado separadamente, com a mesma
              tabela progressiva aplicada ao valor da parcela paga naquele mês.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o departamento pessoal?
            </dt>
            <dd>
              Não. É material informativo com base nas tabelas vigentes. Acordos,
              categorias especiais e competências retroativas podem exigir
              análise de contador ou advogado trabalhista.
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/salario-liquido"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Calculadora de salário líquido
          </Link>
          <Link
            href="/decimo-terceiro"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Calculadora de 13º salário
          </Link>
          <Link
            href="/rescisao"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Calculadora de rescisão
          </Link>
        </div>
      </div>
    </main>
  );
}
