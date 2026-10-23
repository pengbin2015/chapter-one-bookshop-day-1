# Day 1 instructor checkpoints — deck v5

Each numbered branch is the **start** of its demo. Switch to the next number
if the current demo fails: the preceding implementation is already committed.
Read-only demos intentionally share a commit. All branches include this guide.
The slide numbers below are the visible slide numbers, not speaker-note filenames.

## Recovery during class

```sh
git fetch origin
# Preserve an interrupted attempt, including new tests, before switching:
git status --short
git stash push -u -m "class: interrupted demo"
git switch demo/11-build-phase-2
# If the branch is only remote: git switch --track origin/demo/11-build-phase-2
npm test
npm run dev
```

Use a second terminal for tests. Stop the old dev process before switching and
restart it afterward; memory resets to the seed. Do not use `git restore .` or a
hard reset as a recovery shortcut. Recover stashed work later, on its original
branch, with `git stash list` and `git stash apply` after class. Stashes are local.
All checkpoints use the same package lock, so a branch switch does not require
reinstallation. On a fresh clone use Node 22 or 24 LTS and `npm ci`.

## Main route through the class

| Branch to switch to | Slides / demo to perform | Already completed |
| --- | --- | --- |
| `demo/01-setup` | 9–13: startup, tests, architecture | Starter app; 12 tests |
| `demo/02-prompt-race` | 14: vague vs strong rating prompts | Same starter |
| `demo/03-low-stock` | 15: pairs specify a low-stock warning | Same starter; isolated exercise |
| `demo/04-completions` | 16–17: add `listLowStock()` in Store | Clean starter, experimental edits cleared |
| `demo/05-inline-chat` | 17: reject blank/whitespace book id | Low-stock method and tests |
| `demo/06-agent-ratings` | 18: add optional 0–5 rating, seed all books | Inline validation and tests |
| `demo/07-context` | 19: attach files, explain routing | Ratings, seed values, API tests |
| `demo/08-ask` | 21–22: explore, trace, explain | Same code; Ask stays read-only |
| `demo/09-plan` | 23–24: agree search/filter semantics | Same code; plan not yet saved |
| `demo/10-build-phase-1` | 25: implement `q` search only | Accepted plan in `docs/demo-search-plan.md` |
| `demo/11-build-phase-2` | 25: add `genre` and AND combination | Phase 1: title/author search and tests |
| `demo/12-run-test-fix` | 26: run tests, cover edge cases | Phase 2: search + genre API and core tests |
| `demo/13-review` | 27–29: inspect diff, discuss undo and context | Search edge cases and invalid-input tests |
| `demo/14-standards` | 33–35: add a guardrail, try forbidden edit | Completed morning feature; original AGENTS.md |
| `demo/15-scoped-rules` | 36–37: inspect scoped instructions | Added `Do not edit src/types.ts.` guardrail |
| `demo/16-commit` | 38–39: inspect `/commit`, commit a note | Same code and guardrail; clean working tree |
| `demo/17-api-skill` | 40–41: request additional search tests | Example NOTES.md committed through normal Git |
| `demo/18-reviewer` | 42–43: reviewer checks change, refuses edits | Additional API tests; completed implementations |
| `demo/19-finished` | 44–47: hooks/MCP discussion and portability | Same completed code; no hook demo required |

Slides 14–15 are isolated experiments, not prerequisites for slide 17. Before
slide 17 switch to `demo/04-completions`, stashing their edits first. This keeps
slide 18's repeated rating task meaningful. Separate completed examples:

- `demo/example-ratings-complete`: strong prompt result from the clean starter.
- `demo/example-low-stock-complete`: warning on catalogue cards for stock <= 3,
  no API change, with render tests. This is a chosen example specification;
  a different prompt voted by the class may produce a different result.
- `demo/bug-search-case-sensitive`: deliberately broken genre comparison;
  one existing case-insensitivity test fails. Use only for slides 25–26.
  Recover with `demo/13-review`.

## Exact demo prompts and observable results

**14:** Compare the two prompts in separate fresh chats, each starting from
`demo/02-prompt-race`. Do not predict that the vague prompt must fail: output is
nondeterministic. Strong version: “Add optional numeric rating 0–5 to Book; seed
all eight ratings; both GET routes include ratings; add API tests; no new
dependencies; keep existing tests green.” Do not add a write endpoint.

**15:** Example pinned prompt: “Show `Low stock` on catalogue cards when
stock <= 3, including zero. Hide it for stock > 3. Keep stock in the existing
API shape, use styles.css, escape text and add render tests.” Check the four
seeded low-stock titles; the separate example branch contains this result.

**17:** Type `// list books with stock <= 3` inside Store, accept a completion,
check it returns copies and includes stock 3. Inline prompt: “For a blank or
whitespace-only id, return 400 JSON { error }; preserve unknown-id 404.”
Use `/api/books/%20` to reach the handler with a blank id. `/api/books/` is the
catalogue route (200), not a blank detail id, and must remain so.

**18–19:** Add the rating feature using the prompt above. The seeded catalogue
and each detail include numeric ratings in [0,5]. The field is optional on Book
for compatibility, but every seeded book supplies it. File context is
`src/types.ts`, `src/data/seed.ts`, `src/routes/books.ts`, `src/store.ts`.
There is no `src/auth.ts`; slide 19's example is generic.

**22:** Trace server.ts → app.ts → routes/books.ts → store.ts → data/seed.ts.
Ask does not write files. If saving NOTES.md, explicitly change to Agent mode.

