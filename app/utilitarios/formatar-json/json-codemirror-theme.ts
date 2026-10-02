import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export function utilisoCodeMirrorTheme(): Extension {
  return EditorView.theme({
    "&": {
      backgroundColor: "var(--surface)",
      color: "var(--foreground)",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-scroller": {
      fontFamily: "var(--font-mono), ui-monospace, monospace",
      fontSize: "0.875rem",
      lineHeight: "1.45",
    },
    ".cm-content": {
      fontSize: "0.875rem",
      caretColor: "var(--foreground)",
    },
    ".cm-gutter": {
      fontSize: "0.75rem",
    },
    ".cm-gutters": {
      backgroundColor: "var(--background)",
      color: "var(--muted)",
      borderRight: "1px solid var(--border)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "var(--background)",
    },
    ".cm-activeLine": {
      backgroundColor: "color-mix(in srgb, var(--accent) 8%, transparent)",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "var(--foreground)",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "color-mix(in srgb, var(--accent) 25%, transparent) !important",
    },
    ".cm-diagnostic-error": {
      borderLeftColor: "var(--danger)",
    },
    ".cm-lintRange-error": {
      textDecoration: "underline wavy var(--danger)",
    },
  });
}
