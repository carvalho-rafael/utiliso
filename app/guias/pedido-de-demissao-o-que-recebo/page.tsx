import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("pedido-de-demissao-o-que-recebo")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function PedidoDemissaoGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Pedido de demissão: o que recebo?
        </h1>
        <p className="text-lg text-muted">
          Entenda as verbas da rescisão quando você pede as contas, o aviso de
          30 dias e o que fica de fora.
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
          Use a calculadora com o motivo “pedido de demissão” para ver saldo,
          13º, férias, desconto de aviso (se houver) e o líquido estimado.
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
          Pedir demissão não zera as verbas já conquistadas. Em regra, o
          empregado com carteira assinada recebe:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Saldo de salário</strong> — os
            dias trabalhados no mês do desligamento;
          </li>
          <li>
            <strong className="text-foreground">13º proporcional</strong> — 1/12
            por mês com 15 dias ou mais no ano civil (Lei 4.090/1962);
          </li>
          <li>
            <strong className="text-foreground">Férias vencidas</strong> não
            gozadas, com o terço constitucional. Se o período de concessão
            passou do prazo, o pagamento é em dobro (CLT art. 137);
          </li>
          <li>
            <strong className="text-foreground">Férias proporcionais</strong> +
            1/3, mesmo com menos de um ano de contrato (CLT arts. 146 e 147;
            Súmula 171 do TST). Veja o{" "}
            <Link href="/guias/ferias-proporcionais" className={linkClass}>
              guia de férias proporcionais na rescisão
            </Link>
            .
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
          . Férias indenizadas com 1/3 são isentas desses descontos.
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que não entra
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">
              Aviso indenizado pago pela empresa
            </strong>{" "}
            — no pedido, o aviso de 30 dias é obrigação do empregado, não uma
            verba a receber;
          </li>
          <li>
            <strong className="text-foreground">Multa de 40% do FGTS</strong> —
            só na dispensa sem justa causa (no acordo do art. 484-A a multa é
            de 20%);
          </li>
          <li>
            <strong className="text-foreground">Saque do FGTS</strong> — em
            regra o saldo permanece na conta vinculada. Há hipóteses legais à
            parte (aposentadoria, três anos sem CLT, doença grave, entre
            outras), independentes do pedido de demissão;
          </li>
          <li>
            <strong className="text-foreground">Seguro-desemprego</strong> — o
            benefício é para quem foi dispensado sem justa causa. Veja o{" "}
            <Link href="/guias/seguro-desemprego" className={linkClass}>
              guia de seguro-desemprego
            </Link>
            .
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Aviso prévio de 30 dias
        </h2>
        <p>
          Quem pede demissão deve comunicar o empregador com{" "}
          <strong className="text-foreground">30 dias</strong> de antecedência
          (CLT art. 487). Os acréscimos de 3 dias por ano de casa (até 90 dias)
          valem só quando a empresa dispensa, não no pedido.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Trabalhado:</strong> você
            cumpre os 30 dias (ou os dias combinados). O salário desses dias
            entra no holerite. O contrato segue até o último dia, e o prazo de
            10 dias para pagar a rescisão conta a partir daí (CLT art. 477, §
            6º).
          </li>
          <li>
            <strong className="text-foreground">Dispensado pela empresa:</strong>{" "}
            o empregador pode abrir mão do aviso. Você sai na hora, sem
            desconto.
          </li>
          <li>
            <strong className="text-foreground">Não cumprido</strong> (total ou
            parcial): a empresa pode descontar até o equivalente a 30 dias de
            salário (CLT art. 487, § 2º). Nesse caso o contrato encerra na
            comunicação, sem projetar 13º e férias pelos dias não trabalhados.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Prazo para receber
        </h2>
        <p>
          A rescisão deve ser paga em até{" "}
          <strong className="text-foreground">10 dias corridos</strong> após o
          término do contrato. Com aviso trabalhado, o prazo começa no último
          dia de trabalho. Se o aviso não foi cumprido ou foi dispensado, conta
          da data da comunicação. Atraso pode gerar multa de um salário (art.
          477, § 8º).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Com menos de um ano de casa eu recebo férias proporcionais?
            </dt>
            <dd>
              Sim, no pedido de demissão. A Súmula 171 do TST garante férias
              proporcionais em qualquer extinção do contrato, salvo justa causa.
              O{" "}
              <Link href="/guias/ferias-proporcionais" className={linkClass}>
                guia de férias proporcionais
              </Link>{" "}
              detalha avos, 1/3 e a diferença para férias gozadas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso sacar o FGTS se eu pedir as contas?
            </dt>
            <dd>
              Em regra, não. O empregador continua depositando 8% até o último
              dia, mas o saque e a multa de 40% não se abrem pelo pedido. O
              saldo fica na conta da Caixa.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E se eu não quiser cumprir o aviso?
            </dt>
            <dd>
              A empresa pode descontar os dias não trabalhados, até o limite de
              30. Se ela dispensar o cumprimento, não há desconto. Combine por
              escrito para evitar discussão no acerto.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Pedido de demissão é a mesma coisa que acordo (art. 484-A)?
            </dt>
            <dd>
              Não. No acordo as partes combinam o fim do contrato: há multa
              FGTS de 20%, saque de até 80% do saldo e aviso indenizado pela
              metade, mas continua sem seguro-desemprego. No pedido não há
              multa nem saque.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Estabilidade, contrato a prazo ou cargo de confiança mudam o
              cálculo?
            </dt>
            <dd>
              Podem mudar. Este guia cobre o contrato por prazo indeterminado
              sem estabilidade. Casos especiais (gestante, cipeiro, contrato
              determinado, art. 479) pedem análise do departamento pessoal ou
              de um advogado.
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
          <Link href="/calculadoras/ferias" className={linkClass}>
            Calculadora de férias
          </Link>
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            Férias proporcionais na rescisão
          </Link>
          <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
            Calculadora de 13º salário
          </Link>
          <Link href="/guias/seguro-desemprego" className={linkClass}>
            Guia de seguro-desemprego
          </Link>
          <Link
            href="/guias/demissao-sem-justa-causa-o-que-recebo"
            className={linkClass}
          >
            Demissão sem justa causa: o que recebo?
          </Link>
        </div>
      </div>
    </main>
  );
}
