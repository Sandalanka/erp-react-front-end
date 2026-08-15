# ERP Frontend

The web client for a professional, production-grade ERP system — covering sales,
purchasing, inventory, customers, suppliers, invoicing, payments, expenses, and
reporting. Built mobile-first for desktop, laptop, tablet, and mobile.

This is the frontend half of a two-repo project. The companion REST API lives in
the separate `erp-backend` repository.

## Tech stack

| Layer            | Technology                                      |
| ----------------- | ------------------------------------------------ |
| Framework          | React 19 + TypeScript                            |
| Build tool           | Vite 8                                            |
| Styling               | Tailwind CSS 4                                     |
| Routing                | React Router 7                                      |
| Server state             | TanStack Query 5                                     |
| Forms & validation         | React Hook Form + Zod                                 |
| HTTP client                  | Axios                                                   |
| Icons                          | Lucide React                                              |
| Testing                          | Vitest + React Testing Library + jsdom                     |
| Linting / formatting               | ESLint (flat config, typescript-eslint) + Prettier            |

## Architecture

Feature-based organization, server state kept in TanStack Query rather than a
global store, UI state kept local unless it's genuinely cross-cutting.

```
src/
├── components/     # shared reusable UI components (Button, Input, Modal, DataTable, ...)
├── layouts/         # app shell: Sidebar, Header, MobileBottomNav, AppLayout
├── pages/            # route-level pages
├── features/           # feature modules: auth, customers, suppliers, products,
│                          inventory, sales, purchases, invoices, payments, expenses, reports
├── hooks/                # shared hooks
├── services/               # API service functions, one set per feature
├── api/                      # axios client instance, shared API response types
├── types/                      # shared TypeScript types
├── utils/                        # helpers
├── routes/                         # router config, nav item definitions
└── stores/                           # client-only UI state (used sparingly)
```

## Prerequisites

- Node.js 20+
- The `erp-backend` API running locally (see its README for MySQL/Redis setup)

## Getting started

```bash
npm install
cp .env.example .env      # set VITE_API_URL to point at erp-backend
npm run dev                # http://localhost:5173
```

## Available scripts

| Script                | Purpose                                  |
| ---------------------- | ----------------------------------------- |
| `npm run dev`            | Start the Vite dev server with HMR         |
| `npm run build`            | Type-check and build a production bundle     |
| `npm run preview`            | Preview the production build locally          |
| `npm test`                     | Run the Vitest test suite once                   |
| `npm run test:watch`             | Run Vitest in watch mode                          |
| `npm run lint` / `lint:fix`        | Lint (and optionally auto-fix) with ESLint         |
| `npm run format`                     | Format the codebase with Prettier                    |
| `npm run typecheck`                    | Type-check without emitting output                       |

## Responsive design

Mobile-first, tested at 320–1920px+. Below the `lg` breakpoint the sidebar
collapses behind a hamburger button into a slide-out drawer, and a fixed bottom
tab bar takes over primary navigation; above `lg`, a persistent sidebar and full
header are shown. All interactive targets meet a 44px minimum touch size.

## Project status

Foundation module complete: project scaffolding, responsive app shell, routing,
API client, linting/testing/build pipeline. Business modules (authentication,
users, customers, products, inventory, sales, purchasing, invoicing, payments,
expenses, reporting) are developed one at a time on feature branches off
`develop` — see the module list and Git workflow below.

## Git workflow

```
main ← develop ← feature/*
```

Never commit directly to `main` or `develop`. Each module gets its own
`feature/<module-name>` branch, developed against both `erp-backend` and
`erp-frontend` in lockstep, tested, then merged into `develop`.

## Environment variables

See `.env.example`. `.env` is git-ignored and must never be committed.

```
VITE_API_URL=http://localhost:4000/api/v1
```
