import { HomeCalculators } from "./components/home-calculators";
import { HomeGuides } from "./components/home-guides";
import { HomeTabelas } from "./components/home-tabelas";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Calcule sem complicação.
        </h1>
        <p className="text-lg text-muted">
          Calculadoras, tabelas e guias gratuitos para ajudar nas contas e
          dúvidas do dia a dia.
        </p>
      </div>

      <HomeCalculators />
      <HomeTabelas />
      <HomeGuides />
    </main>
  );
}
