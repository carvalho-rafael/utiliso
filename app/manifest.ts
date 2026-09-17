import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Utiliso",
    short_name: "Utiliso",
    description:
      "Calculadoras trabalhistas gratuitas para ajudar nas contas importantes do dia a dia.",
    start_url: "/",
    display: "standalone",
    background_color: "#eceef2",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
