import { defineConfig } from "vite";

// A landing é servida pelo app principal em "/" (src/routes/index.tsx).
// Os arquivos estáticos vão para ../public/landing/ e o index.html gerado é
// movido para src/features/landing/ por scripts/export.mjs.
export default defineConfig({
  base: "/landing/",
  build: {
    outDir: "../public/landing",
    emptyOutDir: true,
  },
});
