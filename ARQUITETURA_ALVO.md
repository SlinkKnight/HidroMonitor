# ARQUITETURA_ALVO — Reconstrução do HidroMonitor

> **Fase 1 — Auditoria e Extração Visual (somente leitura).**
> Este documento é o entregável para **sua aprovação** antes de qualquer código
> ser escrito (Fase 2). Nada foi criado ou deletado ainda, exceto este relatório.

---

## 0. Sumário executivo e recomendação honesta

O projeto atual **não é um amontoado de código legado de IA**. Ele já roda sobre
uma base moderna e coerente: TanStack Start (SSR + Router + Query), React 19,
TypeScript, Tailwind v4 com design tokens em `oklch`, shadcn/ui e uma camada de
dados MCP tipada com Zod. Arquiteturalmente, **80% já está no padrão-alvo**.

Portanto, "reconstruir do zero" no sentido literal (jogar tudo fora e reescrever)
traria **risco de regressão alto com ganho baixo**, especialmente para a
paridade pixel-perfect — o Design System vive inteiro em `src/styles.css` e
recriá-lo "à mão" quase garante desvio de cor/espaçamento.

**Recomendação:** fazer uma **reconstrução limpa cirúrgica** — nova estrutura de
pastas por camadas, componentes remontados a partir dos estilos extraídos, e
descarte agressivo de código morto — **preservando byte a byte os tokens de
tema, fontes e animações** que definem a aparência. O resultado é código mais
limpo E paridade visual de 100%, sem apostar a aparência num "refazer no olho".

Os detalhes abaixo sustentam essa recomendação. **Aguardo seu aval (ou ajustes)
antes de codificar.**

---

## 1. Mapa de telas, estados e modais

| Rota | Arquivo atual | Papel | Estados visuais |
|------|---------------|-------|-----------------|
| `/` | `routes/index.tsx` | Landing page do produto (hidrômetro) | Hero com parallax, nav flutuante *glassmorphism*, card de dashboard flutuante (mock), grid de features, faixa de specs, CTA, footer |
| `/auth/login` | `routes/auth.login.tsx` | Login | Idle · carregando (`"Entrando..."`) · erro · toggle mostrar/ocultar senha |
| `/auth/signup` | `routes/auth.signup.tsx` | Cadastro | Idle · carregando · erro (termos não aceitos / senha curta / erro Supabase) · checkbox de termos · toggle senha |
| `/auth/verify` | `routes/auth.verify.tsx` | OTP de 6 dígitos | Idle · verificando · erro (código inválido) · "novo código enviado" · auto-submit ao completar |
| `/terms` | `routes/terms.tsx` | Termos de uso (conteúdo estático) | Único estado |
| `/dashboard` | `routes/_authenticated/dashboard.tsx` | **Placeholder** "Página em construção" (protegido) | Único estado — a UI real de monitoramento **ainda não existe** |
| `*` (404) | `routes/__root.tsx` → `NotFoundComponent` | Não encontrado | — |
| erro | `routes/__root.tsx` → `ErrorComponent` | Boundary de erro | "Try again" / "Go home" |

**Não há modais/dialogs em uso** nas telas de produto, apesar de o projeto
trazer `dialog`, `sheet`, `drawer`, `alert-dialog` no `ui/`. São dependências
não utilizadas (ver §5).

**Componentes compartilhados reais:** `AuthShell` (+ `AuthInput`, `AuthButton`),
`Logo` (`LogoMark`, `LogoWordmark`). O ícone de olho (`Eye`/`EyeOff`) está
**duplicado** literalmente em `login` e `signup`.

---

## 2. Design System extraído (fonte da verdade para a paridade)

Todo o tema vive em `src/styles.css` (Tailwind v4, `@theme inline`). **Estes
valores serão portados verbatim.**

### 2.1 Cores — tokens semânticos (`oklch`)

Modo claro (`:root`) e escuro (`.dark`):

