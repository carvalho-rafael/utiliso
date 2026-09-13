import type { Metadata } from "next";
import Link from "next/link";
import { getCalculadoraBySlug } from "../../lib/calculadoras/catalog";
import { FeriasForm } from "./ferias-form";

const calculadora = getCalculadoraBySlug("ferias")!;

export const metadata: Metadata = {
  title: `Calculadora de ${calculadora.title} — Utiliso`,
  description: calculadora.metaDescription,
};

export default function FeriasPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calculadora de Férias
        </h1>
        <p className="text-lg text-muted">
          Estime o valor das férias gozadas, do 1/3 constitucional e do abono
          pecuniário.
        </p>
      </div>

      <FeriasForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona o cálculo
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Férias:</strong> valor
            proporcional aos dias de gozo — salário (mais média de variáveis, se
            informada) dividido por 30, vezes os dias de descanso (CLT art.
            130).
          </li>
          <li>
            <strong className="text-foreground">1/3 constitucional:</strong>{" "}
            adicional de um terço sobre as férias gozadas (CF art. 7º, XVII) e,
            se houver abono, sobre o abono pecuniário.
          </li>
          <li>
            <strong className="text-foreground">Abono pecuniário:</strong>{" "}
            conversão de até 1/3 do direito (10 dias) em dinheiro, com redução
            proporcional dos dias de gozo (CLT art. 143).
          </li>
          <li>
            <strong className="text-foreground">INSS:</strong> incide sobre
            férias gozadas e o 1/3 constitucional do gozo. Não incide sobre o
            abono pecuniário nem sobre o 1/3 desse abono (Lei 8.212/1991, art.
            28, § 9º). Tabela progressiva de 2026 (
            <Link
              href="/tabelas/inss"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela INSS
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">IRRF:</strong> incide sobre
            férias gozadas e o 1/3 do gozo. O abono pecuniário e seu 1/3 são
            isentos (IN RFB 936/2009). Veja a{" "}
            <Link
              href="/tabelas/irrf"
              className="cursor-pointer font-medium text-accent hover:underline"
            >
              tabela IRRF
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">13º salário:</strong> a 1ª
            parcela (metade do salário) pode ser paga junto com as férias (CLT
            art. 145) — sem INSS nem IRRF nesta parcela.
          </li>
          <li>
            <strong className="text-foreground">Pagamento:</strong> o
            empregador deve pagar as férias até 2 dias antes do início do
            período de gozo (CLT art. 145).
          </li>
          <li>
            <strong className="text-foreground">FGTS:</strong> 8% depositados
            pelo empregador sobre a base das férias — não entram no líquido,
            apenas como referência.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O abono pecuniário paga INSS ou Imposto de Renda?
            </dt>
            <dd>
              Não. O abono pecuniário e seu 1/3 não integram o
              salário-de-contribuição do INSS (Lei 8.212/1991, art. 28, § 9º) e
              são isentos de IRRF (IN RFB 936/2009).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso vender 10 dias e gozar 30?
            </dt>
            <dd>
              Não. O abono corresponde a até 1/3 do direito (10 dias). Quem
              vende o abono goza no máximo 20 dias — o total não pode passar de
              30 dias.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este valor inclui o salário do mês?
            </dt>
            <dd>
              Não. A calculadora estima apenas o pagamento das férias (recibo
              de férias). O salário do mês em que você está de férias é
              calculado separadamente.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Férias na rescisão são iguais?
            </dt>
            <dd>
              Não. Férias indenizadas na rescisão têm regras diferentes (por
              exemplo, isenção de IRRF sobre férias indenizadas). Use a{" "}
              <a
                href="/calculadoras/rescisao"
                className="font-medium text-accent hover:underline"
              >
                calculadora de rescisão
              </a>{" "}
              para esse caso.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              O resultado é definitivo?
            </dt>
            <dd>
              Não. É uma estimativa baseada nas informações fornecidas e nas
              tabelas vigentes. Faltas, médias complexas de variáveis ou acordos
              coletivos podem alterar o valor real. Consulte um profissional
              para valores oficiais.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
