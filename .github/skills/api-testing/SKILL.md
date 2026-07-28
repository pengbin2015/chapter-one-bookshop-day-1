---
name: api-testing
description: "Procedure for adding tests to a Chapter One API route. Use when asked to add, run, or fix tests for an endpoint."
---

# API testing

## When to use this skill

- Adding tests for a new or changed route
- Fixing a failing route test

## Procedure

1. Read [test-template.ts](./test-template.ts) for the shape of a test file.
2. Write one test per behaviour, covering:
   - **the happy path** — correct status code and body
   - **an unknown id** — `404` with a JSON `{ error }` body
   - **a query that legitimately matches nothing** — an empty array and `200`,
     not a `404`
   - **invalid input**, if the route accepts any — `400` with `{ error }`
3. Run `npm test`. The whole suite must be green, including the tests that
   already existed.

## Note

Style rules for test files — Vitest, Supertest against `createApp()`,
`store.reset()` in `beforeEach`, naming tests by behaviour — come from
`.github/instructions/tests.instructions.md` and load automatically whenever
you edit anything in `tests/`. This skill only carries the procedure.
