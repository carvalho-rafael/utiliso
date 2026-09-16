import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";
import { DecimoParcelaExemplo } from "../decimo-parcela-exemplo";

const guia = getGuiaBySlug("primeira-parcela-decimo-terceiro")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Primeira parcela do 13º: prazo, valor e se tem desconto — Utiliso",
  description: guia.metaDescription,
};

export default function PrimeiraParcelaDecimoGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Primeira parcela do 13º salário
        </h1>
        <p className="text-lg text-muted">
          Entenda o prazo, o valor, por que não há desconto nesta parcela e
          quando o adiantamento pode sair junto com as férias.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de 13º salário"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime a 1ª parcela
        </h2>
        <p className="mt-2 text-sm text-muted">
          Metade do 13º, sem INSS nem IRRF. A calculadora também mostra a 2ª
          parcela, onde saem os descontos.
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
          O que é a 1ª parcela
        </h2>
        <p>
          O 13º salário (Lei 4.090/1962) é pago em duas vezes. A 1ª parcela é
          um <strong className="text-foreground">adiantamento</strong> — metade
          do valor, sem INSS nem IRRF. Não é o 13º líquido do ano: os descontos
          ficam na{" "}
          <Link
            href="/guias/segunda-parcela-decimo-terceiro"
            className={linkClass}
          >
            2ª parcela
          </Link>
          , até 20 de dezembro (Lei 4.749/1965).
        </p>

        <h2 className="text-base font-medium text-foreground">Prazo</h2>
        <p>
          A 1ª parcela pode ser paga de{" "}
          <strong className="text-foreground">1º de fevereiro a 30 de novembro</strong>
          . A 2ª, com os descontos, vai até 20 de dezembro. Quem pede o
          adiantamento com as férias (em janeiro) recebe a 1ª antes, ainda
          nessa janela.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como calcular
        </h2>
        <p>
          Informe a data de admissão: o exemplo conta sozinho os meses de{" "}
          {TABELAS_ANO} em que você trabalhou 15 dias ou mais (Lei 4.090/1962).
          Mês com 14 dias ou menos não entra. A 1ª parcela é a metade desse
          bruto, sem desconto.
        </p>
        <DecimoParcelaExemplo destaque="primeira" />

        <h2 className="text-base font-medium text-foreground">
          Sem INSS nem Imposto de Renda nesta parcela
        </h2>
        <p>
          A 1ª parcela{" "}
          <strong className="text-foreground">não sofre desconto</strong> de{" "}
          <Link href="/tabelas/inss" className={linkClass}>
            INSS
          </Link>{" "}
          nem de{" "}
          <Link href="/tabelas/irrf" className={linkClass}>
            IRRF
          </Link>
          . Os dois incidem sobre o 13º bruto inteiro e são retidos na 2ª
          parcela, com tributação exclusiva do 13º. O{" "}
          <Link href="/guias/calculo-inss" className={linkClass}>
            guia do cálculo do INSS
          </Link>{" "}
          explica a tabela progressiva.
        </p>
        <p>
          O FGTS (8%) é depositado pelo empregador sobre o 13º bruto — não sai
          do valor que você recebe na 1ª parcela.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Adiantamento junto com as férias
        </h2>
        <p>
          O empregado pode receber a 1ª parcela no pagamento das férias se
          pedir{" "}
          <strong className="text-foreground">no mês de janeiro</strong> do
          mesmo ano (Lei 4.749/1965, art. 2º). Pedido feito depois de janeiro
          não obriga a empresa a antecipar com o recibo de gozo.
        </p>
        <p>
          Nesse caso a{" "}
          <Link href="/calculadoras/ferias" className={linkClass}>
            calculadora de férias
          </Link>{" "}
          estima metade do salário (mais média de variáveis, se houver) — o
          mesmo critério do art. 2º da Lei 4.749/1965 (metade do salário).
          Continua sem INSS nem IRRF nesta parcela. As férias em si têm regras
          próprias de desconto.
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
          . Se a 1ª parcela já tinha sido paga, a empresa abate esse
          adiantamento no acerto — a calculadora estima o 13º proporcional
          cheio; informe o DP o valor já recebido.
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
              A 1ª parcela tem desconto de INSS ou IRRF?
            </dt>
            <dd>
              Não. Os descontos incidem sobre o 13º bruto inteiro e são
              retidos na{" "}
              <Link
                href="/guias/segunda-parcela-decimo-terceiro"
                className={linkClass}
              >
                2ª parcela
              </Link>
              , até 20 de dezembro.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso pedir o adiantamento com as férias em junho?
            </dt>
            <dd>
              Só se o pedido tiver sido feito em janeiro. A lei exige o
              requerimento no primeiro mês do ano; pedir em junho, na véspera
              do gozo, não gera essa obrigação.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              É metade do salário ou metade do 13º proporcional?
            </dt>
            <dd>
              A Lei 4.749/1965 cita metade do salário do mês anterior. A
              calculadora de 13º usa metade do 13º bruto (já em avos), que é o
              critério usual na 1ª parcela de novembro. Com férias, a
              calculadora de férias usa metade do salário informado. Em
              dezembro a empresa fecha a diferença.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E se eu for demitido depois de receber a 1ª parcela?
            </dt>
            <dd>
              O adiantamento entra na conta do 13º da rescisão. A empresa paga
              o proporcional do ano e desconta o que já adiantou. Não há duas
              parcelas de calendário no TRCT.
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
            href="/guias/segunda-parcela-decimo-terceiro"
            className={linkClass}
          >
            Segunda parcela do 13º salário
          </Link>
          <Link href="/calculadoras/ferias" className={linkClass}>
            Calculadora de férias
          </Link>
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
          <Link href="/guias/calculo-inss" className={linkClass}>
            Guia do cálculo do INSS
          </Link>
        </div>
      </div>
    </main>
  );
}
