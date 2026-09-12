import {
  calcularINSS,
  calcularIRRF,
  round2,
  TABELAS_ANO,
} from "./tabelas-2026";

export { formatarMoeda, formatarMoedaInput, parseMoeda } from "./format";

export type MotivoRescisao =
  | "pedido_demissao"
  | "sem_justa_causa"
  | "com_justa_causa"
  | "acordo";

export type AvisoPrevio = "trabalhado" | "indenizado";

export type PeriodoAquisitivo = {
  indice: number;
  inicio: Date;
  fim: Date;
  limiteConcessao: Date;
  emDobro: boolean;
};

export type RescisaoInput = {
  motivo: MotivoRescisao;
  salarioBruto: number;
  dataAdmissao: Date;
  dataComunicacao: Date;
  feriasNaoGozadasIndices: number[];
  avisoPrevio: AvisoPrevio;
  /** Aviso trabalhado: null = todos os dias; caso contrário, dias efetivamente trabalhados. */
  diasAvisoTrabalhados: number | null;
};

export type LinhaBreakdown = {
  label: string;
  valor: number;
  tipo: "verba" | "desconto" | "info";
};

export type OrigemPrazoPagamento =
  | "fim_aviso_trabalhado"
  | "data_comunicacao";

export type RescisaoResultado = {
  verbas: LinhaBreakdown[];
  descontos: LinhaBreakdown[];
  fgts: LinhaBreakdown[];
  totalVerbas: number;
  totalDescontos: number;
  liquido: number;
  tabelasAno: number;
  dataFimContrato: Date;
  diasAviso: number;
  avisoProjetaContrato: boolean;
  dataInicioPrazoPagamento: Date;
  dataLimitePagamento: Date;
  origemPrazoPagamento: OrigemPrazoPagamento;
};

/** CLT art. 477, § 6º: pagamento em até 10 dias corridos após o término do contrato. */
export const PRAZO_PAGAMENTO_RESCISAO_DIAS = 10;

function diasNoMes(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function anosCompletos(admissao: Date, comunicacao: Date): number {
  let anos = comunicacao.getFullYear() - admissao.getFullYear();
  const aniversario = new Date(
    comunicacao.getFullYear(),
    admissao.getMonth(),
    admissao.getDate(),
  );
  if (comunicacao < aniversario) anos -= 1;
  return Math.max(0, anos);
}

function diasAvisoEmpregador(anos: number): number {
  return Math.min(90, 30 + anos * 3);
}

function diasAvisoPedido(): number {
  return 30;
}

export function calcularDiasAviso(
  motivo: MotivoRescisao,
  dataAdmissao: Date,
  dataComunicacao: Date,
): number {
  const anos = anosCompletos(dataAdmissao, dataComunicacao);
  return motivo === "pedido_demissao"
    ? diasAvisoPedido()
    : diasAvisoEmpregador(anos);
}

function ultimoAniversarioAdmissao(admissao: Date, referencia: Date): Date {
  let ano = referencia.getFullYear();
  let aniversario = new Date(ano, admissao.getMonth(), admissao.getDate());

  if (aniversario > referencia) {
    ano -= 1;
    aniversario = new Date(ano, admissao.getMonth(), admissao.getDate());
  }

  return aniversario;
}

/** Mês conta como avo se trabalhou mais de 14 dias no período. */
function contarAvos(inicio: Date, fim: Date): number {
  const start = startOfDay(inicio);
  const end = startOfDay(fim);
  if (end < start) return 0;

  let avos = 0;
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);

  while (cursor <= end) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const primeiroDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);

    const periodoInicio = start > primeiroDia ? start : primeiroDia;
    const periodoFim = end < ultimoDia ? end : ultimoDia;

    if (periodoFim >= periodoInicio) {
      const diasTrabalhados =
        Math.floor(
          (periodoFim.getTime() - periodoInicio.getTime()) / 86400000,
        ) + 1;
      if (diasTrabalhados > 14) avos += 1;
    }

    cursor = new Date(year, month + 1, 1);
  }

  return avos;
}

