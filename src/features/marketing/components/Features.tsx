const FEATURES: Array<{ title: string; description: string }> = [
  {
    title: "Corpo em latão",
    description: "Resistente à corrosão e à alta pressão, para durar anos sob qualquer clima.",
  },
  {
    title: "Classe metrológica B",
    description: "Alta sensibilidade mesmo em baixas vazões — você paga só pelo que usa.",
  },
  {
    title: "Leitura cristalina",
    description: "Visor amplo e protegido, com totalizador de fácil leitura em m³.",
  },
  {
    title: "Padrão ABNT",
    description: "Conforme a norma NBR 15538, aprovado para uso residencial.",
  },
  {
    title: "Instalação simples",
    description: "Roscas padronizadas que encaixam na maioria das instalações.",
  },
  {
    title: "Entrega nacional",
    description: "Enviamos para todo o Brasil com embalagem reforçada.",
  },
];

export function Features() {
  return (
    <section id="produto" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Um único produto. Zero concessões.</h2>
        <p className="mt-4 text-muted-foreground">
          Focamos em fazer um hidrômetro excelente em vez de mil medianos.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="font-display text-lg font-semibold text-primary">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
