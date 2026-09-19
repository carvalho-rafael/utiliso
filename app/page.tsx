import { HomeFerramentasBusca } from "./components/home-ferramentas-busca";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Resolva sem complicação.
        </h1>
        <p className="text-lg text-muted">
          Ferramentas, calculadoras, tabelas e guias gratuitos
          para ajudar nas tarefas e dúvidas do dia a dia.
        </p>
      </div>

      <HomeFerramentasBusca />
    </main>
  );
}
