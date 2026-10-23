# Accepted catalogue search plan

Scope: GET /api/books only. No frontend form, new dependency or write endpoint.

## Acceptance criteria

- q: trimmed, case-insensitive partial match on title OR author.
- genre: trimmed, case-insensitive exact match, not substring.
- When both are present, combine with AND.
- Missing/empty/whitespace-only filters mean no restriction.
- Preserve seeded order; do not mutate the catalogue or seed.
- A legitimate no-match query returns 200 with [], never 404.
- Repeated/structured q or genre are invalid: 400 JSON { error }.
- Unrelated query parameters are ignored. Detail lookup stays unchanged.

## Phase 1 — search

Extend Store.listBooks with an optional search argument. Validate q at the route
edge. Add title, author, case, empty and no-match tests. Run tests/typecheck/lint.
Files: src/store.ts, src/routes/books.ts, tests/search.test.ts.

## Phase 2 — genre and combination

Extend Store.listBooks options with genre; validate genre at the edge. Add exact
case-insensitive genre and AND tests. Keep phase 1 green.
Files: src/store.ts, src/routes/books.ts, tests/search.test.ts.

## Run–test–fix / skill extension

Add whitespace, repeated/structured query, nonmutation, order and detail
regressions. Use the prepared case-sensitive bug to demonstrate a meaningful
failure, then fix it. Do not weaken the case-insensitivity assertion.

## Real seed examples

q=light or q=stedman → The Light Between Oceans.
genre=mystery → three books.
q=the&genre=mystery → The Cartographers and In the Woods.
Actual genres: Fiction, Mystery, Sci-Fi, Historical Fiction.
