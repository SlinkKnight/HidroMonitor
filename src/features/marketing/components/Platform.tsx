import { Wave } from "./Wave";

const PLATFORM_ITEMS: Array<{ title: string; description: string }> = [
  {
    title: "Visão geral do condomínio",
    description:
      "Consumo de hoje, consumo do mês e custo estimado pela tarifa, com o total do prédio e o número de unidades acompanhadas.",
  },
  {
    title: "Unidades em alerta",
    description:
      "Quando uma unidade passa do limite de consumo, ela entra na lista de alertas — o primeiro sinal de vazamento ou de uso fora do padrão.",
  },
  {
    title: "Corte de água à distância",
    description:
      "Uma válvula esférica instalada no ponto de medição permite interromper o fornecimento de uma unidade sem que ninguém precise ir até o local — para vazamento fora de hora, manutenção ou unidade desocupada.",
  },
  {
    title: "Consumo ao longo do tempo",
    description:
      "Gráfico de 7 ou 30 dias para comparar períodos e mostrar, com número, o efeito de cada decisão tomada.",
  },
  {
    title: "Ranking de maiores consumos",
    description:
      "As unidades que mais gastaram aparecem ordenadas, sem precisar cruzar planilha para descobrir onde olhar.",
  },
  {
    title: "Detalhe de cada ponto de medição",
    description:
      "Consumo acumulado, vazão e histórico diário e mensal de cada medidor, isolados em uma tela própria.",
  },
];

export function Platform() {
  return (
    <section
      id="plataforma"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Incoming wave: filled with the previous section's color and flipped, so
          the light body above breaks into the blue band instead of meeting it
          at a hard edge. -top-px overlaps by 1px to kill the hairline seam. */}
      <Wave className="absolute -top-px left-0 z-0 h-20 w-full text-background md:h-28" flip />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-32 pt-36 md:grid-cols-2 md:pb-44 md:pt-48">
        <div>
          <p className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
            A plataforma
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Tudo o que o condomínio consome, em uma tela só.
          </h2>
          <p className="mt-5 text-primary-foreground/75">
            O HidroMonitor recebe as leituras, organiza por condomínio, bloco e unidade, e
            transforma isso em números que o síndico consegue ler e apresentar. Não é relatório que
            chega no fim do mês: a tela mostra o consumo conforme ele acontece — e, quando é preciso
            agir, a água de uma unidade pode ser cortada à distância.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/60">
            Funciona no computador e no celular, sem instalar nada.
          </p>
        </div>

        <ul className="divide-y divide-primary-foreground/15">
          {PLATFORM_ITEMS.map((item) => (
            <li key={item.title} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-primary-foreground/70">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <Wave className="absolute -bottom-px left-0 h-24 w-full text-background md:h-32" />
    </section>
  );
}
