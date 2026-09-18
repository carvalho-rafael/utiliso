import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { SalarioLiquidoForm } from "./salario-liquido-form";

const calculadora = getCalculadoraBySlug("salario-liquido")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function SalarioLiquidoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Salário Líquido
        </h1>
        <p className="text-lg text-muted">
          Descubra quanto sobra no contracheque após os descontos de INSS e IRRF.
        </p>
      </div>

      <SalarioLiquidoForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">INSS:</strong> contribuição
            previdenciária progressiva (7,5% a 14%), com teto de R$ 8.475,55 em
            {TABELAS_ANO} (
            <Link
              href="/tabelas/inss"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela INSS
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">IRRF:</strong> imposto de renda
            retido na fonte. A base usa o maior entre as deduções legais (INSS +
            R$ 189,59 por dependente) e o desconto simplificado de R$ 607,20.
            Rendimentos até R$ 5.000 têm o imposto zerado pela Lei 15.270/2025 (
            <Link
              href="/tabelas/irrf"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela IRRF
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Vale-transporte:</strong>{" "}
            opcional. A lei permite descontar até 6% do salário básico (Lei
            7.418/1985); se o custo real for menor, o desconto é o custo.
          </li>
          <li>
            <strong className="text-foreground">FGTS:</strong> 8% depositados
            pelo empregador (Lei 8.036/1990) — não entram no líquido, apenas
            como referência.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O FGTS é descontado do salário?
            </dt>
            <dd>
              Não. Os 8% do FGTS são pagos pelo empregador por fora da
              remuneração e depositados na conta vinculada da Caixa. O valor
              aparece no holerite apenas como informação.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Até quanto não pago Imposto de Renda em 2026?
            </dt>
            <dd>
              Rendimentos tributáveis de até R$ 5.000 por mês têm o IRRF zerado
              pela redução da Lei 15.270/2025. Entre R$ 5.000,01 e R$ 7.350, a
              redução diminui progressivamente até zerar.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Como o INSS é calculado?
            </dt>
            <dd>
              O INSS é progressivo: cada faixa salarial tem sua alíquota (7,5%,
              9%, 12% ou 14%), aplicada apenas sobre a parcela do salário dentro
              da faixa. Salários acima do teto de R$ 8.475,55 pagam no máximo
              R$ 988,09 de contribuição.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes. Outros descontos (plano de saúde, vale-refeição,
              pensão judicial) podem alterar o valor real do holerite. Consulte
              um profissional para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
