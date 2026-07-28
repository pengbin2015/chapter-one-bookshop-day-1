---
name: Frontend Conventions
description: Conventions for the vanilla-JS storefront.
applyTo: "public/**"
---

# Frontend conventions (`public/**`)

- **No framework, no build step.** Plain ES modules loaded with
  `<script type="module">`. No React/Vue/etc., no bundler.
- **All styling goes in `public/styles.css`.** No inline `style="..."` beyond
  the dynamic cover colour already used, no extra stylesheets, no CSS
  frameworks.
- **Escape everything you inject into HTML.** Use the exported `escapeHtml`
  helper for any title, author, or user-supplied text. A book title must never
  be able to run as markup or script.
- **Render helpers are pure and exported.** Functions like `bookCardHTML(book)`
  take data and return an HTML string, with no side effects, so they can be unit
  tested. Keep new render logic in that shape.
- **Talk to the API with `fetch`** against the same origin (`/api/...`). Handle
  the not-ok case; do not assume every response succeeded.
- Keep DOM bootstrap guarded so importing the module in a test does not run it.
