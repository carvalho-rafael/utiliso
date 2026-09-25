import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("imposto-seletivo-2027")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function ImpostoSeletivo2027GuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Imposto Seletivo em 2027: o que é e quem paga
        </h1>
        <p className="text-lg text-muted">
          Tributo extrafiscal da União sobre bens e serviços prejudiciais à
          saúde ou ao meio ambiente — marco de 2027, lista do Anexo XVII e
          diferença para IBS e CBS.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Marco de 2027"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Parte do pacote federal de 2027
        </h2>
        <p className="mt-2 text-sm text-muted">
          O Imposto Seletivo não existe isolado: entra junto com a CBS na
          alíquota de referência e o fim de PIS e Cofins. Para o panorama
          completo do ano, use o guia da reforma em 2027.
        </p>
        <Link
          href="/guias/reforma-tributaria-2027"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          O que muda na reforma em 2027
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que é o Imposto Seletivo
        </h2>
        <p>
          A{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          institui o{" "}
          <strong className="text-foreground">Imposto Seletivo</strong> (art.
          409), tributo federal previsto no{" "}
          <strong className="text-foreground">inciso VIII do art. 153</strong>{" "}
          da Constituição. É um imposto{" "}
          <strong className="text-foreground">extrafiscal</strong>: a lei o
          descreve como incidente sobre bens e serviços{" "}
          <strong className="text-foreground">
            prejudiciais à saúde ou ao meio ambiente
          </strong>
          , em linha com a política de desestímulo a certos consumos e
          atividades.
        </p>
        <p>
          Não se confunde com a{" "}
          <strong className="text-foreground">CBS</strong> nem com o{" "}
          <strong className="text-foreground">IBS</strong>. CBS e IBS formam o
          IVA dual do consumo; o Imposto Seletivo cobre um conjunto específico
          de produtos e serviços listados na lei. Quem já leu o{" "}
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            guia IBS e CBS: o que são
          </Link>{" "}
          pode usar este texto só para o “IS” do pacote da reforma.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Quando começa a cobrança
        </h2>
        <p>
          A cobrança está prevista a partir de{" "}
          <strong className="text-foreground">1º de janeiro de 2027</strong>,
          no mesmo marco em que passa a valer a CBS na{" "}
          <strong className="text-foreground">alíquota de referência</strong>{" "}
          (Emenda Constitucional nº 132/2023, ADCT, art. 126, I, b). Em{" "}
          {IBS_CBS_ANO} não há Imposto Seletivo na rotina do contribuinte: o ano
          é de{" "}
          <strong className="text-foreground">teste</strong> de IBS e CBS com
          alíquotas simbólicas — veja o{" "}
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            cronograma da reforma
          </Link>{" "}
          e o{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Sobre quais bens e serviços incide
        </h2>
        <p>
          O art. 409, § 1º, da LC 214 e o{" "}
          <strong className="text-foreground">Anexo XVII</strong> listam as
          famílias sujeitas ao imposto, com códigos da NCM/SH quando couber:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>veículos (com exceções para uso das Forças Armadas e Segurança Pública);</li>
          <li>embarcações e aeronaves;</li>
          <li>produtos fumígenos (em embalagem primária, § 2º);</li>
          <li>bebidas alcoólicas;</li>
          <li>bebidas açucaradas;</li>
          <li>bens minerais (incluindo carvão mineral, § 1º);</li>
          <li>concursos de prognósticos e fantasy sport.</li>
        </ul>
        <p>
          A classificação fiscal (NCM, natureza da operação, exportação) define
          se a operação entra na hipótese. Este guia não substitui consulta à
          tabela oficial nem à assessoria do setor.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Momento do fato gerador e base de cálculo
        </h2>
        <p>
          O fato gerador considera-se ocorrido, entre outras hipóteses, no{" "}
          <strong className="text-foreground">primeiro fornecimento</strong> do
          bem, na <strong className="text-foreground">extração</strong> de bem
          mineral, no fornecimento ou pagamento do serviço (o que vier primeiro)
          ou na <strong className="text-foreground">importação</strong> (art.
          412).
        </p>
        <p>
          A base de cálculo pode ser o valor de venda, o valor de arremate, o
          valor de referência (fumígenos, extração mineral, transações não
          onerosas), o valor contábil na incorporação ao ativo imobilizado, a
          receita própria em concursos de prognósticos ou o valor de mercado nas
          demais hipóteses (art. 414). Quando a lei prevê{" "}
          <strong className="text-foreground">alíquota específica</strong>, a
          base pode ser expressa em{" "}
          <strong className="text-foreground">unidade de medida</strong> (§ 1º).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Alíquotas: sem percentual inventado neste guia
        </h2>
        <p>
          As alíquotas do Imposto Seletivo nas operações do Anexo XVII são as
          previstas em <strong className="text-foreground">lei ordinária</strong>{" "}
          (art. 422). Enquanto não houver lei publicada com os percentuais para
          cada produto, não há simulação confiável de carga — a{" "}
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            calculadora de IBS e CBS
          </Link>{" "}
          do Utiliso cobre apenas o teste de {IBS_CBS_ANO}, não o IS.
        </p>
        <p>
          A LC 214 já fixa algumas regras estruturais, sem substituir a lei
          ordinária de alíquotas:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Bens minerais extraídos:</strong>{" "}
            teto de <strong className="text-foreground">0,25%</strong> (art.
            422, § 2º).
          </li>
          <li>
            <strong className="text-foreground">Fumígenos e bebidas alcoólicas:</strong>{" "}
            podem combinar alíquota ad valorem com{" "}
            <strong className="text-foreground">alíquota específica</strong> (§
            1º); bebidas alcoólicas consideram teor alcoólico e volume.
          </li>
          <li>
            <strong className="text-foreground">Fumígenos, alcoólicas e açucaradas:</strong>{" "}
            alíquotas escalonadas de 2029 a 2033 para incorporar progressivamente
            o diferencial em relação ao ICMS modal desses produtos (§ 5º).
          </li>
          <li>
            <strong className="text-foreground">Veículos:</strong> critérios
            ambientais e de eficiência energética na lei ordinária (art. 422 e
            disposições correlatas).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Relação com IPI, ICMS, CBS e IBS
        </h2>
        <p>
          A partir de 2027, o{" "}
          <strong className="text-foreground">IPI</strong> tende a alíquotas
          reduzidas a zero, exceto produtos com industrialização incentivada na
          Zona Franca de Manaus (ADCT, art. 126, II) — detalhes no{" "}
          <Link href="/guias/reforma-tributaria-2027" className={linkClass}>
            guia da reforma em 2027
          </Link>
          . O Imposto Seletivo não é “o novo IPI”: tem lista e lógica próprias
          no livro do IS da LC 214.
        </p>
        <p>
          Em 2027 e 2028, <strong className="text-foreground">ICMS</strong> e{" "}
          <strong className="text-foreground">ISS</strong> seguem com alíquotas
          integrais; o IBS permanece simbólico (0,05% + 0,05%). O IS pode
          conviver com esses tributos no mesmo período, conforme a operação. O
          valor do Imposto Seletivo{" "}
          <strong className="text-foreground">integra a base de cálculo</strong>{" "}
          do IBS e da CBS quando a lei assim determina — o regime regular de
          apuração está no{" "}
          <Link href="/guias/ibs-cbs-regime-normal" className={linkClass}>
            guia IBS e CBS no regime normal
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Simples Nacional e MEI
        </h2>
        <p>
          MEI e Simples não ficam “livres” do IS por enquadramento: se a
          empresa realiza operação com bem ou serviço do Anexo XVII na hipótese
          legal, as regras do Imposto Seletivo aplicam-se conforme a LC 214 e a
          lei ordinária de alíquotas. O recolhimento de IBS e CBS no{" "}
          <strong className="text-foreground">DAS</strong> ou no valor fixo do
          MEI é outra camada — veja{" "}
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            Simples Nacional
          </Link>{" "}
          e{" "}
          <Link href="/guias/ibs-cbs-mei" className={linkClass}>
            MEI
          </Link>
          . Planejamento exige ERP, classificação fiscal e contador.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O Imposto Seletivo já vale em {IBS_CBS_ANO}?
            </dt>
            <dd>
              Não na cobrança de 2027. Em {IBS_CBS_ANO} vigora o teste de CBS e
              IBS com alíquotas simbólicas; o IS entra a partir de 1º de janeiro
              de 2027 (ADCT, art. 126; LC 214, art. 409).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Já existe alíquota de cigarro ou bebida para eu calcular?
            </dt>
            <dd>
              As alíquotas dependem de lei ordinária (art. 422). Este guia não
              publica percentuais que ainda não constem em ato oficial. O único
              teto numérico citado aqui é o de 0,25% para bens minerais extraídos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              A calculadora do Utiliso calcula Imposto Seletivo?
            </dt>
            <dd>
              Não. A ferramenta simula CBS e IBS de teste em {IBS_CBS_ANO}, por
              fora e sem NCM. Para IS, acompanhe a legislação ordinária e o ERP
              fiscal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Exportação paga Imposto Seletivo?
            </dt>
            <dd>
              A LC 214 prevê hipóteses de não incidência e tratamento para
              exportação no livro do IS (capítulo de não incidência e normas
              correlatas). A operação concreta precisa de análise fiscal — não
              generalize só pelo destino “exterior”.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. NCM, momento do fato gerador, créditos, documentos fiscais e
              recolhimento exigem suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/reforma-tributaria-2027" className={linkClass}>
            Reforma tributária em 2027
          </Link>
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            Cronograma da reforma tributária
          </Link>
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            IBS e CBS: o que são
          </Link>
          <Link href="/guias/ibs-cbs-regime-normal" className={linkClass}>
            IBS e CBS no regime normal
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