| Token | Claro | Escuro |
|-------|-------|--------|
| `--background` | `oklch(0.99 0.006 220)` | `oklch(0.2 0.04 245)` |
| `--foreground` | `oklch(0.24 0.05 240)` | `oklch(0.97 0.01 220)` |
| `--card` | `oklch(1 0 0)` | `oklch(0.26 0.05 245)` |
| `--primary` | `oklch(0.6 0.15 235)` | `oklch(0.68 0.14 220)` |
| `--secondary` | `oklch(0.94 0.03 225)` | `oklch(0.3 0.05 245)` |
| `--muted` | `oklch(0.95 0.02 225)` | `oklch(0.3 0.05 245)` |
| `--accent` | `oklch(0.72 0.14 200)` | `oklch(0.6 0.12 200)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` / `--input` | `oklch(0.9 0.02 225)` | `oklch(1 0 0 / 12–15%)` |
| `--deep` | `oklch(0.28 0.09 250)` | `oklch(0.16 0.04 245)` |
| `--ring` | `oklch(0.6 0.15 235)` | `oklch(0.68 0.14 220)` |

`--radius: 0.5rem` (deriva `sm/md/lg/xl/2xl`).

### 2.2 Cores de marca *hard-coded* (HEX)

Coexistem com os tokens e **precisam ser preservadas** onde aparecem:

- `#5B9BFF` (Hidro claro), `#5FD0FF` (Monitor / ciano), `#1E4FA6` (azul botão),
  hover `#1a4494`, `#001a33` (texto sobre gradiente), `#002953` (`theme-color`).
- Gradiente do dashboard placeholder: `from-[#5B9BFF] to-[#5FD0FF]`.

> **Débito de consistência a resolver:** a wordmark usa `#5B9BFF` na landing/dashboard
> mas `#1E4FA6` no `AuthShell`/`LogoWordmark`. Vou **manter cada ocorrência como
> está** (paridade) e apenas centralizá-la numa constante, sem alterar a cor renderizada.

### 2.3 Tipografia

- **Display:** `"Fraunces", "Georgia", serif` → aplicada a `h1/h2/h3`, `letter-spacing: -0.02em`.
- **Sans:** `"Inter", sans-serif` → corpo.
- Carregadas via Google Fonts no `__root.tsx` (`Fraunces 500..700`, `Inter 400;500;600`).
- Escala observada: hero `text-4xl→6xl`, títulos de seção `text-3xl/4xl`,
  números de destaque `text-4xl` bold, corpo `text-sm/base`.

### 2.4 Sombras, bordas, efeitos

- Nav *glass*: `bg-white/15 backdrop-blur-xl border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.28)]`.
- Card dashboard: `rounded-3xl shadow-2xl border-white/10`.
- Botão gradiente: `shadow-[0_6px_24px_rgba(95,208,255,0.35)]`.
- Blobs de fundo: círculos `bg-primary/25` / `bg-accent/20` com `blur-3xl`.
- Raios recorrentes: `rounded-full` (nav/botões/badges), `rounded-2xl`/`3xl` (cards), `rounded-lg` (inputs).

### 2.5 Animações (keyframes custom em `styles.css`)

- `wave-move` → utilitários `wave-slow` (14s), `wave-fast` (8s), `wave-back` (22s reverse) — ondas SVG em parallax.
- `float-y` → `float-slow` (6s) — card do hero flutuando.
- **Parallax de scroll** por JS em `index.tsx` (`useEffect` + `requestAnimationFrame`), com *guard* de `prefers-reduced-motion` e `pointer: fine`.
- Micro-interações Tailwind: `hover:scale-105`, `hover:-translate-y-1`, `transition-colors`.

### 2.6 Ícones

- **Lucide React** disponível, mas as telas usam **SVGs inline manuais**
  (olho, WhatsApp, Instagram, seta, gota estilizada). Serão preservados como
  componentes de ícone dedicados (sem trocar por Lucide, para não mudar o traço).

---

## 3. Fluxo de dados e requisitos funcionais

### 3.1 Modelo de dados (Supabase)

Tabela `public.readings` (migração `2026071900...sql`):

```
id uuid pk · user_id uuid fk→auth.users · liters numeric (>=0)
read_at timestamptz · created_at timestamptz
```

