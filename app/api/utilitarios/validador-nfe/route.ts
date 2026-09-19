import { validarXmlNfe } from "../../../lib/utilitarios/nfe/validar";

export const runtime = "nodejs";

type Body = {
  xml?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json(
      { ok: false, erros: [{ mensagem: "Corpo da requisição inválido." }] },
      { status: 400 },
    );
  }

  if (!body.xml || typeof body.xml !== "string") {
    return Response.json(
      { ok: false, erros: [{ mensagem: "Campo xml é obrigatório." }] },
      { status: 400 },
    );
  }

  const resultado = validarXmlNfe(body.xml);
  return Response.json(resultado);
}
