// Standard shape for an API test file in this repo.
// Copy this file into tests/ (paths below assume that location),
// then replace the route and expectations.

import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { store } from "../src/store.js";

const app = createApp();

beforeEach(() => {
  // Reset shared state so tests do not leak into each other.
  store.reset();
});

describe("GET /api/example", () => {
  it("responds 200 with the expected body", async () => {
    const res = await request(app).get("/api/example");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("responds 404 for an unknown id", async () => {
    const res = await request(app).get("/api/example/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
