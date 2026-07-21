import { WHATSAPP_URL } from "@/lib/brand";

const SUMMARY_STATS: Array<[label: string, value: string]> = [
  ["Hoje", "120 L"],
  ["Semana", "890 L"],
  ["Mês", "3.4 m³"],
];

const CHART_POINTS: Array<[cx: number, cy: number]> = [
  [80, 50],
  [152, 42],
  [224, 38],
  [280, 33],
];

export function DashboardPreview() {
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
        {SUMMARY_STATS.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 font-semibold text-foreground">{value}</p>
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
          {CHART_POINTS.map(([cx, cy]) => (
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
        href={WHATSAPP_URL}
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
