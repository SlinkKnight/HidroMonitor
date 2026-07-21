import { WHATSAPP_URL } from "@/lib/brand";
import { Nav } from "./Nav";
import { Wave } from "./Wave";
import { DashboardPreview } from "./DashboardPreview";
import { useHeroParallax } from "../hooks/useHeroParallax";

export function Hero() {
  const { blurRef, textRef, cardRef } = useHeroParallax();

  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep text-deep-foreground">
      {/* Parallax layers (desktop only — see useHeroParallax) */}
      <div ref={blurRef} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <Nav />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 pb-36 pt-28 md:grid-cols-2 md:pb-40 md:pt-24">
        <div ref={textRef}>
          <p className="mb-4 inline-block rounded-full bg-deep-foreground/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Certificado ABNT NBR 15538
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
            Cada gota medida com precisão.
          </h1>
          <p className="mt-5 max-w-md text-base text-deep-foreground/70">
            O hidrômetro residencial que junta durabilidade em latão, leitura cristalina e classe
            metrológica B. Um produto. Feito certo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              className="rounded-full bg-accent px-7 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Pedir pelo WhatsApp
            </a>
            <a
              href="#produto"
              className="rounded-full border border-deep-foreground/25 px-7 py-3 font-semibold transition-colors hover:bg-deep-foreground/10"
            >
              Ver detalhes
            </a>
          </div>
        </div>

        <div ref={cardRef} className="flex justify-center">
          <DashboardPreview />
        </div>
      </div>

      {/* Wave transition into the body.
          -bottom-px overlaps the body by 1px to kill the hairline seam
          that flickers during scroll; z-0 keeps it below the hero content
          so the floating dashboard card never crops it. */}
      <Wave className="absolute -bottom-px left-0 z-0 h-28 w-full text-background md:h-40" />
    </header>
  );
}
