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
    <div className="min-h-[100svh] bg-deep text-deep-foreground relative overflow-x-clip">
      {/* Background blur circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 py-8">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 self-start text-sm text-foreground/70 transition-colors hover:text-deep-foreground"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {backLabel}
        </Link>

        <div className="flex-1 flex-col justify-center py-10">
          <div className="rounded-2xl border border-white/10 bg-white p-6 sm:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                <LogoMark size={44} />
                <span className="font-semibold tracking-tight" style={{ fontSize: 22 }}>
                  <span style={{ color: "#1E4FA6" }}>Hidro</span>
                  <span style={{ color: "#5FD0FF" }}>Monitor</span>
                </span>
              </Link>
            </div>

            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="mb-4 text-sm text-foreground">{subtitle}</p>
            ) : null}
            <div className="mb-6">{children}</div>

            {footer ? (
              <div className="text-center text-sm text-foreground">{footer}</div>
            ) : null}
          </div>
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
        className="w-full rounded-lg border border-input bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-[#5FD0FF]"
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