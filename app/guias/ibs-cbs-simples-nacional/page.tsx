import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ibs-cbs-simples-nacional")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function IbsCbsSimplesNacionalGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          IBS e CBS no Simples Nacional: o que muda
        </h1>
        <p className="text-lg text-muted">
          Como a reforma do consumo afeta o DAS, o crédito de quem compra de
          você e a opção de apurar IBS e CBS pelo regime regular.
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
          Este guia é sobre o enquadramento no Simples Nacional. Se ainda não
          sabe o que são IBS e CBS, comece pelo guia de conceitos.
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
          Regra padrão: continua no DAS
        </h2>
        <p>
          A{" "}
          <strong className="text-foreground">
            Lei Complementar nº 214/2025
          </strong>{" "}
          institui o regime regular de IBS e CBS, mas quem é optante pelo{" "}
          <strong className="text-foreground">Simples Nacional</strong> permanece
          sujeito às regras desse regime (LC 214, art. 41, § 2º). Na prática, em
          regra você{" "}
          <strong className="text-foreground">
            não apura IBS e CBS à parte
          </strong>
          : as parcelas relativas a esses tributos entram no cálculo do
          documento de arrecadação do Simples (DAS), junto com os demais
          tributos já unificados na LC 123/2006.
        </p>
        <p>
          Isso é diferente de uma empresa no regime normal, que destaca, credita
          e recolhe IBS e CBS conforme a LC 214. A{" "}
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            calculadora de IBS e CBS
          </Link>{" "}
          do Utiliso simula o regime regular (alíquotas de teste de{" "}
          {IBS_CBS_ANO}) — não substitui o DAS do Simples.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Crédito para quem compra de você (art. 23 da LC 123)
        </h2>
        <p>
          Empresas no regime regular que compram bens ou serviços de optante
          pelo Simples têm direito a{" "}
          <strong className="text-foreground">crédito de IBS e CBS</strong> em
          montante equivalente ao que foi recolhido por meio do regime único (LC
          123/2006, art. 23, §§ 1º-A a 3º, redação da LC 214/2025). O percentual
          usado no cálculo deve constar no documento fiscal e corresponde aos
          percentuais de ICMS, IBS e CBS previstos nos Anexos I a V da LC 123
          para a faixa de receita do vendedor no mês da operação.
        </p>
        <p>
          No B2B, isso importa: o cliente PJ pode querer crédito pleno, mas
          recebe um crédito{" "}
          <strong className="text-foreground">limitado ao que o Simples embute</strong>{" "}
          no DAS — não ao IBS/CBS destacados “por fora” como no regime regular.
          A LC 214/2025 reforça essa lógica no art. 47, § 9º: quem paga IBS/CBS
          via Simples (sem optar pelo regime regular) não credita esses tributos
          nas próprias compras, mas quem compra do Simples pode creditar o
          equivalente.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Opção pelo regime regular de IBS e CBS
        </h2>
        <p>
          O optante pelo Simples{" "}
          <strong className="text-foreground">pode escolher</strong> apurar e
          recolher IBS e CBS pelo regime regular da LC 214 (art. 41, §§ 3º e
          4º). Nessa hipótese, as parcelas de IBS e CBS{" "}
          <strong className="text-foreground">deixam de ser cobradas pelo DAS</strong>{" "}
          e passam a seguir as regras de destaque, crédito e recolhimento do
          regime regular — nos termos em que a LC 123/2006 regulamentar a opção
          (arts. 18-A, §§ 9º e 10).
        </p>
        <p>
          O trade-off é clássico:{" "}
          <strong className="text-foreground">simplicidade do DAS</strong> versus{" "}
          <strong className="text-foreground">transparência de crédito</strong>{" "}
          para clientes que exigem nota com IBS/CBS destacados. Vale lembrar o
          art. 41, § 5º: é vedado voltar ao regime regular do Simples para
          IBS/CBS se você já recebeu ressarcimento de créditos desses tributos
          no ano corrente ou anterior (art. 39 da LC 214).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Limite de receita para IBS no Simples
        </h2>
        <p>
          Para recolher o IBS na forma do Simples Nacional, aplica-se o limite
          máximo de receita de{" "}
          <strong className="text-foreground">
            R$ 3.600.000,00
          </strong>{" "}
          (LC 123/2006, art. 13-A, redação da LC 214/2025). Ultrapassar esse
          teto pode impedir o recolhimento do IBS pelo regime único, com efeitos
          retroativos previstos na lei — situação que exige acompanhamento com
          contador.
        </p>

        <h2 className="text-base font-medium text-foreground">
          E em {IBS_CBS_ANO}, na transição?
        </h2>
        <p>
          O{" "}
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            cronograma da reforma
          </Link>{" "}
          vale também para o Simples no que a lei prever para o DAS e para as
          obrigações acessórias. Quem emite NF-e no regime normal tem regras
          específicas de destaque informativo; no Simples, a rotina continua
          centrada no PGDAS e na declaração simplificada (art. 25 da LC 123).
          Detalhes de nota para regime normal estão no{" "}
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
              Preciso separar IBS e CBS na nota como empresa grande?
            </dt>
            <dd>
              Em regra, não enquanto você permanece no Simples sem optar pelo
              regime regular: o recolhimento segue unificado. Com a opção pelo
              regime regular (art. 41, § 3º), passam a valer as regras de
              documento fiscal e apuração da LC 214.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Perco cliente PJ que quer crédito cheio?
            </dt>
            <dd>
              O comprador no regime regular ainda pode creditar, mas em valor
              equivalente ao embutido no DAS (art. 23), não necessariamente o
              mesmo crédito de uma venda “por fora”. Alguns fornecedores optam
              pelo regime regular de IBS/CBS justamente para atender esse
              mercado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Vale a pena optar pelo regime regular de IBS e CBS?
            </dt>
            <dd>
              Depende do perfil de vendas (B2B x B2C), do custo de compliance e
              da opção dos clientes. Não há resposta única — simule cenários
              com assessoria e compare DAS x apuração separada.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              MEI e Simples são a mesma coisa na reforma?
            </dt>
            <dd>
              Não. O MEI tem regras próprias (valor fixo mensal, Anexo VII). Veja
              o{" "}
              <Link href="/guias/ibs-cbs-mei" className={linkClass}>
                guia IBS e CBS para o MEI
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou assessoria fiscal?
            </dt>
            <dd>
              Não. Enquadramento, opção pelo regime regular, PGDAS e emissão de
              nota exigem suporte profissional.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/ibs-cbs-mei" className={linkClass}>
            IBS e CBS para o MEI
          </Link>
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            IBS e CBS: o que são
          </Link>
          <Link href="/guias/cronograma-reforma-tributaria" className={linkClass}>
            Cronograma da reforma tributária
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
