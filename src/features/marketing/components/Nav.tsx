import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/Logo";
import { BRAND_COLORS, WHATSAPP_URL } from "@/lib/brand";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex w-[min(72rem,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/25 bg-white/15 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <a
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-deep-foreground"
        >
          <LogoMark size={36} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            <span style={{ color: BRAND_COLORS.hidroOnDark }}>Hidro</span>
            <span style={{ color: BRAND_COLORS.monitor }}>Monitor</span>
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
            href={WHATSAPP_URL}
            className="hidden sm:inline-flex rounded-full bg-[#1E4FA6] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a4494]"
          >
            Comprar
          </a>
        </div>
      </div>
    </nav>
  );
}
