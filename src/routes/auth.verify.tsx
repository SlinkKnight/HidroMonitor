import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthButton } from "@/components/AuthShell";

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
  const { email } = Route.useSearch();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const code = digits.join("");
  const complete = code.length === 6;

  async function verify(fullCode: string) {
    if (!email) {
      setError("Sessão de verificação expirada. Refaça o cadastro.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: fullCode,
      type: "signup",
    });
    setLoading(false);
    if (error) {
      setError("Código inválido ou expirado.");
      setDigits(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
      return;
    }
    navigate({ to: "/dashboard" });
  }

  // Auto-focus first input on mount.
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Auto-submit when all 6 digits are filled.
  useEffect(() => {
    if (complete && !loading) verify(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);


  function setDigit(i: number, v: string) {
    const clean = v.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[i] = "";
      setDigits(next);
      return;
    }
    // Handle paste of full code into one box.
    if (clean.length > 1) {
      const chars = clean.slice(0, 6 - i).split("");
      const next = [...digits];
      chars.forEach((c, k) => (next[i + k] = c));
      setDigits(next);
      const last = Math.min(i + chars.length, 5);
      inputs.current[last]?.focus();
      return;
    }
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (i < 5) inputs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < 5) {
      inputs.current[i + 1]?.focus();
    }
  }

  async function resend() {
    if (!email) return;
    setError(null);
    setResent(false);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) setError(error.message);
    else setResent(true);
  }

  return (
    <AuthShell
      title="Confirme seu e-mail"
      subtitle={`Digite o código de 6 dígitos${email ? ` enviado para ${email}` : ""}.`}
      backTo="/auth/signup"
      backLabel="Voltar"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          {digits.map((d, i) => (
            <div key={i} className="flex items-center">
              <input
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onFocus={(e) => e.currentTarget.select()}
                disabled={loading}
                aria-label={`Dígito ${i + 1}`}
                className="h-14 w-11 rounded-lg border border-border bg-background text-center text-2xl font-semibold text-foreground outline-none transition-colors focus:border-[#1E4FA6] disabled:opacity-60"
              />
              {i === 2 ? <span className="mx-1 text-muted-foreground">–</span> : null}
            </div>
          ))}
        </div>

        {error ? (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>
        ) : null}
        {resent ? (
          <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
            Novo código enviado.
          </p>
        ) : null}

        {loading ? (
          <p className="text-center text-sm text-muted-foreground">Verificando...</p>
        ) : (
          <AuthButton type="button" onClick={() => verify(code)} disabled={!complete}>
            Confirmar
          </AuthButton>
        )}

        <button
          type="button"
          onClick={resend}
          className="mx-auto block text-sm text-muted-foreground hover:text-[#1E4FA6]"
        >
          Reenviar código
        </button>
      </div>
    </AuthShell>
  );
}
