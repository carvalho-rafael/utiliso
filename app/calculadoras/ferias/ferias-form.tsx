"use client";

import { useState } from "react";
import {
  CalculadoraInssLinks,
  CalculadoraResultadoAviso,
} from "../../components/calculadora-resultado-aviso";
import {
  DIAS_ABONO,
  calcularFerias,
  type FeriasResultado,
} from "../../lib/calculadoras/ferias";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "salarioBruto"
  | "mediaVariaveis"
  | "diasGozo"
  | "dependentes";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function FeriasForm() {
  const [salarioBruto, setSalarioBruto] = useState("R$ 3.000,00");
  const [mediaVariaveis, setMediaVariaveis] = useState("");
  const [diasGozo, setDiasGozo] = useState("30");
  const [dependentes, setDependentes] = useState("0");
  const [venderAbono, setVenderAbono] = useState(false);
  const [adiantarDecimo, setAdiantarDecimo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<FeriasResultado | null>(null);

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
    const numDiasGozo = Number.parseInt(diasGozo, 10);

    if (salario <= 0) {
      reportarErro("Informe um salário bruto válido.", ["salarioBruto"]);
      return;
    }

    let media = 0;
    if (mediaVariaveis.trim()) {
      media = parseMoeda(mediaVariaveis);
      if (media < 0) {
        reportarErro("Informe uma média de variáveis válida.", [
          "mediaVariaveis",
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

    if (
      Number.isNaN(numDiasGozo) ||
      numDiasGozo < 1 ||
      numDiasGozo > 30 ||
      !Number.isInteger(numDiasGozo)
    ) {
      reportarErro("Informe dias de férias entre 1 e 30.", ["diasGozo"]);
      return;
    }

    if (venderAbono && numDiasGozo + DIAS_ABONO > 30) {
      reportarErro(
        `Com abono pecuniário (${DIAS_ABONO} dias), o gozo não pode passar de ${30 - DIAS_ABONO} dias.`,
        ["diasGozo"],
      );
      return;
    }

    setResultado(
      calcularFerias({
        salarioBruto: salario,
        mediaVariaveis: media,
        diasGozo: numDiasGozo,
        venderAbono,
        dependentes: numDependentes,
        adiantarDecimo,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
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
              aria-describedby={erro ? "ferias-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Remuneração mensal habitual usada como base das férias.
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Média de variáveis (opcional)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={mediaVariaveis}
              onChange={(event) => {
                setMediaVariaveis(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("mediaVariaveis"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("mediaVariaveis")}
              aria-describedby={erro ? "ferias-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Média de horas extras, comissões ou outras parcelas habituais
              incluídas na base das férias.
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Dias de férias (gozo)
            </span>
            <input
              type="number"
              min={1}
              max={30}
              step={1}
              value={diasGozo}
              onChange={(event) => {
                setDiasGozo(event.target.value);
                limparResultado();
              }}
              className={`${classeCampo(campoComErro("diasGozo"))} sm:max-w-[7rem]`}
              aria-invalid={campoComErro("diasGozo")}
              aria-describedby={erro ? "ferias-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Período de descanso (até 30 dias). Com abono pecuniário, o gozo
              fica limitado a 20 dias.
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
              className={`${classeCampo(campoComErro("dependentes"))} sm:max-w-[7rem]`}
              aria-invalid={campoComErro("dependentes")}
              aria-describedby={erro ? "ferias-erro" : undefined}
            />
            <span className="text-xs text-muted">
              Filhos, cônjuge ou outros dependentes aceitos pela Receita Federal
              (R$ 189,59 cada na dedução do IRRF).
            </span>
          </label>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground">
            Opções
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={venderAbono}
              onChange={(event) => {
                const marcado = event.target.checked;
                setVenderAbono(marcado);
                if (marcado && Number.parseInt(diasGozo, 10) === 30) {
                  setDiasGozo("20");
                }
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Converter 1/3 em abono pecuniário ({DIAS_ABONO} dias)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={adiantarDecimo}
              onChange={(event) => {
                setAdiantarDecimo(event.target.checked);
                limparResultado();
              }}
              className="h-4 w-4 accent-accent"
            />
            Adiantar 1ª parcela do 13º salário
          </label>
          </div>
        </fieldset>

        {erro && (
          <p id="ferias-erro" className="text-sm text-danger" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-highlight px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Calcular férias
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado das férias"
          className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso ano={resultado.tabelasAno} />
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
                O FGTS é depositado pelo empregador e não entra no valor líquido
                das férias.
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
              <span>Valor líquido das férias</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.liquido)}
              </span>
            </div>
          </div>

          <aside
            aria-label="Guia de cálculo do INSS"
            className="rounded-lg border border-border bg-background p-4"
          >
            <h3 className="text-sm font-medium text-foreground">
              Como o INSS é calculado?
            </h3>
            <p className="mt-2 text-sm text-muted">
              O desconto segue a tabela progressiva de {resultado.tabelasAno}:
              cada faixa salarial tem sua alíquota, aplicada só sobre a parcela
              do salário dentro da faixa.
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
