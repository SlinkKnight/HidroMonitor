import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "./AuthShell";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { PasswordField } from "./PasswordField";
import { useLogin } from "../hooks/useLogin";

export function LoginForm({ next }: { next?: string }) {
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          if (next) {
            window.location.href = next;
            return;
          }
          navigate({ to: "/dashboard" });
        },
      },
    );
  }

  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Entre para acompanhar seu consumo."
      footer={
        <>
          Ainda não é membro?{" "}
          <Link to="/auth/signup" className="font-semibold text-[#1E4FA6] hover:underline">
            Cadastre-se!
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthInput
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
        />

        {login.error ? (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {login.error.message}
          </p>
        ) : null}

        <AuthButton type="submit" disabled={login.isPending}>
          {login.isPending ? "Entrando..." : "Entrar"}
        </AuthButton>
      </form>
    </AuthShell>
  );
}
