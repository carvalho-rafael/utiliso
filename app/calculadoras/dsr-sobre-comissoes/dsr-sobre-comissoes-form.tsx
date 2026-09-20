"use client";

import { useState } from "react";
import Link from "next/link";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import { CalculadoraResultadoAviso } from "../../components/calculadora-resultado-aviso";
import {
  calcularDsrSobreComissoes,
  type DsrSobreComissoesResultado,
} from "../../lib/calculadoras/dsr-sobre-comissoes";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import {
  linhasMonetarias,
  montarTextoResultado,
} from "../../lib/calculadoras/resultado-texto";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

type CampoFormulario = "comissoesMes" | "diasUteis" | "diasDsr";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function DsrSobreComissoesForm() {
  const [comissoesMes, setComissoesMes] = useState("R$ 2.000,00");
  const [diasUteis, setDiasUteis] = useState("25");
  const [diasDsr, setDiasDsr] = useState("5");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<DsrSobreComissoesResultado | null>(
    null,
  );

  function campoComErro(campo: CampoFormulario) {
    return camposErro.includes(campo);
  }

  function reportarErro(mensagem: string, campos: CampoFormulario[]) {
    setErro(mensagem);
    setCamposErro(campos);
    setResultado(null);
  }

  function limparResultado() {
    setResultado(null);
    setErro(null);
    setCamposErro([]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const comissoes = parseMoeda(comissoesMes);
    const numUteis = Number.parseInt(diasUteis, 10);
    const numDsr = Number.parseInt(diasDsr, 10);

    if (comissoes <= 0) {
      reportarErro("Informe um total de comissões válido.", ["comissoesMes"]);
      return;
    }

    if (
      Number.isNaN(numUteis) ||
      numUteis < 1 ||
      !Number.isInteger(numUteis)
    ) {
      reportarErro("Informe dias úteis válidos (1 ou mais).", ["diasUteis"]);
      return;
    }

    if (
      Number.isNaN(numDsr) ||
      numDsr < 0 ||
      !Number.isInteger(numDsr)
    ) {
      reportarErro("Informe dias de DSR válidos (0 ou mais).", ["diasDsr"]);
      return;
    }

    setResultado(
      calcularDsrSobreComissoes({
        comissoesMes: comissoes,
        diasUteis: numUteis,
        diasDsr: numDsr,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Total de comissões no mês
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={comissoesMes}
            onChange={(event) => {
              setComissoesMes(formatarMoedaInput(event.target.value));
              limparResultado();
            }}
            className={classeCampo(campoComErro("comissoesMes"))}
            aria-invalid={campoComErro("comissoesMes")}
            aria-describedby={erro ? "dsr-comissoes-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Só a parte variável — não inclua salário fixo mensalista.
          </span>
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Dias úteis no mês
            </span>
            <input
              type="number"
              min={1}
              step={1}
              value={diasUteis}
              onChange={(event) => {
                setDiasUteis(event.target.value);
                limparResultado();
              }}
              className={`${classeCampo(campoComErro("diasUteis"))} max-w-[7rem]`}
              aria-invalid={campoComErro("diasUteis")}
              aria-describedby={erro ? "dsr-comissoes-erro" : undefined}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Dias de DSR (domingos e feriados)
            </span>
            <input
              type="number"
              min={0}
              step={1}
              value={diasDsr}
              onChange={(event) => {
                setDiasDsr(event.target.value);
                limparResultado();
              }}
              className={`${classeCampo(campoComErro("diasDsr"))} max-w-[7rem]`}
              aria-invalid={campoComErro("diasDsr")}
              aria-describedby={erro ? "dsr-comissoes-erro" : undefined}
            />
          </label>
        </div>
        <span className="text-xs text-muted">
          Em geral, sábados entram nos dias úteis. Feriado no domingo conta uma
          vez. Ajuste conforme o calendário e a convenção coletiva.
        </span>

        {erro && (
          <p
            id="dsr-comissoes-erro"
            className="text-sm text-danger"
            role="alert"
          >
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular DSR sobre comissões
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do DSR sobre comissões"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso variant="clt" />
          </div>

          <BreakdownGroup title="Referência" linhas={resultado.info} />
          <BreakdownGroup title="Proventos estimados" linhas={resultado.verbas} />

          <div className="border-t border-border pt-4">
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Comissões + DSR</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.totalComissoesMaisDsr)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              INSS e IRRF sobre o holerite inteiro não entram nesta conta — use
              a{" "}
              <Link href="/calculadoras/salario-liquido" className={linkClass}>
                calculadora de salário líquido
              </Link>
              .
            </p>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoResultado({
              tituloCalculadora: "Calculadora de DSR sobre comissões",
              path: "/calculadoras/dsr-sobre-comissoes",
              secoes: [
                {
                  titulo: "Referência",
                  linhas: linhasMonetarias(resultado.info),
                },
                {
                  titulo: "Proventos",
                  linhas: linhasMonetarias(resultado.verbas),
                },
              ],
              destaque: {
                label: "Comissões + DSR",
                valor: formatarMoeda(resultado.totalComissoesMaisDsr),
              },
            })}
          />
        </section>
      )}
    </div>
  );
}

function BreakdownGroup({
  title,
  linhas,
}: {
  title: string;
  linhas: { label: string; valor: number }[];
}) {
  if (linhas.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-highlight">{title}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {linhas.map((linha) => (
          <li
            key={linha.label}
            className="flex justify-between gap-4 text-sm text-foreground"
          >
            <span className="text-muted">{linha.label}</span>
            <span>{formatarMoeda(linha.valor)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
