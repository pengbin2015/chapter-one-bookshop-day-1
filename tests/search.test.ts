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
