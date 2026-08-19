import { WHATSAPP_URL } from "@/lib/brand";
import { Wave } from "./Wave";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-deep text-deep-foreground">
      {/* Same incoming-wave treatment as the blue band: the light FAQ above
          breaks into the deep footer area instead of cutting straight across. */}
      <Wave className="absolute -top-px left-0 z-0 h-20 w-full text-background md:h-28" flip />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-36 text-center md:pt-44">
        <h2 className="text-3xl font-bold md:text-4xl">
          Descubra hoje se o seu condomínio já está pronto.
        </h2>
        <p className="mt-4 text-deep-foreground/70">
          A verificação é rápida e sem compromisso. Se os hidrômetros já forem compatíveis, é só
          conectar. Se não forem, nossas parcerias resolvem a troca para você.
        </p>
        <a
          href={WHATSAPP_URL}
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
        >
          Falar com um especialista no WhatsApp
        </a>
      </div>
    </section>
  );
}
