import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { formatarMoeda } from "../../lib/calculadoras/format";
import { round2, TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { getGuiaBySlug } from "../../lib/guias/catalog";
import { SaldoExemplo } from "./saldo-exemplo";

const guia = getGuiaBySlug("saldo-de-salario")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

const exemploSalario = 3100;
const exemploDias = 15;
const exemploDiasMes = 31;
const exemploBruto = round2((exemploSalario / exemploDiasMes) * exemploDias);

export const metadata: Metadata = {
  title: `${guia.title}: como calcular na rescisão — Utiliso`,
  description: guia.metaDescription,
};

export default function SaldoDeSalarioGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Saldo de salário
        </h1>
        <p className="text-lg text-muted">
          Entenda o proporcional por dias do mês civil na admissão, na rescisão
          e no holerite do último mês.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadoras de saldo e rescisão"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime com INSS e IRRF
        </h2>
        <p className="mt-2 text-sm text-muted">
          O exemplo abaixo mostra só o bruto proporcional. Para descontos e
          líquido, use as calculadoras completas.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/calculadoras/dias-trabalhados"
            className="inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Dias trabalhados
          </Link>
          <Link
            href="/calculadoras/rescisao"
            className="inline-flex cursor-pointer rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Rescisão completa
          </Link>
        </div>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que é o saldo de salário
        </h2>
        <p>
          É a verba que paga os dias em que você trabalhou (ou tinha direito a
          receber) no mês da admissão ou da saída, sem contar o mês inteiro. Na{" "}
          <Link href="/calculadoras/rescisao" className={linkClass}>
            rescisão
          </Link>
          , entra junto com 13º proporcional, férias, aviso e outras verbas —
          não é o líquido total do acerto.
        </p>
        <p>
          O mesmo raciocínio vale para quem entra no meio do mês: o primeiro
          contracheque costuma trazer o proporcional dos dias trabalhados.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como calcular
        </h2>
        <p>
          A conta usa os{" "}
          <strong className="text-foreground">dias do mês civil</strong> (28, 29,
          30 ou 31), não o divisor fixo de 30 dias:
        </p>
        <p className="rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-foreground">
          saldo = (salário ÷ dias do mês) × dias no intervalo
        </p>
        <p>
          Os dias são{" "}
          <strong className="text-foreground">corridos e inclusivos</strong>{" "}
          entre a data inicial e a final — por exemplo, de 1 a 15 de março são
          15 dias. Exemplo: salário de {formatarMoeda(exemploSalario)} e 15 dias
          em março ({exemploDiasMes} dias) →{" "}
          {formatarMoeda(exemploSalario)} ÷ {exemploDiasMes} × {exemploDias} ={" "}
          <strong className="text-foreground">
            {formatarMoeda(exemploBruto)}
          </strong>{" "}
          de saldo bruto.
        </p>
        <SaldoExemplo />

        <h2 className="text-base font-medium text-foreground">
          Não confunda com desconto por falta
        </h2>
        <p>
          Falta injustificada no mensalista costuma usar salário ÷{" "}
          <strong className="text-foreground">30</strong> (Lei 605/1949), não
          os dias do mês civil. Para estimar descontos, use a{" "}
          <Link href="/calculadoras/desconto-por-falta" className={linkClass}>
            calculadora de desconto por falta
          </Link>
          . O saldo de salário é verba positiva (dias trabalhados ou devidos), não
          desconto de ausência.
        </p>

        <h2 className="text-base font-medium text-foreground">
          INSS, IRRF e FGTS
        </h2>
        <p>
          Sobre o saldo proporcional incidem{" "}
          <Link href="/tabelas/inss" className={linkClass}>
            INSS
          </Link>{" "}
          e{" "}
          <Link href="/tabelas/irrf" className={linkClass}>
            IRRF
          </Link>{" "}
          (tabelas de {TABELAS_ANO}), como em um salário normal do mês. Na
          rescisão, o INSS e o IRRF do saldo aparecem separados das bases do 13º
          e das férias indenizadas. O FGTS (8%) é depositado pelo empregador —
          referência apenas, fora do líquido que você recebe na conta.
        </p>
        <p>
          O{" "}
          <Link href="/guias/calculo-inss" className={linkClass}>
            guia do cálculo do INSS
          </Link>{" "}
          explica a tabela progressiva usada no desconto.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Avos de 13º e férias
        </h2>
        <p>
          Se o intervalo tiver{" "}
          <strong className="text-foreground">mais de 14 dias</strong> no mês
          considerado, em geral o mês conta como um avo para o{" "}
          <Link
            href="/guias/decimo-terceiro-proporcional"
            className={linkClass}
          >
            13º proporcional
          </Link>{" "}
          e para{" "}
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            férias proporcionais
          </Link>{" "}
          na rescisão — regra distinta do valor do saldo em si.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Saldo na rescisão
        </h2>
        <p>
          Nos guias de{" "}
          <Link
            href="/guias/demissao-sem-justa-causa-o-que-recebo"
            className={linkClass}
          >
            demissão sem justa causa
          </Link>{" "}
          e de{" "}
          <Link
            href="/guias/pedido-de-demissao-o-que-recebo"
            className={linkClass}
          >
            pedido de demissão
          </Link>{" "}
          o saldo é a primeira verba habitual do acerto. A data usada costuma ser
          o último dia trabalhado (ou a data do saldo na comunicação da rescisão,
          conforme o DP). Aviso prévio trabalhado ou projetado pode alterar qual
          mês e quantos dias entram — confirme no departamento pessoal.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Por que fevereiro divide por 28 ou 29?
            </dt>
            <dd>
              O divisor é o número real de dias do mês civil. Fevereiro em ano
              bissexto tem 29 dias; nos demais anos, 28. Isso difere do cálculo
              de falta com divisor 30.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O período cruza dois meses. E agora?
            </dt>
            <dd>
              Calcule separadamente para cada mês: cada trecho usa seu próprio
              divisor (dias do mês). Some os proporcionais se for o caso de
              admissão ou saída em meses distintos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Atestado ou falta muda o saldo?
            </dt>
            <dd>
              O saldo paga dias em que havia direito à remuneração no período.
              Faltas injustificadas reduzem o valor no holerite real; atestados
              e ausências legais não devem ser descontados como falta. O DP
              aplica as regras do contrato e da CLT.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              É igual à calculadora de dias trabalhados?
            </dt>
            <dd>
              Sim, na parte do proporcional bruto (mesmo mês, mesma fórmula). A{" "}
              <Link href="/calculadoras/dias-trabalhados" className={linkClass}>
                calculadora de dias trabalhados
              </Link>{" "}
              ainda mostra INSS, IRRF e FGTS sobre esse valor.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo. Médias de variáveis, convenção
              coletiva e datas da rescisão podem alterar o valor oficial.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/calculadoras/dias-trabalhados" className={linkClass}>
            Calculadora de dias trabalhados
          </Link>
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
          <Link href="/calculadoras/desconto-por-falta" className={linkClass}>
            Desconto por falta
          </Link>
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            Férias proporcionais na rescisão
          </Link>
          <Link
            href="/guias/decimo-terceiro-proporcional"
            className={linkClass}
          >
            13º salário proporcional
          </Link>
        </div>
      </div>
    </main>
  );
}
