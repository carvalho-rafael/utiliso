import type { Metadata } from "next";
import Link from "next/link";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import {
  NFE_NAMESPACE,
  NFE_XSD_PACOTE,
} from "../../lib/utilitarios/nfe/constants";
import { ValidadorNfeForm } from "./validador-nfe-form";

const utilitario = getUtilitarioBySlug("validador-nfe")!;

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: `${utilitario.title} — Utiliso`,
  description: utilitario.metaDescription,
};

export default function ValidadorNfePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Validador de XML NF-e
        </h1>
        <p className="text-lg text-muted">
          Valide gratuitamente o XML da Nota Fiscal Eletrônica contra o schema
          4.00 (modelo 55) e identifique erros de estrutura antes do envio.
        </p>
      </div>

      <ValidadorNfeForm />

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Como funciona
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            O validador lê o elemento raiz do XML e escolhe o XSD:{" "}
            <strong className="text-foreground">nfeProc</strong> (nota
            autorizada), <strong className="text-foreground">NFe</strong> (nota
            sem protocolo) ou <strong className="text-foreground">enviNFe</strong>{" "}
            (lote de envio).
          </li>
          <li>
            A validação usa o pacote{" "}
            <strong className="text-foreground">{NFE_XSD_PACOTE}</strong> da
            Sefaz, incluindo grupos de IBS/CBS da reforma tributária quando
            presentes no XML.
          </li>
          <li>
            O processamento ocorre no servidor só para esta requisição; o
            conteúdo do XML{" "}
            <strong className="text-foreground">não é salvo</strong> nem enviado
            ao Google Analytics.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          O que este validador verifica?
        </h2>
        <p>
          A conferência é estrutural: o XML precisa ser legível pelo parser e
          obedecer ao XSD oficial da NF-e modelo 55, versão 4.00, no pacote{" "}
          <strong className="text-foreground">{NFE_XSD_PACOTE}</strong>.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">XML bem formado</strong> — tags
            fechadas, encoding e sintaxe que permitam o parse do documento.
          </li>
          <li>
            <strong className="text-foreground">Estrutura do documento</strong>{" "}
            — raiz reconhecida:{" "}
            <code className="text-foreground">nfeProc</code>,{" "}
            <code className="text-foreground">NFe</code> ou{" "}
            <code className="text-foreground">enviNFe</code> no namespace da
            NF-e.
          </li>
          <li>
            <strong className="text-foreground">Schema NF-e 4.00</strong> —
            leiaute modelo 55 conforme o XSD selecionado para a raiz do arquivo.
          </li>
          <li>
            <strong className="text-foreground">
              Campos e tags incompatíveis com o XSD
            </strong>{" "}
            — obrigatórios ausentes, ordem incorreta, tipos inválidos, valores
            fora de enumerações permitidas e namespace divergente.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          O que este validador não verifica?
        </h2>
        <p>
          Passar no XSD é um passo antes do envio, mas não substitui os
          serviços da Sefaz nem a análise fiscal da operação. Itens abaixo
          ficam fora do escopo desta ferramenta.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Autorização da Sefaz</strong> —
            código de status (<code className="text-foreground">cStat</code>),
            protocolo de autorização ou rejeição após o envio do lote.
          </li>
          <li>
            <strong className="text-foreground">Situação fiscal da nota</strong>{" "}
            — consulta de situação, cancelamento, denegação ou eventos
            posteriores à emissão.
          </li>
          <li>
            <strong className="text-foreground">Assinatura digital</strong> —
            validade do certificado, integridade da assinatura XML ou cadeia de
            confiança.
          </li>
          <li>
            <strong className="text-foreground">Regras de negócio</strong> que
            o XSD não cobre — coerência CST × CFOP, totais da nota, duplicidade
            de chave, regras por UF ou validações do ambiente de autorização.
          </li>
          <li>
            <strong className="text-foreground">Outros documentos</strong> —
            NFC-e (modelo 65), carta de correção, inutilização de numeração e
            demais eventos com schemas próprios.
          </li>
        </ul>

        <h2
          id="falha-no-schema"
          className="text-base font-medium text-foreground"
        >
          Seu XML apresentou “Falha no Schema”?
        </h2>
        <p>
          Quando a Sefaz rejeita o envio por falha de schema, o XML não está
          conforme o XSD vigente — tags fora do leiaute, campos obrigatórios
          faltando ou tipos incorretos. Este validador reproduz a mesma
          conferência estrutural no pacote {NFE_XSD_PACOTE} para você corrigir o
          arquivo antes de transmitir de novo.
        </p>
        <p className="font-medium text-foreground">Algumas falhas comuns:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <code className="text-foreground">
              Rejeição 215: Falha no Schema XML
            </code>{" "}
            (ou <code className="text-foreground">cStat 215</code>) — retorno
            genérico da Sefaz quando o XSD falha; a mensagem não indica a tag.
            Cole o XML aqui para ver o erro com linha antes de retransmitir.
          </li>
          <li>
            <code className="text-foreground">
              Opening and ending tag mismatch
            </code>{" "}
            ou{" "}
            <code className="text-foreground">
              Premature end of data in tag
            </code>{" "}
            — XML malformado: tag não fechada, arquivo cortado ou encoding
            incompatível.
          </li>
          <li>
            <code className="text-foreground">
              Elemento raiz não reconhecido
            </code>{" "}
            — o arquivo não começa com{" "}
            <code className="text-foreground">nfeProc</code>,{" "}
            <code className="text-foreground">NFe</code> ou{" "}
            <code className="text-foreground">enviNFe</code> no namespace da
            NF-e.
          </li>
          <li>
            <code className="text-foreground">This element is not expected</code>{" "}
            — tag fora de ordem, nome errado ou pacote XSD desatualizado. Na
            reforma tributária é comum ver{" "}
            <code className="break-all text-foreground">
              {`Element '{${NFE_NAMESPACE}}IBSCBS': This element is not expected`}
            </code>{" "}
            ou, em validadores .NET/ACBr,{" "}
            <code className="text-foreground">
              invalid child element &apos;IBSCBS&apos;
            </code>{" "}
            com{" "}
            <code className="text-foreground">
              List of possible elements expected: &apos;COFINSST, ICMSUFDest&apos;
            </code>
            . Confira o pacote {NFE_XSD_PACOTE} e o{" "}
            <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
              guia IBS e CBS na NF-e em 2026
            </Link>
            .
          </li>
          <li>
            <code className="text-foreground">
              [facet &apos;pattern&apos;] The value &apos;…&apos; is not
              accepted by the pattern
            </code>{" "}
            — formato inválido (por exemplo o{" "}
            <code className="text-foreground">Id</code> de{" "}
            <code className="text-foreground">infNFe</code> fora do padrão{" "}
            <code className="text-foreground">NFe</code> + 44 dígitos) ou{" "}
            <code className="text-foreground">
              … is not a valid value of the atomic type
            </code>{" "}
            (decimal com vírgula, data fora do padrão).
          </li>
          <li>
            <code className="text-foreground">
              Missing child element(s). Expected is ( … )
            </code>{" "}
            — grupo ou campo obrigatório ausente no leiaute 4.00.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-foreground">
              O que significa “Falha no Schema” na Sefaz?
            </dt>
            <dd>
              É a rejeição porque o XML não obedece ao XSD da NF-e na versão
              exigida no ambiente de autorização. Não indica sozinho qual tag
              está errada — use o resultado deste validador (mensagem e linha do
              erro) e a seção{" "}
              <a href="#falha-no-schema" className={linkClass}>
                Falha no Schema
              </a>{" "}
              acima para orientar a correção no ERP ou no emissor.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Valida NFC-e (cupom fiscal)?
            </dt>
            <dd>
              Não nesta versão. O pacote atual é de NF-e modelo 55. NFC-e exige
              outro conjunto de schemas.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              XML válido aqui garante autorização na Sefaz?
            </dt>
            <dd>
              Não. A Sefaz aplica validações adicionais (certificado, duplicidade,
              regras por UF, etc.). Este utilitário ajuda a corrigir erros de
              leiaute antes do envio.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Por que meu ERP diz que está certo e aqui falha?
            </dt>
            <dd>
              Versões de schema, namespace ou raiz diferente (por exemplo enviar{" "}
              <code className="text-foreground">NFe</code> quando o arquivo é um{" "}
              <code className="text-foreground">nfeProc</code>) geram resultados
              distintos. Confira o pacote {NFE_XSD_PACOTE} e a NT em vigor.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Meus dados ficam no Utiliso?
            </dt>
            <dd>
              O XML é usado só para validar na hora e descartado. Evite colar
              notas com dados sensíveis em ambientes compartilhados; prefira
              arquivos de homologação quando possível.
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted">Links relacionados:</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guias/ibs-cbs-nfe-2026" className={linkClass}>
            IBS e CBS na NF-e em 2026
          </Link>
          <Link href="/guias/ibs-e-cbs" className={linkClass}>
            O que são IBS e CBS
          </Link>
          <Link href="/calculadoras/ibs-cbs" className={linkClass}>
            Calculadora de IBS e CBS
          </Link>
          <Link href="/utilitarios" className={linkClass}>
            Todos os utilitários
          </Link>
        </div>
      </div>
    </main>
  );
}
