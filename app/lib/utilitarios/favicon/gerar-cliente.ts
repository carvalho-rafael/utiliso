export const MAX_PNG_BYTES = 8 * 1024 * 1024;

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;

export function isAssinaturaPng(bytes: Uint8Array): boolean {
  if (bytes.length < PNG_SIGNATURE.length) return false;
  return PNG_SIGNATURE.every((byte, index) => bytes[index] === byte);
}

export async function redimensionarPngQuadrado(
  bitmap: ImageBitmap,
  size: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Não foi possível usar o canvas neste navegador.");
  }

  ctx.clearRect(0, 0, size, size);
  const scale = Math.min(size / bitmap.width, size / bitmap.height);
  const drawWidth = bitmap.width * scale;
  const drawHeight = bitmap.height * scale;
  const dx = (size - drawWidth) / 2;
  const dy = (size - drawHeight) / 2;
  ctx.drawImage(bitmap, dx, dy, drawWidth, drawHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Falha ao gerar PNG."));
      },
      "image/png",
    );
  });
}

export async function blobParaUint8Array(blob: Blob): Promise<Uint8Array> {
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}
