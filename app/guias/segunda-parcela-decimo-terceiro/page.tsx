import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";
import { DecimoParcelaExemplo } from "../decimo-parcela-exemplo";

const guia = getGuiaBySlug("segunda-parcela-decimo-terceiro")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Segunda parcela do 13º: prazo, INSS e valor líquido — Utiliso",
  description: guia.metaDescription,
};

export default function SegundaParcelaDecimoGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Segunda parcela do 13º salário
        </h1>
        <p className="text-lg text-muted">
          Entenda o prazo de dezembro, por que esta parcela vem com INSS e IRRF
          e como fecha a diferença da 1ª.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de 13º salário"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime a 2ª parcela
        </h2>
        <p className="mt-2 text-sm text-muted">
          Restante do 13º, com INSS e IRRF. A calculadora também mostra a 1ª
          parcela, sem esses descontos.
        </p>
        <Link
          href="/calculadoras/decimo-terceiro"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular 13º salário
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que é a 2ª parcela
        </h2>
        <p>
          O 13º salário (Lei 4.090/1962) é pago em duas vezes. A 2ª parcela é
          o <strong className="text-foreground">acerto de dezembro</strong>: o
          que falta do 13º bruto, menos INSS e IRRF. Não é metade do salário de
          novo — a metade já saiu na{" "}
          <Link
            href="/guias/primeira-parcela-decimo-terceiro"
            className={linkClass}
          >
            1ª parcela
          </Link>
          , sem desconto (Lei 4.749/1965).
        </p>

        <h2 className="text-base font-medium text-foreground">Prazo</h2>
        <p>
          A 2ª parcela deve ser paga até{" "}
          <strong className="text-foreground">20 de dezembro</strong>. A 1ª
          pode ter saído de 1º de fevereiro a 30 de novembro. Empresas costumam
          pagar a 2ª no começo de dezembro; a lei só fixa esse limite.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como calcular
        </h2>
        <p>
          Informe a data de admissão: o exemplo conta sozinho os meses de{" "}
          {TABELAS_ANO} em que você trabalhou 15 dias ou mais. A 2ª parcela é o
          13º bruto menos a 1ª, menos INSS e IRRF sobre o bruto inteiro.
        </p>
        <DecimoParcelaExemplo destaque="segunda" />

        <h2 className="text-base font-medium text-foreground">
          INSS e Imposto de Renda nesta parcela
        </h2>
        <p>
          Os descontos{" "}
          <strong className="text-foreground">
            não são calculados só sobre a 2ª
          </strong>
          . Incidem sobre o 13º bruto do ano e são retidos agora, em dezembro.
          O{" "}
          <Link href="/guias/calculo-inss" className={linkClass}>
            guia do cálculo do INSS
          </Link>{" "}
          explica a tabela progressiva. O IRRF do 13º é tributação exclusiva (
          <Link href="/tabelas/irrf" className={linkClass}>
            tabela IRRF
          </Link>
          ; Lei 15.270/2025).
        </p>
        <p>
          O FGTS (8%) é depositado pelo empregador sobre o 13º bruto — não sai
          do valor que você recebe na 2ª parcela.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Se a 1ª não foi paga, ou saiu com as férias
        </h2>
        <p>
          A 2ª fecha a diferença. Se o adiantamento não ocorreu, dezembro leva
          o 13º líquido do ano (bruto − INSS − IRRF). Se a 1ª saiu com as
          férias (pedido em janeiro), a empresa desconta aquele adiantamento
          aqui.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Quem saiu do emprego
        </h2>
        <p>
          Na rescisão o 13º entra como verba proporcional do ano, não como
          duas parcelas de calendário. Use a{" "}
          <Link href="/calculadoras/rescisao" className={linkClass}>
            calculadora de rescisão
          </Link>
          . Se a 1ª já tinha sido paga, a empresa abate o adiantamento no
          acerto.
        </p>
        <p>
          Na justa causa não há 13º proporcional. No pedido de demissão e na
          dispensa sem justa causa, sim.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Por que a 2ª parcela é menor que a 1ª?
            </dt>
            <dd>
              Porque a 1ª é metade do bruto, sem desconto. Na 2ª saem INSS e
              IRRF sobre o 13º inteiro. O que sobra costuma ser menos que a
              metade.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O desconto de INSS é só sobre a 2ª parcela?
            </dt>
            <dd>
              Não. A tabela progressiva se aplica ao 13º bruto. O valor é
              retido na 2ª. Veja a{" "}
              <Link href="/tabelas/inss" className={linkClass}>
                tabela INSS
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E se o salário mudou durante o ano?
            </dt>
            <dd>
              O 13º usa a remuneração de dezembro (mais médias de variáveis,
              se houver). A 2ª ajusta o que a 1ª adiantou com base anterior.
              A calculadora usa o salário informado agora.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Dependentes mudam a 2ª parcela?
            </dt>
            <dd>
              Podem mudar o IRRF, não o INSS. O exemplo desta página usa zero
              dependentes. Na calculadora de 13º dá para informar a quantidade.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo alinhado à calculadora de 13º.
              Convenção coletiva, médias de variáveis e o caso concreto podem
              alterar o valor real.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
            Calculadora de 13º salário
          </Link>
          <Link
            href="/guias/primeira-parcela-decimo-terceiro"
            className={linkClass}
          >
            Primeira parcela do 13º salário
          </Link>
          <Link href="/guias/calculo-inss" className={linkClass}>
            Guia do cálculo do INSS
          </Link>
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
        </div>
      </div>
    </main>
  );
}
