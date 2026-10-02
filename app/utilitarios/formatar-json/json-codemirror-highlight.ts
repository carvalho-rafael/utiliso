import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { tags } from "@lezer/highlight";

const utilisoJsonHighlightStyle = HighlightStyle.define([
  {
    tag: [tags.definition(tags.propertyName), tags.propertyName, tags.labelName],
    color: "var(--accent)",
  },
  { tag: tags.string, color: "var(--success)" },
  {
    tag: [tags.number, tags.integer, tags.float, tags.bool, tags.null, tags.atom],
    color: "var(--highlight)",
  },
  {
    tag: [tags.bracket, tags.squareBracket, tags.paren, tags.brace],
    color: "var(--foreground)",
  },
  { tag: [tags.punctuation, tags.separator], color: "var(--muted)" },
]);

export function utilisoJsonSyntaxHighlight(): Extension {
  return syntaxHighlighting(utilisoJsonHighlightStyle);
}
