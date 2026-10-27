import { Router } from "express";
import { store } from "../store.js";

export const booksRouter = Router();

// GET /api/books — the whole catalogue.
booksRouter.get("/api/books", (_req, res) => {
  res.json(store.listBooks());
});

// GET /api/books/:id — a single book, or 404 if the id is unknown.
booksRouter.get("/api/books/:id", (req, res) => {
  const book = store.getBook(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(book);
});
