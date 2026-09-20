import { round2 } from "./tabelas-2026";

export type LinhaBreakdown = {
  label: string;
  valor: number;
  tipo: "verba" | "info";
};

export type DsrSobreComissoesInput = {
  comissoesMes: number;
  diasUteis: number;
  diasDsr: number;
};

export type DsrSobreComissoesResultado = {
  mediaDiaria: number;
  dsr: number;
  totalComissoesMaisDsr: number;
  info: LinhaBreakdown[];
  verbas: LinhaBreakdown[];
};

export function calcularDsrSobreComissoes(
  input: DsrSobreComissoesInput,
): DsrSobreComissoesResultado {
  const { comissoesMes, diasUteis, diasDsr } = input;

  const mediaDiaria =
    diasUteis > 0 ? round2(comissoesMes / diasUteis) : 0;
  const dsr = diasUteis > 0 ? round2((comissoesMes / diasUteis) * diasDsr) : 0;
  const totalComissoesMaisDsr = round2(comissoesMes + dsr);

  const info: LinhaBreakdown[] = [
    {
      label: `Média diária (comissões ÷ ${diasUteis} dias úteis)`,
      valor: mediaDiaria,
      tipo: "info",
    },
  ];

  const verbas: LinhaBreakdown[] = [
    {
      label: "Comissões do mês",
      valor: comissoesMes,
      tipo: "verba",
    },
  ];

  if (dsr > 0) {
    verbas.push({
      label: `DSR sobre comissões (${diasDsr} ${diasDsr === 1 ? "dia" : "dias"})`,
      valor: dsr,
      tipo: "verba",
    });
  }

  return {
    mediaDiaria,
    dsr,
    totalComissoesMaisDsr,
    info,
    verbas,
  };
}
