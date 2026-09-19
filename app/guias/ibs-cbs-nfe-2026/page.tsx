import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("ibs-cbs-nfe-2026")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function IbsCbsNfe2026GuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Como IBS e CBS aparecem na NF-e em 2026
        </h1>
        <p className="text-lg text-muted">
          Entenda o destaque informativo na nota, o que muda no XML e a
          diferença entre somar tributos na calculadora e o total da DANFE.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de IBS e CBS"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Simule os valores por fora
        </h2>
        <p className="mt-2 text-sm text-muted">
          A calculadora mostra CBS e IBS sobre uma base informada — útil para
          entender a aritmética, não para substituir o leiaute da nota.
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
          O que muda na NF-e em 2026
        </h2>
        <p>
          Em {IBS_CBS_ANO}, PIS, Cofins, ICMS, ISS e IPI continuam valendo. Ao
          mesmo tempo, a reforma do consumo (LC 214/2025) prevê{" "}
          <strong className="text-foreground">IBS</strong> e{" "}
          <strong className="text-foreground">CBS</strong> com alíquotas de
          teste — CBS de 0,9% e IBS estadual de 0,1% (
          <Link href="/tabelas/ibs-cbs" className={linkClass}>
            tabela IBS/CBS
          </Link>
          , arts. 343 e 346).
        </p>
        <p>
          Na nota fiscal eletrônica (modelo 55), esses tributos passam a ser
          informados em um grupo próprio por item, conforme o leiaute da{" "}
          <strong className="text-foreground">
            Nota Técnica 2025.002-RTC
          </strong>
          . O objetivo do ano é adaptação: destacar base, alíquotas e valores
          de CBS e de IBS (estadual e municipal) sem substituir de imediato todo
          o bloco de tributos atuais.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Destaque informativo: o que isso significa
        </h2>
        <p>
          IBS e CBS incidem <strong className="text-foreground">por fora</strong>{" "}
          (LC 214/2025, art. 12, § 2º, I): o tributo não integra a própria base,
          ao contrário do ICMS “por dentro”. Na transição de {IBS_CBS_ANO}, porém,
          o mais importante para quem lê a nota é outro ponto: o destaque de IBS
          e CBS é, em regra,{" "}
          <strong className="text-foreground">informativo</strong> — aparece na
          DANFE e no XML para treinar o novo modelo, mas{" "}
          <strong className="text-foreground">
            não deve ser somado ao preço da operação
          </strong>{" "}
          como se o cliente pagasse ICMS + IBS + CBS em cima do mesmo valor.
        </p>
        <p>
          A calculadora do Utiliso mostra “operação + tributos” (por exemplo,
          R$ 1.000,00 + R$ 10,00 = R$ 1.010,00) só para ilustrar a conta por
          fora. Esse total{" "}
          <strong className="text-foreground">não é o valor total da NF-e</strong>{" "}
          que o comprador paga em {IBS_CBS_ANO}.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Recolhimento e obrigações acessórias
        </h2>
        <p>
          O art. 348 da LC 214/2025 dispensa o{" "}
          <strong className="text-foreground">recolhimento</strong> de IBS e CBS
          sobre fatos geradores de 1º de janeiro a 31 de dezembro de {IBS_CBS_ANO}{" "}
          para quem cumprir as{" "}
          <strong className="text-foreground">obrigações acessórias</strong>{" "}
          previstas na legislação (§ 1º). Ou seja: destacar na nota e prestar
          as informações exigidas faz parte da adaptação; deixar de cumprir
          acessórias pode afetar essa dispensa, mesmo quando a alíquota simbólica
          pareça pequena.
        </p>
        <p>
          Isso não elimina PIS, Cofins, ICMS ou ISS do documento — apenas trata
          do recolhimento de IBS/CBS no ano-teste, nas condições da lei.
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que você vê por item na nota
        </h2>
        <p>
          O leiaute prevê, por item vendido dentro de{" "}
          <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-foreground">
            det
          </code>
          , um grupo{" "}
          <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-foreground">
            IBSCBS
          </code>{" "}
          com classificação, base e valores. Resumo:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Classificação</strong> — códigos
            de situação tributária e de classificação do IBS/CBS (CST e
            cClassTrib), conforme tabelas oficiais;
          </li>
          <li>
            <strong className="text-foreground">Base de cálculo</strong> — valor
            sobre o qual incidem IBS e CBS naquele item;
          </li>
          <li>
            <strong className="text-foreground">CBS</strong> — alíquota e valor
            da contribuição federal de teste;
          </li>
          <li>
            <strong className="text-foreground">IBS estadual e municipal</strong>{" "}
            — parcelas do imposto compartilhado (em {IBS_CBS_ANO}, a municipal
            costuma aparecer zerada na alíquota de teste);
          </li>
          <li>
            <strong className="text-foreground">Tributos atuais</strong> — PIS,
            Cofins, ICMS ou ISS (conforme a operação) continuam nos campos já
            conhecidos.
          </li>
        </ul>

        <h3 className="text-sm font-medium text-foreground">
          Exemplo ilustrativo de XML (um item)
        </h3>
        <p>
          Trecho simplificado, com alíquotas de teste de {IBS_CBS_ANO} sobre
          base de R$ 1.000,00 (CST tributação integral). A versão vigente da NT
          2025.002 no Portal da NF-e pode exigir tags adicionais (redução,
          totalizador{" "}
          <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-foreground">
            IBSCBSTot
          </code>
          , etc.) — confira o schema publicado antes de implementar no ERP.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
          {`<!-- dentro de det/imposto — exemplo educativo, não substitui o XSD -->
<IBSCBS>
  <CST>000</CST>
  <cClassTrib>000001</cClassTrib>
  <gIBSCBS>
    <vBC>1000.00</vBC>
    <gIBSUF>
      <pIBSUF>0.1000</pIBSUF>
      <vIBSUF>1.00</vIBSUF>
    </gIBSUF>
    <gIBSMun>
      <pIBSMun>0.0000</pIBSMun>
      <vIBSMun>0.00</vIBSMun>
    </gIBSMun>
    <vIBS>1.00</vIBS>
    <gCBS>
      <pCBS>0.9000</pCBS>
      <vCBS>9.00</vCBS>
    </gCBS>
  </gIBSCBS>
</IBSCBS>`}
        </pre>
        <p className="text-xs text-muted">
          <strong className="font-medium text-foreground">Observações:</strong>{" "}
          no leiaute da NF-e, alíquotas (
          <code className="font-mono">pIBSUF</code>,{" "}
          <code className="font-mono">pIBSMun</code>,{" "}
          <code className="font-mono">pCBS</code>) são informadas com{" "}
          <strong className="font-medium text-foreground">
            4 casas decimais
          </strong>{" "}
          em percentual (0,1000 = 0,1%; 0,9000 = 0,9%). Valores monetários (
          <code className="font-mono">vBC</code>,{" "}
          <code className="font-mono">vIBSUF</code>,{" "}
          <code className="font-mono">vCBS</code> e demais{" "}
          <code className="font-mono">v*</code>) usam{" "}
          <strong className="font-medium text-foreground">
            2 casas decimais
          </strong>
          .
        </p>
        <p className="text-xs text-muted">
          <strong className="font-medium text-foreground">Leitura rápida:</strong>{" "}
          <code className="font-mono">vBC</code> é a base;{" "}
          <code className="font-mono">pIBSUF</code> / <code className="font-mono">pCBS</code>{" "}
          são as alíquotas informadas;{" "}
          <code className="font-mono">vIBSUF</code>,{" "}
          <code className="font-mono">vIBSMun</code> e{" "}
          <code className="font-mono">vCBS</code> são os valores calculados (
          <code className="font-mono">vIBS</code> soma UF + município). Isso
          espelha a conta da{" "}
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            calculadora
          </Link>
          , mas no XML o grupo convive com PIS, Cofins, ICMS/ISS no mesmo item.
        </p>

        <p>
          A NFC-e (modelo 65) segue lógica semelhante de leiaute para quem está
          no regime normal e no cronograma de obrigatoriedade. Simples Nacional,
          MEI e casos especiais exigem análise própria — este guia foca a NF-e
          de regime normal na transição.
        </p>

        <h2 className="text-base font-medium text-foreground">
          ERP, validação e calculadora oficial
        </h2>
        <p>
          Quem emite nota precisa atualizar o ERP conforme a versão vigente da NT
          2025.002 no Portal da NF-e. Regras de validação da Sefaz (como exigir
          o grupo de IBS/CBS) podem ser implantadas em etapas —{" "}
          <strong className="text-foreground">
            autorizar a nota sem rejeição não substitui
          </strong>{" "}
          o dever de informar corretamente quando a obrigação já alcança a
          empresa.
        </p>
        <p>
          Para operação item a item com memória de cálculo e fundamentação legal,
          use a{" "}
          <a
            href="https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/calculadora"
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            calculadora oficial da Receita Federal
          </a>
          . O Utiliso não replica NCM, crédito, split payment ou Imposto
          Seletivo.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O cliente paga IBS e CBS a mais em cima do preço em 2026?
            </dt>
            <dd>
              Em regra, não como acréscimo ao total da venda na transição: o
              destaque é informativo. O preço negociado continua regido pelos
              tributos vigentes (PIS, Cofins, ICMS/ISS etc.). IBS/CBS aparecem
              para adaptação do documento.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que a calculadora mostra R$ 1.010,00 se a nota não soma isso?
            </dt>
            <dd>
              Porque ela aplica a fórmula por fora (base × alíquota) e soma ao
              valor informado para ensinar a mecânica. Na NF-e de {IBS_CBS_ANO},
              esse total não é o que o comprador paga. Veja o{" "}
              <Link href="/calculadoras/ibs-cbs" className={linkClass}>
                calculadora de IBS e CBS
              </Link>{" "}
              com essa distinção em mente.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Preciso recolher IBS e CBS se já destaco na nota?
            </dt>
            <dd>
              Em {IBS_CBS_ANO}, o recolhimento fica dispensado se as obrigações
              acessórias forem cumpridas (art. 348, § 1º). Destacar é parte da
              adaptação; cumprir acessórias é condição da dispensa.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              A nota autorizada sem o grupo de IBS/CBS está em dia?
            </dt>
            <dd>
              Depende do cronograma e do cumprimento das acessórias. A Sefaz pode
              autorizar enquanto algumas validações ainda não estão ativas em
              produção, mas isso não significa conformidade automática com a
              transição. Confirme com contador ou assessoria fiscal.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O exemplo de XML do guia serve para emitir nota?
            </dt>
            <dd>
              Não sozinho. É ilustrativo (um item, tributação integral de teste).
              CST, cClassTrib, bases expurgadas e totalizadores dependem da
              operação e da versão da NT 2025.002. Use o leiaute oficial e a
              calculadora da Receita para casos reais.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui contador ou TI?
            </dt>
            <dd>
              Não. É material informativo sobre o efeito na nota em {IBS_CBS_ANO}.
              Parametrização de ERP, CST, cClassTrib e regime tributário do
              emitente exigem suporte profissional.
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
