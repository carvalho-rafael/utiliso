import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { SEGURO_DESEMPREGO_CALCULADORA_HREF } from "../../lib/calculadoras/rescisao";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("demissao-sem-justa-causa-o-que-recebo")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function DemissaoSemJustaCausaGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Demissão sem justa causa: o que recebo?
        </h1>
        <p className="text-lg text-muted">
          Entenda as verbas da rescisão quando a empresa dispensa sem justa
          causa, o aviso, a multa do FGTS e o seguro-desemprego.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de rescisão"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime o valor da rescisão
        </h2>
        <p className="mt-2 text-sm text-muted">
          Use a calculadora com o motivo “demissão sem justa causa” para ver
          saldo, 13º, férias, aviso, descontos e o líquido estimado. A multa do
          FGTS e o seguro-desemprego ficam de fora do líquido.
        </p>
        <Link
          href="/calculadoras/rescisao"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular rescisão
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que entra na rescisão
        </h2>
        <p>
          Na dispensa sem justa causa o empregador encerra o contrato sem falta
          grave do empregado. Em regra, quem tem carteira assinada recebe:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Saldo de salário</strong> — os
            dias trabalhados no mês do desligamento;
          </li>
          <li>
            <strong className="text-foreground">13º proporcional</strong> — 1/12
            por mês com 15 dias ou mais no ano civil (Lei 4.090/1962). O aviso
            que projeta o contrato entra nessa conta;
          </li>
          <li>
            <strong className="text-foreground">Férias vencidas</strong> não
            gozadas, com o terço constitucional. Se o período de concessão
            passou do prazo, o pagamento é em dobro (CLT art. 137);
          </li>
          <li>
            <strong className="text-foreground">Férias proporcionais</strong> +
            1/3 (CLT arts. 146 e 147; Súmula 171 do TST). Detalhe no{" "}
            <Link href="/guias/ferias-proporcionais" className={linkClass}>
              guia de férias proporcionais na rescisão
            </Link>
            ;
          </li>
          <li>
            <strong className="text-foreground">Aviso prévio indenizado</strong>{" "}
            — se você não trabalhar o aviso, a empresa paga os dias (30, mais 3
            por ano completo de casa, até 90 — Lei 12.506/2011). Se trabalhar
            só parte, os dias restantes entram como indenizado.
          </li>
        </ul>
        <p>
          Sobre o saldo e o 13º incidem{" "}
          <Link href="/tabelas/inss" className={linkClass}>
            INSS
          </Link>{" "}
          e{" "}
          <Link href="/tabelas/irrf" className={linkClass}>
            IRRF
          </Link>
          . Férias indenizadas com 1/3 e o aviso indenizado são isentos desses
          descontos.
        </p>

        <h2 className="text-base font-medium text-foreground">
          FGTS, multa de 40% e saque
        </h2>
        <p>
          O empregador deposita 8% do salário na conta FGTS ao longo do
          contrato (Lei 8.036/1990). Na dispensa sem justa causa:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Multa de 40%</strong> sobre o
            saldo da conta (art. 18 da Lei 8.036/1990), paga pela empresa na
            conta vinculada — não entra no líquido da rescisão;
          </li>
          <li>
            <strong className="text-foreground">Saque de 100% do saldo</strong>{" "}
            + a multa, na Caixa, com a chave de movimentação da rescisão — essa
            é a regra do{" "}
            <strong className="text-foreground">saque-rescisão</strong>{" "}
            (modalidade padrão);
          </li>
          <li>
            Há FGTS também sobre o 13º proporcional e sobre o aviso indenizado
            (8%).
          </li>
        </ul>
        <p>
          Quem aderiu ao{" "}
          <strong className="text-foreground">saque-aniversário</strong> não
          saca o saldo integral na rescisão: só a multa de 40%. O restante
          permanece na conta FGTS (saques-aniversário futuros ou outras
          hipóteses legais). Pedir volta ao saque-rescisão só vale a partir do
          25º mês; se a demissão cair nesse intervalo, continua a regra do
          aniversário.
        </p>
        <p>
          O valor oficial é o da conta FGTS, não a estimativa da calculadora.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Seguro-desemprego
        </h2>
        <p>
          Quem foi dispensado sem justa causa pode ter direito ao
          seguro-desemprego se cumprir tempo de vínculo, ausência de renda
          própria e os demais requisitos. O benefício é pago pelo governo,{" "}
          <strong className="text-foreground">não entra no líquido</strong> da
          rescisão e se pede depois, no app Carteira de Trabalho Digital. Veja
          o{" "}
          <Link href="/guias/seguro-desemprego" className={linkClass}>
            guia de seguro-desemprego
          </Link>{" "}
          ou{" "}
          <Link href={SEGURO_DESEMPREGO_CALCULADORA_HREF} className={linkClass}>
            calcule as parcelas
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Aviso prévio (30 a 90 dias)
        </h2>
        <p>
          Na dispensa pelo empregador, o aviso começa em{" "}
          <strong className="text-foreground">30 dias</strong> e soma{" "}
          <strong className="text-foreground">3 dias por ano completo</strong>{" "}
          de contrato, até o teto de 90 dias (Lei 12.506/2011; CLT art. 487).
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Trabalhado:</strong> você
            cumpre os dias, recebe o salário no holerite e o contrato segue até
            o último dia. O prazo de 10 dias para pagar a rescisão conta a
            partir daí (CLT art. 477, § 6º);
          </li>
          <li>
            <strong className="text-foreground">Indenizado:</strong> você sai na
            hora e a empresa paga os dias de aviso. Esses dias projetam o
            contrato para 13º, férias e FGTS, mas o pagamento da rescisão não
            espera o fim do aviso — conta da comunicação;
          </li>
          <li>
            <strong className="text-foreground">Parcial:</strong> os dias
            trabalhados vão no salário; o restante entra como aviso indenizado.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Prazo para receber
        </h2>
        <p>
          A rescisão deve ser paga em até{" "}
          <strong className="text-foreground">10 dias corridos</strong> após o
          término do contrato. Com aviso trabalhado, o prazo começa no último
          dia de trabalho. Com aviso indenizado, conta da data da comunicação.
          Atraso pode gerar multa de um salário (art. 477, § 8º).
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que não se confunde com o pedido ou com o acordo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            No{" "}
            <Link
              href="/guias/pedido-de-demissao-o-que-recebo"
              className={linkClass}
            >
              pedido de demissão
            </Link>{" "}
            não há multa de 40%, em regra não há saque do FGTS nem
            seguro-desemprego, e o aviso de 30 dias é obrigação do empregado.
            Veja o{" "}
            <Link
              href="/guias/pedi-demissao-preciso-cumprir-aviso"
              className={linkClass}
            >
              guia do aviso no pedido
            </Link>
            ;
          </li>
          <li>
            No <strong className="text-foreground">acordo (art. 484-A)</strong>{" "}
            as verbas se parecem com a sem justa causa, mas o aviso indenizado
            é de 50%, a multa do FGTS é de 20%, o saque é de até 80% e{" "}
            <strong className="text-foreground">não há seguro-desemprego</strong>
            .
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              A multa de 40% entra no dinheiro que a empresa deposita na minha
              conta?
            </dt>
            <dd>
              Não no salário da rescisão. A multa vai para a conta FGTS na
              Caixa, junto com o saldo. A calculadora mostra os dois como
              referência, fora do líquido.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O seguro-desemprego vem junto com a rescisão?
            </dt>
            <dd>
              Não. A empresa paga as verbas do contrato. O seguro é benefício
              federal, pedido depois, se você cumprir os requisitos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Quantos dias de aviso eu tenho?
            </dt>
            <dd>
              30 dias mais 3 por ano completo na empresa, até 90. Exemplo: 4
              anos de casa → 42 dias. Quem pede demissão deve só 30 dias, sem
              esse acréscimo. Detalhe no{" "}
              <Link
                href="/guias/pedi-demissao-preciso-cumprir-aviso"
                className={linkClass}
              >
                guia do aviso no pedido de demissão
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Estou no saque-aniversário. Consigo sacar o FGTS na demissão?
            </dt>
            <dd>
              Não o saldo integral. Só a multa de 40%. O restante fica na conta
              FGTS até um saque-aniversário ou outra hipótese legal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Fui dispensado no acordo. É a mesma coisa?
            </dt>
            <dd>
              Não. O acordo (CLT art. 484-A) reduz aviso indenizado e multa
              FGTS e tira o seguro-desemprego. Use o motivo “acordo” na
              calculadora de rescisão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Estabilidade ou contrato a prazo mudam o cálculo?
            </dt>
            <dd>
              Podem mudar. Este guia cobre o contrato por prazo indeterminado
              sem estabilidade. Gestante, cipeiro, contrato determinado e
              indenizações específicas pedem o departamento pessoal ou um
              advogado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo alinhado à calculadora de rescisão.
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
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
          <Link href={SEGURO_DESEMPREGO_CALCULADORA_HREF} className={linkClass}>
            Calculadora de seguro-desemprego
          </Link>
          <Link href="/guias/seguro-desemprego" className={linkClass}>
            Guia de seguro-desemprego
          </Link>
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            Férias proporcionais na rescisão
          </Link>
          <Link
            href="/guias/pedido-de-demissao-o-que-recebo"
            className={linkClass}
          >
            Pedido de demissão: o que recebo?
          </Link>
          <Link
            href="/guias/pedi-demissao-preciso-cumprir-aviso"
            className={linkClass}
          >
            Pedi demissão: preciso cumprir aviso?
          </Link>
        </div>
      </div>
    </main>
  );
}