function saldoSalario(salario: number, data: Date): number {
  const dias = data.getDate();
  const diasMes = diasNoMes(data);
  return round2((salario / diasMes) * dias);
}

function decimoTerceiroProporcional(salario: number, referencia: Date): number {
  const inicioAno = new Date(referencia.getFullYear(), 0, 1);
  const avos = contarAvos(inicioAno, referencia);
  return round2((salario / 12) * avos);
}

function feriasProporcionais(
  salario: number,
  admissao: Date,
  fimContrato: Date,
): { base: number; terco: number; total: number; avos: number } {
  const inicioPeriodo = ultimoAniversarioAdmissao(admissao, fimContrato);
  const avos = contarAvos(inicioPeriodo, fimContrato);
  const base = round2((salario / 12) * avos);
  const terco = round2(base / 3);
  return { base, terco, total: round2(base + terco), avos };
}

/** CLT art. 137: concessão após o prazo → pagamento em dobro. */
function concessaoVencida(fimContrato: Date, limiteConcessao: Date): boolean {
  return startOfDay(fimContrato) > startOfDay(limiteConcessao);
}

export function listarPeriodosAquisitivos(
  admissao: Date,
  fimContrato: Date,
): PeriodoAquisitivo[] {
  const periodos: PeriodoAquisitivo[] = [];
  let indice = 1;

  while (true) {
    const dataAquisicao = addMonths(admissao, 12 * indice);
    if (startOfDay(fimContrato) < startOfDay(dataAquisicao)) break;

    const inicio = addMonths(admissao, 12 * (indice - 1));
    const fim = addDays(dataAquisicao, -1);
    const limiteConcessao = addDays(addMonths(dataAquisicao, 12), -1);

    periodos.push({
      indice,
      inicio,
      fim,
      limiteConcessao,
      emDobro: concessaoVencida(fimContrato, limiteConcessao),
    });
    indice += 1;
  }

  return periodos;
}

export function resolverDataFimContrato(params: {
  motivo: MotivoRescisao;
  dataAdmissao: Date;
  dataComunicacao: Date;
  avisoPrevio: AvisoPrevio;
}): Date {
  const { motivo, dataAdmissao, dataComunicacao, avisoPrevio } = params;
  const diasAviso = calcularDiasAviso(motivo, dataAdmissao, dataComunicacao);

  const dispensadoPeloEmpregador =
    motivo === "sem_justa_causa" || motivo === "acordo";

  const avisoProjetaContrato =
    motivo !== "com_justa_causa" &&
    (avisoPrevio === "trabalhado" ||
      (dispensadoPeloEmpregador && avisoPrevio === "indenizado"));

  return avisoProjetaContrato
    ? addDays(dataComunicacao, diasAviso)
    : dataComunicacao;
}

function aplicarFeriasNaoGozadas(
  verbas: LinhaBreakdown[],
  salario: number,
  periodos: PeriodoAquisitivo[],
  indicesSelecionados: number[],
): void {
  const selecionados = new Set(indicesSelecionados);
  let totalTerco = 0;

  for (const periodo of periodos) {
    if (!selecionados.has(periodo.indice)) continue;

    const multiplicador = periodo.emDobro ? 2 : 1;
    const base = round2(salario * multiplicador);
    const terco = round2(base / 3);
    totalTerco += terco;

    verbas.push({
      label: `Férias não gozadas — período ${periodo.indice}${periodo.emDobro ? " (em dobro)" : ""}`,
      valor: base,
      tipo: "verba",
    });
  }

  if (totalTerco > 0) {
    verbas.push({
      label: "1/3 constitucional (férias não gozadas)",
      valor: round2(totalTerco),
      tipo: "verba",
    });
  }
}

function valorAvisoPrevio(salario: number, dias: number): number {
  return round2((salario / 30) * dias);
}

