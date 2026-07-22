import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-deep-foreground/10 px-6 py-14 md:grid-cols-3">
        <div>
          <span className="font-display text-xl font-bold">
            Hidro<span className="text-accent">Flux</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-deep-foreground/60">
            Hidrômetros residenciais certificados. Um produto, feito com cuidado.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <WhatsAppIcon />
                WhatsApp: +55 11 99999-8888
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <InstagramIcon />@{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
            Atendimento
          </h3>
          <p className="mt-4 text-sm text-deep-foreground/60">Seg a Sex, 8h às 18h</p>
          <p className="mt-1 text-sm text-deep-foreground/60">Entrega para todo o Brasil</p>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10 py-6 text-center text-xs text-deep-foreground/40">
        © {new Date().getFullYear()} HidroFlux. Todos os direitos reservados.
      </div>
    </footer>
  );
}
