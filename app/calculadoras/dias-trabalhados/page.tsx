import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { DiasTrabalhadosForm } from "./dias-trabalhados-form";

const calculadora = getCalculadoraBySlug("dias-trabalhados")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export default function DiasTrabalhadosPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Dias Trabalhados
        </h1>
        <p className="text-lg text-muted">
          Conte os dias no mês e estime o salário proporcional, com INSS e IRRF.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <DiasTrabalhadosForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Dias trabalhados:</strong> dias
            corridos entre a data inicial e a final, inclusive (mesmo mês
            civil).
          </li>
          <li>
            <strong className="text-foreground">Salário proporcional:</strong>{" "}
            salário bruto mensal dividido pelos dias do mês civil, multiplicado
            pelos dias trabalhados — mesma lógica do saldo de salário na{" "}
            <Link href="/calculadoras/rescisao" className={linkClass}>
              rescisão
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Avos:</strong> mês com mais de
            14 dias trabalhados conta como 1/12 para{" "}
            <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
              13º
            </Link>{" "}
            e para{" "}
            <Link href="/guias/ferias-proporcionais" className={linkClass}>
              férias proporcionais
            </Link>{" "}
            na rescisão (Lei 4.090/1962; regra dos avos na CLT).
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> calculados
            sobre o valor proporcional, com tabelas de {TABELAS_ANO} (
            <Link href="/tabelas/inss" className={linkClass}>
              INSS
            </Link>
            ,{" "}
            <Link href="/tabelas/irrf" className={linkClass}>
              IRRF
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">FGTS:</strong> 8% sobre o
            proporcional, depositado pelo empregador — referência apenas, fora
            do líquido.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Por que as duas datas precisam ser do mesmo mês?
            </dt>
            <dd>
              O proporcional usa o número de dias do mês civil (28, 29, 30 ou
              31). Se o período cruza meses, cada trecho tem divisor diferente —
              calcule separadamente para cada mês.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              É a mesma conta do saldo na rescisão?
            </dt>
            <dd>
              Sim, quando o saldo refere-se a um intervalo dentro do último mês
              trabalhado. Veja o{" "}
              <Link href="/guias/saldo-de-salario" className={linkClass}>
                guia do saldo de salário
              </Link>{" "}
              com exemplo interativo. Na rescisão completa, outras verbas (13º,
              férias, aviso) entram à parte — use a{" "}
              <Link href="/calculadoras/rescisao" className={linkClass}>
                calculadora de rescisão
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Desconta faltas ou atestados?
            </dt>
            <dd>
              Não. Informe só os dias em que houve trabalho (ou dias pagos como
              trabalhados, conforme o acordo com o DP). Faltas não remuneradas
              reduzem o valor no holerite real.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa com base nas tabelas vigentes. Convenções
              coletivas, adicionais ou médias de variáveis podem alterar o valor
              pago. Consulte o departamento pessoal para o contracheque
              oficial.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
