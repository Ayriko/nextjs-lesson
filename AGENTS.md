# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Package Manager

This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn`.

## Commands

```bash
pnpm dev            # Start development server at http://localhost:3000
pnpm dev:clean      # Wipe .next cache then start dev server (Windows: rmdir /s /q)
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # Run ESLint (Next.js core-web-vitals + TypeScript rules)
```

Prisma commands (run via pnpm dlx or the local binary):

```bash
pnpm prisma generate          # Regenerate the TypeScript client into generated/prisma/
pnpm prisma migrate dev       # Create and apply a new migration
pnpm prisma db push           # Push schema changes without a migration file
pnpm prisma studio            # Open Prisma Studio GUI
```

There is no test framework configured in this project.

## Architecture

### Routing (Next.js App Router)

- `app/(front)/` — public-facing storefront. Uses the root layout (`app/layout.tsx`) which wraps every page with `Header` and `Footer`.
- `app/(admin)/` — placeholder for a future admin section (currently empty).
- Route groups `(front)` and `(admin)` are purely organisational; they do not appear in URLs.
- Dynamic route: `app/(front)/products/[slug]/page.tsx` renders a single product detail page.

### Domain-Driven Organisation

Business logic is grouped under `app/domains/<domain>/`:

- `app/domains/catalog/` — product catalog domain.
  - `components/ProductCard.tsx` — presentational card used on the home page grid.
  - `data/products.json` — **static** product data currently used by the front-end pages. The Prisma `Product` model exists but the UI is not yet wired to the database.

Shared layout components live at `app/components/` (Header, Footer).

### Prisma / Database

- Database: SQLite (`dev.db` at the project root), accessed via the `better-sqlite3` driver adapter.
- `DATABASE_URL` is set in `.env` as `file:./dev.db`.
- Schema: `prisma/schema.prisma`. Models: `Product`, `Cart`, `CartItem`, `SimilarProduct`, `User`.
- The Prisma client is generated to `generated/prisma/` (non-default location). Always import from `@/generated/prisma/client`, **not** from `@prisma/client`.
- A singleton client is exported from `lib/prisma.ts`. Import it with `import { prisma } from "@/lib/prisma"` in Server Components and server actions.
- After changing `prisma/schema.prisma`, run `pnpm prisma generate` to update the generated client.

### Path Alias

`@/*` resolves to the project root (e.g. `@/lib/prisma`, `@/app/domains/...`).

### Styling

Tailwind CSS v4 with PostCSS. Global styles are in `app/globals.css`. The app supports dark mode via Tailwind's `dark:` variant.

### Remote Images

`next.config.ts` allows remote images from `images.unsplash.com`. Add additional hostnames there if needed.
