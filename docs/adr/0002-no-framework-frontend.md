# ADR 0002 — Vanilla frontend, no framework

**Status:** accepted

## Context

The audience is a mix of backend, platform, and lead engineers, not all of whom
work in a frontend framework. The course is about the AI-augmented workflow, not
about React. Every minute spent explaining framework mechanics is a minute not
spent on the actual lesson.

## Decision

The storefront in `public/` is plain HTML, one stylesheet, and vanilla ES
modules. No framework, no bundler, no build step. Render helpers are pure
functions that return HTML strings, so they stay easy to read and to test.

## Consequences

- **Good:** anyone can read it; agent runs stay small and fast; the file you
  edit is the file that ships.
- **Trade-off:** no component model or reactivity. For an app this size that is
  fine. If the app grew, this decision would be revisited.
- All styling stays in `public/styles.css` so there is exactly one place to look.
