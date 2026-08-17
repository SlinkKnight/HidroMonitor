const STEPS: Array<{ title: string; description: string }> = [
  {
    title: "Verificamos o seu condomínio",
    description:
      "Você nos diz onde fica o condomínio e nós conferimos se os hidrômetros já estão prontos para se conectar. A resposta é rápida e sem compromisso.",
  },
  {
    title: "Conectamos o sistema",
    description:
      "A integração é feita em pouco tempo, sem quebra-quebra e sem interromper o abastecimento. A partir daí, os dados seguem direto para a plataforma.",
  },
  {
    title: "Você acompanha pela plataforma",
    description:
      "Consumo por bloco e por unidade, alertas quando algo foge do padrão e histórico completo — no computador ou no celular.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Simples assim: plugou, já tem os dados.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Três passos entre a primeira conversa e o consumo do condomínio na tela.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-lg font-bold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
