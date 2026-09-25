"use client";

import { useState } from "react";
import Link from "next/link";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import {
  ADICIONAL_NOTURNO_RURAL_MINIMO,
  ADICIONAL_NOTURNO_URBANO_MINIMO,
  calcularAdicionalNoturno,
  pisoAdicionalNoturno,
  type AdicionalNoturnoResultado,
  type CategoriaNoturna,
} from "../../lib/calculadoras/adicional-noturno";
import { JORNADAS } from "../../lib/calculadoras/hora-extra";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import { montarTextoBreakdownCalculadora } from "../../lib/calculadoras/resultado-texto";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

type CampoFormulario =
  | "salarioBruto"
  | "jornadaCustom"
  | "horasRelogio"
  | "adicionalPercentual"
  | "dependentes"
  | "diasUteis"
  | "diasDsr";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

function parseHoras(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return Number.parseFloat(trimmed.replace(",", "."));
}

export function AdicionalNoturnoForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [jornada, setJornada] = useState<number | "custom">(220);
  const [jornadaCustom, setJornadaCustom] = useState("");
  const [categoria, setCategoria] = useState<CategoriaNoturna>("urbano");
  const [horasRelogio, setHorasRelogio] = useState("20");
  const [adicionalPercentual, setAdicionalPercentual] = useState("20");
  const [aplicarHoraReduzida, setAplicarHoraReduzida] = useState(true);
  const [incluirDsr, setIncluirDsr] = useState(true);
  const [diasUteis, setDiasUteis] = useState("25");
  const [diasDsr, setDiasDsr] = useState("5");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<AdicionalNoturnoResultado | null>(
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

  function handleCategoriaChange(nova: CategoriaNoturna) {
    setCategoria(nova);
    const piso = pisoAdicionalNoturno(nova);
    setAdicionalPercentual(String(piso));
    if (nova === "rural") {
      setAplicarHoraReduzida(false);
    } else {
      setAplicarHoraReduzida(true);
    }
    limparResultado();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCamposErro([]);

    const salario = parseMoeda(salarioBruto);
    const numDependentes = Number.parseInt(dependentes, 10);
    const horas = parseHoras(horasRelogio);
    const pct = Number.parseFloat(adicionalPercentual.replace(",", "."));
    const numDiasUteis = Number.parseInt(diasUteis, 10);
    const numDiasDsr = Number.parseInt(diasDsr, 10);
    const piso = pisoAdicionalNoturno(categoria);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    let jornadaMensal: number;
    if (jornada === "custom") {
      jornadaMensal = Number.parseInt(jornadaCustom, 10);
      if (
        Number.isNaN(jornadaMensal) ||
        jornadaMensal <= 0 ||
        !Number.isInteger(jornadaMensal)
      ) {
        reportarErro("Informe uma jornada mensal válida (horas inteiras).", [
          "jornadaCustom",
        ]);
        return;
      }
    } else {
      jornadaMensal = jornada;
    }

    if (Number.isNaN(horas) || horas <= 0) {
      reportarErro("Informe horas noturnas válidas (maior que zero).", [
        "horasRelogio",
      ]);
      return;
    }

    if (Number.isNaN(pct) || pct < piso) {
      reportarErro(
        `O adicional não pode ser menor que o piso de ${piso}% para ${categoria === "rural" ? "rural" : "urbano"}.`,
        ["adicionalPercentual"],
      );
      return;
    }

    if (
      Number.isNaN(numDependentes) ||
      numDependentes < 0 ||
      !Number.isInteger(numDependentes)
    ) {
      reportarErro("Informe um número válido de dependentes (0 ou mais).", [
        "dependentes",
      ]);
      return;
    }

    if (incluirDsr) {
      if (Number.isNaN(numDiasUteis) || numDiasUteis <= 0) {
        reportarErro("Informe dias úteis válidos.", ["diasUteis"]);
        return;
      }
      if (Number.isNaN(numDiasDsr) || numDiasDsr < 0) {
        reportarErro("Informe dias de DSR válidos.", ["diasDsr"]);
        return;
      }
    }

    setResultado(
      calcularAdicionalNoturno({
        salarioBruto: salario,
        jornadaMensal,
        categoria,
        horasRelogio: horas,
        adicionalPercentual: pct,
        aplicarHoraReduzida,
        incluirDsr,
        diasUteis: incluirDsr ? numDiasUteis : 25,
        diasDsr: incluirDsr ? numDiasDsr : 0,
        dependentes: numDependentes,
      }),
    );
  }

  const pisoAtual = pisoAdicionalNoturno(categoria);

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Salário bruto mensal
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={salarioBruto}
            onChange={(event) => {
              setSalarioBruto(formatarMoedaInput(event.target.value));
              limparResultado();
            }}
            className={classeCampo(campoComErro("salarioBruto"))}
            aria-invalid={campoComErro("salarioBruto")}
            aria-describedby={erro ? "adicional-noturno-erro" : undefined}
          />
        </label>

        <label className="flex flex-col gap-2 sm:max-w-[12rem]">
          <span className="text-sm font-medium text-foreground">
            Dependentes
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={dependentes}
            onChange={(event) => {
              setDependentes(event.target.value);
              limparResultado();
            }}
            className={`${classeCampo(campoComErro("dependentes"))} sm:max-w-[7rem]`}
            aria-invalid={campoComErro("dependentes")}
            aria-describedby={erro ? "adicional-noturno-erro" : undefined}
          />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Jornada mensal
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {JORNADAS.map((item) => (
              <label
                key={item.horas}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  type="radio"
                  name="jornada-adicional-noturno"
                  checked={jornada === item.horas}
                  onChange={() => {
                    setJornada(item.horas);
                    limparResultado();
                  }}
                  className="h-4 w-4 accent-accent"
                />
                {item.label}
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
              <input
                type="radio"
                name="jornada-adicional-noturno"
                checked={jornada === "custom"}
                onChange={() => {
                  setJornada("custom");
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              Outra jornada
            </label>
          </div>
          {jornada === "custom" && (
            <label className="flex flex-col gap-2 sm:pl-7">
              <span className="text-sm text-muted">Horas mensais</span>
              <input
                type="number"
                min={1}
                step={1}
                value={jornadaCustom}
                onChange={(event) => {
                  setJornadaCustom(event.target.value);
                  limparResultado();
                }}
                className={`${classeCampo(campoComErro("jornadaCustom"))} max-w-[7rem]`}
                placeholder="Ex.: 220"
                aria-invalid={campoComErro("jornadaCustom")}
                aria-describedby={erro ? "adicional-noturno-erro" : undefined}
              />
            </label>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Categoria
          </legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="categoria-noturna"
              checked={categoria === "urbano"}
              onChange={() => handleCategoriaChange("urbano")}
              className="h-4 w-4 accent-accent"
            />
            Urbano (piso {ADICIONAL_NOTURNO_URBANO_MINIMO}% — CLT art. 73)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="categoria-noturna"
              checked={categoria === "rural"}
              onChange={() => handleCategoriaChange("rural")}
              className="h-4 w-4 accent-accent"
            />
            Rural (piso {ADICIONAL_NOTURNO_RURAL_MINIMO}% — Lei 5.889/1973)
          </label>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Horas noturnas no mês (relógio)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={horasRelogio}
              onChange={(event) => {
                setHorasRelogio(event.target.value);
                limparResultado();
              }}
              className={classeCampo(campoComErro("horasRelogio"))}
              aria-invalid={campoComErro("horasRelogio")}
              aria-describedby={erro ? "adicional-noturno-erro" : undefined}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Adicional (%)
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={adicionalPercentual}
              onChange={(event) => {
                setAdicionalPercentual(event.target.value);
                limparResultado();
              }}
              className={classeCampo(campoComErro("adicionalPercentual"))}
              aria-invalid={campoComErro("adicionalPercentual")}
              aria-describedby={erro ? "adicional-noturno-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Mínimo {pisoAtual}% nesta categoria; convenção pode ser maior.
            </span>
          </label>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Hora reduzida
          </legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={aplicarHoraReduzida}
              onChange={(event) => {
                setAplicarHoraReduzida(event.target.checked);
                limparResultado();
              }}
              disabled={categoria === "rural"}
              className="h-4 w-4 accent-accent disabled:cursor-not-allowed"
            />
            Aplicar hora noturna reduzida (52 min 30 s = 1 h — CLT art. 73, §
            1º)
          </label>
          {categoria === "rural" && (
            <span className="text-xs text-muted">
              Na prática, a hora ficta do § 1º costuma valer só para o trabalho
              urbano; no rural o padrão é sem conversão.
            </span>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">DSR</legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={incluirDsr}
              onChange={(event) => {
                setIncluirDsr(event.target.checked);
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Incluir DSR sobre adicional noturno (Súmula 172 TST)
          </label>

          {incluirDsr && (
            <div className="grid grid-cols-1 gap-3 pl-7 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Dias úteis no mês</span>
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
                  aria-describedby={erro ? "adicional-noturno-erro" : undefined}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-muted">Dias de DSR</span>
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
                  aria-describedby={erro ? "adicional-noturno-erro" : undefined}
                />
              </label>
            </div>
          )}
        </fieldset>

        {erro && (
          <p
            id="adicional-noturno-erro"
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
          Calcular adicional noturno
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do adicional noturno"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso ano={resultado.tabelasAno} />
          </div>

          <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted">
            <p>
              Hora normal:{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHora)}
              </span>
            </p>
            <p className="mt-1">
              Hora com adicional:{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHoraNoturna)}
              </span>
            </p>
            <p className="mt-1">
              Horas computadas no mês:{" "}
              <span className="font-medium text-foreground">
                {resultado.horasComputadas}
              </span>
            </p>
          </div>

          <BreakdownGroup title="Proventos" linhas={resultado.verbas} />
          <BreakdownGroup
            title="Descontos"
            linhas={resultado.descontos}
            isDesconto
          />
          <div>
            <BreakdownGroup title="FGTS (estimativa)" linhas={resultado.fgts} />
            {resultado.fgts.length > 0 && (
              <p className="mt-2 text-xs text-muted">
                O FGTS é depositado pelo empregador e não entra no valor líquido.
              </p>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Total de proventos</span>
              <span>{formatarMoeda(resultado.totalVerbas)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted">
              <span>Total de descontos</span>
              <span>- {formatarMoeda(resultado.totalDescontos)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Valor líquido do adicional noturno</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Horas extras no período noturno usam a{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                calculadora de hora extra
              </Link>
              , à parte desta estimativa.
            </p>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoBreakdownCalculadora({
              tituloCalculadora: "Calculadora de adicional noturno",
              path: "/calculadoras/adicional-noturno",
              tabelasAno: resultado.tabelasAno,
              extraSecoes: [
                {
                  titulo: "Valores por hora",
                  linhas: [
                    {
                      label: "Hora normal",
                      valor: formatarMoeda(resultado.valorHora),
                    },
                    {
                      label: "Hora com adicional",
                      valor: formatarMoeda(resultado.valorHoraNoturna),
                    },
                    {
                      label: "Horas computadas",
                      valor: String(resultado.horasComputadas),
                    },
                  ],
                },
              ],
              verbas: resultado.verbas,
              descontos: resultado.descontos,
              fgts: resultado.fgts,
              totalVerbas: resultado.totalVerbas,
              totalDescontos: resultado.totalDescontos,
              liquidoLabel: "Valor líquido do adicional noturno",
              liquido: resultado.liquido,
            })}
          />

          <aside
            aria-label="Guia de cálculo do INSS"
            className="print:hidden rounded-lg border border-border bg-background p-4"
          >
            <h3 className="text-sm font-medium text-foreground">
              Como o INSS é calculado?
            </h3>
            <p className="mt-2 text-sm text-muted">
              O desconto segue a tabela progressiva de {resultado.tabelasAno}:
              diferença entre o mês com o adicional noturno e o mês sem ele.
            </p>
            <CalculadoraInssLinks ano={resultado.tabelasAno} />
          </aside>
        </section>
      )}
    </div>
  );
}

function BreakdownGroup({
  title,
  linhas,
  isDesconto = false,
}: {
  title: string;
  linhas: { label: string; valor: number }[];
  isDesconto?: boolean;
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
            <span>
              {isDesconto ? "- " : ""}
              {formatarMoeda(linha.valor)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
