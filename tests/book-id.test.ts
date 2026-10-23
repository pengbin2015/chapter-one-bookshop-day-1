import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
const app = createApp();

describe("book id validation", () => {
  it("rejects an encoded whitespace id with a JSON error", async () => {
    const res = await request(app).get("/api/books/%20%20");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Book id must not be blank" });
  });
  it("keeps an unknown nonblank id as a JSON 404", async () => {
    const res = await request(app).get("/api/books/unknown-book");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("keeps the trailing-slash catalogue route as a list", async () => {
    const res = await request(app).get("/api/books/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(8);
  });
});
