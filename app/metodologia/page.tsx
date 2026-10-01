import type { Metadata } from "next";
import Link from "next/link";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Metodologia — Utiliso",
  description:
    "Como o Utiliso escolhe fontes oficiais, testa calculadoras, arredonda valores, atualiza tabelas e trata privacidade. Limites dos resultados e histórico das regras vigentes.",
};

export default function MetodologiaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Metodologia
        </h1>
        <p className="text-lg text-muted">
          Como montamos as ferramentas, de onde vêm os números e o que fica de
          fora do resultado.
        </p>
        <p className="text-sm text-muted">Última atualização: setembro de 2026.</p>
      </div>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como escolhemos fontes
        </h2>
        <p>
          Usamos atos oficiais publicados pelo governo: Planalto (CLT, leis e
          decretos), Receita Federal (IRRF), portarias interministeriais (INSS),
          MTE/CODEFAT (seguro-desemprego) e a Lei Complementar nº 214/2025 (IBS
          e CBS). Cada{" "}
          <Link href="/tabelas" className={linkClass}>
            tabela
          </Link>{" "}
          e guia YMYL exibe vigência (quando a norma passou a valer), data de
          revisão editorial e bloco Fonte.
        </p>
        <p>
          Não publicamos alíquotas plenas futuras de CBS ou IBS sem resolução do
          Senado (ADCT art. 130). A calculadora de IBS/CBS de {TABELAS_ANO}{" "}
          reflete só as alíquotas de teste da transição.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como as calculadoras são testadas
        </h2>
        <p>
          Parte dos motores de cálculo tem testes automatizados (Vitest,{" "}
          <code className="rounded bg-surface px-1 py-0.5 text-foreground">
            npm test
          </code>
          ): cenário fixo de entrada e valores esperados em centavos, como hora
          extra, 13º, desconto por falta, adicional noturno, sobreaviso, DSR
          sobre comissões, dias trabalhados, IBS/CBS e crédito IBS/CBS.
        </p>
        <p>
          Isso trava o comportamento numérico do motor quando mudamos código ou
          tabela. Não substitui auditoria jurídica nem revisão de contador ou
          departamento pessoal. Rescisão, salário líquido, férias e
          seguro-desemprego ainda não têm arquivo de teste dedicado; o
          comportamento segue a CLT e as constantes compartilhadas de INSS e
          IRRF.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como tratamos arredondamento
        </h2>
        <p>
          Valores monetários passam pela função{" "}
          <code className="rounded bg-surface px-1 py-0.5 text-foreground">
            round2
          </code>{" "}
          (
          <code className="rounded bg-surface px-1 py-0.5 text-foreground">
            Math.round(valor × 100) / 100
          </code>
          ) em passos intermediários: hora normal, verbas, INSS, IRRF e totais,
          não só no líquido final. Para valores positivos, meio centavo arredonda
          para cima.
        </p>
        <p>
          Um sistema que arredonda uma única vez no fim pode dar centavos
          diferentes do Utiliso. Isso é esperado quando a folha real também
          arredonda por etapa.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como atualizamos tabelas
        </h2>
        <p>
          Os números usados nas calculadoras vêm de uma fonte só no código
          (INSS, IRRF, salário mínimo e seguro-desemprego). As
          páginas em{" "}
          <Link href="/tabelas" className={linkClass}>
            /tabelas
          </Link>{" "}
          leem as mesmas constantes — não duplicamos faixa na página.
        </p>
        <p>
          <strong className="text-foreground">Vigência</strong> é quando a
          tabela do governo passou a valer.{" "}
          <strong className="text-foreground">Atualizado em</strong> é quando
          revisamos a página no site; mudamos essa data só se alterarmos número,
          fonte ou texto relevante,
          não a cada deploy. O ano aparece no título; a URL permanece estável
          (por exemplo{" "}
          <Link href="/tabelas/inss" className={linkClass}>
            /tabelas/inss
          </Link>
          , não{" "}
          <span className="text-foreground">/tabelas/inss-2026</span>).
        </p>

        <h2 className="text-base font-medium text-foreground">
          O que os resultados não consideram
        </h2>
        <p>
          Toda calculadora devolve estimativa para o cenário que você informou.
          Acordo coletivo, média de variáveis, convenções internas e o caso
          concreto podem mudar o valor real.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">FGTS</strong> (8%): referência
            depositada pelo empregador; não entra no líquido. Saque e multa de
            40% na rescisão também ficam fora do líquido.
          </li>
          <li>
            <strong className="text-foreground">Seguro-desemprego</strong>: pode
            ter direito na demissão sem justa causa, mas o benefício não entra
            no líquido da rescisão.
          </li>
          <li>
            <Link href="/calculadoras/desconto-por-falta" className={linkClass}>
              Desconto por falta
            </Link>{" "}
            e{" "}
            <Link
              href="/calculadoras/dsr-sobre-comissoes"
              className={linkClass}
            >
              DSR sobre comissões
            </Link>
            : não calculam INSS nem IRRF sobre o holerite inteiro.
          </li>
          <li>
            <Link
              href="/calculadoras/adicional-noturno"
              className={linkClass}
            >
              Adicional noturno
            </Link>
            : hora extra noturna fica fora — use a calculadora de hora extra.
          </li>
          <li>
            <Link href="/calculadoras/sobreaviso" className={linkClass}>
              Sobreaviso
            </Link>
            : horas efetivamente trabalhadas no chamado não entram no motor.
          </li>
          <li>
            <Link href="/calculadoras/ibs-cbs" className={linkClass}>
              IBS/CBS
            </Link>{" "}
            ({TABELAS_ANO}): alíquotas de teste; sem crédito, NCM ou split
            payment na calculadora simples.
          </li>
          <li>
            <Link href="/utilitarios/validador-nfe" className={linkClass}>
              Validador de NF-e
            </Link>
            : confere o XSD; não garante autorização na Sefaz.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Privacidade e processamento local
        </h2>
        <p>
          Calculadoras, guias e tabelas no navegador: salário, datas e demais
          campos do formulário{" "}
          <strong className="text-foreground">não são enviados</strong> aos
          nossos servidores nem ao Google Analytics. O cálculo roda no seu
          dispositivo.
        </p>
        <p>
          Exceção: o XML colado ou enviado ao validador de NF-e sobe ao servidor
          só para validar o schema oficial da Sefaz, naquela requisição, sem
          gravação em banco. Cookies de medição, anúncios e Consent Mode estão
          na{" "}
          <Link href="/privacidade" className={linkClass}>
            política de privacidade
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Histórico de versões das regras
        </h2>
        <p>
          Registramos aqui mudanças relevantes no pacote de regras e tabelas
          que alimentam o site. Ao publicar nova vigência, atualizamos também a
          data de revisão editorial da tabela ou guia correspondente.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">12/09/2026</strong> — Revisão
            editorial das tabelas de trabalho (INSS, IRRF, salário mínimo,
            seguro-desemprego) alinhadas a janeiro de {TABELAS_ANO}.
          </li>
          <li>
            <strong className="text-foreground">18/09/2026</strong> — Revisão
            editorial da tabela de alíquotas de teste de IBS e CBS (fatos
            geradores de {TABELAS_ANO}, LC 214/2025, arts. 343 a 346).
          </li>
        </ul>
        <p className="text-muted">
          Vigência oficial em vigor neste pacote: INSS e IRRF e salário mínimo a
          partir de janeiro de {TABELAS_ANO}; seguro-desemprego a partir de 11
          de janeiro de {TABELAS_ANO}; IBS/CBS de teste para fatos geradores de
          1º de janeiro a 31 de dezembro de {TABELAS_ANO}.
        </p>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/sobre" className={linkClass}>
          Sobre o Utiliso
        </Link>
        <Link href="/privacidade" className={linkClass}>
          Privacidade
        </Link>
        <Link href="/tabelas" className={linkClass}>
          Ver tabelas
        </Link>
      </div>
    </main>
  );
}
