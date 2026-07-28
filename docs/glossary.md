# Domain glossary — Chapter One

Shared vocabulary for the bookshop. Use these exact terms in code, tests,
commits, specs, and tickets so everyone (and every agent) means the same thing.

| Term                            | Meaning                                                                                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Book**                        | A single title in the catalogue. Has an `id` (a URL-friendly slug like `the-lantern-sea`), `title`, `author`, `price` (dollars, e.g. `14.99`), `genre`, `stock`, `description`, and a `cover` colour. |
| **Catalogue**                   | The full list of books currently in the store. Served by `GET /api/books`.                                                                                                                            |
| **Stock**                       | How many copies of a book are available. A book with low stock (`<= 3`) is worth flagging to shoppers.                                                                                                |
| **Store**                       | The in-memory data layer (`src/store.ts`). The single source of truth at runtime. Resets to the seed on restart.                                                                                      |
| **Seed**                        | The starting catalogue (`src/data/seed.ts`). Never mutated at runtime.                                                                                                                                |
| **Cart** _(not built yet)_      | A shopper's selected books before checkout. Introduced on Day 2.                                                                                                                                      |
| **Line item** _(not built yet)_ | One book plus a quantity within a cart.                                                                                                                                                               |
| **Checkout** _(not built yet)_  | Turning a cart into an order. Introduced on Day 2.                                                                                                                                                    |
| **Order** _(not built yet)_     | The record produced by a successful checkout.                                                                                                                                                         |

Terms marked _not built yet_ name features the course adds. They are listed here
so specs and tickets can use consistent language from the start.
