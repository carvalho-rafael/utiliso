"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import { CalculadoraResultadoAviso } from "../../components/calculadora-resultado-aviso";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import {
  aliquotasEfetivasParaRegime,
  calcularIbsCbs,
  formatarAliquotaTributo,
  IBS_CBS_ANO,
  type IbsCbsResultado,
  type RegimeIbsCbs,
} from "../../lib/calculadoras/ibs-cbs";
import { montarTextoResultado } from "../../lib/calculadoras/resultado-texto";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario = "valorOperacao";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

const REGIMES: { value: RegimeIbsCbs; label: string; hint: string }[] = [
  {
    value: "integral",
    label: "Tributação integral (padrão)",
    hint: "Alíquotas de teste integrais de 2026.",
  },
  {
    value: "reducao60",
    label: "Redução de 60%",
    hint: "Ex.: saúde e educação (LC 214/2025, art. 128).",
  },
  {
    value: "reducao30",
    label: "Redução de 30%",
    hint: "Ex.: profissionais de conselho (LC 214/2025, art. 127).",
  },
  {
    value: "zero",
    label: "Alíquota zero",
    hint: "Ex.: itens da cesta básica (LC 214/2025, art. 125).",
  },
];

function montarTextoIbsCbs(resultado: IbsCbsResultado): string {
  return montarTextoResultado({
    tituloCalculadora: "Calculadora de IBS e CBS",
    path: "/calculadoras/ibs-cbs",
    secoes: [
      {
        titulo: "Operação",
        linhas: [
          {
            label: "Valor da operação (sem IBS/CBS)",
            valor: formatarMoeda(resultado.valorOperacao),
          },
        ],
      },
      {
        titulo: "Tributos (2026)",
        linhas: resultado.tributos.map((linha) => ({
          label: `${linha.label} (${formatarAliquotaTributo(linha.aliquota)})`,
          valor: formatarMoeda(linha.valor),
        })),
      },
      {
        titulo: "Totais",
        linhas: [
          {
            label: "Total de tributos",
            valor: formatarMoeda(resultado.totalTributos),
          },
        ],
      },
    ],
    destaque: {
      label: "Valor da operação + tributos",
      valor: formatarMoeda(resultado.totalComTributos),
    },
    paragrafos: [
      `Alíquotas aplicadas: CBS ${formatarAliquotaTributo(resultado.aliquotaCbs)}, IBS UF ${formatarAliquotaTributo(resultado.aliquotaIbsUf)}, IBS municipal ${formatarAliquotaTributo(resultado.aliquotaIbsMun)}.`,
    ],
  });
}

const LINHAS_ALIQUOTA = [
  { chave: "aliquotaCbs" as const, label: "CBS" },
  { chave: "aliquotaIbsUf" as const, label: "IBS estadual (UF)" },
  { chave: "aliquotaIbsMun" as const, label: "IBS municipal" },
];

