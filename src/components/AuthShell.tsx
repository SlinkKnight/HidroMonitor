import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  backTo = "/",
  backLabel = "Voltar",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  backTo?: string;
  backLabel?: string;
}) {
  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 py-8">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {backLabel}
        </Link>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <LogoMark size={44} />
              <span className="font-semibold tracking-tight" style={{ fontSize: 22 }}>
                <span style={{ color: "#1E4FA6" }}>Hidro</span>
                <span style={{ color: "#5FD0FF" }}>Monitor</span>
              </span>
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
            <div className="mt-6">{children}</div>
          </div>

          {footer ? (
            <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-[#1E4FA6]"
      />
    </label>
  );
}

export function AuthButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-[#1E4FA6] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1a4494] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}
