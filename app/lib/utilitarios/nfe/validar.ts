import "server-only";

import fs from "node:fs";
import path from "node:path";
import libxmljs from "libxmljs2";
import {
  detectarRaizNfePorNome,
  type RaizNfeDetectada,
} from "./detectar-raiz";
import {
  LABEL_POR_RAIZ,
  NFE_XML_MAX_BYTES,
  NFE_XSD_PACOTE,
  SCHEMA_POR_RAIZ,
} from "./constants";
import type { ValidacaoNfeErro, ValidacaoNfeResultado } from "./validar-types";

export type { ValidacaoNfeErro, ValidacaoNfeResultado } from "./validar-types";

function diretorioSchemas(): string {
  return path.join(
    process.cwd(),
    "app/lib/utilitarios/nfe/xsd",
    NFE_XSD_PACOTE,
  );
}

function formatarErroLibxml(error: libxmljs.ValidationError): ValidacaoNfeErro {
  const mensagem = error.message?.trim() || String(error);
  const linha = error.line ?? undefined;
  const coluna = error.column ?? undefined;
  return {
    mensagem,
    linha: linha && linha > 0 ? linha : undefined,
    coluna: coluna && coluna > 0 ? coluna : undefined,
  };
}

function detectarRaizDocumento(doc: libxmljs.Document): RaizNfeDetectada | null {
  const root = doc.root();
  if (!root) return null;
  const localName = root.name() ?? "";
  const namespaceUri = root.namespace()?.href();
  return detectarRaizNfePorNome(localName, namespaceUri);
}

function carregarSchema(xsdFileName: string): libxmljs.Document {
  const dir = diretorioSchemas();
  const xsdPath = path.join(dir, xsdFileName);
  if (!fs.existsSync(xsdPath)) {
    throw new Error(`Schema não encontrado: ${xsdFileName}`);
  }
  const xsdContent = fs.readFileSync(xsdPath, "utf8");
  const baseUrl = `${dir}${path.sep}`;
  return libxmljs.parseXml(xsdContent, { baseUrl });
}

export function validarXmlNfe(xml: string): ValidacaoNfeResultado {
  const pacote = NFE_XSD_PACOTE;
  const trimmed = xml.trim();

  if (!trimmed) {
    return {
      ok: false,
      pacote,
      erros: [{ mensagem: "Informe o conteúdo XML da NF-e." }],
    };
  }

  const bytes = Buffer.byteLength(trimmed, "utf8");
  if (bytes > NFE_XML_MAX_BYTES) {
    return {
      ok: false,
      pacote,
      erros: [
        {
          mensagem: `O XML excede o limite de ${Math.round(
            NFE_XML_MAX_BYTES / (1024 * 1024),
          )} MB.`,
        },
      ],
    };
  }

  let doc: libxmljs.Document;
  try {
    doc = libxmljs.parseXml(trimmed);
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "XML malformado ou inválido.";
    return {
      ok: false,
      pacote,
      erros: [{ mensagem }],
    };
  }

  const raiz = detectarRaizDocumento(doc);
  if (!raiz) {
    const nomes = Object.keys(SCHEMA_POR_RAIZ)
      .map((nome) => `<${nome}>`)
      .join(", ");
    return {
      ok: false,
      pacote,
      erros: [
        {
          mensagem: `Elemento raiz não reconhecido. Envie XML com raiz ${nomes} no namespace da NF-e.`,
        },
      ],
    };
  }

  let schemaDoc: libxmljs.Document;
  try {
    schemaDoc = carregarSchema(raiz.schema);
  } catch (error) {
    const mensagem =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar o schema XSD.";
    return {
      ok: false,
      tipo: raiz.tipo,
      tipoLabel: raiz.label,
      schema: raiz.schema,
      pacote,
      erros: [{ mensagem }],
    };
  }

  const valido = doc.validate(schemaDoc);
  if (valido) {
    return {
      ok: true,
      tipo: raiz.tipo,
      tipoLabel: LABEL_POR_RAIZ[raiz.tipo],
      schema: raiz.schema,
      pacote,
    };
  }

  const erros = (doc.validationErrors ?? []).map(formatarErroLibxml);
  if (erros.length === 0) {
    erros.push({ mensagem: "O XML não passou na validação do schema." });
  }

  return {
    ok: false,
    tipo: raiz.tipo,
    tipoLabel: raiz.label,
    schema: raiz.schema,
    pacote,
    erros,
  };
}
