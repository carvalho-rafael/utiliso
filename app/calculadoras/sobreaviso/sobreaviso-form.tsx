"use client";

import { useState } from "react";
import Link from "next/link";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import { JORNADAS } from "../../lib/calculadoras/hora-extra";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import { montarTextoBreakdownCalculadora } from "../../lib/calculadoras/resultado-texto";
import {
  calcularSobreaviso,
  type RegimeSobreaviso,
  type SobreavisoResultado,
} from "../../lib/calculadoras/sobreaviso";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

type CampoFormulario =
  | "salarioBruto"
  | "jornadaCustom"
  | "horasSobreaviso"
  | "horasProntidao"
  | "dependentes";

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

export function SobreavisoForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [jornada, setJornada] = useState<number | "custom">(220);
  const [jornadaCustom, setJornadaCustom] = useState("");
  const [regime, setRegime] = useState<RegimeSobreaviso>("sobreaviso");
  const [horasSobreaviso, setHorasSobreaviso] = useState("24");
  const [horasProntidao, setHorasProntidao] = useState("12");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<SobreavisoResultado | null>(null);

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

    const salario = parseMoeda(salarioBruto);
    const numDependentes = Number.parseInt(dependentes, 10);

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

    const horasSa = parseHoras(horasSobreaviso);
    const horasPr = parseHoras(horasProntidao);

    if (regime === "sobreaviso" || regime === "ambos") {
      if (Number.isNaN(horasSa) || horasSa <= 0) {
        reportarErro("Informe horas de sobreaviso válidas (maior que zero).", [
          "horasSobreaviso",
        ]);
        return;
      }
    }

    if (regime === "prontidao" || regime === "ambos") {
      if (Number.isNaN(horasPr) || horasPr <= 0) {
        reportarErro("Informe horas de prontidão válidas (maior que zero).", [
          "horasProntidao",
        ]);
        return;
      }
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

    setResultado(
      calcularSobreaviso({
        salarioBruto: salario,
        jornadaMensal,
        regime,
        horasSobreaviso: horasSa,
        horasProntidao: horasPr,
        dependentes: numDependentes,
      }),
    );
  }

  const mostraSobreaviso = regime === "sobreaviso" || regime === "ambos";
  const mostraProntidao = regime === "prontidao" || regime === "ambos";

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
            aria-describedby={erro ? "sobreaviso-erro" : undefined}
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
            aria-describedby={erro ? "sobreaviso-erro" : undefined}
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
                  name="jornada-sobreaviso"
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
                name="jornada-sobreaviso"
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
                aria-describedby={erro ? "sobreaviso-erro" : undefined}
              />
            </label>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Regime
          </legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="regime"
              checked={regime === "sobreaviso"}
              onChange={() => {
                setRegime("sobreaviso");
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Sobreaviso (1/3 da hora — fora do local, em plantão)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="regime"
              checked={regime === "prontidao"}
              onChange={() => {
                setRegime("prontidao");
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Prontidão (2/3 da hora — nas dependências da empresa)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="regime"
              checked={regime === "ambos"}
              onChange={() => {
                setRegime("ambos");
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Ambos no mesmo mês
          </label>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mostraSobreaviso && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Horas de sobreaviso no mês
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={horasSobreaviso}
                onChange={(event) => {
                  setHorasSobreaviso(event.target.value);
                  limparResultado();
                }}
                className={classeCampo(campoComErro("horasSobreaviso"))}
                aria-invalid={campoComErro("horasSobreaviso")}
                aria-describedby={erro ? "sobreaviso-erro" : undefined}
              />
              <span className="text-xs text-muted">
                Escala legal de referência: até 24 h por escala (CLT art. 244,
                § 2º).
              </span>
            </label>
          )}
          {mostraProntidao && (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Horas de prontidão no mês
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={horasProntidao}
                onChange={(event) => {
                  setHorasProntidao(event.target.value);
                  limparResultado();
                }}
                className={classeCampo(campoComErro("horasProntidao"))}
                aria-invalid={campoComErro("horasProntidao")}
                aria-describedby={erro ? "sobreaviso-erro" : undefined}
              />
              <span className="text-xs text-muted">
                Escala legal de referência: até 12 h por escala (CLT art. 244,
                § 3º).
              </span>
            </label>
          )}
        </div>

        {erro && (
          <p
            id="sobreaviso-erro"
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
          Calcular sobreaviso
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do sobreaviso"
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
              Hora de sobreaviso (1/3):{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHoraSobreaviso)}
              </span>
            </p>
            <p className="mt-1">
              Hora de prontidão (2/3):{" "}
              <span className="font-medium text-foreground">
                {formatarMoeda(resultado.valorHoraProntidao)}
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
              <span>Valor líquido estimado</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Horas efetivamente trabalhadas no chamado são pagas como{" "}
              <Link href="/calculadoras/hora-extra" className={linkClass}>
                hora extra
              </Link>
              , à parte desta estimativa.
            </p>
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoBreakdownCalculadora({
              tituloCalculadora: "Calculadora de sobreaviso",
              path: "/calculadoras/sobreaviso",
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
                      label: "Hora de sobreaviso (1/3)",
                      valor: formatarMoeda(resultado.valorHoraSobreaviso),
                    },
                    {
                      label: "Hora de prontidão (2/3)",
                      valor: formatarMoeda(resultado.valorHoraProntidao),
                    },
                  ],
                },
              ],
              verbas: resultado.verbas,
              descontos: resultado.descontos,
              fgts: resultado.fgts,
              totalVerbas: resultado.totalVerbas,
              totalDescontos: resultado.totalDescontos,
              liquidoLabel: "Valor líquido estimado",
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
              diferença entre o mês com a verba de sobreaviso/prontidão e o mês
              sem ela.
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
