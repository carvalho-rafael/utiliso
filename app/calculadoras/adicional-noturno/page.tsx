import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { TABELAS_ANO } from "../../lib/calculadoras/tabelas-2026";
import { fo } from "../../lib/editorial/fontes-oficiais";
import { AdicionalNoturnoForm } from "./adicional-noturno-form";

const calculadora = getCalculadoraBySlug("adicional-noturno")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function AdicionalNoturnoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Adicional Noturno
        </h1>
        <p className="text-lg text-muted">
          Estime o adicional noturno, a hora reduzida urbana, DSR e descontos de
          INSS e IRRF no mês.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <AdicionalNoturnoForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Período noturno urbano:</strong>{" "}
            das 22h às 5h do dia seguinte (
            <Link href={fo.clt73.href} className={linkClass}>
              CLT art. 73Período
            </Link>
            ). No trabalho rural, a lei usa janelas distintas (agrícola 21h–5h;
            pecuária 20h–4h —{" "}
            <Link href={fo.lei5889_art7.href} className={linkClass}>
              Lei 5.889/1973, art. 7º
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Adicional:</strong> mínimo de 20%
            sobre a hora no urbano; 25% no rural. Informe o percentual da
            convenção quando for maior.
          </li>
          <li>
            <strong className="text-foreground">Hora reduzida:</strong> no
            urbano, cada 52 min 30 s de trabalho equivalem a 1 hora noturna (§
            1º do art. 73). A calculadora usa essa contagem maior de horas para
            calcular o adicional — sem gerar um pagamento à parte, pois a hora
            reduzida já eleva a base do adicional.
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
            <strong className="text-foreground">DSR:</strong> repouso semanal
            sobre o adicional noturno habitual (Súmula 172 TST). Por padrão, 25
            dias úteis e 5 dias de DSR no mês.
          </li>
          <li>
            <strong className="text-foreground">INSS e IRRF:</strong> sobre o
            acréscimo no mês. Tabelas de {TABELAS_ANO} (
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
              Hora extra noturna entra aqui?
            </dt>
            <dd>
              Não. Esta ferramenta cobre o adicional noturno, já considerando a
              hora reduzida na contagem de horas. Horas além da jornada são
              pagas com o adicional de hora extra (mínimo 50%) — use a{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                calculadora de hora extra
              </Link>
              . No holerite, as combinações dependem do DP e da CCT.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              E se a jornada noturna passar das 5h?
            </dt>
            <dd>
              A{" "}
              <Link href={fo.sumula60Tst.href} className={linkClass}>
                Súmula 60, II, do TST
              </Link>{" "}
              trata da prorrogação após o fim do período noturno. Esta
              calculadora não simula a extensão automática; informe só as horas
              que o DP reconhece como noturnas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Rural usa hora reduzida?
            </dt>
            <dd>
              O piso é 25% (
              <Link href={fo.lei5889_art7.href} className={linkClass}>
                Lei 5.889/1973, art. 7º
              </Link>
              ) e, por padrão, a ferramenta não aplica a conversão 52min30 do
              art. 73, § 1º (regra urbana). Marque a opção só se o seu caso
              seguir outro entendimento acordado com o DP.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. Escalas, banco de horas, adicional maior em CCT e prova de
              ponto podem alterar o valor. Consulte o departamento pessoal para
              o contracheque oficial.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
