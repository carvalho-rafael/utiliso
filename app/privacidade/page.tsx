import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade — Utiliso",
  description:
    "Como o Utiliso trata dados pessoais, cookies de medição (Google Analytics) e suas escolhas de privacidade.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-12 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Política de privacidade
        </h1>
        <p className="text-lg text-muted">
          Última atualização: setembro de 2026.
        </p>
      </div>

      <section className="flex flex-col gap-4 text-sm text-muted">
        <h2 className="text-base font-medium text-foreground">
          Quem somos
        </h2>
        <p>
          O Utiliso é um portal de calculadoras trabalhistas e guias em
          português. Não exigimos cadastro para usar as ferramentas.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Dados das calculadoras
        </h2>
        <p>
          Os cálculos são feitos <strong className="text-foreground">no seu
          navegador</strong>. Salário, datas e demais campos que você informa{" "}
          <strong className="text-foreground">não são enviados</strong> aos
          nossos servidores nem ao Google Analytics.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Google Analytics (medição)
        </h2>
        <p>
          Com seu consentimento, usamos o Google Analytics 4 para medir páginas
          visitadas, tipo de dispositivo e origem aproximada do tráfego. O site
          utiliza o <strong className="text-foreground">Consent Mode
          avançado</strong> do Google: o script de medição pode carregar, mas o
          cookie de Analytics só é gravado se você clicar em{" "}
          <strong className="text-foreground">Aceitar</strong> no banner de
          cookies.
        </p>
        <p>
          Se você <strong className="text-foreground">recusar</strong>, não
          usamos cookie de identificação. O Google pode receber pings agregados
          sem identificar você, para estimar o volume de acesso no painel
          (modelagem estatística).
        </p>

        <h2 className="text-base font-medium text-foreground">
          Anúncios (futuro)
        </h2>
        <p>
          Podemos exibir anúncios (Google AdSense) no futuro. Cookies de
          publicidade permanecem desativados até haver consentimento específico
          para anúncios. Hoje o site não exibe anúncios personalizados.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Como exercer suas escolhas
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Use o banner de cookies na primeira visita ou o link{" "}
            <strong className="text-foreground">Cookies</strong> no rodapé para
            alterar sua preferência.
          </li>
          <li>
            Você pode limpar cookies do navegador a qualquer momento nas
            configurações do seu dispositivo.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Base legal e finalidade
        </h2>
        <p>
          O tratamento de dados de medição se baseia no seu{" "}
          <strong className="text-foreground">consentimento</strong> (LGPD,
          art. 7º, I), para fins de estatística de uso e melhoria do site.
        </p>

        <h2 className="text-base font-medium text-foreground">Contato</h2>
        <p>
          Dúvidas sobre esta política ou para exercer seus direitos (LGPD)
          podem ser enviadas para{" "}
          <a
            href={CONTACT_MAILTO}
            className="cursor-pointer font-medium text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      <Link
        href="/"
        className="cursor-pointer text-sm font-medium text-accent hover:underline"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
