"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatarMoeda,
  formatarMoedaInput,
  parseMoeda,
} from "../../lib/calculadoras/format";
import type { MotivoRescisao } from "../../lib/calculadoras/rescisao";
import {
  calcularSeguroDesemprego,
  type SeguroDesempregoResultado,
  type SolicitacaoSeguro,
} from "../../lib/calculadoras/seguro-desemprego";

const MOTIVOS: { value: MotivoRescisao; label: string }[] = [
  { value: "sem_justa_causa", label: "Demissão sem justa causa" },
  { value: "pedido_demissao", label: "Pedido de demissão" },
  { value: "com_justa_causa", label: "Demissão por justa causa" },
  { value: "acordo", label: "Acordo rescisório (art. 484-A)" },
];

const SOLICITACOES: { value: SolicitacaoSeguro; label: string }[] = [
  { value: 1, label: "Primeira solicitação" },
  { value: 2, label: "Segunda solicitação" },
  { value: 3, label: "Terceira solicitação ou mais" },
];

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "salario1"
  | "salario2"
  | "salario3"
  | "mesesUltimos36";

function classeCampo(comErro: boolean) {
  return comErro
    ? `${fieldClassBase} border-danger ring-2 ring-danger/25 focus-visible:ring-danger`
    : fieldClassBase;
}

