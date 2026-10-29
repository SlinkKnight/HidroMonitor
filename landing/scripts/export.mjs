// Move o index.html gerado pelo build para dentro do app principal, onde a
// rota "/" o importa como texto (arquivos em public/ não podem ser importados).
import { renameSync, mkdirSync } from "node:fs";

const from = new URL("../../public/landing/index.html", import.meta.url);
const dir = new URL("../../src/features/landing/", import.meta.url);
mkdirSync(dir, { recursive: true });
renameSync(from, new URL("index.html", dir));
console.log("landing exportada para src/features/landing/index.html");
