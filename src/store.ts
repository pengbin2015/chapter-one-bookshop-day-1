import type { Book } from "./types.js";
import { SEED_BOOKS } from "./data/seed.js";

/**
 * A tiny in-memory data store. There is no database (see docs/adr/0001).
 * State lives only for the life of the process — restarting the server resets
 * everything back to the seed. That is a deliberate teaching choice, not a bug.
 */
class Store {
  private books: Book[] = [];

  constructor() {
    this.reset();
  }

  /** Restore the catalogue to its seeded state. Used by tests and on startup. */
  reset(): void {
    // Deep copy so callers can never mutate the seed by reference.
    this.books = SEED_BOOKS.map((b) => ({ ...b }));
  }

  listBooks(): Book[] {
    return this.books.map((b) => ({ ...b }));
  }

  getBook(id: string): Book | undefined {
    const found = this.books.find((b) => b.id === id);
    return found ? { ...found } : undefined;
  }
}

export const store = new Store();
