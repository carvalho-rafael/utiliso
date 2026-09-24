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
  calcularCreditoIbsCbs,
  type CreditoIbsCbsResultado,
  type OrigemCreditoFornecedor,
} from "../../lib/calculadoras/credito-ibs-cbs";
import {
  aliquotasEfetivasParaRegime,
  formatarAliquotaTributo,
  IBS_CBS_ANO,
  type RegimeIbsCbs,
} from "../../lib/calculadoras/ibs-cbs";
import { montarTextoResultado } from "../../lib/calculadoras/resultado-texto";

const fieldClassBase =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type CampoFormulario =
  | "valorOperacao"
  | "creditoCbs"
  | "creditoIbsUf"
  | "creditoIbsMun";

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

const ORIGENS: {
  value: OrigemCreditoFornecedor;
  label: string;
  hint: string;
}[] = [
  {
    value: "regime-regular",
    label: "Compras com IBS/CBS destacados (regime regular)",
    hint: "Crédito informado abaixo é o que consta nas notas de entrada.",
  },
  {
    value: "simples",
    label: "Compras de optante pelo Simples (sem regime regular de IBS/CBS)",
    hint: "O crédito real segue o art. 23 da LC 123 — esta ferramenta não calcula o percentual do DAS.",
  },
  {
    value: "mei",
    label: "Compras de MEI",
    hint: "Em geral não gera crédito pleno; exceções (arts. 169 e 171 da LC 214) não são simuladas aqui.",
  },
];

function montarTextoCredito(resultado: CreditoIbsCbsResultado): string {
  return montarTextoResultado({
    tituloCalculadora: "Calculadora de crédito de IBS e CBS",
    path: "/calculadoras/credito-ibs-cbs",
    secoes: [
      {
        titulo: "Débito (saída)",
        linhas: resultado.linhas.map((linha) => ({
          label: `${linha.label} — débito`,
          valor: formatarMoeda(linha.debito),
        })),
      },
      {
        titulo: "Crédito (entrada informado)",
        linhas: resultado.linhas.map((linha) => ({
          label: `${linha.label} — crédito`,
          valor: formatarMoeda(linha.credito),
        })),
      },
      {
        titulo: "Saldo",
        linhas: resultado.linhas.map((linha) => ({
          label: `${linha.label} — saldo`,
          valor: formatarMoeda(linha.saldo),
        })),
      },
    ],
    destaque: {
      label: "Saldo total de IBS e CBS",
      valor: formatarMoeda(resultado.totalSaldo),
    },
  });
}

