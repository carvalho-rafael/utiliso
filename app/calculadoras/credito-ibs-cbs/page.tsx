import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { IBS_CBS_ANO } from "../../lib/calculadoras/ibs-cbs";
import { CreditoIbsCbsForm } from "./credito-ibs-cbs-form";

const calculadora = getCalculadoraBySlug("credito-ibs-cbs")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function CreditoIbsCbsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de crédito de IBS e CBS
        </h1>
        <p className="text-lg text-muted">
          Simule débito da saída menos créditos de entrada, com as alíquotas de
          teste de {IBS_CBS_ANO} no regime regular.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <CreditoIbsCbsForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            O <strong className="text-foreground">débito</strong> é calculado
            como na{" "}
            <Link href="/calculadoras/ibs-cbs" className={linkClass}>
              calculadora de IBS e CBS
            </Link>
            : valor da operação de saída × alíquotas de teste (por fora), com o
            regime que você escolher.
          </li>
          <li>
            O <strong className="text-foreground">crédito</strong> é o total que
            você informa das compras (CBS, IBS UF e IBS municipal). A
            ferramenta não lê notas nem aplica regras de elegibilidade item a
            item.
          </li>
          <li>
            O <strong className="text-foreground">saldo</strong> é débito −
            crédito por tributo, sem saldo negativo: se o crédito superar o
            débito, o excedente aparece só como informação.
          </li>
          <li>
            <strong className="text-foreground">O que não entra:</strong> NCM,
            CST, cClassTrib, crédito presumido, split payment, Imposto Seletivo,
            percentual do DAS do Simples (art. 23 da LC 123) e alíquotas plenas
            futuras.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Isso é a apuração do mês?
            </dt>
            <dd>
              Não. É uma conta educativa com um valor de saída e créditos
              somados. A apuração real envolve período, documentos, escrituração
              e regras da LC 214/2025. Veja o{" "}
              <Link href="/guias/ibs-cbs-regime-normal" className={linkClass}>
                guia do regime normal
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Comprei de empresa no Simples — o que informo?
            </dt>
            <dd>
              Marque a origem “Simples” para ver o aviso. O crédito equivalente
              ao recolhido no DAS não é calculado aqui — depende da faixa de
              receita do fornecedor e do art. 23 da LC 123. Detalhes no{" "}
              <Link
                href="/guias/ibs-cbs-simples-nacional"
                className={linkClass}
              >
                guia do Simples Nacional
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Em 2026 preciso recolher o saldo?
            </dt>
            <dd>
              As alíquotas de teste devem ser destacadas na transição; o
              recolhimento pode ficar dispensado se as obrigações acessórias
              forem cumpridas (art. 348, § 1º). PIS, Cofins, ICMS e ISS
              continuam valendo. Veja o{" "}
              <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
                guia da NF-e em {IBS_CBS_ANO}
              </Link>
              .
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
