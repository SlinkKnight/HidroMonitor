import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hidrometro from "@/assets/hidrometro.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "5511999998888";
const INSTAGRAM = "hidroflux";

function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        className={`h-full w-[200%] ${flip ? "rotate-180" : ""} wave-slow`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

function Index() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO / PARALLAX ===== */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep text-deep-foreground">
        {/* Parallax layers */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-display text-xl font-bold tracking-tight">
            Hidro<span className="text-accent">Flux</span>
          </span>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Comprar agora
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div style={{ transform: `translateY(${scrollY * -0.12}px)` }}>
            <p className="mb-4 inline-block rounded-full bg-deep-foreground/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Certificado ABNT NBR 15538
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
              Cada gota medida com precisão.
            </h1>
            <p className="mt-5 max-w-md text-base text-deep-foreground/70">
              O hidrômetro residencial que junta durabilidade em latão, leitura
              cristalina e classe metrológica B. Um produto. Feito certo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
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

          <div className="flex justify-center">
            <img
              src={hidrometro}
              alt="Hidrômetro residencial HidroFlux em latão com visor azul"
              width={1024}
              height={1024}
              className="float-slow w-64 drop-shadow-2xl sm:w-80 md:w-full md:max-w-sm"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
          </div>
        </div>

        {/* Wave transition into the body */}
        <Wave className="absolute bottom-0 left-0 h-24 w-full text-background md:h-32" />
      </header>

      {/* ===== PRODUCT ===== */}
      <main>
        <section id="produto" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Um único produto. Zero concessões.</h2>
            <p className="mt-4 text-muted-foreground">
              Focamos em fazer um hidrômetro excelente em vez de mil medianos.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Corpo em latão",
                d: "Resistente à corrosão e à alta pressão, para durar anos sob qualquer clima.",
              },
              {
                t: "Classe metrológica B",
                d: "Alta sensibilidade mesmo em baixas vazões — você paga só pelo que usa.",
              },
              {
                t: "Leitura cristalina",
                d: "Visor amplo e protegido, com totalizador de fácil leitura em m³.",
              },
              {
                t: "Padrão ABNT",
                d: "Conforme a norma NBR 15538, aprovado para uso residencial.",
              },
              {
                t: "Instalação simples",
                d: "Roscas padronizadas que encaixam na maioria das instalações.",
              },
              {
                t: "Entrega nacional",
                d: "Enviamos para todo o Brasil com embalagem reforçada.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-semibold text-primary">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SPECS BAND with wave ===== */}
        <section className="relative bg-primary text-primary-foreground">
          <Wave className="absolute -top-px left-0 h-16 w-full rotate-180 text-background md:h-24" flip />
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
            <h2 className="text-center text-3xl font-bold md:text-4xl">Ficha técnica</h2>
            <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {[
                ["Vazão nominal", "1,5 m³/h"],
                ["Vazão máxima", "2,5 m³/h"],
                ["Pressão", "PN 16"],
                ["Temperatura", "0,1–40 °C"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-display text-3xl font-extrabold md:text-4xl">{v}</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">{k}</p>
                </div>
              ))}
            </div>
          </div>
          <Wave className="absolute bottom-0 left-0 h-16 w-full text-deep md:h-24" />
        </section>

        {/* ===== CTA ===== */}
        <section className="bg-deep text-deep-foreground">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Pronto para medir com precisão?</h2>
            <p className="mt-4 text-deep-foreground/70">
              Fale com a gente no WhatsApp e receba seu hidrômetro em casa.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Comprar pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-deep-foreground/10 px-6 py-14 md:grid-cols-3">
          <div>
            <span className="font-display text-xl font-bold">
              Hidro<span className="text-accent">Flux</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-deep-foreground/60">
              Hidrômetros residenciais certificados. Um produto, feito com cuidado.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.9 5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1a11 11 0 0 1-5.6-4.9c-.4-.7-.7-1.5-.7-2.3 0-.9.5-1.4.7-1.6.2-.2.4-.2.6-.2h.4c.2 0 .4 0 .5.4l.7 1.7c0 .2 0 .3-.1.5l-.4.5c-.1.1-.2.3-.1.5a7 7 0 0 0 3.2 2.8c.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3 0 .2 0 .8-.2 1.2Z" />
                  </svg>
                  WhatsApp: +55 11 99999-8888
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${INSTAGRAM}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  @{INSTAGRAM}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              Atendimento
            </h3>
            <p className="mt-4 text-sm text-deep-foreground/60">Seg a Sex, 8h às 18h</p>
            <p className="mt-1 text-sm text-deep-foreground/60">Entrega para todo o Brasil</p>
          </div>
        </div>
        <div className="border-t border-deep-foreground/10 py-6 text-center text-xs text-deep-foreground/40">
          © {new Date().getFullYear()} HidroFlux. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
