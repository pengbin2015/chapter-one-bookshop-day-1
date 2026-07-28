# ADR 0003 — Test through the HTTP seam

**Status:** accepted

## Context

We want tests that give confidence without coupling to implementation detail, so
the codebase can be refactored (including by agents) without rewriting the suite.

## Decision

The primary test seam is the **HTTP API**, exercised with Supertest against the
app from `createApp()` (no live listener). Frontend render helpers are tested as
**pure functions** that return HTML strings. Tests assert on external behaviour —
status codes, response bodies, rendered output — not on internals.

## Consequences

- **Good:** tests survive refactors; they document the API contract; they run
  fast with no network or database.
- **Trade-off:** very fine-grained unit tests of private helpers are
  discouraged. That is intentional — behaviour is the contract.
- New features add behaviour-level tests at this seam (see
  `.github/instructions/tests.instructions.md`).