- **RLS por usuário** (select/insert/update/delete só do próprio `user_id`).
- Índice `(user_id, read_at desc)`, `REPLICA IDENTITY FULL` + publicação
  `supabase_realtime` → **realtime já habilitado** para o futuro dashboard.

### 3.2 Autenticação

- Cliente browser: `integrations/supabase/client.ts` (lazy via `Proxy`, sessão em `localStorage`).
- Guard de rota: `_authenticated/route.tsx` (`beforeLoad` → `supabase.auth.getUser()`, senão `redirect` p/ login; `ssr: false`).
- Fluxos: `signInWithPassword`, `signUp` + `verifyOtp(type: "signup")` + `resend`, `signOut`.
- `login` respeita `?next=` (validado contra open-redirect).

### 3.3 Camada MCP (server-side, já existente)

`lib/mcp/` expõe 3 ferramentas tipadas (Zod) sobre `readings`, cada uma com
cliente Supabase escopado ao token do usuário:

- `list_readings` (read-only, cap 100)
- `create_reading` (`liters >= 0`, `read_at` opcional)
- `delete_reading` (destrutivo, por `id`)

Publicadas via `routes/[.mcp]/*` e `[.well-known]/oauth-protected-resource`.
**Há repetição:** o helper `supabaseForUser()` está copiado nos 3 arquivos.

### 3.4 Requisito funcional implícito

O dashboard real deve exibir **consumo de água** (hoje / semana / mês, série
temporal em litros/m³) — exatamente o que o **mock** na landing (`DashboardCard`)
já desenha e o que a tabela `readings` sustenta. Hoje `/dashboard` é só um
placeholder "em construção".

### 3.5 Bugs latentes encontrados (candidatos a correção na Fase 2)

> Corrigi-los pode alterar levemente o visual/comportamento; **sinalizo para você
> decidir** entre "paridade 100% congelada" vs. "paridade + correções óbvias".

1. `auth.verify.tsx` — `disabled={!digits.join("").length === 6}`: precedência de
   operador; o botão **nunca** fica desabilitado como pretendido.
2. `auth.verify.tsx` — `v.replace(/\\D/g, "")`: barra dupla → regex errada;
   sanitização/colagem de dígitos quebrada.
3. `auth.verify.tsx` — subtítulo `` `...6 dígitos${email}` ``: e-mail colado ao
   texto, sem espaço/formatação.
4. `dashboard.tsx` — typos: "vocês verá", "hidrómetro" (acento inconsistente).
5. `Logo.tsx` — importa `useMemo` sem usar (import morto).

---

## 4. Nova estrutura de diretórios proposta

Organização **por camada** (apresentação / lógica / dados), mantendo o
file-based routing do TanStack como fino "controlador" que só compõe features.

```
src/
├─ styles.css                      # tema PORTADO VERBATIM (fonte da paridade)
├─ router.tsx  start.ts  server.ts # bootstrap (mantidos)
│
├─ routes/                         # SÓ roteamento: cada rota importa uma feature
│  ├─ __root.tsx
│  ├─ index.tsx                    # → features/marketing
│  ├─ terms.tsx
│  ├─ auth.login/signup/verify.tsx # → features/auth
│  └─ _authenticated/
│     ├─ route.tsx                 # guard
│     └─ dashboard.tsx             # → features/dashboard
│
├─ features/                       # LÓGICA + APRESENTAÇÃO por domínio
│  ├─ marketing/                   # landing: Hero, Wave, DashboardPreview,
│  │                               #   Features, SpecsBand, CTA, SiteFooter
│  ├─ auth/
│  │  ├─ components/  AuthShell, AuthInput, AuthButton, PasswordField, OtpInput
│  │  ├─ hooks/       useLogin, useSignup, useVerifyOtp   (mutations isoladas)
│  │  └─ schemas.ts   (Zod: e-mail, senha, OTP)
│  └─ dashboard/                   # placeholder hoje; base p/ o painel real
│
├─ components/
│  ├─ ui/                          # shadcn — SÓ os efetivamente usados (ver §5)
│  ├─ brand/    Logo, Wordmark
│  └─ icons/    Eye, EyeOff, WhatsApp, Instagram, ... (SVGs deduplicados)
│
├─ lib/
│  ├─ utils.ts (cn)
│  ├─ brand.ts                     # constantes: WHATSAPP, INSTAGRAM, cores HEX de marca
│  └─ mcp/                         # ferramentas MCP + helper supabaseForUser único
│
└─ integrations/supabase/          # client, client.server, types (mantidos)
```

