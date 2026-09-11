import type { Metadata } from "next";
import { getCalculadoraBySlug } from "../lib/calculadoras/catalog";
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
          O que entra no cálculo?
        </h2>
        <p>
          Saldo de salário, 13º proporcional, férias proporcionais e vencidas
          (com 1/3 constitucional), aviso prévio indenizado (quando aplicável),
          descontos de INSS e IRRF, multa de 40% do FGTS na demissão sem justa
          causa e de 20% no acordo rescisório (art. 484-A). A data da
          comunicação é o dia em que a rescisão foi avisada; no aviso
          trabalhado, o salário do
          período é pago no holerite e o saldo refere-se ao último mês
          trabalhado. O aviso soma os dias no fim do contrato, salvo justa
          causa. IRRF incide só sobre o
          saldo de salário e o 13º (cálculos separados). Férias indenizadas,
          aviso indenizado e FGTS são isentos. A multa do FGTS é depositada na
          conta do trabalhador e não entra no líquido da rescisão.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Diferença entre os motivos
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Pedido de demissão:</strong>{" "}
            direito a 13º e férias proporcionais, sem multa FGTS. Aviso não
            cumprido pode gerar desconto de até 30 dias.
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
              Como informar férias vencidas?
            </dt>
            <dd>
              Informe quantos períodos aquisitivos completos você não gozou. O
              período atual é calculado automaticamente pela data de admissão.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Quais verbas têm IRRF?
            </dt>
            <dd>
              Só o saldo de salário (tabela mensal) e o 13º proporcional
              (tributação exclusiva). Férias indenizadas com 1/3, aviso prévio
              indenizado e a multa do FGTS são isentos. O redutor de 2026 zera
              o imposto quando o rendimento tributável de cada base fica até R$
              5.000.
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
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes. Consulte um profissional para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
