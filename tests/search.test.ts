import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { store } from "../src/store.js";
const app = createApp();
beforeEach(() => store.reset());

describe("catalogue search", () => {
  it("matches a partial title without case sensitivity", async () => {
    const res = await request(app).get("/api/books").query({ q: "LiGhT" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual(["the-lantern-sea"]);
  });
  it("matches a partial author without case sensitivity", async () => {
    const res = await request(app).get("/api/books").query({ q: "STED" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual(["the-lantern-sea"]);
  });
  it("returns 200 and an empty list when nothing matches", async () => {
    const res = await request(app).get("/api/books").query({ q: "not-a-real-title" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("treats an empty query as the full catalogue", async () => {
    const res = await request(app).get("/api/books?q=");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
  });
  it("keeps the no-parameter catalogue unchanged", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
  });
});

describe("catalogue genre filtering", () => {
  it("matches an exact genre without case sensitivity", async () => {
    const res = await request(app).get("/api/books").query({ genre: "mYsTeRy" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual([
      "paper-mountains",
      "summer-on-alder-street",
      "midnight-in-bellview",
    ]);
  });
  it("does not match genre substrings", async () => {
    const res = await request(app).get("/api/books").query({ genre: "Fic" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("combines search and genre with AND", async () => {
    const res = await request(app).get("/api/books").query({ q: "the", genre: "Mystery" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual([
      "paper-mountains",
      "midnight-in-bellview",
    ]);
  });
  it("returns 200 with no books when the two filters do not intersect", async () => {
    const res = await request(app).get("/api/books").query({ q: "light", genre: "Mystery" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("catalogue query edge cases", () => {
  it("trims surrounding whitespace on both filters", async () => {
    const res = await request(app).get("/api/books").query({ q: " light ", genre: " fiction " });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual(["the-lantern-sea"]);
  });
  it("treats whitespace-only filters as absent", async () => {
    const res = await request(app).get("/api/books").query({ q: "  ", genre: "  " });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
  });
  it("returns an empty list for an unknown genre", async () => {
    const res = await request(app).get("/api/books").query({ genre: "Biography" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it.each(["q=x&q=y", "genre=Fiction&genre=Mystery", "q[x]=light", "genre[x]=Mystery"])(
    "rejects repeated or structured filters: %s",
    async (query) => {
      const res = await request(app).get(`/api/books?${query}`);
      expect(res.status).toBe(400);
      expect(typeof res.body.error).toBe("string");
    },
  );
  it("does not mutate the catalogue when filtering", async () => {
    const before = await request(app).get("/api/books");
    await request(app).get("/api/books").query({ q: "light", genre: "Fiction" });
    const after = await request(app).get("/api/books");
    expect(after.status).toBe(200);
    expect(after.body).toEqual(before.body);
  });
});

describe("search regression coverage", () => {
  it("combines an author match with genre", async () => {
    const res = await request(app).get("/api/books").query({ q: "WEIR", genre: "sci-fi" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual(["quiet-orbit"]);
  });
  it("preserves catalogue order among multiple search results", async () => {
    const res = await request(app).get("/api/books").query({ q: "the" });
    expect(res.status).toBe(200);
    expect(res.body.map((book: { id: string }) => book.id)).toEqual([
      "the-lantern-sea",
      "paper-mountains",
      "the-maple-archive",
      "midnight-in-bellview",
      "the-cartographers-daughter",
      "salt-and-cedar",
    ]);
  });
  it("keeps detail lookup independent of catalogue query filters", async () => {
    const res = await request(app)
      .get("/api/books/the-lantern-sea")
      .query({ q: "no-match", genre: "Mystery" });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("the-lantern-sea");
    expect(res.body.rating).toBe(4.5);
  });
});
