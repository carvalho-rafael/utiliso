import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/site";

const linkClass =
  "cursor-pointer font-medium text-accent hover:underline";

export const metadata: Metadata = {
  title: "Política de privacidade — Utiliso",
  description:
    "Como o Utiliso trata dados pessoais no site (calculadoras, guias, tabelas e utilitários), cookies de medição (Google Analytics) e o XML enviado ao validador de NF-e.",
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
          O Utiliso é um portal brasileiro de calculadoras, tabelas, guias e
          utilitários em português. Não exigimos cadastro nem login. Esta
          política vale para todo o site: home, hubs,{" "}
          <Link href="/calculadoras" className={linkClass}>
            calculadoras
          </Link>
          ,{" "}
          <Link href="/guias" className={linkClass}>
            guias
          </Link>
          ,{" "}
          <Link href="/tabelas" className={linkClass}>
            tabelas
          </Link>{" "}
          e{" "}
          <Link href="/utilitarios" className={linkClass}>
            utilitários
          </Link>
          .
        </p>

        <h2 className="text-base font-medium text-foreground">
          Calculadoras, guias e tabelas
        </h2>
        <p>
          Os cálculos (rescisão, salário líquido, férias, 13º, hora extra,
          seguro-desemprego, IBS/CBS e demais ferramentas no navegador) são
          feitos <strong className="text-foreground">no seu dispositivo</strong>
          . Salário, datas e os demais campos que você informa{" "}
          <strong className="text-foreground">não são enviados</strong> aos
          nossos servidores nem ao Google Analytics.
        </p>
        <p>
          Guias e tabelas são páginas de conteúdo. A leitura não exige
          formulário nem envio de dados pessoais a nós.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Validador de NF-e (servidor)
        </h2>
        <p>
          O{" "}
          <Link href="/utilitarios/validador-nfe" className={linkClass}>
            validador de NF-e
          </Link>{" "}
          é a exceção: o XML que você cola ou envia (até 5 MB) vai ao nosso
          servidor para conferir o schema XSD oficial. Sem isso a validação
          não roda no navegador.
        </p>
        <p>
          Usamos o arquivo{" "}
          <strong className="text-foreground">só naquela requisição</strong>
          , para devolver o resultado.{" "}
          <strong className="text-foreground">Não salvamos</strong> o XML em
          banco, não criamos conta a partir dele e{" "}
          <strong className="text-foreground">não enviamos</strong> o conteúdo
          ao Google Analytics. O XML de uma nota pode ter dados fiscais e
          pessoais (CNPJ, nomes, valores); envie só o necessário e, se puder,
          use arquivo de homologação.
        </p>
        <p>
          A hospedagem pode registrar logs técnicos da requisição (data,
          endereço IP, status), sem o corpo do XML, para operação e segurança
          do serviço.
        </p>

        <h2 className="text-base font-medium text-foreground">
          Preferências no dispositivo
        </h2>
        <p>
          Guardamos no seu navegador (localStorage) o tema claro/escuro e a
          escolha do banner de cookies. Isso não identifica você junto a nós.
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
          (modelagem estatística). Não enviamos salário, datas nem XML de
          NF-e ao Analytics.
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
            Você pode limpar cookies e dados do site a qualquer momento nas
            configurações do seu dispositivo.
          </li>
        </ul>

        <h2 className="text-base font-medium text-foreground">
          Base legal e finalidade
        </h2>
        <p>
          A medição de tráfego se baseia no seu{" "}
          <strong className="text-foreground">consentimento</strong> (LGPD,
          art. 7º, I), para estatística de uso e melhoria do site.
        </p>
        <p>
          O XML do validador de NF-e é tratado{" "}
          <strong className="text-foreground">a seu pedido</strong>, para
          prestar o serviço de conferência do schema (LGPD, art. 7º, V), e
          descartado depois da resposta.
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
