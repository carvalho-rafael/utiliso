import { describe, expect, it } from "vitest";
import { montarIco } from "./ico";

function fakePng(label: string): Uint8Array {
  return new TextEncoder().encode(`PNG:${label}`);
}

describe("montarIco", () => {
  it("monta cabeçalho ICO com uma imagem", () => {
    const data = fakePng("16");
    const ico = montarIco([{ width: 16, height: 16, data }]);

    expect(ico.length).toBe(6 + 16 + data.length);
    expect(ico[0]).toBe(0);
    expect(ico[1]).toBe(0);
    expect(ico[2]).toBe(1);
    expect(ico[3]).toBe(0);
    expect(ico[4]).toBe(1);
    expect(ico[5]).toBe(0);
    expect(ico[6]).toBe(16);
    expect(ico[7]).toBe(16);

    const offset =
      ico[18] | (ico[19] << 8) | (ico[20] << 16) | (ico[21] << 24);
    expect(offset).toBe(22);
    expect(Array.from(ico.slice(offset, offset + data.length))).toEqual(
      Array.from(data),
    );
  });

  it("empilha várias imagens com offsets corretos", () => {
    const png16 = fakePng("16");
    const png32 = fakePng("32");
    const ico = montarIco([
      { width: 16, height: 16, data: png16 },
      { width: 32, height: 32, data: png32 },
    ]);

    expect(ico[4]).toBe(2);
    expect(ico[5]).toBe(0);

    const offset0 =
      ico[18] | (ico[19] << 8) | (ico[20] << 16) | (ico[21] << 24);
    const offset1 =
      ico[34] | (ico[35] << 8) | (ico[36] << 16) | (ico[37] << 24);

    expect(offset0).toBe(38);
    expect(offset1).toBe(38 + png16.length);
    expect(Array.from(ico.slice(offset1, offset1 + png32.length))).toEqual(
      Array.from(png32),
    );
  });
});
