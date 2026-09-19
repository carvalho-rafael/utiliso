import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["libxmljs2"],
  async redirects() {
    return [
      {
        source: "/rescisao",
        destination: "/calculadoras/rescisao",
        permanent: true,
      },
      {
        source: "/salario-liquido",
        destination: "/calculadoras/salario-liquido",
        permanent: true,
      },
      {
        source: "/ferias",
        destination: "/calculadoras/ferias",
        permanent: true,
      },
      {
        source: "/decimo-terceiro",
        destination: "/calculadoras/decimo-terceiro",
        permanent: true,
      },
      {
        source: "/hora-extra",
        destination: "/calculadoras/hora-extra",
        permanent: true,
      },
      {
        source: "/seguro-desemprego",
        destination: "/calculadoras/seguro-desemprego",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
