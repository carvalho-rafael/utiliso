# Utiliso

Portal brasileiro de ferramentas gratuitas em português. Cada página tem URL própria, título e texto editorial — como funciona e perguntas frequentes — para quem precisa de uma estimativa ou de uma regra explicada, sem cadastro e sem conta.

O público é amplo: empregado, empregador e RH nas ferramentas de trabalho; quem emite ou confere nota na reforma do consumo; quem publica site nos utilitários de web. A monetização é por anúncios (Google AdSense), com banner de consentimento da LGPD. Não há paywall.

As calculadoras rodam no navegador. Salário, datas e os demais campos do formulário não vão ao servidor nem ao Analytics. A exceção é o validador de NF-e: o XML sobe só para conferir o schema da Sefaz e não é gravado. O resultado das calculadoras é uma estimativa com base na CLT e nas tabelas oficiais vigentes (INSS, IRRF, FGTS, seguro-desemprego, IBS/CBS). Não substitui contador, advogado ou departamento pessoal.

O conteúdo se agrupa em três hubs — Trabalho, Reforma tributária e Web — e em quatro tipos de página:

- **Calculadoras.** Formulário e resultado estimado: rescisão, salário líquido, férias, 13º, hora extra, seguro-desemprego, IBS/CBS e outras verbas da folha.
- **Tabelas.** Valores oficiais vigentes (INSS, IRRF, salário mínimo, seguro-desemprego, alíquotas de teste de IBS/CBS), com vigência, data de revisão e fonte.
- **Guias.** Explicação de um direito ou regra — demissão, parcelas do 13º, cronograma da reforma, NF-e em 2026 — com ligação para a calculadora ou a tabela correspondente.
- **Utilitários.** Validador de XML da NF-e, consulta de cClassTrib/CST, criador de favicon e contador de caracteres.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |
| `npm test` | testes (Vitest) |

`NEXT_PUBLIC_GA_MEASUREMENT_ID` liga o Google Analytics 4. Sem a variável, o app usa o ID padrão do projeto.
