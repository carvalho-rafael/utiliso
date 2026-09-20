import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { formatarMoeda } from "../../lib/calculadoras/format";
import { round2, TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("decimo-terceiro-proporcional")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

const exemploSalario = 3000;
const exemploAvos = 8;
const exemploBruto = round2((exemploSalario / 12) * exemploAvos);

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function DecimoTerceiroProporcionalGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          13º salário proporcional
        </h1>
        <p className="text-lg text-muted">
          Entenda os avos no ano civil, a fórmula, as duas parcelas de quem
          permanece empregado e o pagamento único na rescisão.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de 13º salário"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime o valor dos avos
        </h2>
        <p className="mt-2 text-sm text-muted">
          Também calcula 13º proporcional para admitidos ou desligados durante o
          ano — além das 1ª e 2ª parcelas de quem segue no emprego.
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
          O que é o 13º proporcional
        </h2>
        <p>
          O 13º salário (Lei 4.090/1962) é devido a todo empregado. Quem não
          trabalhou o ano inteiro recebe a{" "}
          <strong className="text-foreground">fração proporcional</strong>:
          um doze avos por mês com mais de 14 dias no período considerado.
        </p>
        <p>
          Não confunda com a{" "}
          <Link
            href="/guias/primeira-parcela-decimo-terceiro"
            className={linkClass}
          >
            1ª parcela
          </Link>{" "}
          ou a{" "}
          <Link
            href="/guias/segunda-parcela-decimo-terceiro"
            className={linkClass}
          >
            2ª parcela
          </Link>{" "}
          do calendário: elas são o jeito de pagar o 13º de quem{" "}
          <strong className="text-foreground">permanece empregado</strong> até
          dezembro. O proporcional é a conta dos avos; as parcelas são só a
          forma de receber esse valor no emprego.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como contar os avos
        </h2>
        <p>
          O 13º usa o <strong className="text-foreground">ano civil</strong>{" "}
          ({TABELAS_ANO}): de 1º de janeiro a 31 de dezembro, ou do trecho que
          couber no ano.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Ainda empregado:</strong> da
            admissão (se for no mesmo ano) ou de 1º de janeiro até 31 de
            dezembro;
          </li>
          <li>
            <strong className="text-foreground">Saída no ano:</strong> da
            admissão (ou 1º de janeiro) até a data de rescisão ou fim do
            contrato;
          </li>
          <li>
            <strong className="text-foreground">Regra do mês:</strong> só conta
            avo o mês com <strong className="text-foreground">mais de 14 dias</strong>{" "}
            trabalhados (15 ou mais). Quatorze dias não geram avo.
          </li>
        </ul>
        <p>
          Isso é diferente das{" "}
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            férias proporcionais
          </Link>
          , que contam meses no período aquisitivo (aniversário da admissão), não
          no ano civil.
        </p>

        <h2 className="text-base font-medium text-foreground">Fórmula</h2>
        <p>
          <strong className="text-foreground">
            (salário ÷ 12) × número de avos
          </strong>
          . Médias de horas extras e comissões habituais entram na base, como
          na rescisão. Exemplo com salário de {formatarMoeda(exemploSalario)} e{" "}
          {exemploAvos}/12 avos: {formatarMoeda(exemploBruto)} de 13º bruto.
        </p>

        <h2 className="text-base font-medium text-foreground">
          No emprego x saída no ano
        </h2>
        <p>
          <strong className="text-foreground">No emprego:</strong> a 1ª parcela
          é metade do bruto, sem INSS nem IRRF (fev.–nov.); a 2ª traz o restante
          menos INSS e IRRF sobre o 13º inteiro, até 20 de dezembro (Lei
          4.749/1965).
        </p>
        <p>
          <strong className="text-foreground">Rescisão no ano:</strong> o 13º
          proporcional entra no acerto em um único valor líquido (INSS e IRRF
          sobre o bruto), não em duas parcelas de calendário. Se a 1ª parcela já
          tinha sido paga, a empresa desconta o adiantamento. Para o TRCT
          completo, use a{" "}
          <Link href="/calculadoras/rescisao" className={linkClass}>
            calculadora de rescisão
          </Link>
          ; para só os avos e o 13º, a{" "}
          <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
            calculadora de 13º
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Quem tem direito na rescisão
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Dispensa sem justa causa,</strong>{" "}
            pedido de demissão e acordo rescisório (art. 484-A): há 13º
            proporcional;
          </li>
          <li>
            <strong className="text-foreground">Justa causa:</strong> não há 13º
            proporcional do ano.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          INSS, IRRF e FGTS
        </h2>
        <p>
          INSS e IRRF incidem sobre o 13º bruto (na 2ª parcela ou no acerto). O
          IRRF do 13º segue tributação exclusiva (
          <Link href="/tabelas/irrf" className={linkClass}>
            tabela IRRF
          </Link>
          ; Lei 15.270/2025). Veja o{" "}
          <Link href="/guias/calculo-inss" className={linkClass}>
            guia do cálculo do INSS
          </Link>
          . O FGTS de 8% é depositado pelo empregador sobre o 13º bruto — não
          entra no líquido que você recebe.
        </p>
        <p>
          Diferente das férias indenizadas na rescisão: o 13º proporcional{" "}
          <strong className="text-foreground">tem</strong> INSS e IRRF (férias
          indenizadas são isentas, Lei 8.212/1991, art. 28, § 9º).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Entrei em março, quantos avos tenho em dezembro?
            </dt>
            <dd>
              Conte cada mês de março a dezembro em que trabalhou mais de 14
              dias — até 10 avos no exemplo de admissão em março com emprego até
              o fim do ano. Use a calculadora com a data de admissão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Os avos do 13º são iguais aos das férias proporcionais?
            </dt>
            <dd>
              Não necessariamente. O 13º segue o ano civil; as férias seguem o
              período aquisitivo. Detalhe no{" "}
              <Link href="/guias/ferias-proporcionais" className={linkClass}>
                guia de férias proporcionais
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Fui demitido sem justa causa. Uso esta calculadora ou a de
              rescisão?
            </dt>
            <dd>
              Para o 13º proporcional isolado, a calculadora de 13º com modo
              “saída no ano”. Para saldo, férias, aviso e demais verbas, a{" "}
              <Link href="/calculadoras/rescisao" className={linkClass}>
                calculadora de rescisão
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo alinhado às calculadoras. Convenção
              coletiva, médias de variáveis e o caso concreto podem alterar o
              valor real.
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
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
          <Link
            href="/guias/primeira-parcela-decimo-terceiro"
            className={linkClass}
          >
            Primeira parcela do 13º
          </Link>
          <Link
            href="/guias/segunda-parcela-decimo-terceiro"
            className={linkClass}
          >
            Segunda parcela do 13º
          </Link>
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            Férias proporcionais na rescisão
          </Link>
          <Link href="/guias/calculo-inss" className={linkClass}>
            Guia do cálculo do INSS
          </Link>
          <Link href="/guias" className={linkClass}>
            Todos os guias
          </Link>
        </div>
      </div>
    </main>
  );
}
