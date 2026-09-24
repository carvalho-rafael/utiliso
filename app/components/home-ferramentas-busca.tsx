"use client";

import { useState } from "react";
import { FerramentasBuscaCampo } from "./ferramentas-busca-campo";
import { HomeHubs } from "./home-hubs";

export function HomeFerramentasBusca() {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-8">
      <FerramentasBuscaCampo
        inputId="home-busca-ferramenta"
        resultadosId="home-busca-resultados"
        showLabel
        onQueryChange={setQuery}
      />

      {!isSearching ? <HomeHubs /> : null}
    </div>
  );
}
