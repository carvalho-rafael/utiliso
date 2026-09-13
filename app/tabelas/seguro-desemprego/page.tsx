import type { Metadata } from "next";
import Link from "next/link";
import { TabelaCalculadoraCta } from "../../components/tabela-calculadora-cta";
import { TabelasRelacionadas } from "../../components/tabelas-relacionadas";
import { formatarMoeda } from "../../lib/calculadoras/format";
import {
  SEGURO_DESEMPREGO_ANO,
  SEGURO_FAIXA1_LIMITE,
  SEGURO_FAIXA2_BASE,
  SEGURO_FAIXA2_LIMITE,
  SEGURO_PISO,
  SEGURO_TETO,
} from "../../lib/calculadoras/seguro-desemprego";
import { getTabelaBySlug } from "../../lib/tabelas/catalog";

const tabela = getTabelaBySlug("seguro-desemprego")!;

export const metadata: Metadata = {
  title: `Tabela ${tabela.title} ${SEGURO_DESEMPREGO_ANO} — Utiliso`,
  description: tabela.metaDescription,
};

export default function TabelaSeguroDesempregoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tabela seguro-desemprego {SEGURO_DESEMPREGO_ANO}
        </h1>
        <p className="text-lg text-muted">
          Piso, teto e faixas do benefício após demissão sem justa causa,
          vigentes a partir de 11 de janeiro de {SEGURO_DESEMPREGO_ANO}.
        </p>
      </div>

      <TabelaCalculadoraCta
        title="Estime parcelas e valor"
        description="Use a calculadora para uma estimativa de quantas parcelas você pode receber e o valor de cada uma, com base no seu tempo de trabalho e salários."
        href="/calculadoras/seguro-desemprego"
        label="Calcular seguro-desemprego"
      />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Faixas de {SEGURO_DESEMPREGO_ANO}
        </h2>
        <p>
          O valor da parcela segue a tabela do{" "}
          <strong className="text-foreground">MTE/CODEFAT</strong> (Lei
          7.998/1990), reajustada pelo INPC. A média salarial considera os
          últimos 1 a 3 salários brutos do último vínculo. Para requisitos e
          prazos, veja o{" "}
          <Link
            href="/guias/seguro-desemprego"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            guia de seguro-desemprego
          </Link>
          .
        </p>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[24rem] text-left text-sm">
            <caption className="sr-only">
              Tabela de valores do seguro-desemprego em {SEGURO_DESEMPREGO_ANO}
            </caption>
            <thead className="border-b border-border bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Média salarial
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium text-foreground"
                >
                  Valor da parcela
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-muted">
                  Até {formatarMoeda(SEGURO_FAIXA1_LIMITE)}
                </td>
                <td className="px-4 py-3 text-foreground">80% da média</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">
                  De {formatarMoeda(SEGURO_FAIXA1_LIMITE + 0.01)} a{" "}
                  {formatarMoeda(SEGURO_FAIXA2_LIMITE)}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {formatarMoeda(SEGURO_FAIXA2_BASE)} + 50% do excedente sobre{" "}
                  {formatarMoeda(SEGURO_FAIXA1_LIMITE)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">
                  Acima de {formatarMoeda(SEGURO_FAIXA2_LIMITE)}
                </td>
                <td className="px-4 py-3 text-foreground">
                  Teto de {formatarMoeda(SEGURO_TETO)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong className="text-foreground">Piso:</strong>{" "}
          {formatarMoeda(SEGURO_PISO)} (salário mínimo).{" "}
          <strong className="text-foreground">Teto:</strong>{" "}
          {formatarMoeda(SEGURO_TETO)}. O benefício não entra no líquido da
          rescisão — é solicitado separadamente após a demissão sem justa causa.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              Quem tem direito ao seguro-desemprego?
            </dt>
            <dd>
              Trabalhador dispensado sem justa causa, desempregado no pedido, sem
              renda própria suficiente e com tempo mínimo de vínculo. Pedido de
              demissão, justa causa e acordo (art. 484-A) não geram direito.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Quantas parcelas posso receber?
            </dt>
            <dd>
              De 3 a 5 mensais, conforme meses trabalhados nos 36 meses
              anteriores à dispensa e se é a 1ª, 2ª ou 3ª+ solicitação. Use a
              calculadora para estimar.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Esta tabela substitui o MTE?
            </dt>
            <dd>
              Não. É material informativo com base na tabela vigente. O MTE
              analisa vínculos, renda e benefícios anteriores na concessão
              oficial.
            </dd>
          </div>
        </dl>
      </section>

      <TabelasRelacionadas slugAtual="seguro-desemprego" />
    </main>
  );
}
