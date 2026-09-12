import type { Metadata } from "next";
import Link from "next/link";
import { SEGURO_DESEMPREGO_CALCULADORA_HREF } from "../../lib/calculadoras/rescisao";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("seguro-desemprego")!;

export const metadata: Metadata = {
  title: `Guia de ${guia.title} — Utiliso`,
  description: guia.metaDescription,
};

export default function SeguroDesempregoGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Guia de Seguro-desemprego
        </h1>
        <p className="text-lg text-muted">
          Entenda quem tem direito, quantas parcelas receber e como solicitar o
          benefício.
        </p>
      </div>

      <aside
        aria-label="Calculadora de seguro-desemprego"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime parcelas e valor
        </h2>
        <p className="mt-2 text-sm text-muted">
          Use a calculadora para uma estimativa de quantas parcelas você pode
          receber e o valor de cada uma, com base no seu tempo de trabalho e
          salários.
        </p>
        <Link
          href={SEGURO_DESEMPREGO_CALCULADORA_HREF}
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular seguro-desemprego
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          O que é o seguro-desemprego?
        </h2>
        <p>
          É um benefício temporário pago pelo governo ao trabalhador com carteira
          assinada que foi dispensado <strong className="text-foreground">sem justa causa</strong>.
          O valor não é pago pelo empregador na rescisão e{" "}
          <strong className="text-foreground">não entra no líquido</strong> da
          calculadora de rescisão — é um benefício à parte, solicitado após o
          desligamento.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Quem tem direito?
        </h2>
        <p>Em geral, é preciso:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Ter sido dispensado <strong className="text-foreground">sem justa causa</strong>{" "}
            (inclui extinção normal do contrato por prazo determinado, quando
            aplicável);
          </li>
          <li>
            Não ter renda própria suficiente para o sustento (inclui atividade
            como autônomo ou MEI que gere renda);
          </li>
          <li>
            Atender ao tempo mínimo de trabalho com carteira assinada antes do
            desligamento (varia conforme quantas vezes já recebeu o benefício).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Quem não tem direito?
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Pedido de demissão</strong> —
            quem pede para sair não recebe seguro-desemprego;
          </li>
          <li>
            <strong className="text-foreground">Demissão por justa causa</strong>;
          </li>
          <li>
            <strong className="text-foreground">Acordo rescisório</strong> (CLT
            art. 484-A) — mesmo com verbas parecidas com a sem justa causa, não
            há seguro-desemprego.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Quantas parcelas e qual o valor?
        </h2>
        <p>
          O número de parcelas depende do tempo de trabalho nos últimos 36
          meses antes do desligamento e de quantas vezes você já recebeu o
          benefício. Em linhas gerais:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>De 3 a 5 parcelas mensais, conforme o tempo de vínculo;</li>
          <li>
            Valor entre o salário mínimo e um teto definido em lei, calculado
            com base na média dos últimos salários;
          </li>
          <li>
            Parcela extra no mês de dezembro (abono anual), quando houver
            parcelas a receber nesse período.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Prazos e como solicitar
        </h2>
        <p>
          O pedido deve ser feito em até{" "}
          <strong className="text-foreground">90 dias</strong> após a data da
          dispensa. O canal oficial é o aplicativo ou site{" "}
          <strong className="text-foreground">Carteira de Trabalho Digital</strong>{" "}
          (gov.br), com login gov.br. Tenha em mãos documentos pessoais e dados
          do último emprego.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O seguro-desemprego entra na rescisão?
            </dt>
            <dd>
              Não. A rescisão traz saldo, 13º, férias, aviso (quando cabível) e
              descontos. O seguro-desemprego é solicitado depois, direto ao
              governo.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Fui demitido no acordo (484-A). Posso pedir?
            </dt>
            <dd>
              Não. A lei que criou o acordo rescisório exclui o direito ao
              seguro-desemprego.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo. Casos com vínculos múltiplos, justa
              causa discutida ou dúvidas sobre renda exigem análise
              profissional.
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/calculadoras/rescisao"
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Calculadora de rescisão
          </Link>
          <Link
            href={SEGURO_DESEMPREGO_CALCULADORA_HREF}
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            Calculadora de seguro-desemprego
          </Link>
        </div>
      </div>
    </main>
  );
}
