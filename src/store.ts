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

  listBooks(filters: { q?: string; genre?: string } = {}): Book[] {
    const q = filters.q?.trim().toLowerCase() ?? "";
    const genre = filters.genre?.trim().toLowerCase() ?? "";
    return this.books
      .filter(
        (book) =>
          !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q),
      )
      .filter((book) => !genre || book.genre.toLowerCase() === genre)
      .map((book) => ({ ...book }));
  }

  /** Copies of catalogue books with three or fewer copies in stock. */
  listLowStock(): Book[] {
    return this.listBooks().filter((book) => book.stock <= 3);
  }

  getBook(id: string): Book | undefined {
    const found = this.books.find((b) => b.id === id);
    return found ? { ...found } : undefined;
  }
}

export const store = new Store();
