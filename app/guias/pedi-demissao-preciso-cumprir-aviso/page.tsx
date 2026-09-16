import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialFonte,
  EditorialMeta,
} from "../../components/tabela-meta";
import { getGuiaBySlug } from "../../lib/guias/catalog";

const guia = getGuiaBySlug("pedi-demissao-preciso-cumprir-aviso")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Pedi demissão: preciso cumprir o aviso prévio? — Utiliso",
  description: guia.metaDescription,
};

export default function PediDemissaoAvisoGuiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Pedi demissão: preciso cumprir aviso?
        </h1>
        <p className="text-lg text-muted">
          Entenda os 30 dias, quando a empresa pode dispensar o cumprimento e o
          desconto se você não trabalhar o aviso.
        </p>
        <EditorialMeta conteudo={guia} />
      </div>

      <aside
        aria-label="Calculadora de rescisão"
        className="rounded-lg border border-border bg-surface p-6"
      >
        <h2 className="text-base font-medium text-foreground">
          Estime o desconto do aviso
        </h2>
        <p className="mt-2 text-sm text-muted">
          Na calculadora, use o motivo “pedido de demissão” e escolha se o
          aviso será trabalhado, parcial ou não cumprido.
        </p>
        <Link
          href="/calculadoras/rescisao"
          className="mt-4 inline-flex cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular rescisão
        </Link>
      </aside>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Sim, em regra
        </h2>
        <p>
          Quem pede demissão deve comunicar o empregador com{" "}
          <strong className="text-foreground">30 dias</strong> de antecedência
          (CLT art. 487). Esse prazo é do empregado: não aumenta com o tempo de
          casa. Os acréscimos de 3 dias por ano (até 90) valem só quando a
          empresa dispensa, pela Lei 12.506/2011.
        </p>
        <p>
          A empresa{" "}
          <strong className="text-foreground">não é obrigada</strong> a abrir
          mão do aviso. Se ela dispensar, você sai na hora, sem desconto. Se
          você não cumprir e ela não dispensar, pode haver desconto de até 30
          dias de salário (art. 487, § 2º).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Os três caminhos
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Trabalhado:</strong> você
            cumpre os 30 dias (ou os dias combinados). O salário entra no
            holerite. O contrato segue até o último dia, e o prazo de 10 dias
            para pagar a rescisão conta a partir daí (CLT art. 477, § 6º).
            Esses dias projetam 13º e férias.
          </li>
          <li>
            <strong className="text-foreground">Dispensado pela empresa:</strong>{" "}
            o empregador abre mão do cumprimento. Você sai na comunicação,{" "}
            <strong className="text-foreground">sem desconto</strong>. O
            contrato não se projeta pelos 30 dias. Combine por escrito.
          </li>
          <li>
            <strong className="text-foreground">Não cumprido</strong> (total ou
            parcial): a empresa pode descontar os dias que faltaram, até o
            equivalente a 30 dias de salário. O contrato encerra na
            comunicação, sem projetar 13º e férias pelos dias não trabalhados.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          “Indenizado” no pedido não é dinheiro a receber
        </h2>
        <p>
          Na{" "}
          <Link href="/calculadoras/rescisao" className={linkClass}>
            calculadora de rescisão
          </Link>
          , o campo “indenizado” muda de sentido conforme o motivo:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            No pedido, indenizado é o aviso{" "}
            <strong className="text-foreground">não trabalhado</strong>: entra
            como desconto, não como verba.
          </li>
          <li>
            Na{" "}
            <Link
              href="/guias/demissao-sem-justa-causa-o-que-recebo"
              className={linkClass}
            >
              demissão sem justa causa
            </Link>
            , indenizado é o que a empresa paga pelos dias de aviso.
          </li>
        </ul>
        <p>
          Se você trabalhar só parte dos 30 dias, a calculadora desconta o
          restante. Marque “trabalhado” e informe quantos dias de fato
          trabalhou. Se a empresa dispensar o cumprimento, não use
          “indenizado”: essa opção assume aviso não cumprido e aplica o
          desconto.
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que muda no acerto
        </h2>
        <p>
          O aviso do pedido não vira verba a receber. Ele altera o líquido se
          houver desconto, e pode alterar 13º e férias se o contrato for
          projetado:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Desconto:</strong> até 30 dias,
            só se o aviso não foi cumprido e a empresa não dispensou;
          </li>
          <li>
            <strong className="text-foreground">Projeção:</strong> aviso
            trabalhado conta os dias efetivos para 13º e férias. Aviso não
            cumprido não projeta. Veja o{" "}
            <Link href="/guias/ferias-proporcionais" className={linkClass}>
              guia de férias proporcionais
            </Link>
            ;
          </li>
          <li>
            <strong className="text-foreground">Prazo de pagamento:</strong> 10
            dias corridos após o término. Com aviso trabalhado, conta do último
            dia. Sem cumprimento ou com dispensa da empresa, conta da
            comunicação.
          </li>
        </ul>
        <p>
          Saldo, 13º, férias e o que fica de fora (FGTS, seguro) estão no{" "}
          <Link
            href="/guias/pedido-de-demissao-o-que-recebo"
            className={linkClass}
          >
            guia do pedido de demissão
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que o aviso do pedido não dá
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Não há saque do FGTS nem multa de 40% só porque você pediu as
            contas;
          </li>
          <li>
            Não há{" "}
            <Link href="/guias/seguro-desemprego" className={linkClass}>
              seguro-desemprego
            </Link>
            ;
          </li>
          <li>
            A redução de 2 horas por dia ou 7 dias corridos no aviso (CLT art.
            488) é para procurar outro emprego quando a{" "}
            <strong className="text-foreground">empresa</strong> dispensa. No
            pedido, em regra, não se aplica.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              A empresa é obrigada a me dispensar do aviso?
            </dt>
            <dd>
              Não. O art. 487 dá a ela o direito de exigir os 30 dias ou de
              descontar se você não cumprir. A dispensa é uma faculdade do
              empregador. Peça por escrito se quiser sair na hora.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Posso cumprir só alguns dias?
            </dt>
            <dd>
              Sim, se a empresa aceitar. Os dias não trabalhados podem ser
              descontados, até o limite de 30. Na calculadora, escolha aviso
              trabalhado e informe quantos dias você de fato trabalhou.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Tempo de casa aumenta o meu aviso?
            </dt>
            <dd>
              Não. No pedido o prazo é 30 dias, independentemente dos anos de
              contrato. O acréscimo de 3 dias por ano (Lei 12.506/2011) vale só
              na dispensa pelo empregador.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Pedido de demissão é a mesma coisa que acordo (art. 484-A)?
            </dt>
            <dd>
              Não. No acordo as partes combinam o fim do contrato: o aviso
              indenizado é pela metade, há multa FGTS de 20% e saque de até 80%
              do saldo, sem seguro-desemprego. No pedido o aviso de 30 dias é
              obrigação sua, sem multa nem saque.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Estabilidade, contrato a prazo ou cargo de confiança mudam a
              regra?
            </dt>
            <dd>
              Podem mudar. Este guia cobre o contrato por prazo indeterminado
              sem estabilidade. Gestante, cipeiro, contrato determinado (CLT
              arts. 479 e 480) e convenção coletiva pedem o departamento
              pessoal ou um advogado.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Este guia substitui o DP ou um advogado?
            </dt>
            <dd>
              Não. É material informativo alinhado à calculadora de rescisão.
              Convenção coletiva e o caso concreto podem alterar o desconto e
              as datas.
            </dd>
          </div>
        </dl>

        <EditorialFonte conteudo={guia} />
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Ferramentas relacionadas:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/calculadoras/rescisao" className={linkClass}>
            Calculadora de rescisão
          </Link>
          <Link
            href="/guias/pedido-de-demissao-o-que-recebo"
            className={linkClass}
          >
            Pedido de demissão: o que recebo?
          </Link>
          <Link href="/guias/ferias-proporcionais" className={linkClass}>
            Férias proporcionais na rescisão
          </Link>
          <Link
            href="/guias/demissao-sem-justa-causa-o-que-recebo"
            className={linkClass}
          >
            Demissão sem justa causa: o que recebo?
          </Link>
          <Link href="/guias/seguro-desemprego" className={linkClass}>
            Guia de seguro-desemprego
          </Link>
        </div>
      </div>
    </main>
  );
}
