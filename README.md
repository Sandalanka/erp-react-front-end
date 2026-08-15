# ERP Frontend

React + TypeScript + Vite + Tailwind CSS frontend for the ERP system.

## Stack

React Router, TanStack Query, React Hook Form + Zod, Axios, Lucide icons.

## Architecture

```
src/
├── components/    # shared reusable UI components
├── layouts/        # app shell (Sidebar, Header, MobileBottomNav, AppLayout)
├── pages/           # route-level pages
├── features/          # feature-based modules (auth, customers, products, ...)
├── hooks/              # shared hooks
├── services/            # API service functions per feature
├── api/                  # axios client, shared API types
├── types/                 # shared TypeScript types
├── utils/                   # helpers
├── routes/                   # router config, nav items
└── stores/                     # client-only UI state (used sparingly)
```

Server state lives in TanStack Query, not global stores. UI state stays local unless it's genuinely cross-cutting.

## Prerequisites

- Node.js 20+
- The erp-backend API running (see erp-backend/README.md)

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to the backend URL
```

## Development

```bash
npm run dev   # http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm test
npm run lint
npm run lint:fix
npm run format
npm run typecheck
```

## Responsive design

Mobile-first. Sidebar collapses to a hamburger + slide-out drawer with a bottom tab bar below `lg`; full sidebar + header above `lg`. Minimum touch target 44px (`min-h-11` / `h-11`).

## Git workflow

`main` ← `develop` ← `feature/*`. One feature branch per module, matching the corresponding branch in erp-backend.
