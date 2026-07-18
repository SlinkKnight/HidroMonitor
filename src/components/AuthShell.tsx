import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "../assets/upscalemedia-transformed.png";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-deep text-deep-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#5B9BFF]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#5FD0FF]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 py-8">
        <Link to="/" className="flex items-center gap-2.5 self-start">
          <img src={logo} width="36" height="36" alt="HidroMonitor" />
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
            <span style={{ color: "#5B9BFF" }}>Hidro</span>
            <span style={{ color: "#5FD0FF" }}>Monitor</span>
          </span>
        </Link>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <img src={logo} width="44" height="44" alt="" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-deep-foreground/70">{subtitle}</p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            {children}
          </div>

          {footer ? (
            <div className="mt-6 text-center text-sm text-deep-foreground/70">{footer}</div>
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
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-deep-foreground/70">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-deep-foreground placeholder:text-deep-foreground/40 outline-none transition-colors focus:border-[#5FD0FF]/60 focus:bg-white/10"
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
      className="w-full rounded-xl bg-gradient-to-r from-[#5B9BFF] to-[#5FD0FF] px-5 py-3 text-base font-semibold text-[#001a33] shadow-[0_6px_24px_rgba(95,208,255,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      {children}
    </button>
  );
}
