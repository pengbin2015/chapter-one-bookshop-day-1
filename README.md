# Chapter One Bookshop

A deliberately small online bookshop, used as the working codebase for the
**AI-Augmented SDLC** course. It is real enough to feel like a product and small
enough to hold in your head.

Today the storefront can **browse the catalogue and open a book**. It cannot yet
add, remove, or buy books — those are the features you build during the course.

## Run it

Use **Node 24 LTS** for the Day 1 demos (`.nvmrc` pins 24).
The package accepts Node 20+, but the classroom checkpoints are rehearsed on 24.

```bash
npm ci
npm run dev        # http://localhost:3000
```

In another terminal:

```bash
npm test           # test counts vary by checkpoint (starter: 12)
curl localhost:3000/api/health
curl localhost:3000/api/books
```

## What's in the box

```
src/            Express + TypeScript backend (run with tsx — no build step)
  routes/       API routes, mounted in app.ts
  data/seed.ts  the starting catalogue
  store.ts      in-memory data store (resets on restart)
public/         the storefront — plain HTML + vanilla JS + one stylesheet
tests/          Vitest suite (Supertest for the API, pure helpers for rendering)
docs/           domain glossary and architecture decision records (ADRs)
.github/        Copilot steering: AGENTS.md conventions, instruction files,
                prompt files, and a read-only reviewer agent
```

## The API

| Method | Path             | Purpose                           |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/books`     | the whole catalogue               |
| GET    | `/api/books/:id` | one book by its slug id, or `404` |
| GET    | `/api/health`    | liveness check                    |

## Scripts

`npm run dev` · `npm start` · `npm test` · `npm run typecheck` ·
`npm run lint` · `npm run format` / `npm run format:check`

## Working with AI agents here

Read **`AGENTS.md`** first — it holds the conventions and guardrails. Path-specific
rules live in `.github/instructions/`, reusable prompts in `.github/prompts/`,
a read-only reviewer persona in `.github/agents/`, and an `api-testing` skill in
`.github/skills/`.

## Instructor checkpoints

See [the class demo guide](docs/class-demo-guide.md) for the slide-to-branch
map, expected behaviour, and recovery commands. Start a fresh `class/...`
working branch from an `origin/demo/...` checkpoint; keep the backup refs
unchanged. Search/rating features vary by checkpoint. No dependencies change
between checkpoints. The intentional bug branch is expected to fail tests.
