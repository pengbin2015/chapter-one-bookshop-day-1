import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("API framework errors", () => {
  it.each(["/api/books/%", "/api/books/%E0%A4%A"])(
    "returns JSON instead of an HTML error page for malformed URL %s",
    async (path) => {
      const res = await request(app).get(path);
      expect(res.status).toBe(400);
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body).toEqual({ error: "Invalid request" });
    },
  );

  it("returns JSON for an invalid JSON request body", async () => {
    const res = await request(app)
      .get("/api/health")
      .set("Content-Type", "application/json")
      .send("{");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid request" });
  });

  it("preserves the request-too-large status with a JSON error", async () => {
    const res = await request(app)
      .get("/api/health")
      .send({ payload: "x".repeat(110_000) });
    expect(res.status).toBe(413);
    expect(res.body).toEqual({ error: "Invalid request" });
  });
});
