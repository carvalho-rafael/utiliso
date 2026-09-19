import type { Metadata } from "next";
import Link from "next/link";
import { getUtilitarioBySlug } from "../../lib/utilitarios/catalog";
import { NFE_XSD_PACOTE } from "../../lib/utilitarios/nfe/constants";
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
          Validador de NF-e
        </h1>
        <p className="text-lg text-muted">
          Verifique se o XML da nota fiscal eletrônica está conforme o schema
          oficial (modelo 55, versão 4.00).
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
          <li>
            Assinatura digital, status na Sefaz e regras fiscais da operação
            ficam fora do escopo — apenas conformidade com o schema XSD.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Perguntas frequentes
        </h2>
        <dl className="space-y-3">
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
