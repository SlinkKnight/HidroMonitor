import { Wave } from "./Wave";

const HIGHLIGHTS: Array<[title: string, description: string]> = [
  ["Sem troca de hidrômetro", "Quando a estrutura já é compatível, ela é aproveitada como está."],
  ["Sem obra no prédio", "Nada de quebra-quebra e nada de abastecimento interrompido."],
  ["Sem espera", "Conectado o sistema, o consumo já começa a aparecer na plataforma."],
];

export function MarketProof() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Incoming wave: filled with the previous section's color and flipped, so
          the light body above breaks into the blue band instead of meeting it
          at a hard edge. -top-px overlaps by 1px to kill the hairline seam. */}
      <Wave className="absolute -top-px left-0 z-0 h-20 w-full text-background md:h-28" flip />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-36 md:pb-44 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-6xl font-extrabold leading-none md:text-7xl">40%</p>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            4 em cada 10 condomínios já estão prontos hoje
          </h2>
          <p className="mt-4 text-primary-foreground/75">
            Levantamos esse dado no mercado e ele mudou a nossa forma de trabalhar: em boa parte dos
            casos, o condomínio não precisa investir em equipamento novo para ter gestão de água.
            Precisa apenas de um sistema que leia, organize e mostre o que já está sendo medido.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-center"
            >
              <p className="font-display text-lg font-semibold">{title}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <Wave className="absolute -bottom-px left-0 h-24 w-full text-deep md:h-32" />
    </section>
  );
}
