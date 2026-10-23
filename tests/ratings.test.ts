import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { store } from "../src/store.js";
const app = createApp();
beforeEach(() => store.reset());

describe("book ratings", () => {
  it("returns a numeric 0–5 rating for every seeded catalogue book", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
    for (const book of res.body) {
      expect(typeof book.rating).toBe("number");
      expect(book.rating).toBeGreaterThanOrEqual(0);
      expect(book.rating).toBeLessThanOrEqual(5);
    }
  });
  it("returns the same rating on detail and catalogue responses", async () => {
    const catalogue = await request(app).get("/api/books");
    for (const book of catalogue.body) {
      const detail = await request(app).get(`/api/books/${book.id}`);
      expect(detail.status).toBe(200);
      expect(detail.body.rating).toBe(book.rating);
    }
  });
  it("preserves the JSON 404 for an unknown rated book", async () => {
    const res = await request(app).get("/api/books/no-such-book");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
