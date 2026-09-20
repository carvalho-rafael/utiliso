import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { fo } from "../../lib/editorial/fontes-oficiais";
import { DsrSobreComissoesForm } from "./dsr-sobre-comissoes-form";

const calculadora = getCalculadoraBySlug("dsr-sobre-comissoes")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export default function DsrSobreComissoesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de DSR sobre Comissões
        </h1>
        <p className="text-lg text-muted">
          Estime o descanso semanal remunerado sobre as comissões do mês.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <DsrSobreComissoesForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Direito:</strong> o
            comissionista tem DSR sobre comissões, inclusive pracista ou quem
            também recebe salário fixo (
            <Link href={fo.sumula27Tst.href} className={linkClass}>
              Súmula 27 do TST
            </Link>
            ;{" "}
            <Link href={fo.lei605.href} className={linkClass}>
              Lei 605/1949
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Fórmula:</strong> total de
            comissões do mês ÷ dias úteis × dias de DSR (domingos e feriados).
            Mesma lógica do DSR sobre horas extras (
            <Link href="/calculadoras/hora-extra" className={linkClass}>
              calculadora de hora extra
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Salário fixo:</strong> não entra
            no campo de comissões — o repouso do mensalista já está embutido no
            fixo (Lei 605/1949, art. 7º, § 2º).
          </li>
          <li>
            <strong className="text-foreground">Dias úteis:</strong> em geral
            incluem sábados; feriado que cai no domingo não deve ser contado
            duas vezes. Informe os números do calendário do mês.
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> esta
            ferramenta não calcula encargos — o DP aplica sobre o holerite
            completo. Use a{" "}
            <Link href="/calculadoras/salario-liquido" className={linkClass}>
              calculadora de salário líquido
            </Link>
            .
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Quem recebe fixo + comissão precisa calcular DSR?
            </dt>
            <dd>
              Sim, sobre a parte variável. O DSR do salário fixo já está no
              mensalista; as comissões do mês geram DSR próprio, proporcional ao
              valor recebido.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que 25 dias úteis e 5 de DSR?
            </dt>
            <dd>
              É um exemplo comum (4 domingos + 1 feriado em dia útil). Cada mês
              tem calendário diferente — ajuste os campos conforme o período.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E o DSR sobre horas extras?
            </dt>
            <dd>
              É outra verba variável, com regra da Súmula 172 do TST. Use a{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                calculadora de hora extra
              </Link>{" "}
              para estimar extras e o DSR sobre elas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Comissões entram no 13º e nas férias?
            </dt>
            <dd>
              Médias habituais de comissões costumam integrar a base do 13º e
              das férias — veja as calculadoras de{" "}
              <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
                13º
              </Link>{" "}
              e{" "}
              <Link href="/calculadoras/ferias" className={linkClass}>
                férias
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. Convenção coletiva, calendário de loja e critérios do DP
              podem alterar dias úteis e feriados considerados. Consulte o
              departamento pessoal para o contracheque oficial.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