export function SeguroDesempregoForm() {
  const [motivo, setMotivo] = useState<MotivoRescisao>("sem_justa_causa");
  const [solicitacao, setSolicitacao] = useState<SolicitacaoSeguro>(1);
  const [mesesUltimos36, setMesesUltimos36] = useState("24");
  const [salario1, setSalario1] = useState("R$ 3.000,00");
  const [salario2, setSalario2] = useState("");
  const [salario3, setSalario3] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] =
    useState<SeguroDesempregoResultado | null>(null);

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

    const numMeses = Number.parseInt(mesesUltimos36, 10);
    const s1 = parseMoeda(salario1);
    const s2 = salario2.trim() ? parseMoeda(salario2) : 0;
    const s3 = salario3.trim() ? parseMoeda(salario3) : 0;

    if (
      Number.isNaN(numMeses) ||
      numMeses < 0 ||
      numMeses > 36 ||
      !Number.isInteger(numMeses)
    ) {
      reportarErro(
        "Informe um número válido de meses trabalhados (0 a 36).",
        ["mesesUltimos36"],
      );
      return;
    }

    if (s1 <= 0) {
      reportarErro("Informe o último salário bruto.", ["salario1"]);
      return;
    }

    if (salario2.trim() && s2 <= 0) {
      reportarErro("Informe um penúltimo salário válido ou deixe em branco.", [
        "salario2",
      ]);
      return;
    }

    if (salario3.trim() && s3 <= 0) {
      reportarErro(
        "Informe um antepenúltimo salário válido ou deixe em branco.",
        ["salario3"],
      );
      return;
    }

    if (salario3.trim() && !salario2.trim()) {
      reportarErro(
        "Para informar o antepenúltimo salário, preencha também o penúltimo.",
        ["salario2", "salario3"],
      );
      return;
    }

    const salarios = [s1, s2, s3].filter((salario) => salario > 0);

    setResultado(
      calcularSeguroDesemprego({
        motivo,
        solicitacao,
        mesesUltimos36: numMeses,
        salarios,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Motivo do desligamento
          </legend>
          {MOTIVOS.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            >
              <input
                type="radio"
                name="motivo"
                checked={motivo === item.value}
                onChange={() => {
                  setMotivo(item.value);
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              {item.label}
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Qual solicitação do benefício?
          </legend>
          {SOLICITACOES.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            >
              <input
                type="radio"
                name="solicitacao"
                checked={solicitacao === item.value}
                onChange={() => {
                  setSolicitacao(item.value);
                  limparResultado();
                }}
                className="h-4 w-4 accent-accent"
              />
              {item.label}
            </label>
          ))}
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Meses com carteira assinada nos últimos 36 meses
          </span>
          <input
            type="number"
            min={0}
            max={36}
            step={1}
            value={mesesUltimos36}
            onChange={(event) => {
              setMesesUltimos36(event.target.value);
              limparResultado();
            }}
            className={`${classeCampo(campoComErro("mesesUltimos36"))} max-w-[7rem]`}
            aria-invalid={campoComErro("mesesUltimos36")}
            aria-describedby={erro ? "seguro-desemprego-erro" : undefined}
          />
          <span className="text-xs text-muted">
            Conte os meses trabalhados nos últimos 36 meses antes da dispensa.
            Fração de 15 dias ou mais vale como mês inteiro.
          </span>
        </label>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-foreground">
            Salários do último vínculo
          </p>
          <p className="text-xs text-muted">
            Informe de 1 a 3 salários brutos, do mais recente ao mais antigo. O
            MTE usa a média dos três últimos meses quando houver três ou mais
            salários no vínculo.
          </p>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">Último salário</span>
            <input
              type="text"
              inputMode="numeric"
              value={salario1}
              onChange={(event) => {
                setSalario1(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("salario1"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("salario1")}
              aria-describedby={erro ? "seguro-desemprego-erro" : undefined}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">
              Penúltimo salário (opcional)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={salario2}
              onChange={(event) => {
                setSalario2(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("salario2"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("salario2")}
              aria-describedby={erro ? "seguro-desemprego-erro" : undefined}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">
              Antepenúltimo salário (opcional)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={salario3}
              onChange={(event) => {
                setSalario3(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("salario3"))}
              placeholder="R$ 0,00"
              aria-invalid={campoComErro("salario3")}
              aria-describedby={erro ? "seguro-desemprego-erro" : undefined}
            />
          </label>
        </div>

        {erro && (
          <p
            id="seguro-desemprego-erro"
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
          Calcular seguro-desemprego
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado do seguro-desemprego"
          className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <p className="mt-1 text-sm text-muted">
              Estimativa com tabela MTE {resultado.tabelasAno} (INPC). Não
              substitui contador, advogado ou departamento pessoal.
            </p>
          </div>

          {!resultado.elegivel ? (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium text-foreground">
                Sem direito ao benefício neste cenário
              </p>
              <p className="mt-2 text-sm text-muted">
                {resultado.motivoInelegibilidade}
              </p>
              <Link
                href="/guias/seguro-desemprego"
                className="mt-4 inline-block cursor-pointer text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Ver guia de seguro-desemprego
              </Link>
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted">
                <p>
                  Média salarial:{" "}
                  <span className="font-medium text-foreground">
                    {formatarMoeda(resultado.mediaSalarial)}
                  </span>
                </p>
                <p className="mt-1">
                  Valor da parcela:{" "}
                  <span className="font-medium text-foreground">
                    {formatarMoeda(resultado.valorParcela)}
                  </span>
                </p>
                <p className="mt-1">
                  Número de parcelas:{" "}
                  <span className="font-medium text-foreground">
                    {resultado.numeroParcelas}
                  </span>
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Total estimado</span>
                  <span className="text-highlight">
                    {formatarMoeda(resultado.totalEstimado)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Soma das parcelas mensais. Pode haver parcela extra em
                  dezembro (abono anual) se ainda houver benefício a receber
                  nesse mês.
                </p>
              </div>

              <aside
                aria-label="Informações sobre o benefício"
                className="rounded-lg border border-border bg-background p-4"
              >
                <h3 className="text-sm font-medium text-foreground">
                  O benefício não entra na rescisão
                </h3>
                <p className="mt-2 text-sm text-muted">
                  O seguro-desemprego é solicitado após a dispensa, pelo
                  aplicativo ou site Carteira de Trabalho Digital (gov.br), em
                  até 90 dias. O MTE pode indeferir por renda própria, MEI,
                  benefício previdenciário ou outros requisitos legais.
                </p>
                <Link
                  href="/calculadoras/rescisao"
                  className="mt-3 inline-block cursor-pointer text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Calcular rescisão trabalhista
                </Link>
              </aside>
            </>
          )}
        </section>
      )}
    </div>
  );
}
