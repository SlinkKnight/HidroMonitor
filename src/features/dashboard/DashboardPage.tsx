import { Link, useNavigate } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/Logo";
import { BRAND_COLORS } from "@/lib/brand";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useReadings } from "./hooks/useReadings";
import { ConsumptionOverview } from "./components/ConsumptionOverview";
import { DashboardEmptyState } from "./components/DashboardEmptyState";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { DashboardError } from "./components/DashboardError";

export function DashboardPage() {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const readings = useReadings();

  function handleSignOut() {
    signOut.mutate(undefined, { onSuccess: () => navigate({ to: "/" }) });
  }

  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark size={36} />
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
            <span style={{ color: BRAND_COLORS.hidroOnDark }}>Hidro</span>
            <span style={{ color: BRAND_COLORS.monitor }}>Monitor</span>
          </span>
        </Link>
        <button
          onClick={handleSignOut}
          disabled={signOut.isPending}
          className="text-sm font-semibold text-foreground/80 hover:text-[#1E4FA6] disabled:opacity-60"
        >
          Sair
        </button>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {readings.isLoading ? (
          <DashboardSkeleton />
        ) : readings.isError ? (
          <DashboardError />
        ) : !readings.data || readings.data.length === 0 ? (
          <DashboardEmptyState />
        ) : (
          <ConsumptionOverview readings={readings.data} />
        )}
      </main>
    </div>
  );
}
