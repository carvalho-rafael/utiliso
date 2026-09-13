import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { RescisaoForm } from "./rescisao-form";

const calculadora = getCalculadoraBySlug("rescisao")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function RescisaoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Rescisão
        </h1>
        <p className="text-lg text-muted">
          Descubra uma estimativa de quanto você receberá ao encerrar seu
          contrato.
        </p>
      </div>

      <RescisaoForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Diferença entre os motivos
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Pedido de demissão:</strong>{" "}
            direito a 13º e férias proporcionais, sem multa FGTS. Aviso não
            cumprido (total ou parcial) pode gerar desconto de até 30 dias.
          </li>
          <li>
            <strong className="text-foreground">Sem justa causa:</strong> todas
            as verbas rescisórias, aviso prévio indenizado (se não trabalhado) e
            multa de 40% sobre o FGTS.
          </li>
          <li>
            <strong className="text-foreground">Com justa causa:</strong> saldo
            de salário e férias vencidas não gozadas. Sem 13º proporcional, sem
            férias proporcionais e sem multa FGTS.
          </li>
          <li>
            <strong className="text-foreground">
              Acordo rescisório (art. 484-A):
            </strong>{" "}
            mesmas verbas da demissão sem justa causa, com aviso indenizado
            pela metade (se não trabalhado), multa FGTS de 20% e saque de até
            80% do saldo. Sem seguro-desemprego.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">Perguntas frequentes</h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Quais verbas têm IRRF?
            </dt>
            <dd>
              Só o saldo de salário (
              <Link
                href="/tabelas/irrf"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                tabela IRRF
              </Link>{" "}
              mensal) e o 13º proporcional (tributação exclusiva). Férias
              indenizadas com 1/3, aviso prévio indenizado e a multa do FGTS são
              isentos. O redutor de 2026 zera o imposto quando o rendimento
              tributável de cada base fica até R$ 5.000. Dependentes entram na
              dedução legal se forem mais vantajosos que o desconto simplificado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Qual o prazo para pagar a rescisão?
            </dt>
            <dd>
              Até 10 dias corridos após o término do contrato (CLT art. 477, §
              6º). No aviso trabalhado, o prazo conta do último dia de
              trabalho. No aviso indenizado ou na justa causa, conta da data da
              comunicação. Se o dia cair em fim de semana ou feriado, o
              pagamento costuma ser no próximo dia útil. Atraso pode gerar
              multa de um salário ao empregado (art. 477, § 8º).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Como funciona o acordo rescisório?
            </dt>
            <dd>
              No acordo (CLT art. 484-A), o trabalhador recebe as verbas da
              demissão sem justa causa, mas o aviso indenizado é de 50%, a multa
              do FGTS é de 20% (com saque de até 80% do saldo) e não há
              seguro-desemprego.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Como entra o 13º proporcional?
            </dt>
            <dd>
              Conta-se 1/12 por mês com 15 dias ou mais de trabalho no ano
              civil, a partir da admissão (Lei 4.090/1962). O aviso prévio que
              projeta o contrato (CLT art. 487, § 1º) entra nessa conta: se a
              projeção cruzar 1º de janeiro, há 13º do ano que fecha e avos do
              ano seguinte.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso sacar o FGTS na rescisão?
            </dt>
            <dd>
              Na demissão sem justa causa, sim (saldo + multa de 40%). No
              acordo, saque de até 80% e multa de 20%. Pedido de demissão e
              justa causa, em regra, não permitem saque. A estimativa soma 8%
              mensal, 8% sobre o 13º e 8% sobre o aviso indenizado — o valor
              oficial é o da conta FGTS.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes (
              <Link
                href="/tabelas/inss"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                INSS
              </Link>
              ,{" "}
              <Link
                href="/tabelas/irrf"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                IRRF
              </Link>
              ). Consulte um profissional para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
