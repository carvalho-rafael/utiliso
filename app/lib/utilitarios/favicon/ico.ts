export type IconPngEntry = {
  width: number;
  height: number;
  data: Uint8Array;
};

export function montarIco(entries: IconPngEntry[]): Uint8Array {
  if (entries.length === 0) {
    throw new Error("Informe ao menos uma imagem para o ICO.");
  }

  const count = entries.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + count * dirEntrySize;

  let imageBytes = 0;
  for (const entry of entries) {
    imageBytes += entry.data.length;
  }

  const out = new Uint8Array(dirSize + imageBytes);
  const view = new DataView(out.buffer, out.byteOffset, out.byteLength);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);

  let offset = dirSize;

  for (let i = 0; i < count; i++) {
    const entry = entries[i];
    const entryOffset = headerSize + i * dirEntrySize;
    const widthByte = entry.width >= 256 ? 0 : entry.width;
    const heightByte = entry.height >= 256 ? 0 : entry.height;

    out[entryOffset] = widthByte;
    out[entryOffset + 1] = heightByte;
    out[entryOffset + 2] = 0;
    out[entryOffset + 3] = 0;
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, entry.data.length, true);
    view.setUint32(entryOffset + 12, offset, true);

    out.set(entry.data, offset);
    offset += entry.data.length;
  }

  return out;
}
