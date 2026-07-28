---
name: Test Conventions
description: Conventions for the Vitest test suite.
applyTo: "tests/**"
---

# Test conventions (`tests/**`)

- **Vitest**, one `*.test.ts` file per area. API tests use **Supertest** against
  the app from `createApp()` — never start a real listener in a test.
- **Test external behaviour, not internals.** Assert on status codes, response
  bodies, and rendered output — not on private functions or implementation
  detail.
- **Reset shared state.** When a test mutates the store, call `store.reset()` in
  `beforeEach` so tests do not leak into each other.
- **Frontend render tests** import the pure helpers from `public/app.js` and
  assert on the HTML string they return (no DOM needed).
- Name tests by the behaviour they prove ("responds 404 for an unknown id"), not
  by the function they call.
- A new feature is not done until it has a test that would fail without it.
