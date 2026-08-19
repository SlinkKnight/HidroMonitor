const FAQ: Array<{ question: string; answer: string; defaultOpen?: boolean }> = [
  {
    question: "E se os hidrômetros do meu condomínio forem antigos?",
    answer:
      "Fique tranquilo: isso é comum e já está resolvido. Temos parcerias estratégicas com as principais marcas de hidrômetros do mercado, o que nos permite viabilizar a troca nas melhores condições. Cuidamos da negociação e da coordenação do processo — o síndico não precisa procurar fornecedor, comparar orçamento nem administrar cronograma de instalação.",
    defaultOpen: true,
  },
  {
    question: "Como sei se o meu condomínio já está pronto?",
    answer:
      "Essa é a primeira coisa que verificamos, antes de qualquer proposta. Você fala com a gente pelo WhatsApp, informa o condomínio e nós retornamos dizendo se a estrutura atual já permite a conexão ou se vale trocar os hidrômetros com o apoio das nossas parcerias. Vale saber que, no nosso levantamento, 4 em cada 10 condomínios já estão prontos — a chance de o seu estar é boa.",
  },
  {
    question: "A instalação gera obra ou incomoda os moradores?",
    answer:
      "Não. Quando os hidrômetros já são compatíveis, não há quebra-quebra, não há reforma e o abastecimento segue normalmente. A conexão é rápida e, terminada a etapa, os dados começam a aparecer na plataforma.",
  },
  {
    question: "Vocês vendem hidrômetro?",
    answer:
      "Nosso produto é o sistema de monitoramento e gestão dos dados de água. Quando a troca dos hidrômetros for necessária, são as nossas parcerias com os fabricantes que entram em cena para facilitar essa etapa — você resolve tudo com um interlocutor só.",
  },
  {
    question: "O que eu passo a enxergar na plataforma?",
    answer:
      "O consumo do condomínio como um todo, de cada bloco e de cada unidade, com histórico para comparar períodos e alertas quando algum ponto foge do padrão — o sinal mais rápido de vazamento ou de uso indevido.",
  },
  {
    question: "Preciso entender de tecnologia para usar?",
    answer:
      "Não. A plataforma foi feita para quem administra condomínio, não para quem trabalha com tecnologia. E a implantação é acompanhada por nós do começo ao fim.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Dúvidas de quem administra</h2>
        <p className="mt-4 text-muted-foreground">
          As perguntas que síndicos e administradoras costumam fazer antes de começar.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.question}
            open={item.defaultOpen}
            className="group rounded-2xl border border-border bg-card px-6 py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-primary transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
