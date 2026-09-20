import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import {
  ALIQUOTA_CBS_2026,
  ALIQUOTA_IBS_UF_2026,
  formatarAliquotaTributo,
  IBS_CBS_ANO,
} from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ibs-e-cbs")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function IbsECbsGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          IBS e CBS: o que são e qual a diferença?
        </h1>
        <p className="text-lg text-muted">
          Entenda os dois tributos da reforma do consumo, quem administra cada
          um e como se relacionam com PIS, Cofins, ICMS e ISS.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de IBS e CBS"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Simule CBS e IBS sobre uma operação
        </h2>
        <p className="mt-2 text-sm text-muted">
          Com as alíquotas de teste de {IBS_CBS_ANO}, veja quanto seria CBS e
          IBS estadual sobre um valor informado (conta por fora, só para
          referência).
        </p>
        <Link
          href="/calculadoras/ibs-cbs"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular IBS e CBS
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Reforma do consumo em uma frase
        </h2>
        <p>
          A{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          cria um novo modelo de tributação sobre bens e serviços no Brasil. Em
          vez de vários impostos e contribuições sobre o mesmo consumo (PIS,
          Cofins, IPI, ICMS, ISS), a reforma institui dois tributos de base
          ampla: a{" "}
          <strong className="text-foreground">CBS</strong> (federal) e o{" "}
          <strong className="text-foreground">IBS</strong> (estados e
          municípios). A mudança é gradual — por anos os tributos antigos e os
          novos convivem, com cronograma fixado na própria lei.
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que é a CBS?
        </h2>
        <p>
          <strong className="text-foreground">CBS</strong> significa{" "}
          <strong className="text-foreground">
            Contribuição sobre Bens e Serviços
          </strong>
          . É um tributo de competência da{" "}
          <strong className="text-foreground">União</strong>, cobrado sobre a
          circulação de bens e a prestação de serviços, com regras de crédito
          (não cumulatividade) semelhantes a um IVA.
        </p>
        <p>
          Na lógica da reforma, a CBS substitui, ao longo da transição, tributos
          federais como{" "}
          <strong className="text-foreground">PIS, Cofins e IPI</strong> sobre
          bens (o desenho exato depende do cronograma e das hipóteses de
          incidência da LC 214). A arrecadação e a fiscalização ficam no âmbito
          federal (Receita Federal e regras da lei).
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que é o IBS?
        </h2>
        <p>
          <strong className="text-foreground">IBS</strong> significa{" "}
          <strong className="text-foreground">
            Imposto sobre Bens e Serviços
          </strong>
          . Também incide sobre consumo de bens e serviços, mas a competência é
          compartilhada entre{" "}
          <strong className="text-foreground">estados e municípios</strong> — com
          gestão pelo Comitê Gestor do IBS e repartição da receita entre UF e
          cidade conforme a lei.
        </p>
        <p>
          O IBS é o caminho para unificar, na prática, o que hoje se divide em{" "}
          <strong className="text-foreground">ICMS</strong> (estadual) e{" "}
          <strong className="text-foreground">ISS</strong> (municipal), com uma
          base e regras mais homogêneas no país. Na nota e no sistema, costuma
          aparecer separado em parcela estadual e parcela municipal.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Qual a diferença entre IBS e CBS?
        </h2>
        <p>
          Os dois tributam o consumo e seguem a ideia de IVA com créditos, mas
          não são a mesma coisa nem se substituem entre si. A diferença central
          é <strong className="text-foreground">quem cobra</strong> e{" "}
          <strong className="text-foreground">o que cada um veio substituir</strong>{" "}
          na reforma:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-3 py-2 font-medium text-foreground">
                  Aspecto
                </th>
                <th className="px-3 py-2 font-medium text-foreground">CBS</th>
                <th className="px-3 py-2 font-medium text-foreground">IBS</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">
                  Nome completo
                </td>
                <td className="px-3 py-2">Contribuição sobre Bens e Serviços</td>
                <td className="px-3 py-2">Imposto sobre Bens e Serviços</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">
                  Competência
                </td>
                <td className="px-3 py-2">União (federal)</td>
                <td className="px-3 py-2">Estados e municípios</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">
                  Papel na reforma
                </td>
                <td className="px-3 py-2">
                  Caminho para substituir PIS, Cofins e IPI (transição)
                </td>
                <td className="px-3 py-2">
                  Caminho para substituir ICMS e ISS (transição)
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-foreground">
                  Na mesma venda
                </td>
                <td className="px-3 py-2">
                  Pode incidir junto com o IBS sobre a operação, cada um com sua
                  alíquota e regras
                </td>
                <td className="px-3 py-2">
                  Idem — não é “ou CBS ou IBS”; são camadas distintas do novo
                  modelo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Resumindo: <strong className="text-foreground">CBS é federal</strong>;
          <strong className="text-foreground"> IBS é estadual e municipal</strong>.
          Ambos entram no pacote da reforma do consumo; o que muda é o ente
          federativo e o conjunto de tributos antigos que cada um vem
          substituir.
        </p>

        <h2 className="text-base font-medium text-foreground">
          “Por fora” e não cumulatividade
        </h2>
        <p>
          IBS e CBS incidem{" "}
          <strong className="text-foreground">por fora</strong> (LC 214/2025,
          art. 12, § 2º, I): o tributo não integra a própria base de cálculo, ao
          contrário do ICMS “por dentro”. O modelo prevê{" "}
          <strong className="text-foreground">créditos</strong> nas etapas da
          cadeia (não cumulatividade), de forma parecida com o IVA usado em
          outros países — o detalhe de cada crédito está na lei e nas normas
          complementares.
        </p>

        <h2 className="text-base font-medium text-foreground">
          E em {IBS_CBS_ANO}?
        </h2>
        <p>
          O ano de {IBS_CBS_ANO} é de{" "}
          <strong className="text-foreground">adaptação</strong>: alíquotas de
          teste fixadas na LC 214 — CBS de{" "}
          {formatarAliquotaTributo(ALIQUOTA_CBS_2026)} e IBS estadual de{" "}
          {formatarAliquotaTributo(ALIQUOTA_IBS_UF_2026)} (arts. 343 e 346), com
          IBS municipal em zero no teste. PIS, Cofins, ICMS, ISS e IPI ainda
          vigoram conforme as regras atuais. Veja a{" "}
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            tabela IBS/CBS {IBS_CBS_ANO}
          </Link>
          .
        </p>
        <p>
          Na NF-e, IBS e CBS passam a ser destacados de forma informativa; o
          recolhimento em {IBS_CBS_ANO} pode ficar dispensado se as obrigações
          acessórias forem cumpridas (art. 348). O passo a passo na nota está no{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              IBS e CBS são o mesmo imposto com outro nome?
            </dt>
            <dd>
              Não. São dois tributos distintos na mesma reforma: um federal
              (CBS) e outro compartilhado entre estados e municípios (IBS). Na
              prática, uma venda pode gerar destaque (e, no futuro, recolhimento)
              dos dois, além dos tributos antigos enquanto durar a transição.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              A reforma acaba com o ICMS e o ISS de uma vez?
            </dt>
            <dd>
              Não imediatamente. A LC 214 prevê período de transição com
              convivência de sistemas e redução gradual das alíquotas dos
              tributos antigos. O calendário e as exceções estão na lei e em
              regulamentos — acompanhe com assessoria fiscal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O consumidor “paga” CBS e IBS no preço?
            </dt>
            <dd>
              Como qualquer tributo sobre consumo, o custo tende a se refletir
              no preço final, mas a forma de destacar na nota e na transição de{" "}
              {IBS_CBS_ANO} tem regras específicas (destaque informativo sem
              somar ao total da operação como cobrança extra naquele ano). Para
              nota fiscal, use o guia da NF-e; para aritmética por fora, a
              calculadora.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              IBS municipal e IBS estadual são dois impostos?
            </dt>
            <dd>
              É um único imposto (IBS) com receita repartida entre UF e
              município. Na documentação fiscal e nas alíquotas de teste, a
              parcela estadual e a municipal aparecem separadas quando
              aplicável.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. É material informativo sobre conceitos da reforma. Classificação
              fiscal, CST, créditos, regime da empresa e emissão de nota exigem
              suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            Calculadora de IBS e CBS
          </Link>
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            Tabela IBS/CBS {IBS_CBS_ANO}
          </Link>
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            Cronograma da reforma tributária
          </Link>
          <Link href="/reforma-tributaria" className={linkClass}>
            Hub Reforma tributária
          </Link>
          <Link href="/guias" className={linkClass}>
            Todos os guias
          </Link>
        </div>
      </div>
    </main>
  );
}
