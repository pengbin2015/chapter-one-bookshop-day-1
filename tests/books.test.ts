import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { store } from "../src/store.js";

const app = createApp();

beforeEach(() => {
  store.reset();
});

describe("GET /api/books", () => {
  it("responds 200 with an array", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("returns the seeded catalogue", async () => {
    const res = await request(app).get("/api/books");
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("every book has the required fields", async () => {
    const res = await request(app).get("/api/books");
    for (const book of res.body) {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
      expect(typeof book.price).toBe("number");
      expect(typeof book.stock).toBe("number");
    }
  });
});

describe("GET /api/books/:id", () => {
  it("returns a single book by id", async () => {
    const res = await request(app).get("/api/books/the-lantern-sea");
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("The Light Between Oceans");
  });

  it("responds 404 for an unknown id", async () => {
    const res = await request(app).get("/api/books/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("unknown API routes", () => {
  it("respond 404 with a JSON error", async () => {
    const res = await request(app).get("/api/nope");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