function dataLimitePagamentoRescisao(dataTermino: Date): Date {
  return addDays(startOfDay(dataTermino), PRAZO_PAGAMENTO_RESCISAO_DIAS);
}

function mesesContrato(admissao: Date, fim: Date): number {
  const start = startOfDay(admissao);
  const end = startOfDay(fim);
  const meses =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    (end.getDate() >= start.getDate() ? 0 : -1);
  return Math.max(0, meses + 1);
}

export function calcularRescisao(input: RescisaoInput): RescisaoResultado {
  const {
    motivo,
    salarioBruto,
    dataAdmissao,
    dataComunicacao,
    feriasNaoGozadasIndices,
    avisoPrevio,
    diasAvisoTrabalhados,
  } = input;

  const verbas: LinhaBreakdown[] = [];
  const descontos: LinhaBreakdown[] = [];
  const fgts: LinhaBreakdown[] = [];

  const diasAviso = calcularDiasAviso(motivo, dataAdmissao, dataComunicacao);

  const dispensadoPeloEmpregador =
    motivo === "sem_justa_causa" || motivo === "acordo";

  const dataFimContrato = resolverDataFimContrato({
    motivo,
    dataAdmissao,
    dataComunicacao,
    avisoPrevio,
  });

  const avisoProjetaContrato =
    motivo !== "com_justa_causa" &&
    (avisoPrevio === "trabalhado" ||
      (dispensadoPeloEmpregador && avisoPrevio === "indenizado"));

  const avisoTrabalhadoAtivo =
    motivo !== "com_justa_causa" && avisoPrevio === "trabalhado";
  const diasTrabalhadosEfetivos = avisoTrabalhadoAtivo
    ? (diasAvisoTrabalhados ?? diasAviso)
    : 0;
  const dataUltimoDiaTrabalhado = avisoTrabalhadoAtivo
    ? addDays(dataComunicacao, diasTrabalhadosEfetivos)
    : dataComunicacao;
  const origemPrazoPagamento: OrigemPrazoPagamento = avisoTrabalhadoAtivo
    ? "fim_aviso_trabalhado"
    : "data_comunicacao";
  const dataInicioPrazoPagamento = avisoTrabalhadoAtivo
    ? dataUltimoDiaTrabalhado
    : dataComunicacao;
  const dataLimitePagamento = dataLimitePagamentoRescisao(
    dataInicioPrazoPagamento,
  );
  const dataSaldo = avisoTrabalhadoAtivo
    ? dataUltimoDiaTrabalhado
    : dataComunicacao;
  const diasSaldo = dataSaldo.getDate();
  const saldo = saldoSalario(salarioBruto, dataSaldo);
  verbas.push({
    label: `Saldo de salário (${diasSaldo} dias)`,
    valor: saldo,
    tipo: "verba",
  });

  const periodosAquisitivos = listarPeriodosAquisitivos(
    dataAdmissao,
    dataFimContrato,
  );
  const indicesValidos = new Set(
    periodosAquisitivos.map((periodo) => periodo.indice),
  );
  const feriasSelecionadas = feriasNaoGozadasIndices.filter((indice) =>
    indicesValidos.has(indice),
  );
  aplicarFeriasNaoGozadas(
    verbas,
    salarioBruto,
    periodosAquisitivos,
    feriasSelecionadas,
  );

  let decimo = 0;
  let feriasProp = { base: 0, terco: 0, total: 0, avos: 0 };
  let avisoIndenizado = 0;

  if (motivo !== "com_justa_causa") {
    decimo = decimoTerceiroProporcional(salarioBruto, dataFimContrato);
    if (decimo > 0) {
      verbas.push({
        label: "13º salário proporcional",
        valor: decimo,
        tipo: "verba",
      });
    }

    feriasProp = feriasProporcionais(
      salarioBruto,
      dataAdmissao,
      dataFimContrato,
    );
    if (feriasProp.total > 0) {
      verbas.push({
        label: `Férias proporcionais (${feriasProp.avos}/12 avos)`,
        valor: feriasProp.base,
        tipo: "verba",
      });
      verbas.push({
        label: "1/3 constitucional (férias proporcionais)",
        valor: feriasProp.terco,
        tipo: "verba",
      });
    }
  }

  if (dispensadoPeloEmpregador && avisoPrevio === "indenizado") {
    const fatorAviso = motivo === "acordo" ? 0.5 : 1;
    avisoIndenizado = round2(
      valorAvisoPrevio(salarioBruto, diasAviso) * fatorAviso,
    );
    const labelAviso =
      motivo === "acordo"
        ? `Aviso prévio indenizado (50% — ${diasAviso} dias)`
        : `Aviso prévio indenizado (${diasAviso} dias)`;
    verbas.push({
      label: labelAviso,
      valor: avisoIndenizado,
      tipo: "verba",
    });
  }

  if (avisoTrabalhadoAtivo && dispensadoPeloEmpregador) {
    const diasIndenizados = diasAviso - diasTrabalhadosEfetivos;
    if (diasIndenizados > 0) {
      const fatorAviso = motivo === "acordo" ? 0.5 : 1;
      avisoIndenizado = round2(
        valorAvisoPrevio(salarioBruto, diasIndenizados) * fatorAviso,
      );
      const labelAviso =
        motivo === "acordo"
          ? `Aviso prévio indenizado (50% — ${diasIndenizados} dias)`
          : `Aviso prévio indenizado (${diasIndenizados} dias)`;
      verbas.push({
        label: labelAviso,
        valor: avisoIndenizado,
        tipo: "verba",
      });
    }
  }

  if (motivo === "pedido_demissao" && avisoPrevio === "indenizado") {
    const descontoAviso = valorAvisoPrevio(salarioBruto, 30);
    descontos.push({
      label: "Desconto aviso prévio não cumprido (até 30 dias)",
      valor: descontoAviso,
      tipo: "desconto",
    });
  }

  // INSS: saldo e 13º em bases próprias. Aviso indenizado tem INSS e é isento de IRRF.
  const inssSalario = calcularINSS(saldo);
  const inssDecimo = decimo > 0 ? calcularINSS(decimo) : 0;
  const inssAvisoIndenizado =
    avisoIndenizado > 0 ? calcularINSS(avisoIndenizado) : 0;

  if (inssSalario > 0) {
    descontos.push({
      label: "INSS (saldo de salário)",
      valor: inssSalario,
      tipo: "desconto",
    });
  }
  if (inssDecimo > 0) {
    descontos.push({
      label: "INSS (13º proporcional)",
      valor: inssDecimo,
      tipo: "desconto",
    });
  }
  if (inssAvisoIndenizado > 0) {
    descontos.push({
      label: "INSS (aviso prévio indenizado)",
      valor: inssAvisoIndenizado,
      tipo: "desconto",
    });
  }

  // IRRF: saldo de salário. 13º exclusivo. Férias indenizadas e aviso indenizado são isentos.
  const irrfMes = calcularIRRF(saldo, inssSalario);
  const irrfDecimo = decimo > 0 ? calcularIRRF(decimo, inssDecimo) : 0;

  if (irrfMes > 0) {
    descontos.push({
      label: "IRRF (saldo de salário)",
      valor: irrfMes,
      tipo: "desconto",
    });
  }
  if (irrfDecimo > 0) {
    descontos.push({
      label: "IRRF (13º proporcional)",
      valor: irrfDecimo,
      tipo: "desconto",
    });
  }

  const mesesFGTS = mesesContrato(dataAdmissao, dataFimContrato);
  const saldoFGTS = round2(salarioBruto * 0.08 * mesesFGTS);
  fgts.push({
    label: "Saldo FGTS estimado (8% mensal)",
    valor: saldoFGTS,
    tipo: "info",
  });

  if (motivo === "sem_justa_causa") {
    const multa = round2(saldoFGTS * 0.4);
    fgts.push({
      label: "Multa rescisória FGTS (40%) — depositada na conta FGTS",
      valor: multa,
      tipo: "info",
    });
  }

  if (motivo === "acordo") {
    const multa = round2(saldoFGTS * 0.2);
    const saque80 = round2(saldoFGTS * 0.8);
    fgts.push({
      label: "Multa rescisória FGTS (20%) — depositada na conta FGTS",
      valor: multa,
      tipo: "info",
    });
    fgts.push({
      label: "Saque de até 80% do FGTS",
      valor: saque80,
      tipo: "info",
    });
  }

  const totalVerbas = round2(
    verbas.reduce((sum, linha) => sum + linha.valor, 0),
  );
  const totalDescontos = round2(
    descontos.reduce((sum, linha) => sum + linha.valor, 0),
  );
  const liquido = round2(totalVerbas - totalDescontos);

  return {
    verbas,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    liquido,
    tabelasAno: TABELAS_ANO,
    dataFimContrato,
    diasAviso,
    avisoProjetaContrato,
    dataInicioPrazoPagamento,
    dataLimitePagamento,
    origemPrazoPagamento,
  };
}

