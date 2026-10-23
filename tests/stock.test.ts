import { beforeEach, describe, expect, it } from "vitest";
import { store } from "../src/store.js";

beforeEach(() => store.reset());

describe("low-stock catalogue", () => {
  it("includes stock at the threshold and excludes higher stock", () => {
    const books = store.listLowStock();
    expect(books.map((book) => book.id)).toEqual([
      "paper-mountains",
      "the-maple-archive",
      "midnight-in-bellview",
      "salt-and-cedar",
    ]);
    expect(books.every((book) => book.stock <= 3)).toBe(true);
  });

  it("returns copies so callers cannot change catalogue stock", () => {
    const book = store.listLowStock()[0]!;
    book.stock = 100;
    expect(store.getBook(book.id)?.stock).toBe(3);
    expect(store.listLowStock()).toHaveLength(4);
  });
});
