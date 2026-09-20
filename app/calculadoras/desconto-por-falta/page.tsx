import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { fo } from "../../lib/editorial/fontes-oficiais";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { DIVISOR_DIA_MENSALISTA } from "../../lib/calculadoras/desconto-por-falta";
import { DescontoPorFaltaForm } from "./desconto-por-falta-form";

const calculadora = getCalculadoraBySlug("desconto-por-falta")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

const CLT = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm";

export default function DescontoPorFaltaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Desconto por Falta
        </h1>
        <p className="text-lg text-muted">
          Estime o desconto de faltas injustificadas no salário do mensalista,
          com perda de DSR por semana.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <DescontoPorFaltaForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Valor do dia:</strong> salário
            bruto mensal dividido por {DIVISOR_DIA_MENSALISTA} (
            <Link href={fo.lei605.href} className={linkClass}>
              Lei 605/1949
            </Link>
            , art. 7º, § 2º — base usual para descontos do mensalista).
          </li>
          <li>
            <strong className="text-foreground">Falta injustificada:</strong>{" "}
            desconta-se o valor de cada dia não trabalhado sem motivo legal (
            <Link href={`${CLT}#art473`} className={linkClass}>
              CLT art. 473
            </Link>{" "}
            lista as hipóteses de ausência que não geram desconto).
          </li>
          <li>
            <strong className="text-foreground">DSR:</strong> quem falta sem
            justificativa na semana pode perder a remuneração do repouso semanal
            (Lei 605/1949, art. 6º; Decreto 27.048/1949, art. 11). Várias
            faltas na mesma semana costumam gerar apenas um DSR dessa semana.
          </li>
          <li>
            <strong className="text-foreground">Diferente de dias
            trabalhados:</strong> a{" "}
            <Link href="/calculadoras/dias-trabalhados" className={linkClass}>
              calculadora de dias trabalhados
            </Link>{" "}
            estima o proporcional positivo (salário ÷ dias do mês civil × dias
            trabalhados). Aqui o foco é o desconto por ausência injustificada.
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> esta
            ferramenta não recalcula encargos sobre o salário restante — para o
            líquido do mês, use a{" "}
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
              Atestado médico gera desconto?
            </dt>
            <dd>
              Em regra, não — ausências previstas na CLT (doença com atestado,
              comparecimento a juízo, casamento, luto etc.) não devem ser
              descontadas como falta injustificada. O DP valida o documento.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que usar 30 e não os dias do mês?
            </dt>
            <dd>
              Para o mensalista, a lei trata o mês como 30 diárias nos
              descontos por falta. Já o saldo de salário na admissão ou rescisão
              pode usar os dias do mês civil — por isso existe a calculadora de
              dias trabalhados.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Faltas afetam o 13º salário?
            </dt>
            <dd>
              O 13º proporcional usa avos no ano civil (mês com mais de 14 dias).
              Muitas faltas no mês podem fazer o mês não contar como avo — veja
              a{" "}
              <Link href="/calculadoras/decimo-terceiro" className={linkClass}>
                calculadora de 13º
              </Link>{" "}
              e o guia de{" "}
              <Link
                href="/guias/decimo-terceiro-proporcional"
                className={linkClass}
              >
                13º proporcional
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Atrasos entram nesta conta?
            </dt>
            <dd>
              Não. Atrasos e saídas antecipadas podem ser descontados em horas
              ou em dia inteiro conforme política da empresa e acordos — use a{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                calculadora de hora extra
              </Link>{" "}
              apenas como referência de valor da hora, não para atraso.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. Convenções coletivas, escala de repouso, feriados e regras
              internas podem alterar o holerite. Consulte o departamento
              pessoal para o valor oficial.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
