"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  avosDecimoTerceiroNoAno,
  calcularDecimoTerceiro,
} from "../lib/calculadoras/decimo-terceiro";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../lib/calculadoras/format";
import {
  formatarDataInput,
  parseDataInput,
} from "../lib/calculadoras/rescisao";
import { TABELAS_ANO } from "../lib/calculadoras/tabelas-2026";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const ADMISSAO_INICIAL = `01/01/${TABELAS_ANO}`;

type DestaqueParcela = "primeira" | "segunda";

type DecimoParcelaExemploProps = {
  destaque: DestaqueParcela;
};

export function DecimoParcelaExemplo({ destaque }: DecimoParcelaExemploProps) {
  const [salarioTexto, setSalarioTexto] = useState("R$ 3.000,00");
  const [admissaoTexto, setAdmissaoTexto] = useState(ADMISSAO_INICIAL);
  const salario = parseMoeda(salarioTexto);
  const admissao = parseDataInput(admissaoTexto);
  const salarioValido = salario > 0;
  const avos =
    admissao === null ? null : avosDecimoTerceiroNoAno(admissao, TABELAS_ANO);
  const admissaoValida = avos !== null && avos > 0;

  const exemplo = useMemo(() => {
    if (!salarioValido || avos === null || avos <= 0) return null;
    return calcularDecimoTerceiro({
      salarioBruto: salario,
      mesesTrabalhados: avos,
      dependentes: 0,
    });
  }, [avos, salario, salarioValido]);

  const inss =
    exemplo?.descontos.find((linha) => linha.label === "INSS")?.valor ?? 0;
  const irrf =
    exemplo?.descontos.find((linha) => linha.label === "IRRF")?.valor ?? 0;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Salário bruto
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={salarioTexto}
            onChange={(event) =>
              setSalarioTexto(formatarMoedaInput(event.target.value))
            }
            className={fieldClass}
            placeholder="R$ 0,00"
            aria-invalid={!salarioValido}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Data de admissão
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={admissaoTexto}
            onChange={(event) =>
              setAdmissaoTexto(formatarDataInput(event.target.value))
            }
            className={fieldClass}
            placeholder="DD/MM/AAAA"
            aria-invalid={!admissaoValida}
            aria-describedby={`decimo-parcela-exemplo-admissao-ajuda-${destaque}`}
          />
          <span
            id={`decimo-parcela-exemplo-admissao-ajuda-${destaque}`}
            className="text-xs text-muted"
          >
            Contamos os avos de {TABELAS_ANO} a partir desta data. Só entra o
            mês com 15 dias ou mais de trabalho.
          </span>
        </label>
      </div>

      {!salarioValido || !admissaoValida ? (
        <p className="text-sm text-danger" role="alert">
          {!salarioValido
            ? "Informe um salário bruto válido."
            : admissao === null
              ? "Informe a data de admissão no formato DD/MM/AAAA."
              : `A data de admissão não gera avos de 13º em ${TABELAS_ANO}.`}
        </p>
      ) : exemplo ? (
        <div className="flex flex-col gap-3">
          {destaque === "primeira" ? (
            <>
              <ParcelaDestaque
                titulo="1ª parcela"
                valor={exemplo.primeiraParcela}
                detalhe="Sem INSS nem IRRF · até 30 de novembro"
                formula={`${formatarMoeda(salario)} × ${exemplo.avos}/12 = ${formatarMoeda(exemplo.bruto)} de 13º bruto → metade`}
              />
              <ParcelaSecundaria>
                2ª parcela (dezembro): {formatarMoeda(exemplo.segundaParcela)},
                já com os descontos. Tabelas de {TABELAS_ANO}.
              </ParcelaSecundaria>
            </>
          ) : (
            <>
              <ParcelaDestaque
                titulo="2ª parcela"
                valor={exemplo.segundaParcela}
                detalhe="Com INSS e IRRF · até 20 de dezembro"
                formula={`${formatarMoeda(exemplo.bruto)} − ${formatarMoeda(exemplo.primeiraParcela)} − INSS ${formatarMoeda(inss)}${irrf > 0 ? ` − IRRF ${formatarMoeda(irrf)}` : ""}`}
              />
              <ParcelaSecundaria>
                1ª parcela (até 30 de novembro):{" "}
                {formatarMoeda(exemplo.primeiraParcela)}, sem desconto. Tabelas
                de {TABELAS_ANO}.
              </ParcelaSecundaria>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function ParcelaDestaque({
  titulo,
  valor,
  detalhe,
  formula,
}: {
  titulo: string;
  valor: number;
  detalhe: string;
  formula: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm font-medium text-highlight">{titulo}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">
        {formatarMoeda(valor)}
      </p>
      <p className="mt-2 text-sm text-muted">{detalhe}</p>
      <p className="mt-3 text-xs text-muted">{formula}</p>
    </div>
  );
}

function ParcelaSecundaria({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border px-4 py-3">
      <p className="text-xs text-muted">{children}</p>
    </div>
  );
}
