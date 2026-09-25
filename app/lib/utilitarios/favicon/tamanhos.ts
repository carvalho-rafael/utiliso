export type FaviconSaidaPng = {
  size: number;
  filename: string;
  linkRel?: "icon" | "apple-touch-icon";
  linkSizes?: string;
  incluirNoIco?: boolean;
};

export const FAVICON_SAIDAS_PNG: FaviconSaidaPng[] = [
  {
    size: 16,
    filename: "favicon-16x16.png",
    linkRel: "icon",
    linkSizes: "16x16",
    incluirNoIco: true,
  },
  {
    size: 32,
    filename: "favicon-32x32.png",
    linkRel: "icon",
    linkSizes: "32x32",
    incluirNoIco: true,
  },
  {
    size: 48,
    filename: "favicon-48x48.png",
    linkRel: "icon",
    linkSizes: "48x48",
    incluirNoIco: true,
  },
  {
    size: 180,
    filename: "apple-touch-icon.png",
    linkRel: "apple-touch-icon",
  },
  { size: 192, filename: "android-chrome-192x192.png" },
  { size: 512, filename: "android-chrome-512x512.png" },
];

export const FAVICON_ICO_FILENAME = "favicon.ico";

export function montarTagsLinkHtml(): string {
  const linhas: string[] = [];

  for (const saida of FAVICON_SAIDAS_PNG) {
    if (saida.linkRel === "apple-touch-icon") {
      linhas.push(
        `<link rel="apple-touch-icon" sizes="${saida.size}x${saida.size}" href="/${saida.filename}">`,
      );
    } else if (saida.linkRel === "icon" && saida.linkSizes) {
      linhas.push(
        `<link rel="icon" type="image/png" sizes="${saida.linkSizes}" href="/${saida.filename}">`,
      );
    }
  }

  linhas.push(
    `<link rel="icon" href="/${FAVICON_ICO_FILENAME}" sizes="any">`,
  );

  return linhas.join("\n");
}
