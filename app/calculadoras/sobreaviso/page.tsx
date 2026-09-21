import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { fo } from "../../lib/editorial/fontes-oficiais";
import { SobreavisoForm } from "./sobreaviso-form";

const calculadora = getCalculadoraBySlug("sobreaviso")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export default function SobreavisoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Sobreaviso
        </h1>
        <p className="text-lg text-muted">
          Estime o valor de horas em sobreaviso e prontidão, com INSS e IRRF.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <SobreavisoForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Base legal:</strong>{" "}
            <Link href={fo.clt244.href} className={linkClass}>
              CLT art. 244
            </Link>{" "}
            (§§ 2º e 3º), por analogia a todas as categorias (
            <Link href={fo.sumula428Tst.href} className={linkClass}>
              Súmula 428 do TST
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Sobreaviso:</strong> empregado
            à distância, em plantão, aguardando chamado — remuneração de 1/3 da
            hora normal por hora de disponibilidade.
          </li>
          <li>
            <strong className="text-foreground">Prontidão:</strong> aguardando
            ordens nas dependências da empresa — 2/3 da hora normal por hora.
          </li>
          <li>
            <strong className="text-foreground">Hora normal:</strong> salário
            bruto ÷ jornada mensal (ex.: 44 h/semana = divisor 220), como na{" "}
            <Link href="/calculadoras/hora-extra" className={linkClass}>
              calculadora de hora extra
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Chamado para trabalhar:</strong>{" "}
            as horas efetivamente laboradas costumam ser pagas como hora extra
            (mínimo 50%), não substituídas pelo 1/3 ou 2/3 de expectativa.
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> descontos
            sobre o acréscimo no mês (diferença com e sem a verba). Tabelas de{" "}
            {TABELAS_ANO} (
            <Link href="/tabelas/inss" className={linkClass}>
              INSS
            </Link>
            ,{" "}
            <Link href="/tabelas/irrf" className={linkClass}>
              IRRF
            </Link>
            ).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Só ter celular da empresa é sobreaviso?
            </dt>
            <dd>
              Não, por si só. A Súmula 428, I, do TST diz que instrumentos
              telemáticos fornecidos pela empresa não caracterizam regime de
              sobreaviso. É preciso plantão ou equivalente, com controle
              patronal e restrição real à liberdade (item II).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Qual o limite de horas por escala?
            </dt>
            <dd>
              O art. 244 prevê, para ferroviários, até 24 h de sobreaviso e 12 h
              de prontidão por escala. Outras categorias seguem a analogia e
              acordos — informe o total do mês que o DP reconheceu.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Sobreaviso em domingo ou feriado paga em dobro?
            </dt>
            <dd>
              Há entendimentos de pagamento em dobro quando o sobreaviso cai em
              repouso semanal ou feriado. Esta calculadora usa a fração simples
              (1/3 ou 2/3); confirme com contador ou DP se há majoração no seu
              caso.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Diferença entre sobreaviso e hora extra?
            </dt>
            <dd>
              Sobreaviso/prontidão remuneram a expectativa de ficar disponível.
              Hora extra é o trabalho efetivo além da jornada. Use a{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                calculadora de hora extra
              </Link>{" "}
              para o tempo trabalhado no chamado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. Convenções coletivas, escalas e prova do plantão podem alterar
              o valor. Consulte o departamento pessoal para o contracheque
              oficial.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