function AliquotasAplicadas({
  aliquotas,
  id,
}: {
  aliquotas: ReturnType<typeof aliquotasEfetivasParaRegime>;
  id?: string;
}) {
  return (
    <ul
      id={id}
      className="mt-2 flex flex-col gap-1.5 text-sm text-foreground"
    >
      {LINHAS_ALIQUOTA.map((linha) => (
        <li key={linha.chave} className="flex justify-between gap-4">
          <span className="text-muted">{linha.label}</span>
          <span className="font-medium tabular-nums">
            {formatarAliquotaTributo(aliquotas[linha.chave])}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function IbsCbsForm() {
  const [valorOperacao, setValorOperacao] = useState("R$ 1.000,00");
  const [regime, setRegime] = useState<RegimeIbsCbs>("integral");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<IbsCbsResultado | null>(null);
  const aliquotasRegime = useMemo(
    () => aliquotasEfetivasParaRegime(regime),
    [regime],
  );

  function campoComErro(campo: CampoFormulario) {
    return camposErro.includes(campo);
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

    const valor = parseMoeda(valorOperacao);
    if (valor <= 0) {
      setErro("Informe um valor da operação válido.");
      setCamposErro(["valorOperacao"]);
      setResultado(null);
      return;
    }

    setResultado(
      calcularIbsCbs({
        valorOperacao: valor,
        regime,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        aria-labelledby="ibs-cbs-aliquotas"
        className="rounded-lg border border-border bg-surface p-4"
      >
        <h2
          id="ibs-cbs-aliquotas"
          className="text-sm font-medium text-foreground"
        >
          Alíquotas de teste ({IBS_CBS_ANO})
        </h2>
        <p className="mt-1 text-xs text-muted">
          Nominais fixadas na LC 214/2025 (arts. 343 e 346). Ajustadas pelo
          regime escolhido abaixo.{" "}
          <Link
            href="/tabelas/ibs-cbs"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            Ver tabela
          </Link>
          .
        </p>
        <AliquotasAplicadas
          id="ibs-cbs-aliquotas-lista"
          aliquotas={aliquotasRegime}
        />
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Valor da operação (sem IBS/CBS)
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={valorOperacao}
            onChange={(event) => {
              setValorOperacao(formatarMoedaInput(event.target.value));
              limparResultado();
            }}
            className={classeCampo(campoComErro("valorOperacao"))}
            placeholder="R$ 0,00"
            aria-invalid={campoComErro("valorOperacao")}
            aria-describedby={erro ? "ibs-cbs-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Base de cálculo por fora — o tributo não integra o próprio valor
            (LC 214/2025, art. 12, § 2º, I).
          </span>
        </label>

        <fieldset
          className="flex flex-col gap-3"
          aria-describedby="ibs-cbs-aliquotas-lista"
        >
          <legend className="text-sm font-medium text-foreground">
            Regime de tributação
          </legend>
          {REGIMES.map((opcao) => (
            <label
              key={opcao.value}
              className="flex cursor-pointer gap-3 rounded-lg border border-border bg-surface p-3 has-checked:border-accent has-checked:ring-2 has-checked:ring-accent/30"
            >
              <input
                type="radio"
                name="regime"
                value={opcao.value}
                checked={regime === opcao.value}
                onChange={() => {
                  setRegime(opcao.value);
                  limparResultado();
                }}
                className="mt-1 cursor-pointer accent-accent"
              />
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  {opcao.label}
                </span>
                <span className="text-xs text-muted">{opcao.hint}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {erro && (
          <p id="ibs-cbs-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular IBS e CBS
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado de IBS e CBS"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso
              ano={resultado.ano}
              variant="ibs-cbs"
            />
          </div>

          <p className="rounded-lg border border-border bg-background p-3 text-sm text-muted">
            Em 2026, IBS e CBS são{" "}
            <strong className="font-medium text-foreground">
              destacados de forma informativa
            </strong>{" "}
            na transição. O recolhimento fica dispensado se as obrigações
            acessórias forem cumpridas (LC 214/2025, art. 348, § 1º).
          </p>

          <div>
            <h3 className="text-sm font-medium text-highlight">Tributos</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {resultado.tributos.map((linha) => (
                <li
                  key={linha.label}
                  className="flex justify-between gap-4 text-sm text-foreground"
                >
                  <span className="text-muted">
                    {linha.label}{" "}
                    <span className="text-foreground">
                      ({formatarAliquotaTributo(linha.aliquota)})
                    </span>
                  </span>
                  <span className="tabular-nums">{formatarMoeda(linha.valor)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Valor da operação</span>
              <span>{formatarMoeda(resultado.valorOperacao)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted">
              <span>Total de tributos</span>
              <span>{formatarMoeda(resultado.totalTributos)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Operação + tributos</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.totalComTributos)}
              </span>
            </div>
          </div>

          <CalculadoraResultadoAcoes texto={montarTextoIbsCbs(resultado)} />
        </section>
      )}
    </div>
  );
}
