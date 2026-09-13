import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { HoraExtraForm } from "./hora-extra-form";

const calculadora = getCalculadoraBySlug("hora-extra")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function HoraExtraPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Hora Extra
        </h1>
        <p className="text-lg text-muted">
          Estime o valor das horas extras com adicional de 50% ou 100%, DSR e
          descontos de INSS e IRRF.
        </p>
      </div>

      <HoraExtraForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Hora normal:</strong> salário
            bruto dividido pela jornada mensal (ex.: 44h/semana = divisor 220).
          </li>
          <li>
            <strong className="text-foreground">Hora extra 50%:</strong>{" "}
            adicional mínimo de 50% sobre a hora normal em dias úteis (CF art.
            7º, XVI; CLT art. 59, §1º).
          </li>
          <li>
            <strong className="text-foreground">Hora extra 100%:</strong>{" "}
            adicional de 100% em domingos e feriados não compensados (Lei
            605/1949; Súmula 146 TST).
          </li>
          <li>
            <strong className="text-foreground">DSR:</strong> repouso semanal
            remunerado sobre as horas extras habituais (Súmula 172 TST). Por
            padrão, usa 25 dias úteis e 5 dias de DSR no mês.
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> calculados
            sobre o acréscimo das horas extras no mês (diferença entre o mês
            com e sem extras). Tabelas{" "}
            <Link
              href="/tabelas/inss"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              INSS
            </Link>{" "}
            e{" "}
            <Link
              href="/tabelas/irrf"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              IRRF
            </Link>{" "}
            de 2026.
          </li>
          <li>
            <strong className="text-foreground">FGTS:</strong> 8% depositados
            pelo empregador sobre horas extras e DSR — não entram no líquido,
            apenas como referência.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Por que o divisor é 220 e não 240?
            </dt>
            <dd>
              A jornada CLT padrão é 44h semanais. Multiplicando por 5 semanas
              (média mensal), obtém-se 220 horas. Jornadas de 40h ou 36h usam
              divisores 200 e 180, respectivamente.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Hora extra entra no 13º salário e nas férias?
            </dt>
            <dd>
              Sim, quando habituais. O 13º e as férias usam a média das horas
              extras dos últimos meses. Use a{" "}
              <a
                href="/calculadoras/decimo-terceiro"
                className="font-medium text-accent hover:underline"
              >
                calculadora de 13º salário
              </a>{" "}
              e a{" "}
              <a
                href="/calculadoras/ferias"
                className="font-medium text-accent hover:underline"
              >
                calculadora de férias
              </a>{" "}
              com a média de variáveis.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Banco de horas substitui o pagamento?
            </dt>
            <dd>
              Depende do acordo ou convenção coletiva. Esta calculadora estima
              o pagamento em dinheiro quando as horas extras são remuneradas,
              não compensadas em banco de horas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O adicional noturno está incluído?
            </dt>
            <dd>
              Não. Horas extras noturnas podem ter adicional de 20% sobre a hora
              normal (CLT art. 73), além do adicional de hora extra. Consulte o
              departamento pessoal para combinações específicas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este valor é o holerite inteiro?
            </dt>
            <dd>
              Não. A calculadora estima apenas o acréscimo das horas extras (e
              DSR, se marcado), com os descontos proporcionais. O salário base
              do mês é calculado separadamente.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes. Acordos coletivos, adicional noturno ou regras
              específicas da empresa podem alterar o valor real. Consulte um
              profissional para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
