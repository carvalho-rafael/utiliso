import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { formatarMoeda } from "../../lib/calculadoras/format";
import { round2 } from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ferias-proporcionais")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

const exemploSalario = 3000;
const exemploAvos = 8;
const exemploBase = round2((exemploSalario / 12) * exemploAvos);
const exemploTerco = round2(exemploBase / 3);
const exemploTotal = round2(exemploBase + exemploTerco);

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function FeriasProporcionaisGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Férias proporcionais na rescisão
        </h1>
        <p className="text-lg text-muted">
          Entenda os avos do período aquisitivo incompleto, o 1/3 constitucional
          e em quais motivos de saída a verba é devida.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de rescisão"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime o valor na rescisão
        </h2>
        <p className="mt-2 text-sm text-muted">
          A calculadora de rescisão aplica os avos, o 1/3 e o motivo do
          desligamento — inclusive a exclusão na justa causa.
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
          O que são férias proporcionais
        </h2>
        <p>
          Férias proporcionais são a indenização do período aquisitivo que ainda
          não fechou 12 meses quando o contrato acaba. Não se confundem com o{" "}
          <Link href="/calculadoras/ferias" className={linkClass}>
            recibo de férias gozadas
          </Link>{" "}
          nem com férias vencidas (período já adquirido e não gozado).
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Gozadas:</strong> descanso
            durante o contrato, com INSS e IRRF sobre o gozo e o 1/3;
          </li>
          <li>
            <strong className="text-foreground">Vencidas:</strong> 12 meses já
            completos, não tiradas. Entram na rescisão com 1/3; se o prazo de
            concessão passou, o pagamento é em dobro (CLT art. 137);
          </li>
          <li>
            <strong className="text-foreground">Proporcionais:</strong> fração
            do período corrente, em avos, mais 1/3 (CF art. 7º, XVII; CLT arts.
            146 e 147).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Como contar os avos
        </h2>
        <p>
          Os avos das férias <strong className="text-foreground">não</strong>{" "}
          seguem o ano civil — isso é regra do 13º (Lei 4.090/1962). Nas férias,
          o período aquisitivo começa na admissão e se renova a cada aniversário
          de contrato.
        </p>
        <p>
          Conta-se <strong className="text-foreground">1/12</strong> por mês com{" "}
          <strong className="text-foreground">mais de 14 dias</strong>{" "}
          trabalhados nesse período incompleto (CLT art. 147: fração superior a
          14 dias). Quinze dias no mês geram avo; quatorze, não.
        </p>
        <p>
          Exemplo: admissão em 10 de março, rescisão em 20 de novembro do mesmo
          ano. Do aniversário da admissão até o fim do contrato há meses cheios
          e o mês da saída com mais de 14 dias — cada um desses meses entra como
          avo, até o teto de 12.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Fórmula e 1/3 constitucional
        </h2>
        <p>
          A base é{" "}
          <strong className="text-foreground">
            (salário ÷ 12) × número de avos
          </strong>
          . Sobre essa base incide o adicional de um terço. Com salário de{" "}
          {formatarMoeda(exemploSalario)} e {exemploAvos}/12 avos:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            base: {formatarMoeda(exemploBase)} ({exemploAvos}/12);
          </li>
          <li>1/3 constitucional: {formatarMoeda(exemploTerco)};</li>
          <li>
            total das proporcionais:{" "}
            <strong className="text-foreground">
              {formatarMoeda(exemploTotal)}
            </strong>
            .
          </li>
        </ul>
        <p>
          Médias de horas extras, comissões e outras variáveis, faltas que
          reduzam o direito (CLT art. 130) e acordos coletivos podem alterar o
          valor. A calculadora usa o salário informado, sem essas reduções.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Quando há direito
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Demissão sem justa causa</strong>{" "}
            — sim, com 1/3 (
            <Link
              href="/guias/demissao-sem-justa-causa-o-que-recebo"
              className={linkClass}
            >
              o que você recebe
            </Link>
            );
          </li>
          <li>
            <strong className="text-foreground">Pedido de demissão</strong> —
            sim, mesmo com menos de um ano de casa (Súmula 171 do TST). Veja o{" "}
            <Link
              href="/guias/pedido-de-demissao-o-que-recebo"
              className={linkClass}
            >
              guia do pedido de demissão
            </Link>
            ;
          </li>
          <li>
            <strong className="text-foreground">Acordo (art. 484-A)</strong> —
            sim: as verbas de férias seguem a dispensa sem justa causa;
          </li>
          <li>
            <strong className="text-foreground">Justa causa</strong> —{" "}
            <strong className="text-foreground">não</strong> há férias
            proporcionais nem 13º proporcional. Férias vencidas não gozadas
            continuam devidas (direito já adquirido, CLT art. 146).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Aviso que projeta o contrato
        </h2>
        <p>
          Quando o aviso prévio projeta o término (CLT art. 487, § 1º), os dias
          projetados entram na conta dos avos de férias e de 13º. Isso vale no
          aviso trabalhado e, na dispensa pelo empregador, no aviso indenizado.
        </p>
        <p>
          No pedido de demissão, aviso não cumprido{" "}
          <strong className="text-foreground">não projeta</strong>: o contrato
          encerra na comunicação. Na justa causa não há aviso. O{" "}
          <Link
            href="/guias/pedi-demissao-preciso-cumprir-aviso"
            className={linkClass}
          >
            guia do aviso no pedido
          </Link>{" "}
          detalha trabalhado, dispensado pela empresa e desconto.
        </p>

        <h2 className="text-base font-medium text-foreground">
          INSS e Imposto de Renda
        </h2>
        <p>
          Férias indenizadas na rescisão — proporcionais e vencidas — com o 1/3{" "}
          <strong className="text-foreground">
            não integram o salário-de-contribuição
          </strong>{" "}
          (Lei 8.212/1991, art. 28, § 9º) e são isentas de IRRF. Sobre o saldo de
          salário e o 13º proporcional incidem{" "}
          <Link href="/tabelas/inss" className={linkClass}>
            INSS
          </Link>{" "}
          e{" "}
          <Link href="/tabelas/irrf" className={linkClass}>
            IRRF
          </Link>
          .
        </p>
        <p>
          Essa isenção é o oposto das férias gozadas: no recibo de descanso, o
          INSS incide sobre o gozo e o 1/3 do gozo, mas não sobre o abono
          pecuniário.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Com menos de um ano de casa eu recebo proporcionais?
            </dt>
            <dd>
              Sim, no pedido de demissão, na dispensa sem justa causa e no
              acordo. A Súmula 171 do TST garante a verba em qualquer extinção
              do contrato, salvo justa causa.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Justa causa tira as férias vencidas também?
            </dt>
            <dd>
              Não. Tira as proporcionais e o 13º proporcional. O período já
              adquirido e não gozado entra na rescisão, com 1/3 — em dobro se o
              prazo de concessão venceu (CLT art. 137).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Férias em dobro são as proporcionais?
            </dt>
            <dd>
              Não. O dobro do art. 137 vale para férias vencidas cujo período
              de concessão passou do prazo. Proporcionais são o período
              incompleto, em avos, com 1/3 simples.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Os avos das férias são os mesmos do 13º?
            </dt>
            <dd>
              Não necessariamente. O 13º conta meses no ano civil, a partir de
              janeiro (ou da admissão, se for no mesmo ano). As férias contam
              meses no período aquisitivo, a partir da data de admissão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              É o mesmo valor do recibo de férias?
            </dt>
            <dd>
              Não. O recibo de gozo tem INSS (e IRRF, se houver) sobre férias
              e 1/3, e pode incluir abono. Na rescisão as indenizadas são
              isentas desses descontos. Use a{" "}
              <Link href="/calculadoras/rescisao" className={linkClass}>
                calculadora de rescisão
              </Link>
              , não a de férias gozadas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo alinhado à calculadora de rescisão.
              Convenção coletiva, médias de variáveis, faltas e o caso concreto
              podem alterar o valor real.
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
