const FEATURES: Array<{ title: string; description: string }> = [
  {
    title: "Aproveite o que já está instalado",
    description:
      "Boa parte dos condomínios já tem hidrômetros compatíveis com o nosso sistema. Quando é o caso, nada precisa ser trocado.",
  },
  {
    title: "Consumo real de cada unidade",
    description:
      "O rateio deixa de ser estimativa. Cada apartamento passa a ter a própria leitura, com histórico para consultar quando houver contestação.",
  },
  {
    title: "Vazamento aparece antes da fatura",
    description:
      "O sistema avisa quando o consumo foge do padrão, dando tempo de agir antes que o prejuízo chegue ao boleto.",
  },
  {
    title: "Fim da leitura manual",
    description:
      "Sem visita porta a porta, sem planilha e sem erro de digitação. Os dados chegam sozinhos à plataforma.",
  },
  {
    title: "Números prontos para a assembleia",
    description:
      "Consumo por bloco e por unidade, organizado e fácil de apresentar para o corpo diretivo e para os moradores.",
  },
  {
    title: "Feche a água sem sair do lugar",
    description:
      "A válvula esférica no ponto de medição corta o fornecimento de uma unidade à distância. Vazamento de madrugada não espera o encanador chegar.",
  },
];

export function Features() {
  return (
    <section id="beneficios" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          O problema não é medir. É enxergar o que foi medido.
        </h2>
        <p className="mt-4 text-muted-foreground">
          O HidroMonitor coleta, organiza e mostra o consumo de água do condomínio — para que a
          gestão pare de trabalhar com achismo.
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