### Princípios

- **`routes/` fica "burro":** define `Route` e renderiza `<Feature />`. Zero lógica de negócio inline.
- **Camadas separadas:** UI (components/features view) · lógica (hooks/mutations) · dados (supabase/mcp). Nenhuma tela chama `supabase.auth.*` no meio do JSX — vai para um hook.
- **Sem duplicação:** `Eye/EyeOff` viram `components/icons`; `supabaseForUser` vira um helper único em `lib/mcp`; cores de marca em `lib/brand.ts`.

---

## 5. Gerenciamento de estado

Mantém o padrão do `AI_RULES.md` (sem Redux/Zustand):

- **Estado de servidor:** TanStack Query — `useMutation` para login/signup/verify;
  `useQuery` + realtime para o futuro dashboard de leituras.
- **Estado de URL:** search params tipados do TanStack Router (`?next=`, `?email=`).
- **Estado local de UI:** `useState` (mostrar senha, dígitos do OTP, etc.).
- **Formulários:** onde crescer, React Hook Form + Zod (`@hookform/resolvers`),
  já nas dependências mas ainda não usado nas telas de auth atuais.

---

## 6. Plano de descarte (código morto / duplicado)

**A remover/consolidar** (após confirmar zero imports):

- `components/ui/*` **não usados** — hoje há ~50 componentes shadcn; as telas usam
  pouquíssimos. Manterei apenas os importados de fato + os que o dashboard novo exigir.
- Duplicação de `Eye`/`EyeOff` entre `login` e `signup`.
- `useMemo` morto em `Logo.tsx`.
- Repetição de `supabaseForUser()` nas 3 tools MCP.
- Avaliar `LogoWordmark` (definido, uso limitado) — manter só se referenciado.

**A preservar intocado** (infra/paridade):

- `styles.css`, fontes e `__root.tsx` (meta/OG/links) — base da paridade.
- `integrations/supabase/*`, `routeTree.gen.ts`, `server.ts`/`start.ts`, `vite.config.ts`.
- Arquivos Lovable (`.lovable/`, `AGENTS.md`) — **não mexer** (histórico Lovable).

---

## 7. Ordem de execução proposta (Fase 2) e pontos de validação

Conforme a **Regra de Ouro** (pausar a cada módulo p/ você validar no navegador):

1. **Fundação** — nova árvore de pastas + `styles.css` portado + `lib/brand.ts` + `components/icons`. ⏸️ *checkpoint: build limpo, tema idêntico.*
2. **Landing (`/`)** — Hero, Wave, DashboardPreview, Features, Specs, CTA, Footer. ⏸️ *checkpoint visual.*
3. **Auth shell + Login** — `AuthShell`, `PasswordField`, `useLogin`. ⏸️
4. **Signup + Verify (OTP)** — `OtpInput`, schemas, mutations. ⏸️
5. **Terms + Dashboard placeholder + rota protegida.** ⏸️
6. **Camada MCP** deduplicada. ⏸️ *checkpoint final: paridade completa + lint/types.*

---

## 8. Decisões que preciso que você confirme

1. **Estratégia:** aprova a **reconstrução limpa cirúrgica** (§0), preservando
   `styles.css`/tema verbatim? Ou prefere reescrever o tema também do zero?
2. **Bugs da §3.5:** corrijo junto ("paridade + correções óbvias") ou **congelo o
   comportamento atual** para paridade 100% e trato bugs depois?
3. **Componentes shadcn não usados:** posso removê-los, ou prefere manter o `ui/` completo?
4. **Escopo:** a Fase 2 inclui **construir o dashboard real** de consumo (a UI que
   hoje é placeholder) ou apenas reconstruir o que já existe visualmente?

> **Não iniciarei a Fase 2 sem sua aprovação deste relatório e das respostas acima.**
```