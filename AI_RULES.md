# AI Rules & Project Guidelines

## Tech Stack
- **React 19**: Modern UI library utilizing concurrent features, improved hooks, and native support for document metadata.
- **TypeScript**: Strongly typed JavaScript ensuring type safety, robust interfaces, and self-documenting code across the application.
- **TanStack Start**: Full-stack React framework powered by TanStack Router, TanStack Query, and Nitro, supporting Server-Side Rendering (SSR) and server functions.
- **TanStack Router**: Fully type-safe routing with automatic route tree generation, nested layouts, and search parameter validation.
- **TanStack Query (React Query)**: Powerful asynchronous state management, caching, and data fetching for server state.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid, responsive, and modern styling with native CSS variables.
- **shadcn/ui & Radix UI**: Accessible, unstyled, and highly customizable UI primitives and prebuilt components.
- **Supabase**: Backend-as-a-Service (BaaS) providing PostgreSQL database, authentication, and real-time subscriptions.
- **Lucide React**: Clean, consistent, and modern icon library.

---

## Library Usage Rules

### 1. Routing & Navigation
- **What to use**: **TanStack Router** (`@tanstack/react-router`).
- **Rules**:
  - Define routes in `src/routes/` using file-based routing (e.g., `src/routes/index.tsx`, `src/routes/auth.login.tsx`).
  - Use `createFileRoute` to define routes.
  - Use the `<Link>` component from `@tanstack/react-router` for all internal navigation.
  - Do **NOT** install or use React Router or other routing libraries.

### 2. Data Fetching & Server State
- **What to use**: **TanStack Query** (`@tanstack/react-query`).
- **Rules**:
  - Use `useQuery` for fetching data and `useMutation` for creating, updating, or deleting data.
  - Keep server state synchronized using query invalidation (`queryClient.invalidateQueries`).
  - Do **NOT** use `useEffect` for data fetching.

### 3. Database & Authentication
- **What to use**: **Supabase** (`@supabase/supabase-js`).
- **Rules**:
  - Use the pre-configured Supabase client in `src/integrations/supabase/client.ts` for client-side database queries and authentication.
  - Use `src/integrations/supabase/client.server.ts` for server-side operations.
  - Leverage Supabase Auth for user registration, login, and session management.

### 4. Styling & Layout
- **What to use**: **Tailwind CSS v4**.
- **Rules**:
  - Use Tailwind utility classes for all layouts, spacing, colors, and typography.
  - Keep custom CSS to a minimum. If custom styles or animations are needed, add them to `src/styles.css` using Tailwind directives.
  - Ensure responsive design using Tailwind's responsive modifiers (`sm:`, `md:`, `lg:`, etc.).

### 5. UI Components
- **What to use**: **shadcn/ui** (built on Radix UI primitives).
- **Rules**:
  - Use prebuilt components from `src/components/ui/` (e.g., Button, Dialog, Input, Card, Sheet).
  - Do **NOT** edit the files inside `src/components/ui/` directly. If you need custom behavior, wrap them or create a new component in `src/components/`.
  - Always prioritize shadcn/ui components over building custom UI elements from scratch.

### 6. Icons
- **What to use**: **Lucide React** (`lucide-react`).
- **Rules**:
  - Use Lucide icons for all visual indicators, buttons, and navigation items.
  - Keep icon sizes consistent (typically `size={16}` or `size={20}`).

### 7. Forms & Validation
- **What to use**: **React Hook Form** (`react-hook-form`) with **Zod** (`zod`) and `@hookform/resolvers`.
- **Rules**:
  - Use React Hook Form for managing form state, validation, and submission.
  - Define form schemas using Zod for type-safe validation.
  - Integrate with shadcn/ui's `<Form>` wrapper components for consistent styling and error display.

### 8. State Management
- **What to use**: Built-in React state, TanStack Router search params, and TanStack Query.
- **Rules**:
  - Use `useState` and `useReducer` for local, component-specific UI state.
  - Use TanStack Router search parameters for URL-driven state (e.g., pagination, filters, active tabs).
  - Use TanStack Query for all server-derived state.
  - Do **NOT** introduce Redux, Zustand, or other global state managers unless explicitly requested.
