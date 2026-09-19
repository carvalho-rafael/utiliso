# Schemas XSD — NF-e

Pacotes oficiais da Sefaz usados pelo validador de NF-e do Utiliso.

## Pacote em uso

| Pasta | Uso |
| --- | --- |
| `PL_010_V1.30` | NF-e modelo 55, leiaute 4.00 (inclui IBS/CBS — `DFeTiposBasicos_v1.00.xsd`) |

Fonte: portal da NF-e / Nota Técnica 2025.002-RTC (reforma do consumo).

## Entry points do validador

| Raiz do XML | Schema |
| --- | --- |
| `nfeProc` | `procNFe_v4.00.xsd` |
| `NFe` | `nfe_v4.00.xsd` |
| `enviNFe` | `enviNFe_v4.00.xsd` |

Não coloque estes arquivos em `public/` — a validação resolve `xs:include` pelo caminho no disco (`app/lib/utilitarios/nfe/xsd/...`).

## Atualização

1. Baixe o zip oficial da Sefaz.
2. Extraia em uma subpasta nova (ex.: `PL_010_V1.31`) sem misturar versões.
3. Ajuste `NFE_XSD_PACOTE` em `app/lib/utilitarios/nfe/constants.ts`.
4. Atualize este README e a página do validador (vigência / NT).
