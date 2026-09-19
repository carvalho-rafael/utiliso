import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPainel } from "../../components/calculadora-painel";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import {
  SEGURO_FAIXA1_LIMITE,
  SEGURO_FAIXA2_LIMITE,
  SEGURO_PISO,
  SEGURO_TETO,
} from "../../lib/calculadoras/seguro-desemprego";
import { SeguroDesempregoForm } from "./seguro-desemprego-form";

const calculadora = getCalculadoraBySlug("seguro-desemprego")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function SeguroDesempregoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Seguro-desemprego
        </h1>
        <p className="text-lg text-muted">
          Estime parcelas e valor do benefício após a demissão sem justa causa.
        </p>
      </div>

      <CalculadoraPainel titulo={`Calculadora de ${calculadora.title}`}>
        <SeguroDesempregoForm />
      </CalculadoraPainel>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Quem tem direito:</strong>{" "}
            trabalhador dispensado sem justa causa, desempregado no pedido, sem
            renda própria suficiente e com tempo mínimo de vínculo (varia por
            solicitação). Pedido de demissão, justa causa e acordo (art. 484-A)
            não geram direito.
          </li>
          <li>
            <strong className="text-foreground">Média salarial:</strong> média
            dos últimos 1 a 3 salários brutos do último vínculo de emprego.
          </li>
          <li>
            <strong className="text-foreground">Valor da parcela (2026):</strong>{" "}
            até {formatarMoeda(SEGURO_FAIXA1_LIMITE)}, 80% da média; de{" "}
            {formatarMoeda(SEGURO_FAIXA1_LIMITE + 0.01)} a{" "}
            {formatarMoeda(SEGURO_FAIXA2_LIMITE)}, R$ 1.777,74 + 50% do
            excedente; acima disso, teto de {formatarMoeda(SEGURO_TETO)}. Piso:{" "}
            {formatarMoeda(SEGURO_PISO)} (
            <Link
              href="/tabelas/salario-minimo"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              salário mínimo
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Parcelas:</strong> 3, 4 ou 5
            mensais, conforme meses trabalhados nos 36 meses anteriores à
            dispensa e se é a 1ª, 2ª ou 3ª+ solicitação (Lei 7.998/1990, art.
            4º).
          </li>
          <li>
            <strong className="text-foreground">Tabela:</strong>{" "}
            <Link
              href="/tabelas/seguro-desemprego"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela MTE/CODEFAT
            </Link>
            , reajustada pelo INPC, vigente a partir de 11/01/2026 (Resolução
            CODEFAT nº 957/2022).
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O seguro-desemprego entra na rescisão?
            </dt>
            <dd>
              Não. A rescisão traz verbas do empregador; o benefício é pago pelo
              governo e solicitado depois, separadamente.
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
              Quantos salários entram na média?
            </dt>
            <dd>
              Se houve três ou mais salários no último vínculo, a média dos três
              últimos; se dois, a média dos dois; se um, esse valor.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é o mesmo do gov.br?
            </dt>
            <dd>
              É uma estimativa. O MTE analisa vínculos, renda, benefícios
              previdenciários e documentação no pedido oficial. Use a{" "}
              <a
                href="https://www.gov.br/trabalho-e-emprego/pt-br/servicos/seguro-desemprego"
                className="font-medium text-accent hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Carteira de Trabalho Digital
              </a>{" "}
              para solicitar o benefício.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e na
              tabela vigente. Consulte um profissional para análise do seu caso.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
