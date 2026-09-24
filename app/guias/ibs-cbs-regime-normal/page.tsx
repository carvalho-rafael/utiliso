import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ibs-cbs-regime-normal")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function IbsCbsRegimeNormalGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          IBS e CBS no regime normal: apuração e crédito
        </h1>
        <p className="text-lg text-muted">
          Como empresas fora do Simples e do MEI destacam, creditam e recolhem
          IBS e CBS na LC 214 — o que a lei chama de regime regular.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de IBS e CBS"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Simule IBS e CBS por fora
        </h2>
        <p className="mt-2 text-sm text-muted">
          A calculadora do Utiliso usa as alíquotas de teste de {IBS_CBS_ANO} no
          modelo do regime regular — sem crédito nem classificação fiscal.
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
          Quem está no regime normal
        </h2>
        <p>
          No dia a dia fala-se em{" "}
          <strong className="text-foreground">regime normal</strong> para
          distinguir de Simples Nacional e MEI. Na{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>
          , o nome é{" "}
          <strong className="text-foreground">regime regular</strong> de IBS e
          CBS: quem não recolhe esses tributos pelo DAS unificado apura à parte,
          com destaque em documento fiscal, crédito na cadeia e recolhimento
          próprio.
        </p>
        <p>
          Em geral entram aqui empresas no{" "}
          <strong className="text-foreground">Lucro Real</strong>, no{" "}
          <strong className="text-foreground">Lucro Presumido</strong> e demais
          contribuintes que não são optantes pelo Simples ou MEI. O art. 41 da
          LC 214 contrasta o regime regular com o recolhimento pelo Simples; ver
          também o{" "}
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            guia IBS e CBS no Simples Nacional
          </Link>{" "}
          e o{" "}
          <Link href="/guias/ibs-cbs-mei" className={linkClass}>
            guia para o MEI
          </Link>
          . Se ainda não domina os conceitos de CBS e IBS, comece pelo{" "}
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            guia IBS e CBS: o que são
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Apuração própria: por fora e crédito
        </h2>
        <p>
          No regime regular, IBS e CBS incidem{" "}
          <strong className="text-foreground">por fora</strong> (LC 214/2025,
          art. 12, § 2º, I): o tributo não integra a própria base de cálculo, ao
          contrário do ICMS “por dentro”. O valor da operação é a referência; CBS
          e IBS são calculados e destacados em camadas separadas, com regras de{" "}
          <strong className="text-foreground">não cumulatividade</strong> — o
          contribuinte credita o que pagou nas compras elegíveis e recolhe o
          saldo da apuração, no fluxo previsto na lei e nas normas
          complementares.
        </p>
        <p>
          Isso é o oposto do{" "}
          <strong className="text-foreground">DAS</strong> do Simples, em que
          parcelas de IBS e CBS entram no documento único sem apuração item a
          item pelo optante. No regime normal, compliance envolve classificação
          fiscal, documento com grupos de IBS/CBS, escrituração e recolhimento —
          não só uma simulação aritmética.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Crédito B2B e compras de Simples
        </h2>
        <p>
          Quem vende no regime regular destaca IBS e CBS na nota; o comprador
          também no regime regular, em regra,{" "}
          <strong className="text-foreground">credita</strong> os valores
          destacados nas aquisições permitidas pela lei. Na cadeia B2B, isso
          define preço, margem e exigência de documento fiscal completo.
        </p>
        <p>
          Se você compra de optante pelo Simples que{" "}
          <strong className="text-foreground">não</strong> optou pelo regime
          regular de IBS/CBS, o crédito do comprador segue regras específicas —
          equivalente ao recolhido pelo regime único (LC 123/2006, art. 23), não
          necessariamente o mesmo crédito de uma nota “por fora”. Detalhes no{" "}
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            guia do Simples Nacional
          </Link>
          . Optantes pelo regime regular de IBS/CBS (art. 41, §§ 3º e 4º) passam
          a seguir a apuração da LC 214, como empresa de regime normal.
        </p>

        <h2 className="text-base font-medium text-foreground">
          E em {IBS_CBS_ANO}, na transição?
        </h2>
        <p>
          No primeiro ano da reforma, vigem{" "}
          <strong className="text-foreground">alíquotas de teste</strong> (arts.
          343 e 346 da LC 214/2025 — veja a{" "}
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            tabela IBS/CBS {IBS_CBS_ANO}
          </Link>
          ). PIS, Cofins, ICMS e ISS continuam coexistindo com o novo modelo; o{" "}
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            cronograma da reforma
          </Link>{" "}
          mostra o que muda até 2033.
        </p>
        <p>
          Na NF-e, o destaque de IBS/CBS em {IBS_CBS_ANO} é em grande parte{" "}
          <strong className="text-foreground">informativo</strong> e não soma
          ao preço pago pelo cliente na transição; o recolhimento fica{" "}
          <strong className="text-foreground">dispensado</strong> se as
          obrigações acessórias forem cumpridas (art. 348, § 1º). Rotina de
          leiaute, XML e diferença para “operação + tributos” da calculadora
          estão no{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que a calculadora do Utiliso faz (e não faz)
        </h2>
        <p>
          A{" "}
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            calculadora de IBS e CBS
          </Link>{" "}
          aplica as alíquotas de teste sobre um valor informado,{" "}
          <strong className="text-foreground">por fora</strong>, como no regime
          regular. Para ver débito menos créditos informados das compras, use a{" "}
          <Link href="/calculadoras/credito-ibs-cbs" className={linkClass}>
            calculadora de crédito de IBS e CBS
          </Link>
          . Elas podem simular reduções percentuais genéricas, mas{" "}
          <strong className="text-foreground">não</strong> substituem apuração
          real: não há NCM, CST, split payment nem Imposto Seletivo. Serve para
          entender a conta básica; o SPED e o recolhimento exigem sistema e
          assessoria.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Lucro Presumido está no regime normal de IBS/CBS?
            </dt>
            <dd>
              Em regra, sim: quem não é optante pelo Simples ou MEI apura IBS e
              CBS pelo regime regular da LC 214, com as regras de destaque e
              crédito — independentemente de ser Lucro Presumido ou Lucro Real
              no IRPJ/CSLL. O enquadramento exato depende do cadastro e das
              opções legais; confirme com contador.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Simples que optou pelo regime regular (art. 41, § 3º) conta como
              regime normal?
            </dt>
            <dd>
              Para IBS e CBS, sim: as parcelas deixam o DAS e passam à apuração
              da LC 214. Para os demais tributos do Simples, continuam as regras
              do regime único. Veja o{" "}
              <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
                guia do Simples
              </Link>{" "}
              sobre opção, limites e vedação de retorno (art. 41, § 5º).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Em {IBS_CBS_ANO} o IBS/CBS soma no preço para o cliente?
            </dt>
            <dd>
              Na transição, a NF-e trata o destaque de forma informativa; o
              total pago pelo consumidor não deve incluir IBS/CBS como cobrança
              extra daquele ano, embora a calculadora some “operação + tributos”
              para ensinar o por fora. Detalhes no{" "}
              <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
                guia da NF-e
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Quando entram as alíquotas plenas de CBS e IBS?
            </dt>
            <dd>
              As alíquotas de referência em vigor plena dependem de resolução do
              Senado Federal (EC 132/2023, ADCT, art. 130). Não há percentuais
              definitivos fixados neste guia para anos após o teste — acompanhe
              o{" "}
              <Link
                href="/guias/cronograma-reforma-tributaria"
                className={linkClass}
              >
                cronograma
              </Link>{" "}
              e a legislação atualizada.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. Regime da empresa, créditos, obrigações acessórias e emissão
              de nota exigem suporte profissional.
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
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            IBS e CBS: o que são
          </Link>
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            IBS e CBS no Simples Nacional
          </Link>
          <Link href="/guias/ibs-cbs-mei" className={linkClass}>
            IBS e CBS para o MEI
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
