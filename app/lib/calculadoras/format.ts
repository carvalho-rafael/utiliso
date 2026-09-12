export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseMoeda(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

export function formatarMoedaInput(value: string): string {
  const numero = parseMoeda(value);
  if (numero === 0 && value.replace(/\D/g, "") === "") return "";
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
