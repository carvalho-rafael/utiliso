"use client";

import { json } from "@codemirror/lang-json";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { useMemo, useSyncExternalStore } from "react";
import { utilisoJsonSyntaxHighlight } from "./json-codemirror-highlight";
import { jsonSyntaxLinter } from "./json-codemirror-linter";
import { utilisoCodeMirrorTheme } from "./json-codemirror-theme";

const THEME_CHANGE_EVENT = "utiliso-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

type JsonCodemirrorEditorProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  "aria-describedby"?: string;
};

export function JsonCodemirrorEditor({
  id,
  value,
  onChange,
  "aria-describedby": ariaDescribedBy,
}: JsonCodemirrorEditorProps) {
  const colorScheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light",
  );

  const extensions = useMemo((): Extension[] => {
    return [
      json(),
      utilisoJsonSyntaxHighlight(),
      jsonSyntaxLinter(),
      EditorView.lineWrapping,
      utilisoCodeMirrorTheme(),
    ];
  }, [colorScheme]);

  return (
    <div
      className="overflow-hidden rounded-lg border border-border focus-within:ring-2 focus-within:ring-accent"
    >
      <CodeMirror
        id={id}
        value={value}
        height="14rem"
        theme="none"
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          syntaxHighlighting: false,
        }}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
}
