import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { IbsCbsForm } from "./ibs-cbs-form";

const calculadora = getCalculadoraBySlug("ibs-cbs")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function IbsCbsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de IBS e CBS
        </h1>
        <p className="text-lg text-muted">
          Estime CBS e IBS por fora sobre o valor de uma operação, com as
          alíquotas de teste de {IBS_CBS_ANO}.
        </p>
      </div>

      <IbsCbsForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Por fora:</strong> IBS e CBS
            incidem sobre o valor informado, sem “por dentro” como no ICMS atual
            (LC 214/2025, art. 12, § 2º, I). CBS = valor × alíquota da CBS; IBS
            = valor × alíquota do IBS (estadual e municipal).
          </li>
          <li>
            <strong className="text-foreground">Alíquotas de 2026:</strong> CBS
            de 0,9% e IBS estadual de 0,1%, com IBS municipal em 0% para fatos
            geradores em {IBS_CBS_ANO} (
            <Link
              href="/tabelas/ibs-cbs"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela IBS/CBS
            </Link>
            , arts. 343 e 346 da LC 214/2025).
          </li>
          <li>
            <strong className="text-foreground">Regimes reduzidos:</strong> a
            calculadora aplica 60%, 30% ou 0% sobre as alíquotas nominais quando
            você indica redução prevista na lei — a classificação real do bem ou
            serviço (NCM, CST, cClassTrib) não é simulada aqui.
          </li>
          <li>
            <strong className="text-foreground">O que não entra:</strong> crédito
            de IBS/CBS, Imposto Seletivo, split payment e regras por NCM. Para
            operação item a item com memória legal, use a{" "}
            <a
              href="https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/calculadora"
              className="cursor-pointer font-medium text-accent hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              calculadora oficial da Receita Federal
            </a>
            .
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Em 2026 preciso recolher IBS e CBS?
            </dt>
            <dd>
              As alíquotas de teste devem ser destacadas na transição, mas o
              recolhimento fica dispensado se as obrigações acessórias forem
              cumpridas (LC 214/2025, art. 348, § 1º). PIS, Cofins, ICMS e ISS
              continuam valendo nesse ano. Veja o{" "}
              <Link href="/guias/ibs-cbs-nfe-2026" className="cursor-pointer font-medium text-accent hover:underline">
                guia de IBS/CBS na NF-e
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Qual a diferença entre IBS e CBS?
            </dt>
            <dd>
              A CBS é federal e substitui PIS, Cofins e parte do IPI. O IBS é
              compartilhado entre estados e municípios e substituirá ICMS e ISS
              na vigência plena do novo sistema.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que só 2026?
            </dt>
            <dd>
              Nesta fase, apenas as alíquotas de teste de {IBS_CBS_ANO} estão
              fixadas em lei de forma objetiva. Anos seguintes dependem de
              transição e de resolução do Senado para alíquotas de referência.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O total “operação + tributos” é o valor da nota?
            </dt>
            <dd>
              Não. A calculadora soma por fora para ensinar a conta; na NF-e de{" "}
              {IBS_CBS_ANO} o destaque de IBS/CBS é informativo e não entra no
              preço pago pelo cliente. Detalhes no{" "}
              <Link href="/guias/ibs-cbs-nfe-2026" className="cursor-pointer font-medium text-accent hover:underline">
                guia de IBS/CBS na NF-e
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa educativa com base no valor e no regime
              escolhidos. Classificação fiscal, benefícios e créditos podem
              alterar o cálculo real. Consulte contador ou assessoria fiscal.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
