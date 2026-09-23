#!/usr/bin/env python3
"""
Gera app/lib/utilitarios/cclasstrib/registros.json a partir do portal SVRS
(tabela cClassTrib vigente) e ajustes do Informe Técnico 2025.002 v.1.60.

Uso (com rede):
  python3 scripts/gerar-cclasstrib-snapshot.py

Requer: apenas biblioteca padrão.
"""

from __future__ import annotations

import csv
import html
import json
import re
import sys
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "app/lib/utilitarios/cclasstrib/registros.json"
SVRS_URL = "https://dfe-portal.svrs.rs.gov.br/DFE/ClassificacaoTributaria"

# Fim de vigência dos cClassTrib do CST 220 substituídos na v.1.60 (IT 2025.002).
FIM_VIG_CST_220 = "2026-07-09"

# Campos completos para códigos novos na v.1.60 (sem linha na planilha base antiga).
OVERRIDES_V160: dict[str, dict] = {
    "000005": {
        "descricao": (
            "Operação com EAC destinado à mistura com gasolina A, mas com saída "
            "do biocombustível com destinação diversa, observado o art. 172 da "
            "Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 172",
        "tipoAliquota": "Padrão",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-01-01",
    },
    "200054": {
        "descricao": (
            "Fornecimento de bem material pela cooperativa de produção agropecuária "
            "a associado não sujeito ao regime regular do IBS e da CBS, observado "
            "o art. 271 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 271",
        "tipoAliquota": "Padrão",
        "pRedIbs": 100,
        "pRedCbs": 100,
        "inicioVigencia": "2026-01-01",
    },
    "221002": {
        "descricao": (
            "Incorporação imobiliária submetida ao regime especial de tributação, "
            "observado o art. 485 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 485, I",
        "tipoAliquota": "Fixa",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "221003": {
        "descricao": (
            "Incorporação imobiliária submetida ao regime especial de tributação, "
            "observado o art. 485 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 485, II",
        "tipoAliquota": "Fixa",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "221004": {
        "descricao": (
            "Alienação de imóvel decorrente de parcelamento do solo, observado "
            "o art. 486 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 486",
        "tipoAliquota": "Fixa",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "410036": {
        "descricao": (
            "Descontos incondicionais concedidos sobre o valor da operação, "
            "observado o art. 12 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 12",
        "tipoAliquota": "Sem alíquota",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "410037": {
        "descricao": (
            "Importação de bens materiais sem incidência de IBS e CBS, observado "
            "o art. 6º da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 6º",
        "tipoAliquota": "Sem alíquota",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "550024": {
        "descricao": (
            "Regime Tributário para Incentivo à Atividade Naval - Renaval "
            "(Art. 107, II), observado o art. 107 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 107, II",
        "tipoAliquota": "Uniforme setorial",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "550025": {
        "descricao": (
            "Regime Tributário para Incentivo à Atividade Naval - Renaval "
            "(Art. 107, III), observado o art. 107 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 107, III",
        "tipoAliquota": "Uniforme setorial",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
    "620007": {
        "descricao": (
            "Perecimento, deteriorização, roubo, furto ou extravio no regime "
            "monofásico, observado o art. 172 da Lei Complementar nº 214, de 2025."
        ),
        "lc214": "Art. 172",
        "tipoAliquota": "Uniforme nacional (referência)",
        "pRedIbs": 0,
        "pRedCbs": 0,
        "inicioVigencia": "2026-07-10",
    },
}


def br_date_to_iso(value: str) -> str | None:
    value = (value or "").strip()
    if not value:
        return None
    parts = value.split("/")
    if len(parts) != 3:
        return None
    day, month, year = parts
    return f"{year}-{month.zfill(2)}-{day.zfill(2)}"


def fetch_svrs_options() -> dict[str, dict[str, str]]:
    with urlopen(SVRS_URL, timeout=90) as response:
        content = response.read().decode("utf-8", errors="replace")
    options = re.findall(
        r'<option value="(\d{6})" data-cst="(\d{3})">(\d{6})\s*-\s*([^<]+)</option>',
        content,
    )
    result: dict[str, dict[str, str]] = {}
    for _val, cst, code, nome in options:
        result[code] = {"cst": cst, "nome": html.unescape(nome.strip())}
    return result


def load_base_csv() -> dict[str, dict[str, str]]:
    csv_path = Path("/tmp/cclasstrib-base.csv")
    if not csv_path.is_file():
        raise SystemExit(
            "Baixe a planilha base (colunas do IT) para /tmp/cclasstrib-base.csv "
            "ou rode o script após curl da fonte de apoio."
        )
    rows: dict[str, dict[str, str]] = {}
    with csv_path.open(encoding="latin-1") as handle:
        reader = csv.DictReader(handle, delimiter=";")
        for row in reader:
            code = (row.get("cClassTrib") or "").strip()
            if code:
                rows[code] = row
    return rows


def row_from_csv(row: dict[str, str], cst_desc: str) -> dict:
    cst = row["CST-IBS/CBS"].strip().zfill(3)
    return {
        "cclasstrib": row["cClassTrib"].strip(),
        "cst": cst,
        "nome": row["Nome cClassTrib"].strip(),
        "descricao": row["Descrição cClassTrib"].strip(),
        "cstDescricao": cst_desc,
        "tipoAliquota": row["Tipo de Alíquota"].strip(),
        "pRedIbs": int(float(row["pRedIBS"] or 0)),
        "pRedCbs": int(float(row["pRedCBS"] or 0)),
        "lc214": (row.get("LC 214/25") or "").strip(),
        "inicioVigencia": br_date_to_iso(row.get("dIniVig", "")),
        "fimVigencia": br_date_to_iso(row.get("dFimVig", "")),
    }


def main() -> None:
    svrs = fetch_svrs_options()
    if len(svrs) < 150:
        print(f"AVISO: poucos códigos no SVRS ({len(svrs)})", file=sys.stderr)

    base: dict[str, dict[str, str]] = {}
    cst_descriptions: dict[str, str] = {}

    csv_path = Path("/tmp/cclasstrib-base.csv")
    if csv_path.is_file():
        base = load_base_csv()
        for row in base.values():
            cst = row["CST-IBS/CBS"].strip().zfill(3)
            cst_descriptions[cst] = row["Descrição CST-IBS/CBS"].strip()

    registros: list[dict] = []
    for code in sorted(svrs.keys()):
        sv = svrs[code]
        cst = sv["cst"]
        nome = sv["nome"]

        if code in base:
            item = row_from_csv(base[code], cst_descriptions.get(cst, ""))
        elif code in OVERRIDES_V160:
            ov = OVERRIDES_V160[code]
            item = {
                "cclasstrib": code,
                "cst": cst,
                "nome": nome,
                "descricao": ov["descricao"],
                "cstDescricao": cst_descriptions.get(cst, ""),
                "tipoAliquota": ov["tipoAliquota"],
                "pRedIbs": ov["pRedIbs"],
                "pRedCbs": ov["pRedCbs"],
                "lc214": ov["lc214"],
                "inicioVigencia": ov["inicioVigencia"],
                "fimVigencia": None,
            }
        else:
            raise SystemExit(f"Código {code} sem base CSV nem override v1.60")

        if code in ("220001", "220002", "220003"):
            item["fimVigencia"] = FIM_VIG_CST_220

        registros.append(item)

    payload = {
        "informeTecnico": "2025.002",
        "versao": "1.60",
        "publicadoEm": "2026-06-22",
        "registros": registros,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Gravado {len(registros)} registros em {OUT}")


if __name__ == "__main__":
    main()
