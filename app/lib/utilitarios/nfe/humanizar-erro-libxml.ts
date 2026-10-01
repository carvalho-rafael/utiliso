/** Traduz mensagens comuns do libxml/libxmljs para pt-BR. */

function tagDeNamespace(raw: string): string | null {
  const comNs = raw.match(/Element '\{[^}]+\}([^']+)'/);
  if (comNs?.[1]) return comNs[1];
  const simples = raw.match(/Element '([^']+)'/);
  return simples?.[1] ?? null;
}

function filhosEsperados(raw: string): string | null {
  const expected = raw.match(/Expected is \(\s*([^)]+)\s*\)/i);
  if (expected?.[1]) return expected[1].replace(/\s+/g, " ").trim();
  const lista = raw.match(/List of possible elements expected: '([^']+)'/i);
  if (lista?.[1]) return lista[1].trim();
  return null;
}

function filhoInvalido(raw: string): string | null {
  const m = raw.match(/invalid child element '([^']+)'/i);
  return m?.[1] ?? null;
}

function valorEntreAspas(raw: string, rotulo: string): string | null {
  const re = new RegExp(`${rotulo}\\s+'([^']*)'`, "i");
  return raw.match(re)?.[1] ?? null;
}

export function humanizarMensagemErroXml(raw: string): {
  mensagem: string;
  mensagemTecnica?: string;
} {
  const tecnica = raw.trim();
  if (!tecnica) {
    return { mensagem: "Erro de estrutura no XML." };
  }

  if (/Opening and ending tag mismatch/i.test(tecnica)) {
    const mismatch = tecnica.match(
      /Opening and ending tag mismatch:\s*(\S+)\s+line\s+(\d+)\s+and\s+(\S+)/i,
    );
    if (mismatch) {
      return {
        mensagem: `Tag aberta como "${mismatch[1]}" na linha ${mismatch[2]}, mas fechada como "${mismatch[3]}". Confira se nenhuma tag ficou sem fechar.`,
        mensagemTecnica: tecnica,
      };
    }
    return {
      mensagem:
        "Há tags abertas e fechadas com nomes diferentes — XML cortado ou tag não fechada.",
      mensagemTecnica: tecnica,
    };
  }

  if (/Premature end of data in tag/i.test(tecnica)) {
    const tag = tecnica.match(/in tag (\S+)/i)?.[1];
    return {
      mensagem: tag
        ? `O arquivo termina no meio da tag "${tag}". Confira se o XML não foi cortado na exportação.`
        : "O arquivo termina no meio de uma tag. Confira se o XML não foi cortado.",
      mensagemTecnica: tecnica,
    };
  }

  if (/This element is not expected/i.test(tecnica)) {
    const tag = tagDeNamespace(tecnica);
    const esperados = filhosEsperados(tecnica);
    if (tag && esperados) {
      return {
        mensagem: `A tag "${tag}" não deveria estar neste ponto do leiaute. Nesta posição o schema espera: ${esperados}.`,
        mensagemTecnica: tecnica,
      };
    }
    if (tag) {
      return {
        mensagem: `A tag "${tag}" está fora de ordem ou não faz parte deste trecho do leiaute.`,
        mensagemTecnica: tecnica,
      };
    }
  }

  const filho = filhoInvalido(tecnica);
  if (filho) {
    const esperados = filhosEsperados(tecnica);
    if (esperados) {
      return {
        mensagem: `A tag "${filho}" não é permitida aqui. Tags aceitas neste ponto: ${esperados}.`,
        mensagemTecnica: tecnica,
      };
    }
    return {
      mensagem: `A tag "${filho}" não é permitida neste trecho do XML.`,
      mensagemTecnica: tecnica,
    };
  }

  if (/\[facet 'pattern'\]/i.test(tecnica)) {
    const valor = valorEntreAspas(tecnica, "The value");
    return {
      mensagem: valor
        ? `O valor "${valor}" não segue o formato exigido pelo leiaute (padrão de caracteres ou tamanho).`
        : "Um campo não segue o formato exigido pelo leiaute (padrão de caracteres ou tamanho).",
      mensagemTecnica: tecnica,
    };
  }

  if (/is not a valid value of the atomic type/i.test(tecnica)) {
    const valor = valorEntreAspas(tecnica, "The value");
    const tipo = tecnica.match(/atomic type '([^']+)'/i)?.[1];
    const tipoLegivel =
      tipo?.includes("decimal") || tipo?.includes("integer")
        ? "número"
        : tipo?.includes("date")
          ? "data"
          : "texto no padrão da NF-e";
    return {
      mensagem: valor
        ? `"${valor}" não é um ${tipoLegivel} válido para este campo.`
        : `Há um valor com tipo incorreto (esperado ${tipoLegivel}).`,
      mensagemTecnica: tecnica,
    };
  }

  if (/Missing child element/i.test(tecnica)) {
    const esperado = tecnica.match(/Expected is \(\s*([^)]+)\s*\)/i)?.[1];
    return {
      mensagem: esperado
        ? `Falta uma tag obrigatória. O leiaute espera: ${esperado.trim()}.`
        : "Falta uma tag obrigatória neste trecho do XML.",
      mensagemTecnica: tecnica,
    };
  }

  if (/Element '.+': No matching global declaration/i.test(tecnica)) {
    const tag = tagDeNamespace(tecnica);
    return {
      mensagem: tag
        ? `A tag "${tag}" não pertence ao leiaute deste pacote XSD — confira namespace e versão do schema.`
        : "Uma tag não pertence ao leiaute deste pacote XSD.",
      mensagemTecnica: tecnica,
    };
  }

  if (/Extra content at the end of the document/i.test(tecnica)) {
    return {
      mensagem:
        "Há conteúdo depois do fim do documento XML. Remova lixo ou XML duplicado após a tag de fechamento.",
      mensagemTecnica: tecnica,
    };
  }

  if (/Start tag expected/i.test(tecnica) || /Couldn't find end of Start Tag/i.test(tecnica)) {
    return {
      mensagem:
        "O XML está incompleto ou malformado — confira tags de abertura e fechamento.",
      mensagemTecnica: tecnica,
    };
  }

  if (/EntityRef: expecting/i.test(tecnica)) {
    return {
      mensagem:
        "Caractere especial (&) sem escape. Em XML, use &amp;, &lt; ou coloque o texto em CDATA.",
      mensagemTecnica: tecnica,
    };
  }

  if (/Document is empty/i.test(tecnica)) {
    return { mensagem: "O arquivo XML está vazio." };
  }

  if (/parser error/i.test(tecnica)) {
    const detalhe = tecnica.replace(/^.*error:\s*/i, "").trim();
    if (detalhe && detalhe !== tecnica) {
      const aninhado = humanizarMensagemErroXml(detalhe);
      if (aninhado.mensagem !== detalhe || aninhado.mensagemTecnica) {
        return {
          mensagem: aninhado.mensagem,
          mensagemTecnica: aninhado.mensagemTecnica ?? tecnica,
        };
      }
    }
  }

  return {
    mensagem: "Erro de estrutura no leiaute. Veja a mensagem técnica abaixo ou confira linha e coluna.",
    mensagemTecnica: tecnica,
  };
}
