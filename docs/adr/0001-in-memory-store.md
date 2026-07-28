# ADR 0001 — In-memory store, no database

**Status:** accepted

## Context

Chapter One is a teaching codebase. Learners clone it on ~20 machines and must
reach a known-good, identical state in minutes, with no infrastructure to
install.

## Decision

Data lives in a process-memory store (`src/store.ts`), seeded from
`src/data/seed.ts`. There is no database. Restarting the server resets all data
to the seed.

## Consequences

- **Good:** zero setup, deterministic starting state, trivial test isolation via
  `store.reset()`.
- **Trade-off:** nothing persists across restarts. Anything a user adds is lost
  when the process stops. In a real product this would be a database; that is a
  known, deliberate gap, not a defect to "fix" during the course.
- Routes must go through the store rather than reading module-level arrays, so
  that swapping in a real database later touches one file.
