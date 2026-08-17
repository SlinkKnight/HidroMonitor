import { WHATSAPP_URL } from "@/lib/brand";

export function Cta() {
  return (
    <section className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
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
