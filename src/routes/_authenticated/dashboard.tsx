import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import logo from "../../assets/upscalemedia-transformed.png";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HidroMonitor" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} width="36" height="36" alt="HidroMonitor" />
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
            <span style={{ color: "#5B9BFF" }}>Hidro</span>
            <span style={{ color: "#5FD0FF" }}>Monitor</span>
          </span>
        </Link>
        <button
          onClick={signOut}
          className="text-sm font-semibold text-foreground/80 hover:text-[#1E4FA6]"
        >
          Sair
        </button>
      </nav>

      <main className="mx-auto flex min-h-[calc(100svh-80px)] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 grid h-28 w-28 place-items-center rounded-3xl border border-white/10 bg-white p-6 sm:p-8">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="url(#g)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5B9BFF" />
                <stop offset="100%" stopColor="#5FD0FF" />
              </linearGradient>
            </defs>
            <path d="M12 2v6" />
            <path d="M4.93 10.93 9 15" />
            <path d="M2 18h20" />
            <path d="M6 22h12" />
            <circle cx="12" cy="14" r="4" />
          </svg>
        </div>

        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          Página em construção
        </h1>
        <p className="mt-4 max-w-md text-foreground/70">
          Estamos preparando seu painel de monitoramento. Em breve vocês verá o consumo do seu
          hidrómetro em tempo real por aqui.
        </p>

        <Link
          to="/"
          className="mt-10 rounded-full bg-gradient-to-r from-[#5B9BFF] to-[#5FD0FF] px-6 py-3 text-sm font-semibold text-[#001a33] shadow-[0_6px_24px_rgba(95,208,255,0.35)] transition-transform hover:scale-105"
        >
          Voltar para o site
        </Link>
      </main>
    </div>
  );
}