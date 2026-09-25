import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("reforma-tributaria-2027")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function ReformaTributaria2027GuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          O que muda na reforma tributária em 2027
        </h1>
        <p className="text-lg text-muted">
          CBS na alíquota de referência, fim de PIS e Cofins, Imposto Seletivo
          e IBS ainda simbólico — o que vale para regime normal, Simples e MEI.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Cronograma completo"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Contexto de 2026 a 2033
        </h2>
        <p className="mt-2 text-sm text-muted">
          Este guia detalha só o ano de 2027. Para a linha do tempo inteira,
          use o cronograma da reforma.
        </p>
        <Link
          href="/guias/cronograma-reforma-tributaria"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Cronograma da reforma tributária
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O marco comum de 2027
        </h2>
        <p>
          Nos fatos geradores a partir de{" "}
          <strong className="text-foreground">1º de janeiro de 2027</strong>, a{" "}
          <strong className="text-foreground">
            Emenda Constitucional nº 132/2023
          </strong>{" "}
          (ADCT, art. 126) e a{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          mudam a esfera federal do consumo. Em resumo, para todos os
          contribuintes enquadrados na reforma:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Passa a ser cobrada a{" "}
            <strong className="text-foreground">CBS</strong> na{" "}
            <strong className="text-foreground">alíquota de referência</strong>,
            reduzida em{" "}
            <strong className="text-foreground">0,1 ponto percentual</strong>{" "}
            (LC 214, art. 347), enquanto o IBS permanece simbólico.
          </li>
          <li>
            <strong className="text-foreground">Extinguem-se</strong> PIS,
            Cofins e a contribuição PIS na importação, desde que a CBS já
            esteja instituída (ADCT, art. 126).
          </li>
          <li>
            O <strong className="text-foreground">IPI</strong> tem alíquotas
            reduzidas a zero, exceto produtos com industrialização incentivada
            na Zona Franca de Manaus (ADCT, art. 126, II).
          </li>
          <li>
            Entra o{" "}
            <Link href="/guias/imposto-seletivo-2027" className={linkClass}>
              Imposto Seletivo
            </Link>{" "}
            (LC 214, art. 409) sobre bens e serviços prejudiciais à saúde ou ao
            meio ambiente.
          </li>
          <li>
            O <strong className="text-foreground">IBS</strong> fica em{" "}
            <strong className="text-foreground">
              0,05% estadual + 0,05% municipal
            </strong>{" "}
            (ADCT, art. 127; LC 214, art. 344). ICMS e ISS seguem com alíquotas{" "}
            <strong className="text-foreground">integrais</strong> — a redução
            anual de ICMS/ISS só começa em 2029 (ADCT, art. 128).
          </li>
        </ul>
        <p>
          Isso é diferente de {IBS_CBS_ANO}, ano de{" "}
          <strong className="text-foreground">teste</strong> com alíquotas
          simbólicas (0,9% CBS e 0,1% IBS estadual), compensação com PIS/Cofins
          e, em geral,{" "}
          <strong className="text-foreground">dispensa de recolhimento</strong>{" "}
          se as obrigações acessórias forem cumpridas (LC 214, art. 348). Detalhes
          do teste estão no{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia IBS e CBS na NF-e em {IBS_CBS_ANO}
          </Link>{" "}
          e na{" "}
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            tabela de alíquotas de teste
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Alíquota de referência: sem percentual inventado
        </h2>
        <p>
          A CBS “plena” de 2027 não é um número fixo neste guia. As{" "}
          <strong className="text-foreground">
            alíquotas de referência
          </strong>{" "}
          de CBS e IBS dependem de{" "}
          <strong className="text-foreground">
            resolução do Senado Federal
          </strong>{" "}
          (EC 132/2023, ADCT, art. 130; LC 214, arts. 18 e 361 a 366), com
          cálculos homologados pelo TCU. Enquanto não houver resolução
          publicada, não há percentual definitivo para simular a carga — use a{" "}
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            calculadora do Utiliso
          </Link>{" "}
          apenas para o teste de {IBS_CBS_ANO}, não para 2027.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Regime normal (Lucro Real, Presumido e demais fora do Simples/MEI)
        </h2>
        <p>
          Quem apura IBS e CBS pelo{" "}
          <strong className="text-foreground">regime regular</strong> da LC 214
          sente 2027 de forma mais intensa: acaba a lógica do ano de teste na
          nota e na apuração; a CBS passa a ser{" "}
          <strong className="text-foreground">cobrada de verdade</strong>, com
          destaque por fora, crédito na cadeia e recolhimento conforme a lei —
          sem a dispensa generalizada do art. 348 de {IBS_CBS_ANO}. PIS e
          Cofins deixam de existir; o crédito e o débito passam pelo novo modelo.
          ICMS, ISS e IBS simbólico ainda convivem no mesmo período.
        </p>
        <p>
          Rotina de documento fiscal, SPED e Imposto Seletivo exige ERP e
          assessoria — não só simulação aritmética. Aprofunde no{" "}
          <Link href="/guias/ibs-cbs-regime-normal" className={linkClass}>
            guia IBS e CBS no regime normal
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Simples Nacional
        </h2>
        <p>
          O enquadramento{" "}
          <strong className="text-foreground">não vira regime normal</strong>: em
          regra, IBS e CBS continuam no{" "}
          <strong className="text-foreground">DAS</strong> (LC 214, art. 41, §
          2º). Em 2027, a fatia federal do documento único deixa de embutir PIS
          e Cofins e passa a refletir a CBS na forma prevista para o Simples;
          ICMS e ISS seguem no DAS enquanto vigentes. Percentuais dos anexos e
          PGDAS dependem de atos do Comitê Gestor — acompanhe o DAS oficial.
        </p>
        <p>
          Quem{" "}
          <strong className="text-foreground">
            optou pelo regime regular
          </strong>{" "}
          de IBS/CBS (art. 41, §§ 3º e 4º) apura esses tributos como empresa de
          regime normal, mesmo permanecendo Simples nos demais tributos. Crédito
          do comprador B2B, opção e limite de receita:{" "}
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            guia IBS e CBS no Simples Nacional
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">MEI</h2>
        <p>
          O MEI permanece no{" "}
          <strong className="text-foreground">valor fixo mensal</strong> (LC
          123/2006, art. 18-A, Anexo VII), com IBS e CBS incorporados ao boleto
          — não há apuração mensal por fora. O Comitê Gestor pode recompor os
          valores discriminados quando a transição federal exigir; o montante
          exato só com a regulamentação publicada. Em geral não há nota com
          grupo completo de IBS/CBS do regime regular; declaração anual e DAS
          mensal continuam a rotina.
        </p>
        <p>
          Compare com microempresa no Simples no{" "}
          <Link href="/guias/ibs-cbs-mei" className={linkClass}>
            guia IBS e CBS para o MEI
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Já dá para saber a alíquota da CBS em 2027?
            </dt>
            <dd>
              Só depois da resolução do Senado (ADCT, art. 130). Até lá, use
              este guia e o{" "}
              <Link
                href="/guias/cronograma-reforma-tributaria"
                className={linkClass}
              >
                cronograma
              </Link>{" "}
              como mapa de marcos, não como simulação de carga.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              ICMS e ISS acabam em 2027?
            </dt>
            <dd>
              Não. Permanecem com alíquotas integrais em 2027 e 2028. A redução
              9/10 a 6/10 começa em 2029; extinção em 2033 (ADCT, arts. 128 e
              129).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              2027 é igual ao teste de {IBS_CBS_ANO}?
            </dt>
            <dd>
              Não. {IBS_CBS_ANO} usa alíquotas de teste fixas em lei, compensação
              com PIS/Cofins e dispensa de recolhimento se cumprir acessórias.
              2027 inicia CBS de referência, extingue PIS/Cofins e cobra Imposto
              Seletivo onde couber — com obrigações plenas no regime regular.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Simples e MEI passam a apurar CBS como Lucro Real?
            </dt>
            <dd>
              Não, salvo opção expressa pelo regime regular de IBS/CBS (Simples,
              art. 41, § 3º). MEI segue valor fixo; Simples segue DAS.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. Classificação fiscal, créditos, PGDAS, ERP e planejamento
              exigem suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/imposto-seletivo-2027" className={linkClass}>
            Imposto Seletivo em 2027
          </Link>
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            Cronograma da reforma tributária
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
