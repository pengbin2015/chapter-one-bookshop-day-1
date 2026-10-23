import express, { type ErrorRequestHandler } from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { booksRouter } from "./routes/books.js";
import { healthRouter } from "./routes/health.js";

/**
 * Build the Express app WITHOUT starting a listener, so tests can import it
 * and drive it with Supertest. server.ts is the only place that calls listen().
 */
export function createApp() {
  const app = express();
  app.use(express.json());

  // API routes.
  app.use(booksRouter);
  app.use(healthRouter);

  // Static storefront (public/index.html, app.js, styles.css).
  const here = dirname(fileURLToPath(import.meta.url));
  const publicDir = join(here, "..", "public");
  app.use(express.static(publicDir));

  // Anything under /api that didn't match above is a JSON 404.
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  // Errors raised by Express (for example URL decoding or JSON parsing) must
  // obey the same JSON error contract as errors raised in our route handlers.
  const apiErrorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }
    const candidate =
      typeof error === "object" && error !== null && "status" in error ? error.status : undefined;
    const status =
      typeof candidate === "number" &&
      Number.isInteger(candidate) &&
      candidate >= 400 &&
      candidate < 500
        ? candidate
        : 500;
    res.status(status).json({ error: status < 500 ? "Invalid request" : "Internal server error" });
  };
  app.use("/api", apiErrorHandler);

  return app;
}