export const SEGURO_DESEMPREGO_CALCULADORA_HREF =
  "/calculadoras/seguro-desemprego";
export const SEGURO_DESEMPREGO_GUIA_HREF = "/guias/seguro-desemprego";

export type SeguroDesempregoInfo = {
  elegivel: boolean;
  titulo: string;
  texto: string;
  ctaLabel: string;
  href: string;
};

export function getSeguroDesempregoInfo(
  motivo: MotivoRescisao,
): SeguroDesempregoInfo {
  switch (motivo) {
    case "sem_justa_causa":
      return {
        elegivel: true,
        titulo: "Seguro-desemprego",
        texto:
          "Na demissão sem justa causa, você pode ter direito ao seguro-desemprego se atender aos requisitos legais (tempo de vínculo, ausência de renda própria, entre outros). O benefício não entra no líquido da rescisão.",
        ctaLabel: "Calcular seguro-desemprego",
        href: SEGURO_DESEMPREGO_CALCULADORA_HREF,
      };
    case "pedido_demissao":
      return {
        elegivel: false,
        titulo: "Seguro-desemprego",
        texto:
          "No pedido de demissão não há direito ao seguro-desemprego. O benefício é destinado a quem foi dispensado sem justa causa.",
        ctaLabel: "Entenda o seguro-desemprego",
        href: SEGURO_DESEMPREGO_GUIA_HREF,
      };
    case "com_justa_causa":
      return {
        elegivel: false,
        titulo: "Seguro-desemprego",
        texto:
          "Na demissão por justa causa não há direito ao seguro-desemprego.",
        ctaLabel: "Entenda o seguro-desemprego",
        href: SEGURO_DESEMPREGO_GUIA_HREF,
      };
    case "acordo":
      return {
        elegivel: false,
        titulo: "Seguro-desemprego",
        texto:
          "No acordo rescisório (art. 484-A) não há direito ao seguro-desemprego.",
        ctaLabel: "Entenda o seguro-desemprego",
        href: SEGURO_DESEMPREGO_GUIA_HREF,
      };
  }
}

export function parseDataInput(value: string): Date | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dia, mes, ano] = match;
  const date = new Date(Number(ano), Number(mes) - 1, Number(dia));
  if (
    date.getFullYear() !== Number(ano) ||
    date.getMonth() !== Number(mes) - 1 ||
    date.getDate() !== Number(dia)
  ) {
    return null;
  }
  return date;
}

export function formatarDataInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function formatarDataExibicao(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}

export function formatarIntervaloPeriodo(inicio: Date, fim: Date): string {
  return `${formatarDataExibicao(inicio)} – ${formatarDataExibicao(fim)}`;
}
