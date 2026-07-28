# AGENTS.md — Chapter One Bookshop

Instructions for any AI agent (GitHub Copilot, Claude, etc.) working in this repo.
Keep this file short; it is loaded into the agent's context on every task.

## What this project is

Chapter One is a **deliberately small online bookshop**, used to teach the
AI-augmented software development lifecycle. Today the storefront can **browse
the catalogue and open a book**. It cannot yet add, remove, or buy books — those
are the features we build during the course.

See `docs/glossary.md` for the domain vocabulary and `docs/adr/` for the
decisions behind the architecture. Use that vocabulary in code, tests, commits,
and any spec you write.

## How it is built

- **Backend:** Express + TypeScript in `src/`. Run directly with `tsx` — there
  is **no build step**.
- **Frontend:** plain HTML + vanilla JS + one stylesheet in `public/`. **No
  framework.**
- **Data:** an in-memory store (`src/store.ts`), seeded from `src/data/seed.ts`.
  There is **no database**; restarting the server resets all data. This is
  intentional (see `docs/adr/0001-in-memory-store.md`).
- One process, one port (default 3000). The Express server also serves `public/`.

## Commands

- `npm run dev` — start the server with reload at http://localhost:3000
- `npm test` — run the Vitest suite (must stay green)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run format` — Prettier (write) / `npm run format:check` (verify)

## Guardrails (do not cross without being asked)

- **No new dependencies.** Solve problems with what is already installed. If you
  believe a dependency is truly required, stop and ask first.
- **No CSS frameworks.** No Tailwind, Bootstrap, etc.
- **All styling lives in `public/styles.css`** — one stylesheet, no inline
  styles, no extra CSS files.
- **No build tooling.** Do not add a bundler, transpile step, or framework.
- **Never weaken the tests to make them pass.** Fix the code, not the assertion.

## Conventions

- API routes live in `src/routes/`, mounted in `src/app.ts`.
- Every API error is JSON in the shape `{ "error": "message" }` with an
  appropriate HTTP status (see `.github/instructions/backend.instructions.md`).
- Frontend code escapes anything it puts into HTML (see
  `.github/instructions/frontend.instructions.md`).
- Tests check external behaviour, not internals (see
  `.github/instructions/tests.instructions.md`).
- Commit messages follow Conventional Commits: `type(scope): summary`
  (feat, fix, docs, chore, refactor, test).

Path-specific detail is in `.github/instructions/*.instructions.md`; those apply
automatically to the files they name.

## What else is in .github/

- `prompts/` — reusable slash commands: `/commit`.
- `agents/reviewer.agent.md` — a read-only reviewer persona (no editing tools).
- `skills/api-testing/` — how tests are written here; used when adding or
  fixing route tests.