**23–26:** Use the accepted plan saved at checkpoint 10. Search is partial,
case-insensitive title OR author. Genre is exact, case-insensitive. Both combine
with AND; trim whitespace; empty parameters mean no filter; no matches is
200 with []; repeated/structured parameters are 400 JSON { error }.
API-only scope: slides request GET query parameters, not a new frontend form.
Try these commands in a second terminal (keep the server running):

```sh
curl -fsS 'http://localhost:3000/api/books?q=light'
curl -fsS 'http://localhost:3000/api/books?q=stedman'
curl -fsS 'http://localhost:3000/api/books?genre=mystery'
curl -fsS 'http://localhost:3000/api/books?q=the&genre=mystery'
curl -fsS 'http://localhost:3000/api/books?q=not-a-real-title'
```

Expect respectively: The Light Between Oceans; the same book by author;
3 Mystery books; The Cartographers and In the Woods; []. No query still returns
8 books. For the prepared red/green exercise, switch to the bug branch, run
`npm test`, correct the case-sensitive comparison in src/store.ts, rerun.
The failure is prepared deliberately; numbered recovery checkpoints are green.

**27:** Compare phases with
`git diff demo/10-build-phase-1..demo/13-review -- src tests`.
Demonstrate discarding changes only on a deliberately edited file after saving
useful work. For a committed change use `git revert <that-demo-commit>` on a
personal rehearsal branch, not a shared recovery branch.

**35:** Add `- Do not edit src/types.ts.` under Guardrails. Then request an edit
to that file and discuss the expected refusal. This is an advisory instruction,
not a deterministic security boundary; a model can ignore it. The completed
line is present from checkpoint 15 onward.

**38–39:** `/commit` needs an actual change. At checkpoint 16 create a small
NOTES.md with the architecture summary below, inspect the diff, invoke /commit,
and inspect the resulting commit. If it fails, checkpoint 17 has that note
committed. The prompt file currently pins gpt-4.1; check model availability in
your VS Code/Copilot account before class (or select an available model).

**41:** Ask “Add regression tests proving that a search by author can be
combined with genre, preserves seeded catalogue order, and does not affect
book detail lookup.” The tests are already completed in checkpoint 18.
The repository api-testing skill and tests instructions remain unchanged.

**43:** A clean backup branch has no working diff. Ask the reviewer to compare
`demo/10-build-phase-1` with `demo/13-review`. To present an unstaged diff instead,
start from checkpoint 10 and apply a patch of that range after stashing work:

```sh
git diff demo/10-build-phase-1 demo/13-review -- src tests > ../morning-demo.patch
git apply --check ../morning-demo.patch
git apply ../morning-demo.patch
```

Then ask for review and request a fix. The actual reviewer has only
search/codebase, search/usages and search/changes; it has no execution/edit tool.
Its response/refusal and skill auto-activation require live VS Code rehearsal.

## Deck/repository verification findings

- Slides 9–11: starter has 12 passing tests; one process, no database. README
  says Node >=20 and .nvmrc pins 20; slide 10 asks 22/24. Tests are rehearsed on
  available Node 24 as the deck requests; use a consistent version for class.
- Slide 14 calls rating optional while requiring every book to have one:
  interpret as optional type field, populated for every seeded book.
- Slide 17: an absent route parameter never reaches the detail handler.
  Demonstrate encoded whitespace as above, not `/api/books/`.
- Slide 21's POST/DELETE example is illustrative, not the feature built on
  slides 23–26. No create/delete endpoints are added to these checkpoints.
- Slide 22: the “Capture” bullet writes NOTES.md but Ask is read-only. Switch
  to Agent for that action; the main boxed Ask prompt correctly forbids edits.
- Slide 23 speaker notes refer to The Lantern Sea and author Marlowe. Actual
  seed title is The Light Between Oceans, author M. L. Stedman. Search `light`
  or `stedman`. Actual genres: Fiction, Mystery, Sci-Fi, Historical Fiction;
  History and Biography are not in this seed.
- Slide 43 displays `execute` and curly quotes and calls the list four tools.
  Execution tools can write files. Show the actual repository file: three
  search tools, no execution/edit tools, valid quotes. UI tool resolution still
  needs checking in the classroom VS Code version.
- Before-acceptance edits can already exist on disk in Agent mode; slide 27's
  notes claiming nothing touched the file should be softened. Inspect Git.
- Baseline format:check fails for public/index.html, src/routes/books.ts,
  src/store.ts. Feature edits format the touched TS files; index.html is left
  as supplied. Formatting is separate from functional readiness.
- Notes are associated through slide relationships: notes filenames are shifted
  relative to visible slides. Notes on slides 4–8 also appear stale relative to
  the visible polls/objectives/agenda. Review these before teaching.
- Hooks are discussion-only in slide 44's notes, and the afternoon to-do app
  workshop uses a separate pack. No hook, cart, checkout or to-do app is added.

## What is and is not verified

Each unique green checkpoint is run through npm test, typecheck and lint;
feature-specific tests cover low stock, whitespace ids, ratings, search,
genre, AND, empty/no-match and invalid query input. Runtime smoke checks verify
health, catalogue, detail and static assets, plus completed search behaviour.
The intentionally broken branch must fail the genre case test.
Copilot licence, completions, UI modes, command availability, model selection,
activation/refusal and tool enforcement cannot be proven by Node tests here.
Rehearse those in your classroom VS Code installation. No main-branch changes
or dependency additions are needed. Use the final verification report for the
actual counts, commit hashes, push status and remaining limitations.