export function CreditoIbsCbsForm() {
  const [valorOperacao, setValorOperacao] = useState("R$ 1.000,00");
  const [creditoCbs, setCreditoCbs] = useState("R$ 0,00");
  const [creditoIbsUf, setCreditoIbsUf] = useState("R$ 0,00");
  const [creditoIbsMun, setCreditoIbsMun] = useState("R$ 0,00");
  const [regime, setRegime] = useState<RegimeIbsCbs>("integral");
  const [origemFornecedor, setOrigemFornecedor] =
    useState<OrigemCreditoFornecedor>("regime-regular");
  const [erro, setErro] = useState<string | null>(null);
  const [camposErro, setCamposErro] = useState<CampoFormulario[]>([]);
  const [resultado, setResultado] = useState<CreditoIbsCbsResultado | null>(
    null,
  );

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
    const cbs = parseMoeda(creditoCbs);
    const ibsUf = parseMoeda(creditoIbsUf);
    const ibsMun = parseMoeda(creditoIbsMun);

    const invalidos: CampoFormulario[] = [];
    if (valor <= 0) invalidos.push("valorOperacao");
    if (cbs < 0) invalidos.push("creditoCbs");
    if (ibsUf < 0) invalidos.push("creditoIbsUf");
    if (ibsMun < 0) invalidos.push("creditoIbsMun");

    if (invalidos.length > 0) {
      setErro(
        valor <= 0
          ? "Informe um valor da operação válido."
          : "Os créditos informados não podem ser negativos.",
      );
      setCamposErro(invalidos);
      setResultado(null);
      return;
    }

    setResultado(
      calcularCreditoIbsCbs({
        valorOperacao: valor,
        regime,
        creditoCbs: cbs,
        creditoIbsUf: ibsUf,
        creditoIbsMun: ibsMun,
        origemFornecedor,
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        aria-labelledby="credito-ibs-cbs-aliquotas"
        className="rounded-lg border border-border bg-surface p-4"
      >
        <h2
          id="credito-ibs-cbs-aliquotas"
          className="text-sm font-medium text-foreground"
        >
          Alíquotas de teste no débito ({IBS_CBS_ANO})
        </h2>
        <p className="mt-1 text-xs text-muted">
          O débito da saída usa as mesmas alíquotas da{" "}
          <Link
            href="/calculadoras/ibs-cbs"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            calculadora de IBS e CBS
          </Link>
          .{" "}
          <Link
            href="/tabelas/ibs-cbs"
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            Ver tabela
          </Link>
          .
        </p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-foreground">
          <li className="flex justify-between gap-4">
            <span className="text-muted">CBS</span>
            <span className="font-medium tabular-nums">
              {formatarAliquotaTributo(aliquotasRegime.aliquotaCbs)}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-muted">IBS estadual (UF)</span>
            <span className="font-medium tabular-nums">
              {formatarAliquotaTributo(aliquotasRegime.aliquotaIbsUf)}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-muted">IBS municipal</span>
            <span className="font-medium tabular-nums">
              {formatarAliquotaTributo(aliquotasRegime.aliquotaIbsMun)}
            </span>
          </li>
        </ul>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Valor da operação de saída (sem IBS/CBS)
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
          />
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Regime da sua saída
          </legend>
          {REGIMES.map((opcao) => (
            <label
              key={opcao.value}
              className="flex cursor-pointer gap-3 rounded-lg border border-border bg-surface p-3 has-checked:border-accent has-checked:ring-2 has-checked:ring-accent/30"
            >
              <input
                type="radio"
                name="regime-saida"
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

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-foreground">
            Origem dos créditos de entrada
          </legend>
          {ORIGENS.map((opcao) => (
            <label
              key={opcao.value}
              className="flex cursor-pointer gap-3 rounded-lg border border-border bg-surface p-3 has-checked:border-accent has-checked:ring-2 has-checked:ring-accent/30"
            >
              <input
                type="radio"
                name="origem-fornecedor"
                value={opcao.value}
                checked={origemFornecedor === opcao.value}
                onChange={() => {
                  setOrigemFornecedor(opcao.value);
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

        <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium text-foreground">
            Crédito destacado nas compras (período)
          </p>
          <p className="text-xs text-muted">
            Some o IBS e a CBS das notas de entrada elegíveis. Não calculamos
            automaticamente — informe os totais.
          </p>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">CBS</span>
            <input
              type="text"
              inputMode="numeric"
              value={creditoCbs}
              onChange={(event) => {
                setCreditoCbs(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("creditoCbs"))}
              aria-invalid={campoComErro("creditoCbs")}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">IBS estadual (UF)</span>
            <input
              type="text"
              inputMode="numeric"
              value={creditoIbsUf}
              onChange={(event) => {
                setCreditoIbsUf(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("creditoIbsUf"))}
              aria-invalid={campoComErro("creditoIbsUf")}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">IBS municipal</span>
            <input
              type="text"
              inputMode="numeric"
              value={creditoIbsMun}
              onChange={(event) => {
                setCreditoIbsMun(formatarMoedaInput(event.target.value));
                limparResultado();
              }}
              className={classeCampo(campoComErro("creditoIbsMun"))}
              aria-invalid={campoComErro("creditoIbsMun")}
            />
          </label>
        </div>

        {erro && (
          <p
            id="credito-ibs-cbs-erro"
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
          Calcular saldo de crédito
        </button>
      </form>

      {resultado && (
        <section
          aria-label="Resultado de crédito de IBS e CBS"
          className="calculadora-resultado-print flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resultado</h2>
            <CalculadoraResultadoAviso
              ano={resultado.ano}
              variant="ibs-cbs"
            />
          </div>

          {resultado.origemFornecedor === "simples" ? (
            <p className="rounded-lg border border-border bg-background p-3 text-sm text-muted">
              Você indicou compras do{" "}
              <strong className="font-medium text-foreground">
                Simples Nacional
              </strong>
              . O crédito do comprador segue o art. 23 da LC 123/2006 — não é
              necessariamente o valor destacado “por fora”. Confira o{" "}
              <Link
                href="/guias/ibs-cbs-simples-nacional"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia do Simples
              </Link>
              .
            </p>
          ) : null}

          {resultado.origemFornecedor === "mei" ? (
            <p className="rounded-lg border border-border bg-background p-3 text-sm text-muted">
              Compras de{" "}
              <strong className="font-medium text-foreground">MEI</strong> em
              geral não geram o mesmo crédito de notas do regime regular. Veja o{" "}
              <Link
                href="/guias/ibs-cbs-mei"
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                guia do MEI
              </Link>
              .
            </p>
          ) : null}

          <p className="rounded-lg border border-border bg-background p-3 text-sm text-muted">
            Apuração didática: débito da saída menos créditos informados. Em{" "}
            {IBS_CBS_ANO}, o recolhimento de IBS/CBS pode estar dispensado se as
            obrigações acessórias forem cumpridas (LC 214/2025, art. 348, § 1º).
            Não simula DARF, SPED nem restituição.
          </p>

          <div>
            <h3 className="text-sm font-medium text-highlight">
              Débito, crédito e saldo
            </h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[20rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-2 font-medium">Tributo</th>
                    <th className="py-2 pr-2 font-medium text-right">Débito</th>
                    <th className="py-2 pr-2 font-medium text-right">Crédito</th>
                    <th className="py-2 font-medium text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  {resultado.linhas.map((linha) => (
                    <tr
                      key={linha.label}
                      className="border-b border-border/60"
                    >
                      <td className="py-2 pr-2 text-muted">{linha.label}</td>
                      <td className="py-2 pr-2 text-right tabular-nums">
                        {formatarMoeda(linha.debito)}
                      </td>
                      <td className="py-2 pr-2 text-right tabular-nums">
                        {formatarMoeda(linha.credito)}
                      </td>
                      <td className="py-2 text-right tabular-nums font-medium">
                        {formatarMoeda(linha.saldo)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {resultado.totalExcessoCredito > 0 ? (
            <p className="text-sm text-muted">
              Há{" "}
              <strong className="font-medium text-foreground">
                {formatarMoeda(resultado.totalExcessoCredito)}
              </strong>{" "}
              de crédito informado acima do débito calculado nesta simulação. O
              tratamento do excedente (compensação, estorno etc.) depende da
              legislação e da apuração — não é calculado aqui.
            </p>
          ) : null}

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm text-muted">
              <span>Total de débito</span>
              <span>{formatarMoeda(resultado.totalDebito)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted">
              <span>Total de crédito informado</span>
              <span>{formatarMoeda(resultado.totalCredito)}</span>
            </div>
            <div className="mt-3 flex justify-between text-lg font-semibold text-foreground">
              <span>Saldo de IBS e CBS</span>
              <span className="text-highlight">
                {formatarMoeda(resultado.totalSaldo)}
              </span>
            </div>
          </div>

          <CalculadoraResultadoAcoes texto={montarTextoCredito(resultado)} />
        </section>
      )}
    </div>
  );
}
