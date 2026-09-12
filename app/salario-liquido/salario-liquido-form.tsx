"use client";

import { useState } from "react";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../lib/calculadoras/format";
import {
  calcularSalarioLiquido,
  type SalarioLiquidoResultado,
} from "../lib/calculadoras/salario-liquido";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario = "salarioBruto" | "dependentes" | "custoValeTransporte";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function SalarioLiquidoForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [dependentes, setDependentes] = useState("0");
  const [descontaValeTransporte, setDescontaValeTransporte] = useState(false);
  const [custoValeTransporte, setCustoValeTransporte] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<SalarioLiquidoResultado | null>(
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
    const numDependentes = Number.parseInt(dependentes, 10);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
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

    let custoVT: number | undefined;
    if (descontaValeTransporte && custoValeTransporte.trim()) {
      custoVT = parseMoeda(custoValeTransporte);
      if (custoVT <= 0) {
        reportarErro("Informe um custo válido de vale-transporte.", [
          "custoValeTransporte",
        ]);
        return;
      }
    }

    setResultado(
      calcularSalarioLiquido({
        salarioBruto: salario,
        dependentes: numDependentes,
        descontaValeTransporte,
        custoValeTransporte: custoVT,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Salário bruto
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
            aria-describedby={erro ? "salario-liquido-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Valor mensal antes dos descontos obrigatórios (INSS e IRRF).
          </span>
        </label>

        <label className="flex flex-col gap-2">
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
            className={`${classeCampo(campoComErro("dependentes"))} max-w-[7rem]`}
            aria-invalid={campoComErro("dependentes")}
            aria-describedby={erro ? "salario-liquido-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Filhos, cônjuge ou outros dependentes aceitos pela Receita Federal
            (R$ 189,59 cada na dedução do IRRF).
          </span>
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Vale-transporte
          </legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={descontaValeTransporte}
              onChange={(event) => {
                setDescontaValeTransporte(event.target.checked);
                if (!event.target.checked) setCustoValeTransporte("");
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Descontar vale-transporte (até 6% do salário básico)
          </label>

          {descontaValeTransporte && (
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted">
                Custo mensal do transporte (opcional)
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={custoValeTransporte}
                onChange={(event) => {
                  setCustoValeTransporte(formatarMoedaInput(event.target.value));
                  limparResultado();
                }}
                className={classeCampo(campoComErro("custoValeTransporte"))}
                placeholder="Se vazio, usa 6% do salário"
                aria-invalid={campoComErro("custoValeTransporte")}
                aria-describedby={erro ? "salario-liquido-erro" : undefined}
              />
              <span className="text-xs text-muted">
                Se o custo real for menor que 6%, informe o valor. O desconto
                nunca ultrapassa 6% do salário básico (Lei 7.418/1985).
              </span>
            </label>
          )}
        </fieldset>

        {erro && (
          <p
            id="salario-liquido-erro"
            className="text-sm text-danger"
            role="alert"
          >
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular salário líquido
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do salário líquido"
          className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <p className="mt-1 text-sm text-muted">
              Estimativa com tabelas INSS/IRRF {resultado.tabelasAno}. Não
              substitui contador, advogado ou departamento pessoal.
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
                O FGTS é depositado pelo empregador e não entra no salário
                líquido.
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
              <span>Salário líquido</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>
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
