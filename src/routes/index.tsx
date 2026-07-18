import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import logo from "../assets/upscalemedia-transformed.png";



export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "5511999998888";
const INSTAGRAM = "hidroflux";

function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    // overflow-hidden clips the 200%-wide animated svg to this box so it can
    // never spill outside the viewport and create horizontal scroll.
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {/* Back layer: lighter + slower, drifts the opposite way for depth */}
      <svg
        className={`absolute inset-0 h-full w-[200%] opacity-40 ${flip ? "rotate-180" : ""} wave-back`}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,80 C120,40 360,120 480,80 C600,40 840,120 960,80 C1080,40 1320,120 1440,80 C1560,40 1800,120 1920,80 C2040,40 2280,120 2400,80 C2520,40 2760,120 2880,80 L2880,120 L0,120 Z"
        />
      </svg>
      {/* Front layer */}
      <svg
        className={`relative h-full w-[200%] ${flip ? "rotate-180" : ""} wave-slow`}
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

function DashboardCard() {
  return (
    <div className="float-slow w-full max-w-md rounded-3xl border border-white/10 bg-card p-6 text-card-foreground shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Prévia do dashboard</p>
          <p className="mt-1 font-display text-4xl font-bold tracking-tight text-foreground">
            1.240 L
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          exemplo
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ["Hoje", "120 L"],
          ["Semana", "890 L"],
          ["Mês", "3.4 m³"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 font-semibold text-foreground">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4">
        <svg viewBox="0 0 320 90" className="h-24 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dashfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M8,68 C40,68 48,52 80,50 C112,48 120,40 152,42 C184,44 192,36 224,38 C256,40 264,30 312,32 L312,88 L8,88 Z"
            fill="url(#dashfill)"
          />
          <path
            d="M8,68 C40,68 48,52 80,50 C112,48 120,40 152,42 C184,44 192,36 224,38 C256,40 264,30 312,32"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {[
            [80, 50],
            [152, 42],
            [224, 38],
            [280, 33],
          ].map(([cx, cy]) => (
            <circle
              key={cx}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="var(--card)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP}`}
        className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary/70"
      >
        <span className="inline-flex items-center gap-2">
          <span className="text-base">💧</span>
          Crie sua conta para monitorar em tempo real
        </span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function Index() {
  const blurRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax is a desktop-only nicety. On touch devices the iOS momentum
    // scroll delivers scroll events in coalesced bursts, so any JS-driven
    // transform lags the paint and visibly "teleports". Skip it there (and
    // when the user prefers reduced motion) — the layout is static & clean.
    const noParallax =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches;
    if (noParallax) return;

    for (const el of [blurRef, textRef, cardRef]) {
      if (el.current) el.current.style.willChange = "transform";
    }

    let ticking = false;
    const apply = () => {
      // Clamp to >= 0 so iOS rubber-band/overscroll can't invert the offset.
      const y = Math.max(0, window.scrollY);
      // Write transforms imperatively — no React re-render, so the update
      // stays in sync with the scroll paint instead of lagging a frame.
      if (blurRef.current) blurRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      if (textRef.current) textRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      if (cardRef.current) cardRef.current.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      {/* ===== HERO / PARALLAX ===== */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep text-deep-foreground">
        {/* Parallax layers (desktop only — see effect) */}
        <div ref={blurRef} className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <nav className="fixed inset-x-0 top-0 z-50">
          <div className="mx-auto mt-3 flex w-[min(72rem,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/25 bg-white/15 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <a href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-deep-foreground">
              <img
                src={logo}
                width="40"
                height="40"
                alt=""
                aria-hidden="true"
              />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                textShadow: "0 1px 8px rgba(0,0,0,0.35)",
              }}
            >
              <span style={{ color: "#5B9BFF" }}>Hidro</span>
              <span style={{ color: "#5FD0FF" }}>Monitor</span>
            </span>
            </a>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/auth/login"
                className="text-sm font-semibold text-deep-foreground/90 transition-colors hover:text-[#5FD0FF]"
              >
                Entrar
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                className="rounded-full bg-gradient-to-r from-[#5B9BFF] to-[#5FD0FF] px-4 py-2 text-sm font-semibold text-[#001a33] shadow-[0_4px_16px_rgba(95,208,255,0.35)] transition-transform hover:scale-105 sm:px-5"
              >
                Comprar
              </a>
            </div>

          </div>
        </nav>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 pb-36 pt-28 md:grid-cols-2 md:pb-40 md:pt-24">
          <div ref={textRef}>
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

          <div ref={cardRef} className="flex justify-center">
            <DashboardCard />
          </div>

        </div>

        {/* Wave transition into the body.
            -bottom-px overlaps the body by 1px to kill the hairline seam
            that flickers during scroll; z-0 keeps it below the hero content
            so the floating dashboard card never crops it. */}
        <Wave className="absolute -bottom-px left-0 z-0 h-28 w-full text-background md:h-40" />
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
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pb-44 md:pt-36">
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
          <Wave className="absolute -bottom-px left-0 h-24 w-full text-deep md:h-32" />
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
