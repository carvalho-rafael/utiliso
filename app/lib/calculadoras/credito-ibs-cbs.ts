import {
  calcularIbsCbs,
  IBS_CBS_ANO,
  type IbsCbsResultado,
  type RegimeIbsCbs,
} from "./ibs-cbs";
import { round2 } from "./tabelas-2026";

export type OrigemCreditoFornecedor =
  | "regime-regular"
  | "simples"
  | "mei";

export type CreditoIbsCbsInput = {
  valorOperacao: number;
  regime: RegimeIbsCbs;
  creditoCbs: number;
  creditoIbsUf: number;
  creditoIbsMun: number;
  origemFornecedor: OrigemCreditoFornecedor;
};

export type LinhaCreditoApuracao = {
  label: string;
  debito: number;
  credito: number;
  saldo: number;
  excessoCredito: number;
};

export type CreditoIbsCbsResultado = {
  ano: number;
  origemFornecedor: OrigemCreditoFornecedor;
  debito: IbsCbsResultado;
  linhas: LinhaCreditoApuracao[];
  totalDebito: number;
  totalCredito: number;
  totalSaldo: number;
  totalExcessoCredito: number;
};

function linhaApuracao(
  label: string,
  debito: number,
  credito: number,
): LinhaCreditoApuracao {
  const saldo = round2(Math.max(0, debito - credito));
  const excessoCredito = round2(Math.max(0, credito - debito));
  return { label, debito, credito, saldo, excessoCredito };
}

export function calcularCreditoIbsCbs(
  input: CreditoIbsCbsInput,
): CreditoIbsCbsResultado {
  const debito = calcularIbsCbs({
    valorOperacao: input.valorOperacao,
    regime: input.regime,
  });

  const linhas: LinhaCreditoApuracao[] = [
    linhaApuracao("CBS", debito.cbs, input.creditoCbs),
    linhaApuracao("IBS estadual (UF)", debito.ibsUf, input.creditoIbsUf),
    linhaApuracao("IBS municipal", debito.ibsMun, input.creditoIbsMun),
  ];

  const totalDebito = round2(linhas.reduce((acc, item) => acc + item.debito, 0));
  const totalCredito = round2(
    linhas.reduce((acc, item) => acc + item.credito, 0),
  );
  const totalSaldo = round2(linhas.reduce((acc, item) => acc + item.saldo, 0));
  const totalExcessoCredito = round2(
    linhas.reduce((acc, item) => acc + item.excessoCredito, 0),
  );

  return {
    ano: IBS_CBS_ANO,
    origemFornecedor: input.origemFornecedor,
    debito,
    linhas,
    totalDebito,
    totalCredito,
    totalSaldo,
    totalExcessoCredito,
  };
}
