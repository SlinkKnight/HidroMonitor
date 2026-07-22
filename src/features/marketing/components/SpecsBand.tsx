import { Wave } from "./Wave";

const SPECS: Array<[label: string, value: string]> = [
  ["Vazão nominal", "1,5 m³/h"],
  ["Vazão máxima", "2,5 m³/h"],
  ["Pressão", "PN 16"],
  ["Temperatura", "0,1–40 °C"],
];

export function SpecsBand() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pb-44 md:pt-36">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Ficha técnica</h2>
        <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {SPECS.map(([label, value]) => (
            <div key={label}>
              <p className="font-display text-3xl font-extrabold md:text-4xl">{value}</p>
              <p className="mt-1 text-sm text-primary-foreground/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <Wave className="absolute -bottom-px left-0 h-24 w-full text-deep md:h-32" />
    </section>
  );
}
