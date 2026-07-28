import type { Book } from "../types.js";

/**
 * The starting catalogue. Each entry uses a real book cover pulled from Open
 * Library, so the title, author and description are aligned with that cover.
 * Stock levels are varied on purpose so a "low stock" feature has something to
 * react to.
 *
 * The store is seeded from a deep copy of this array, so mutating the store at
 * runtime never changes these values — a fresh restart always returns here.
 */
export const SEED_BOOKS: Book[] = [
  {
    id: "the-lantern-sea",
    title: "The Light Between Oceans",
    author: "M. L. Stedman",
    price: 14.99,
    genre: "Fiction",
    stock: 12,
    description:
      "A lighthouse keeper and his wife raise a baby that washes ashore in a boat, a choice with devastating consequences.",
    cover: "1C3A5B",
    coverImage: "covers/the-lantern-sea.jpg",
  },
  {
    id: "paper-mountains",
    title: "The Cartographers",
    author: "Peng Shepherd",
    price: 13.49,
    genre: "Mystery",
    stock: 3,
    description:
      "A young mapmaker uncovers a dangerous secret hidden in a seemingly worthless map after her estranged father's death.",
    cover: "6B7A62",
    coverImage: "covers/paper-mountains.jpg",
  },
  {
    id: "quiet-orbit",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 15.99,
    genre: "Sci-Fi",
    stock: 8,
    description:
      "A lone astronaut wakes with amnesia aboard a spacecraft and must piece together his mission to save humanity.",
    cover: "2A2456",
    coverImage: "covers/quiet-orbit.jpg",
  },
  {
    id: "the-maple-archive",
    title: "People of the Book",
    author: "Geraldine Brooks",
    price: 13.99,
    genre: "Historical Fiction",
    stock: 2,
    description:
      "A rare-book expert traces the centuries-spanning history of the Sarajevo Haggadah through the tiny artifacts in its binding.",
    cover: "8A4B2A",
    coverImage: "covers/the-maple-archive.jpg",
  },
  {
    id: "summer-on-alder-street",
    title: "Big Little Lies",
    author: "Liane Moriarty",
    price: 12.99,
    genre: "Mystery",
    stock: 20,
    description:
      "Three mothers in a seaside town find their seemingly perfect lives unraveling toward a shocking night of violence.",
    cover: "3E6B70",
    coverImage: "covers/summer-on-alder-street.jpg",
  },
  {
    id: "midnight-in-bellview",
    title: "In the Woods",
    author: "Tana French",
    price: 14.49,
    genre: "Mystery",
    stock: 1,
    description:
      "A Dublin detective investigates a child's murder in the same woods where he survived a disappearance decades earlier.",
    cover: "10233A",
    coverImage: "covers/midnight-in-bellview.jpg",
  },
  {
    id: "the-cartographers-daughter",
    title: "The Signature of All Things",
    author: "Elizabeth Gilbert",
    price: 16.5,
    genre: "Historical Fiction",
    stock: 6,
    description:
      "A brilliant 19th-century botanist devotes her life to science and desire while exploring the mysteries of evolution.",
    cover: "4A3B5C",
    coverImage: "covers/the-cartographers-daughter.jpg",
  },
  {
    id: "salt-and-cedar",
    title: "Kitchens of the Great Midwest",
    author: "J. Ryan Stradal",
    price: 11.99,
    genre: "Fiction",
    stock: 3,
    description:
      "A chef with a once-in-a-generation palate becomes a culinary star, told through the lives of those she touches.",
    cover: "5B4A2E",
    coverImage: "covers/salt-and-cedar.jpg",
  },
];
