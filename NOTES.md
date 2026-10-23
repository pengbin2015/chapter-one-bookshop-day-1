# Chapter One architecture handoff

- src/server.ts starts the one listener; src/app.ts creates a listener-free app.
- src/routes/books.ts validates requests and delegates to src/store.ts.
- src/data/seed.ts seeds the in-memory catalogue; restart resets it.
- public/ contains the vanilla storefront, served by the same Express process.
- npm test, npm run typecheck and npm run lint verify the development workflow.

The morning demo added low-stock lookup, blank-id validation, ratings, and
catalogue search/filter. Search and genre semantics are pinned in
docs/demo-search-plan.md. No database, frontend framework or new dependencies.
