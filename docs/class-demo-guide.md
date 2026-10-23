# Day 1 instructor checkpoints — deck v5

Each numbered branch is the **start** of its demo. Start a fresh working branch
from the next checkpoint if a demo fails: the preceding implementation is
already committed. Treat the remote `origin/demo/...` refs as the backups.
Read-only demos intentionally share the same application files. All branches include this guide.
The slide numbers below are the visible slide numbers, not speaker-note filenames.

## Recovery during class

```sh
# In terminal 1, stop your old dev server with Ctrl+C before switching.
# In terminal 2, preserve your interrupted work, including new tests:
git status --short
git stash push -u -m "class: interrupted demo"
git fetch origin
# Always use a NEW class branch name; increment 01 to 02 on a repeat.
git switch --no-track -c class/phase-2-01 origin/demo/11-build-phase-2
npm test
npm run dev
```

Use fresh `class/...` branches for every attempt; do not commit or push demo
work on the backup `demo/...` branches. Fetching updates remote-tracking refs,
but does not reset an existing local branch you may have changed. Using
`origin/demo/...` as the starting point avoids that trap and works in a fresh
clone where most checkpoint branches have no local names yet. Do not use
`git switch -C`, `git reset --hard`, or force-push as recovery shortcuts.
Keep the stash if you still need it; apply it later on its original class
branch with `git stash apply`. A branch switch does not restore a chat session,
stash, environment variables or processes. Open a fresh chat with the accepted
plan/file context and restart the server after switching.

The first demo starts the same way:

```sh
git fetch origin
git switch --no-track -c class/setup-01 origin/demo/01-setup
node -v                     # Node 24 LTS; .nvmrc is 24 on demo branches
npm ci
npm test                    # 12 passing tests on the starter
```

Use a second terminal for tests. The store resets when the process restarts.
All checkpoints use the same package lock, so switching between demo branches
does not require reinstalling dependencies. The original main branch still
has its original Node 20 pin; choose a demo branch before using `nvm use`.

## Main route through the class

| Branch to switch to     | Slides / demo to perform                      | Already completed                                              |
| ----------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| `demo/01-setup`         | 9–13: startup, tests, architecture            | Starter app; 12 tests                                          |
| `demo/02-prompt-race`   | 14: vague vs strong rating prompts            | Same starter                                                   |
| `demo/03-low-stock`     | 15: pairs specify a low-stock warning         | Same starter; isolated exercise                                |
| `demo/04-completions`   | 16–17: add `listLowStock()` in Store          | Clean starter, experimental edits cleared                      |
| `demo/05-inline-chat`   | 17: reject blank/whitespace book id           | Low-stock method and tests                                     |
| `demo/06-agent-ratings` | 18: add optional 0–5 rating, seed all books   | Inline validation and tests                                    |
| `demo/07-context`       | 19: attach files, explain routing             | Ratings, seed values, API tests                                |
| `demo/08-ask`           | 21–22: explore, trace, explain                | Same code; Ask stays read-only                                 |
| `demo/09-plan`          | 23–24: agree search/filter semantics          | Same code; plan not yet saved                                  |
| `demo/10-build-phase-1` | 25: implement `q` search only                 | Accepted plan in `docs/demo-search-plan.md`                    |
| `demo/11-build-phase-2` | 25: add `genre` and AND combination           | Phase 1: title/author search and tests                         |
| `demo/12-run-test-fix`  | 26: run tests, cover edge cases               | Phase 2: search + genre API and core tests                     |
| `demo/13-review`        | 27–29: inspect diff, discuss undo and context | Search edge cases and invalid-input tests                      |
| `demo/14-standards`     | 33–35: add a guardrail, try forbidden edit    | Completed morning feature; original AGENTS.md                  |
| `demo/15-scoped-rules`  | 36–37: inspect scoped instructions            | Added `Do not edit src/types.ts.` guardrail                    |
| `demo/16-commit`        | 38–39: inspect `/commit`, commit a note       | Same code and guardrail; clean working tree                    |
| `demo/17-api-skill`     | 40–41: request additional search tests        | Example NOTES.md committed through normal Git                  |
| `demo/18-reviewer`      | 42–43: reviewer checks change, refuses edits  | Additional API tests; completed implementations                |
| `demo/19-finished`      | 44–47: hooks/MCP discussion and portability   | Completed demos plus final review fixes; no hook demo required |

