import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  formatCubicMeters,
  formatLiters,
  summarizeConsumption,
  type Reading,
} from "../lib/consumption";
import { StatTile } from "./StatTile";
import { ConsumptionChart } from "./ConsumptionChart";

export function ConsumptionOverview({ readings }: { readings: Reading[] }) {
  const latest = readings[readings.length - 1];
  const summary = summarizeConsumption(readings, new Date());

  return (
    <div className="w-full rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Leitura atual</p>
          <p className="mt-1 font-display text-4xl font-bold tracking-tight text-foreground">
            {formatLiters(summary.latestLiters ?? 0)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {formatDistanceToNow(new Date(latest.read_at), { locale: ptBR, addSuffix: true })}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatTile label="Hoje" value={summary.todayLiters} formatter={formatLiters} />
        <StatTile label="Semana" value={summary.weekLiters} formatter={formatLiters} />
        <StatTile label="Mês" value={summary.monthLiters} formatter={formatCubicMeters} />
      </div>

      <ConsumptionChart readings={readings} />
    </div>
  );
}
