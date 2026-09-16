import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { DecimoTerceiroForm } from "./decimo-terceiro-form";

const calculadora = getCalculadoraBySlug("decimo-terceiro")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function DecimoTerceiroPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de 13º Salário
        </h1>
        <p className="text-lg text-muted">
          Estime o valor integral ou proporcional do décimo terceiro, com as
          duas parcelas e os descontos de INSS e IRRF.
        </p>
      </div>

      <DecimoTerceiroForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Avos:</strong> informe a data
            de admissão. Cada mês com 15 dias ou mais trabalhados no ano conta
            como 1/12 do 13º (Lei 4.090/1962).
          </li>
          <li>
            <strong className="text-foreground">1ª parcela:</strong> metade do
            13º bruto, paga entre 1º de fevereiro e 30 de novembro, sem INSS
            nem IRRF (Lei 4.749/1965). Detalhe no{" "}
            <Link
              href="/guias/primeira-parcela-decimo-terceiro"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              guia da 1ª parcela do 13º
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">2ª parcela:</strong> o restante
            do 13º, com desconto de INSS e IRRF, pago até 20 de dezembro (Lei
            4.749/1965). Detalhe no{" "}
            <Link
              href="/guias/segunda-parcela-decimo-terceiro"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              guia da 2ª parcela do 13º
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">INSS:</strong> incide sobre o
            13º bruto inteiro, descontado na 2ª parcela. Tabela progressiva de
            2026 (
            <Link
              href="/tabelas/inss"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela INSS
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">IRRF:</strong> tributação
            exclusiva sobre o 13º bruto, também na 2ª parcela. O INSS dedutível
            e os dependentes entram na base (Lei 15.270/2025). Veja a{" "}
            <Link
              href="/tabelas/irrf"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela IRRF
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Adiantamento nas férias:</strong>{" "}
            a 1ª parcela pode ser paga junto com as férias (CLT art. 145) — veja
            a{" "}
            <Link
              href="/calculadoras/ferias"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              calculadora de férias
            </Link>{" "}
            e o{" "}
            <Link
              href="/guias/primeira-parcela-decimo-terceiro"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              guia da 1ª parcela
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">FGTS:</strong> 8% depositados
            pelo empregador sobre o 13º bruto — não entram no líquido, apenas
            como referência.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Quando recebo cada parcela?
            </dt>
            <dd>
              A 1ª parcela pode ser paga de 1º de fevereiro a 30 de novembro; a
              2ª, até 20 de dezembro. Empresas costumam pagar a 1ª em novembro e
              a 2ª no início de dezembro, mas a lei fixa esses limites. Veja o{" "}
              <Link
                href="/guias/primeira-parcela-decimo-terceiro"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia da 1ª parcela
              </Link>{" "}
              e o{" "}
              <Link
                href="/guias/segunda-parcela-decimo-terceiro"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia da 2ª parcela
              </Link>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              A 1ª parcela tem desconto de INSS ou IRRF?
            </dt>
            <dd>
              Não. Os descontos incidem sobre o 13º bruto inteiro e são
              retidos na 2ª parcela. O{" "}
              <Link
                href="/guias/primeira-parcela-decimo-terceiro"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia da 1ª parcela
              </Link>{" "}
              e o{" "}
              <Link
                href="/guias/segunda-parcela-decimo-terceiro"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia da 2ª parcela
              </Link>{" "}
              explicam prazos, adiantamento nas férias e os descontos.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Mês com menos de 15 dias trabalhados conta?
            </dt>
            <dd>
              Não. A partir da data de admissão, só entra o mês em que você
              trabalhou mais de 14 dias.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Fui demitido, uso esta calculadora?
            </dt>
            <dd>
              Para 13º proporcional na rescisão, use a{" "}
              <Link
                href="/calculadoras/rescisao"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                calculadora de rescisão
              </Link>
              . As regras de pagamento e tributação são as mesmas, mas o valor
              proporcional depende da data de saída.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes. Médias complexas de variáveis ou acordos
              coletivos podem alterar o valor real. Consulte um profissional
              para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
