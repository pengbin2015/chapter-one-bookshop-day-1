import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("GET /api/health", () => {
  it("responds 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
  });

  it("reports status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.body).toEqual({ status: "ok" });
  });
});
