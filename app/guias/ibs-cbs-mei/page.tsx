import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ibs-cbs-mei")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function IbsCbsMeiGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          IBS e CBS para o MEI: o que muda
        </h1>
        <p className="text-lg text-muted">
          Valor fixo mensal, nota fiscal e o que a reforma do consumo significa
          para quem é microempreendedor individual.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Conceitos IBS e CBS"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Primeiro os conceitos
        </h2>
        <p className="mt-2 text-sm text-muted">
          Este guia foca o MEI. Para entender IBS e CBS em geral, use o guia de
          conceitos; para empresas no Simples (não MEI), há guia específico.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/guias/ibs-e-cbs"
            className="inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            IBS e CBS: o que são
          </Link>
          <Link
            href="/guias/ibs-cbs-simples-nacional"
            className="inline-flex cursor-pointer rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Simples Nacional
          </Link>
        </div>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Mensagem central: continua o valor fixo mensal
        </h2>
        <p>
          O MEI permanece no modelo de{" "}
          <strong className="text-foreground">recolhimento simplificado</strong>.
          Com receita bruta anual igual ou inferior a{" "}
          <strong className="text-foreground">R$ 81.000,00</strong>, você paga,
          na forma regulamentada pelo Comitê Gestor do Simples Nacional (CGSN),
          valor mensal que soma INSS, ICMS, ISS, IBS e CBS nos valores
          discriminados no{" "}
          <strong className="text-foreground">Anexo VII</strong> da LC
          123/2006 (art. 18-A, § 3º, IV e V, redação dada pela LC 214/2025).
        </p>
        <p>
          Não há, para o MEI, apuração mensal de IBS e CBS “por fora” como no
          regime regular. A reforma{" "}
          <strong className="text-foreground">incorpora IBS e CBS ao pacote fixo</strong>,
          em vez de criar uma obrigação paralela de cálculo desses tributos para
          a maioria dos microempreendedores.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Por que o MEI, em regra, não gera crédito pleno
        </h2>
        <p>
          Empresas no regime regular costumam creditar IBS e CBS destacados nas
          notas de fornecedores. O MEI recolhe tributos pelo valor fixo do
          regime especial; a lógica da não cumulatividade da LC 214/2025 (art.
          47) foi desenhada principalmente para o{" "}
          <strong className="text-foreground">regime regular</strong>. Na
          prática, quem compra do MEI em operações comuns{" "}
          <strong className="text-foreground">não recebe o mesmo crédito</strong>{" "}
          que receberia de um fornecedor que destaca IBS e CBS na nota — salvo
          hipóteses específicas previstas em lei (veja abaixo).
        </p>
        <p>
          Isso não é “punir” o MEI: é consequência do regime simplificado. Para
          vendas B2C ou serviços a pessoa física, o impacto costuma ser pequeno;
          para fornecimento recorrente a empresas que dependem de crédito, pode
          pesar na escolha do fornecedor — tema de negócio, não só de imposto.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Exceções: créditos presumidos (arts. 169 e 171 da LC 214)
        </h2>
        <p>
          A LC 214/2025 prevê créditos presumidos de IBS e CBS em situações
          pontuais envolvendo quem não é contribuinte no regime regular ou quem
          é MEI, por exemplo:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Transporte de carga</strong>{" "}
            por transportador autônomo pessoa física ou MEI (art. 169);
          </li>
          <li>
            <strong className="text-foreground">Revenda de bem móvel usado</strong>{" "}
            adquirido de pessoa física não contribuinte ou MEI (art. 171).
          </li>
        </ul>
        <p>
          São regras de nicho — não transformam o MEI em gerador de crédito
          geral para qualquer venda. O comprador precisa enquadrar-se na
          hipótese legal e seguir a apuração do regime regular.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Declaração anual e rotina
        </h2>
        <p>
          O MEI deve apresentar, anualmente, declaração única e simplificada de
          informações socioeconômicas e fiscais à Receita Federal (LC 123/2006,
          art. 25-B, redação da LC 214/2025), nos prazos e modelos do CGSN. A
          reforma não substitui essa rotina por apuração mensal de IBS/CBS; o
          foco continua sendo o cumprimento do DAS mensal e da declaração
          anual.
        </p>
        <p>
          Emissão de nota: o MEI permanece obrigado a emitir documento fiscal
          nas vendas e prestações, conforme regras do CGSN — sem exigir, para a
          maioria dos casos, o grupo de IBS/CBS do leiaute de regime normal
          descrito no{" "}
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            guia da NF-e em {IBS_CBS_ANO}
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          MEI x Simples Nacional (microempresa)
        </h2>
        <p>
          Microempresa ou EPP no Simples seguem art. 23 (crédito do comprador) e
          podem optar pelo regime regular de IBS/CBS. O MEI não tem essa mesma
          arquitetura: é regime ainda mais enxuto. Compare no{" "}
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            guia IBS e CBS no Simples Nacional
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Preciso emitir nota com IBS e CBS destacados?
            </dt>
            <dd>
              Em regra, o MEI segue o documento fiscal e as regras do CGSN, não
              o leiaute completo de IBS/CBS do regime regular. Dúvidas sobre o
              seu CNAE e obrigatoriedade de NF-e devem ser confirmadas no
              Portal do Empreendedor e com contador.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Perco clientes PJ por causa da reforma?
            </dt>
            <dd>
              Alguns compradores no regime regular preferem fornecedores que
              geram crédito destacado. O MEI já convivia com limitações de
              crédito de ICMS/ISS; com IBS/CBS a lógica é semelhante no regime
              simplificado. Avalie seu mercado e, se crescer, converse sobre
              migração para Simples ou regime normal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O valor fixo que pago hoje vai subir por causa de IBS e CBS?
            </dt>
            <dd>
              IBS e CBS passam a integrar as parcelas previstas no Anexo VII e
              na regulamentação do CGSN. O montante exato depende de atos do
              Comitê Gestor e de reajustes — acompanhe o DAS oficial e não use
              apenas simulações de regime regular.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              A calculadora do Utiliso serve para o MEI?
            </dt>
            <dd>
              Não diretamente: ela mostra IBS/CBS no regime regular (teste de{" "}
              {IBS_CBS_ANO}). Para o MEI, use o valor do DAS e a orientação do
              CGSN.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria?
            </dt>
            <dd>
              Não. Desenquadramento, limite de receita, CNAE permitido e emissão
              de nota exigem suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/ibs-cbs-simples-nacional" className={linkClass}>
            IBS e CBS no Simples Nacional
          </Link>
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            IBS e CBS: o que são
          </Link>
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            Cronograma da reforma tributária
          </Link>
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            Calculadora de IBS e CBS
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
