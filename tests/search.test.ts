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
