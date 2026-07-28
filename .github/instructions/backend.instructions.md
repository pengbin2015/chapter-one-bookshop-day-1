---
name: Backend Conventions
description: Conventions for the Express + TypeScript backend.
applyTo: "src/**"
---

# Backend conventions (`src/**`)

- **Language:** TypeScript, ES modules. Local imports end in `.js`
  (e.g. `import { store } from "./store.js"`) — that is correct for this setup.
- **Routes** live in `src/routes/` and are mounted in `src/app.ts`. Keep
  `createApp()` listener-free so tests can import the app.
- **Validation happens at the edge.** Validate request bodies in the route
  before touching the store. Reject bad input early.
- **Error shape:** always respond with JSON `{ error: "message" }` and a correct
  status code:
  - `400` — the request body is missing or invalid
  - `404` — the requested resource does not exist
  - `201` — a resource was created
  - `204` — a resource was deleted (no body)
- **The store is the single source of truth** (`src/store.ts`). Do not read or
  write module-level arrays directly from a route; go through the store.
- **Never mutate the seed.** The store already deep-copies; keep it that way.
- Do not add a database, an ORM, or persistence. In-memory is deliberate.
