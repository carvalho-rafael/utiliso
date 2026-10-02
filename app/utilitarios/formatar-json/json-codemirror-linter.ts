import { linter } from "@codemirror/lint";
import type { Extension } from "@codemirror/state";
import { diagnosticSintaxeJson } from "../../lib/utilitarios/formatar-json/formatar";

export function jsonSyntaxLinter(): Extension {
  return linter((view) => {
    const diagnostic = diagnosticSintaxeJson(view.state.doc.toString());
    if (!diagnostic) {
      return [];
    }

    const lineCount = view.state.doc.lines;
    const lineNo = Math.min(Math.max(1, diagnostic.linha), lineCount);
    const line = view.state.doc.line(lineNo);
    const col = Math.min(Math.max(1, diagnostic.coluna), line.length + 1);
    const from = line.from + col - 1;
    const to = Math.min(from + 1, line.to);

    return [
      {
        from,
        to,
        severity: "error",
        message: diagnostic.mensagem,
      },
    ];
  });
}
