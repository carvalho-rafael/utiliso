import { describe, expect, it } from "vitest";
import { calculadoras } from "./calculadoras/catalog";
import { guias } from "./guias/catalog";
import { buildLlmsTxt } from "./llms";
import { SITE_URL } from "./site";
import { tabelas } from "./tabelas/catalog";

describe("buildLlmsTxt", () => {
  const text = buildLlmsTxt();

  it("follows the llms.txt heading and summary", () => {
    expect(text.startsWith("# Utiliso\n\n> ")).toBe(true);
    expect(text).toContain("## Calculadoras\n");
    expect(text).toContain("## Optional\n");
  });

  it("lists catalog pages with absolute URLs", () => {
    for (const item of [...calculadoras, ...guias, ...tabelas]) {
      expect(text).toContain(`[${item.title}](${SITE_URL}${item.href})`);
    }
  });
});
