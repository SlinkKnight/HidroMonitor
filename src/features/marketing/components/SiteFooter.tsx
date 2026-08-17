import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-deep-foreground/10 px-6 py-14 md:grid-cols-3">
        <div>
          <span className="font-display text-xl font-bold">
            Hidro<span className="text-accent">Monitor</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-deep-foreground/60">
            Gestão inteligente de água para condomínios, aproveitando a estrutura que o prédio já
            tem.
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
                WhatsApp: {WHATSAPP_DISPLAY}
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
          <p className="mt-1 text-sm text-deep-foreground/60">
            Atendemos condomínios em todo o Brasil
          </p>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10 py-6 text-center text-xs text-deep-foreground/40">
        © {new Date().getFullYear()} HidroMonitor. Todos os direitos reservados.
      </div>
    </footer>
  );
}