Slides 14–15 are isolated experiments, not prerequisites for slide 17. Before
slide 17 start a fresh class branch from `origin/demo/04-completions`, stashing
the experiment edits first. This keeps
slide 18's repeated rating task meaningful. Separate completed examples:

- `demo/example-ratings-complete`: strong prompt result from the clean starter.
- `demo/example-low-stock-complete`: warning on catalogue cards for stock <= 3,
  no API change, with render tests. This is a chosen example specification;
  a different prompt voted by the class may produce a different result.
- `demo/bug-search-case-sensitive`: deliberately broken genre comparison;
  four genre-related assertions fail. Use only for slides 25–26.
  Recover with `demo/13-review`.

## Exact demo prompts and observable results

**14:** Compare the two prompts in separate fresh chats, each on a fresh class branch starting from
`origin/demo/02-prompt-race`. Do not predict that the vague prompt must fail: output is
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
8 books. For the prepared red/green exercise, start a fresh class branch from `origin/demo/bug-search-case-sensitive`, run
`npm test`, correct the case-sensitive comparison in src/store.ts, rerun.
The failure is prepared deliberately; numbered recovery checkpoints are green.

**27:** Compare phases with
`git diff origin/demo/10-build-phase-1..origin/demo/13-review -- src tests`.
Demonstrate discarding changes only on a deliberately edited file after saving
useful work. For a committed change use `git revert <that-demo-commit>` on a
personal rehearsal branch, not a shared recovery branch.

**35:** Add `- Do not edit src/types.ts.` under Guardrails. Then request an edit
to that file and discuss the expected refusal. This is an advisory instruction,
not a deterministic security boundary; a model can ignore it. The completed
line is present from checkpoint 15 onward.

**38–39:** `/commit` needs an actual change. At checkpoint 16 create a small
NOTES.md with an architecture summary, inspect the diff, invoke /commit,
and inspect the resulting commit. If it fails, checkpoint 17 has that note
committed. If NOTES.md does not already exist, prepare the example with:

```sh
(set -C; git show origin/demo/17-api-skill:NOTES.md > NOTES.md)
git diff --no-index -- /dev/null NOTES.md
```

The subshell refuses to overwrite an existing file. If NOTES.md already exists
from the Ask/Agent exploration, preserve it and inspect that version instead.
`git diff --no-index` returns 1 when a diff exists; that is expected. Creating
the file does not stage it; /commit stages the reviewed changes. The prompt
uses your selected model, with no hard-coded model requirement.

**41:** Ask “Add regression tests proving that a search by author can be
combined with genre, preserves seeded catalogue order, and does not affect
book detail lookup.” The tests are already completed in checkpoint 18.
The repository api-testing skill and tests instructions remain unchanged.

**43:** A clean checkpoint has no working diff, and the reviewer has no
terminal tool for arbitrary Git comparisons. Prepare an actual unstaged diff
before selecting it. Stash other work first and stop the old server:

```sh
git fetch origin
git switch --no-track -c class/reviewer-01 origin/demo/10-build-phase-1
git diff origin/demo/10-build-phase-1 origin/demo/13-review -- src tests > ../morning-demo.patch
git apply --check ../morning-demo.patch
git apply ../morning-demo.patch
npm test                    # 37 passing tests on this prepared working tree
```

Select Reviewer and ask “Review the current uncommitted changes against
AGENTS.md and the accepted search plan.” Then request a fix. The actual
reviewer has only search/codebase, search/usages and search/changes; it has no
execution/edit tool. The patch supplies the working changes its search/changes
tool can inspect. Its response/refusal and skill auto-activation require live
VS Code rehearsal. Do not claim that missing edit tools prevent an AI from
printing a patch: the prompt asks it not to, while the tool boundary prevents
it from applying one itself.

## Deck/repository verification findings

- Slides 9–11: starter has 12 passing tests; one process, no database. Demo branches standardise
  on Node 24 LTS in README and .nvmrc. The original main remains unchanged.
  Package engines still accepts >=20; the selected classroom runtime is 24.
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
