"use client";

import { useState } from "react";
import { CalculadoraResultadoAcoes } from "../../components/calculadora-resultado-acoes";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import {
  calcularDiasTrabalhados,
  type DiasTrabalhadosResultado,
  mesmoMesCalendario,
} from "../../lib/calculadoras/dias-trabalhados";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import { montarTextoBreakdownCalculadora } from "../../lib/calculadoras/resultado-texto";
import {
  formatarDataInput,
  parseDataInput,
} from "../../lib/calculadoras/rescisao";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "salarioBruto"
  | "dataInicio"
  | "dataFim"
  | "dependentes";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function DiasTrabalhadosForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [dependentes, setDependentes] = useState("0");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<DiasTrabalhadosResultado | null>(
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

    const salario = parseMoeda(salarioBruto);
    const inicio = parseDataInput(dataInicio);
    const fim = parseDataInput(dataFim);
    const numDependentes = Number.parseInt(dependentes, 10);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    if (!inicio) {
      reportarErro("Informe a data inicial no formato DD/MM/AAAA.", [
        "dataInicio",
      ]);
      return;
    }

    if (!fim) {
      reportarErro("Informe a data final no formato DD/MM/AAAA.", ["dataFim"]);
      return;
    }

    if (fim < inicio) {
      reportarErro("A data final não pode ser anterior à data inicial.", [
        "dataInicio",
        "dataFim",
      ]);
      return;
    }

    if (!mesmoMesCalendario(inicio, fim)) {
      reportarErro(
        "As datas devem estar no mesmo mês civil. Para períodos em meses diferentes, calcule mês a mês.",
        ["dataInicio", "dataFim"],
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

    setResultado(
      calcularDiasTrabalhados({
        salarioBruto: salario,
        dataInicio: inicio,
        dataFim: fim,
        dependentes: numDependentes,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Salário bruto mensal
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={salarioBruto}
            onChange={(event) => {
              setSalarioBruto(formatarMoedaInput(event.target.value));
              limparResultado();
            }}
            className={classeCampo(campoComErro("salarioBruto"))}
            placeholder="R$ 0,00"
            aria-invalid={campoComErro("salarioBruto")}
            aria-describedby={erro ? "dias-trabalhados-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Valor integral do mês de referência, antes dos descontos.
          </span>
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Primeiro dia trabalhado
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={dataInicio}
              onChange={(event) => {
                setDataInicio(formatarDataInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("dataInicio"))}
              placeholder="DD/MM/AAAA"
              aria-invalid={campoComErro("dataInicio")}
              aria-describedby={erro ? "dias-trabalhados-erro" : undefined}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Último dia trabalhado
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={dataFim}
              onChange={(event) => {
                setDataFim(formatarDataInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("dataFim"))}
              placeholder="DD/MM/AAAA"
              aria-invalid={campoComErro("dataFim")}
              aria-describedby={erro ? "dias-trabalhados-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Use o mesmo mês civil nas duas datas (ex.: admissão ou rescisão no
              meio do mês).
            </span>
          </label>
        </div>

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
            className={classeCampo(campoComErro("dependentes"))}
            aria-invalid={campoComErro("dependentes")}
            aria-describedby={erro ? "dias-trabalhados-erro" : undefined}
          />
        </label>

        {erro && (
          <p
            id="dias-trabalhados-erro"
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
          Calcular dias trabalhados
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado dos dias trabalhados"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso ano={resultado.tabelasAno} />
          </div>

          <p className="text-sm text-muted">
            <strong className="font-medium text-foreground">
              {resultado.diasTrabalhados} dias
            </strong>{" "}
            em um mês de {resultado.diasNoMes} dias — proporcional de{" "}
            <strong className="font-medium text-foreground">
              {formatarMoeda(resultado.brutoProporcional)}
            </strong>{" "}
            (salário ÷ {resultado.diasNoMes} × {resultado.diasTrabalhados}).
          </p>

          <p className="text-sm text-muted">
            {resultado.mesContaComoAvo
              ? "Este mês conta como 1/12 para 13º e férias proporcionais (mais de 14 dias trabalhados)."
              : "Este mês não conta como avo de 13º nem de férias proporcionais (14 dias ou menos)."}
          </p>

          <BreakdownGroup title="Proventos" linhas={resultado.verbas} />
          <BreakdownGroup
            title="Descontos"
            linhas={resultado.descontos}
            isDesconto
          />
          <div>
            <BreakdownGroup title="FGTS (estimativa)" linhas={resultado.fgts} />
            <p className="mt-2 text-xs text-muted">
              O FGTS é depositado pelo empregador e não entra no líquido.
            </p>
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
          </div>

          <CalculadoraResultadoAcoes
            texto={montarTextoBreakdownCalculadora({
              tituloCalculadora: "Calculadora de dias trabalhados",
              path: "/calculadoras/dias-trabalhados",
              tabelasAno: resultado.tabelasAno,
              verbas: resultado.verbas,
              descontos: resultado.descontos,
              fgts: resultado.fgts,
              totalVerbas: resultado.totalVerbas,
              totalDescontos: resultado.totalDescontos,
              liquidoLabel: "Valor líquido estimado",
              liquido: resultado.liquido,
              extraParagrafos: [
                `${resultado.diasTrabalhados} dias em mês de ${resultado.diasNoMes} dias.`,
                resultado.mesContaComoAvo
                  ? "Mês conta como avo de 13º e férias proporcionais."
                  : "Mês não conta como avo de 13º nem de férias proporcionais.",
              ],
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
              O desconto segue a tabela progressiva de {resultado.tabelasAno}{" "}
              sobre o salário proporcional do período.
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
