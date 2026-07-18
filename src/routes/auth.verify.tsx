import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";

const searchSchema = z.object({ email: z.string().email().optional() });

export const Route = createFileRoute("/auth/verify")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Confirmar e-mail — HidroMonitor" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const { email: emailFromSearch } = Route.useSearch();
  const [email, setEmail] = useState(emailFromSearch ?? "");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: token.trim(),
      type: "signup",
    });
    setLoading(false);
    if (error) {
      setError("Código inválido ou expirado.");
      return;
    }
    navigate({ to: "/dashboard" });
  }

  async function resend() {
    setError(null);
    setResent(false);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) setError(error.message);
    else setResent(true);
  }

  return (
    <AuthShell
      title="Confirme seu e-mail"
      subtitle={`Enviamos um código de 6 dígitos${email ? ` para ${email}` : ""}.`}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {!emailFromSearch ? (
          <AuthInput
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : null}

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-deep-foreground/70">
            Código de confirmação
          </span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            maxLength={6}
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-2xl font-semibold tracking-[0.5em] text-deep-foreground placeholder:text-deep-foreground/30 outline-none transition-colors focus:border-[#5FD0FF]/60 focus:bg-white/10"
          />
        </div>

        {error ? (
          <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">{error}</p>
        ) : null}
        {resent ? (
          <p className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">
            Novo código enviado.
          </p>
        ) : null}

        <AuthButton type="submit" disabled={loading || token.length < 6}>
          {loading ? "Verificando..." : "Confirmar"}
        </AuthButton>

        <button
          type="button"
          onClick={resend}
          className="mx-auto block text-sm text-deep-foreground/70 hover:text-[#5FD0FF]"
        >
          Reenviar código
        </button>
      </form>
    </AuthShell>
  );
}
