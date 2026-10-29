import { createFileRoute } from "@tanstack/react-router";
// Landing page estática — o código-fonte fica em landing/ e o build
// (npm run build dentro de landing/) gera os arquivos em public/landing/ e
// este index.html. Servida como HTML puro, igual à página /sugestao.
import landingHtml from "@/features/landing/index.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(landingHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
