import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("cronograma-reforma-tributaria")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function CronogramaReformaTributariaGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Cronograma da nova reforma tributária
        </h1>
        <p className="text-lg text-muted">
          Linha do tempo de 2026 a 2033: quando entram CBS e IBS, quando PIS,
          Cofins, IPI, ICMS e ISS deixam de valer e o que muda na prática.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Conceitos IBS e CBS"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Ainda não conhece IBS e CBS?
        </h2>
        <p className="mt-2 text-sm text-muted">
          Este guia é o calendário da transição. Para entender o que são os
          tributos e quem administra cada um, comece pelo guia de conceitos.
        </p>
        <Link
          href="/guias/ibs-e-cbs"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          IBS e CBS: o que são
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Visão geral em uma frase
        </h2>
        <p>
          A{" "}
          <strong className="text-foreground">
            Emenda Constitucional nº 132/2023
          </strong>{" "}
          e a{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          substituem, de forma gradual, PIS, Cofins, IPI (na maior parte dos
          casos), ICMS e ISS por{" "}
          <strong className="text-foreground">CBS</strong> (União) e{" "}
          <strong className="text-foreground">IBS</strong> (estados e
          municípios), além do{" "}
          <strong className="text-foreground">Imposto Seletivo</strong>. A
          transição constitucional está nos arts. 124 a 133 do ADCT; a LC 214
          detalha alíquotas de teste, compensações e regras operacionais.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Tabela-resumo (2026 a 2033)
        </h2>
        <p>
          Os percentuais de ICMS/ISS são frações das alíquotas fixadas na
          legislação de cada ente (ADCT, art. 128). As alíquotas plenas de CBS e
          IBS a partir de 2027 dependem de{" "}
          <strong className="text-foreground">
            resolução do Senado Federal
          </strong>{" "}
          (alíquotas de referência — ADCT, art. 130; LC 214, arts. 18 e 361 a
          366). Até essas resoluções serem publicadas, use este quadro como
          mapa de marcos legais, não como simulação de carga tributária.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-3 py-2 font-medium text-foreground">Ano</th>
                <th className="px-3 py-2 font-medium text-foreground">Fase</th>
                <th className="px-3 py-2 font-medium text-foreground">CBS</th>
                <th className="px-3 py-2 font-medium text-foreground">IBS</th>
                <th className="px-3 py-2 font-medium text-foreground">
                  ICMS / ISS
                </th>
                <th className="px-3 py-2 font-medium text-foreground">
                  Marcos principais
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2026</td>
                <td className="px-3 py-2">Teste</td>
                <td className="px-3 py-2">0,9%</td>
                <td className="px-3 py-2">0,1% (UF)</td>
                <td className="px-3 py-2">100% (vigentes)</td>
                <td className="px-3 py-2">
                  PIS, Cofins, IPI, ICMS e ISS normais; compensação com
                  PIS/Cofins; dispensa de recolhimento se cumprir acessórias
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2027</td>
                <td className="px-3 py-2">CBS plena</td>
                <td className="px-3 py-2">Alíquota de referência (−0,1 p.p.)</td>
                <td className="px-3 py-2">0,05% UF + 0,05% mun.</td>
                <td className="px-3 py-2">100%</td>
                <td className="px-3 py-2">
                  Extinção de PIS/Cofins/PIS; IPI a zero (exc. ZFM); Imposto
                  Seletivo
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2028</td>
                <td className="px-3 py-2">Consolidação</td>
                <td className="px-3 py-2">Como em 2027</td>
                <td className="px-3 py-2">0,05% + 0,05%</td>
                <td className="px-3 py-2">100%</td>
                <td className="px-3 py-2">
                  Mesma lógica de 2027; ICMS/ISS ainda plenos
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2029</td>
                <td className="px-3 py-2">Transição IBS 1</td>
                <td className="px-3 py-2">Referência</td>
                <td className="px-3 py-2">Sobe (≈10% da ref.)</td>
                <td className="px-3 py-2">9/10 das alíquotas</td>
                <td className="px-3 py-2">
                  Início da redução anual de ICMS/ISS; benefícios na mesma
                  proporção
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2030</td>
                <td className="px-3 py-2">Transição IBS 2</td>
                <td className="px-3 py-2">Referência</td>
                <td className="px-3 py-2">≈20% da ref.</td>
                <td className="px-3 py-2">8/10</td>
                <td className="px-3 py-2">Redução proporcional anual</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2031</td>
                <td className="px-3 py-2">Transição IBS 3</td>
                <td className="px-3 py-2">Referência</td>
                <td className="px-3 py-2">≈30% da ref.</td>
                <td className="px-3 py-2">7/10</td>
                <td className="px-3 py-2">Redução proporcional anual</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2 font-medium text-foreground">2032</td>
                <td className="px-3 py-2">Transição IBS 4</td>
                <td className="px-3 py-2">Referência</td>
                <td className="px-3 py-2">≈40% da ref.</td>
                <td className="px-3 py-2">6/10</td>
                <td className="px-3 py-2">Último ano com ICMS/ISS reduzidos</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-foreground">2033</td>
                <td className="px-3 py-2">Modelo pleno</td>
                <td className="px-3 py-2">Referência plena</td>
                <td className="px-3 py-2">Referência plena</td>
                <td className="px-3 py-2">Extintos</td>
                <td className="px-3 py-2">
                  Fim de ICMS e ISS; IBS/CBS em regime definitivo
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-base font-medium text-foreground">
          {IBS_CBS_ANO} — ano de teste
        </h2>
        <p>
          Nos fatos geradores de 1º de janeiro a 31 de dezembro de {IBS_CBS_ANO},
          a CBS é cobrada a{" "}
          <strong className="text-foreground">0,9%</strong> e o IBS estadual a{" "}
          <strong className="text-foreground">0,1%</strong> (ADCT, art. 125; LC
          214, arts. 343 e 346). PIS, Cofins, ICMS, ISS e IPI continuam como
          hoje. O valor recolhido de CBS/IBS em {IBS_CBS_ANO} deve ser{" "}
          <strong className="text-foreground">compensado</strong> com PIS,
          Cofins e contribuição PIS na importação do mesmo período (§ 1º); se não
          houver débitos, pode haver compensação com outro tributo federal ou
          ressarcimento em até 60 dias (§ 2º).
        </p>
        <p>
          Quem cumprir as obrigações acessórias pode ser{" "}
          <strong className="text-foreground">dispensado do recolhimento</strong>{" "}
          (ADCT, art. 125, § 4º; LC 214, art. 348). Na NF-e, o destaque é
          informativo — veja o{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>{" "}
          e a{" "}
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            tabela de alíquotas de teste
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          2027 e 2028 — esfera federal e IBS simbólico
        </h2>
        <p>
          A partir de 2027 (ADCT, art. 126), passam a ser cobrados a CBS em
          alíquota de referência e o{" "}
          <strong className="text-foreground">Imposto Seletivo</strong> (LC 214,
          art. 409). Extinguem-se PIS, Cofins e a contribuição PIS, desde que a
          CBS já esteja instituída. O IPI tem alíquotas reduzidas a{" "}
          <strong className="text-foreground">zero</strong>, exceto produtos com
          industrialização incentivada na Zona Franca de Manaus.
        </p>
        <p>
          Em 2027 e 2028, o IBS fica em{" "}
          <strong className="text-foreground">0,05% estadual + 0,05% municipal</strong>{" "}
          (ADCT, art. 127; LC 214, art. 344), e a CBS de referência é reduzida em{" "}
          <strong className="text-foreground">0,1 ponto percentual</strong> (LC
          214, art. 347) — mecanismo para elevar o IBS na mesma proporção sem
          aumentar a carga no período. ICMS e ISS seguem com alíquotas
          integrais.
        </p>

        <h2 className="text-base font-medium text-foreground">
          2029 a 2032 — ICMS e ISS em queda, IBS em alta
        </h2>
        <p>
          De 2029 a 2032, as alíquotas de ICMS e ISS passam a{" "}
          <strong className="text-foreground">9/10, 8/10, 7/10 e 6/10</strong>{" "}
          das alíquotas fixadas nas respectivas legislações (ADCT, art. 128).
          Benefícios e incentivos fiscais ou financeiros ligados a esses impostos
          que não estiverem no caput do artigo são reduzidos na mesma proporção
          (§§ 1º a 3º).
        </p>
        <p>
          Em paralelo, as{" "}
          <strong className="text-foreground">
            alíquotas de referência do IBS
          </strong>{" "}
          para cada ano são fixadas pelo Senado de modo a compensar a perda de
          arrecadação estadual e municipal (ADCT, art. 130, II e III; LC 214,
          arts. 361 a 364). Na prática, cada ano a fatia do consumo tributada
          pelo IBS cresce enquanto ICMS e ISS encolhem — até os 40% finais da
          referência em 2032.
        </p>

        <h2 className="text-base font-medium text-foreground">
          2033 — extinção do ICMS e do ISS
        </h2>
        <p>
          A partir de 2033, ficam{" "}
          <strong className="text-foreground">extintos</strong> o ICMS e o ISS
          (ADCT, art. 129). O IBS passa a operar com alíquotas de referência
          plenas, fixadas para estados e municípios (LC 214, art. 365). A CBS
          permanece como tributo federal de consumo no modelo IVA. Setores com
          regimes específicos (combustíveis, financeiro, Simples Nacional, ZFM
          etc.) seguem regras próprias na LC 214 — este guia descreve o eixo
          geral da transição.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O ICMS e o ISS acabam de verdade em 2033?
            </dt>
            <dd>
              Sim, na Constituição: o ADCT, art. 129, prevê extinção desses
              impostos a partir de 2033. Até lá, eles coexistem com o IBS em
              alíquotas reduzidas (2029-2032). Regulamentos e leis ordinárias
              podem detalhar exceções — acompanhe com assessoria fiscal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Em {IBS_CBS_ANO} já pago CBS e IBS de verdade?
            </dt>
            <dd>
              Há cobrança simbólica (0,9% e 0,1%), mas com compensação com
              PIS/Cofins e, em geral, dispensa de recolhimento se as obrigações
              acessórias forem cumpridas. Na nota, o destaque costuma ser
              informativo. Não confunda com a CBS plena de 2027.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Já sei qual será a alíquota da CBS em 2027?
            </dt>
            <dd>
              A alíquota de referência é definida por resolução do Senado (ADCT,
              art. 130), com cálculos homologados pelo TCU. Enquanto não houver
              resolução publicada, não há percentual definitivo para simular a
              carga plena — use a calculadora do Utiliso só para o teste de{" "}
              {IBS_CBS_ANO} ou a calculadora oficial da Receita para cenários
              mais complexos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O Imposto Seletivo entra quando?
            </dt>
            <dd>
              A cobrança está prevista a partir de 2027, junto com a CBS em
              alíquota de referência (ADCT, art. 126, I, b; LC 214, art. 409).
              Incide sobre bens e serviços prejudiciais à saúde ou ao meio
              ambiente, com lista e alíquotas na lei.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este cronograma vale para MEI e Simples Nacional?
            </dt>
            <dd>
              A LC 214 traz regimes diferenciados e transições específicas. Este
              guia resume o calendário constitucional geral; enquadramento da
              empresa exige análise caso a caso.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. É material informativo sobre datas e marcos legais. ERP,
              classificação fiscal, créditos e planejamento tributário exigem
              suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            IBS e CBS: o que são
          </Link>
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            Calculadora de IBS e CBS
          </Link>
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            Tabela IBS/CBS {IBS_CBS_ANO}
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
