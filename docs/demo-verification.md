# Day 1 demo verification — v5 deck

Reviewed the supplied 49-slide PowerPoint, including related speaker notes,
against pengbin2015/chapter-one-bookshop-day-1. Rehearsed on Node v24.19.0
and npm 11.9.0. No new dependencies or lockfile changes.

## Results

All 19 numbered start-of-demo checkpoints and both isolated completed examples
pass tests, typecheck and lint. Each branch was started as a fresh server and
checked over HTTP for health, eight catalogue books, detail, unknown-id 404,
HTML, JavaScript, stylesheet and a cover image. Applicable branches also pass
rating, blank-id and search/filter runtime checks. This is API/static-response
validation; no browser click automation or Copilot UI automation was available.
The pre-review final feature passed 40 tests; see the follow-up
[code review](demo-code-review.md) for current results and fixes. The deliberate bug is separate and produces
36 passing / 4 failing tests; its failure is expected and reproduced over HTTP.

`main` remains at 2ef86b8b02a4394faa1f37f70d8305016756bb43. Every checkpoint is a new `demo/` branch.
The application on main has not been changed.

## Branches and measured outcomes

Each numbered branch is the input state for that step. To skip a failed step,
switch to the next branch. Read-only steps can share an identical commit.
The hashes below record the first rehearsal before the follow-up review.
They are historical commits, not necessarily current branch tips; see
[demo-code-review.md](demo-code-review.md) for the latest verification.

| Branch                            | Tests                    | Typecheck / lint | Runtime                             | Tested commit  |
| --------------------------------- | ------------------------ | ---------------- | ----------------------------------- | -------------- |
| `demo/01-setup`                   | 12 passed (12)           | pass / pass      | passed                              | `2366505e3138` |
| `demo/02-prompt-race`             | 12 passed (12)           | pass / pass      | passed                              | `2366505e3138` |
| `demo/03-low-stock`               | 12 passed (12)           | pass / pass      | passed                              | `2366505e3138` |
| `demo/04-completions`             | 12 passed (12)           | pass / pass      | passed                              | `2366505e3138` |
| `demo/05-inline-chat`             | 14 passed (14)           | pass / pass      | passed                              | `8360c7046f56` |
| `demo/06-agent-ratings`           | 17 passed (17)           | pass / pass      | passed                              | `91f9b7caf867` |
| `demo/07-context`                 | 20 passed (20)           | pass / pass      | passed                              | `5f38bcb03512` |
| `demo/08-ask`                     | 20 passed (20)           | pass / pass      | passed                              | `5f38bcb03512` |
| `demo/09-plan`                    | 20 passed (20)           | pass / pass      | passed                              | `5f38bcb03512` |
| `demo/10-build-phase-1`           | 20 passed (20)           | pass / pass      | passed                              | `5e476ab6970b` |
| `demo/11-build-phase-2`           | 25 passed (25)           | pass / pass      | passed                              | `fd238fff7a3c` |
| `demo/12-run-test-fix`            | 29 passed (29)           | pass / pass      | passed                              | `49d2e95d5d13` |
| `demo/13-review`                  | 37 passed (37)           | pass / pass      | passed                              | `472251ee9d87` |
| `demo/14-standards`               | 37 passed (37)           | pass / pass      | passed                              | `472251ee9d87` |
| `demo/15-scoped-rules`            | 37 passed (37)           | pass / pass      | passed                              | `7177b0089b48` |
| `demo/16-commit`                  | 37 passed (37)           | pass / pass      | passed                              | `7177b0089b48` |
| `demo/17-api-skill`               | 37 passed (37)           | pass / pass      | passed                              | `ae7ccd02b091` |
| `demo/18-reviewer`                | 40 passed (40)           | pass / pass      | passed                              | `860dea14211e` |
| `demo/19-finished`                | 40 passed (40)           | pass / pass      | passed                              | `860dea14211e` |
| `demo/bug-search-case-sensitive`  | 4 failed; 36 passed (40) | pass / pass      | passed (intentional bug reproduced) | `49d1f4917014` |
| `demo/example-low-stock-complete` | 19 passed (19)           | pass / pass      | passed                              | `2b35a32e376a` |
| `demo/example-ratings-complete`   | 15 passed (15)           | pass / pass      | passed                              | `5b08ba194a64` |

## Rehearsal corrections to the deck

1. **Slide 17:** `/api/books/` is the catalogue route, so use
   `/api/books/%20` to demonstrate whitespace-id rejection in the detail handler.
2. **Slide 23 notes:** use actual seed data. `q=light` or `q=stedman` finds
   The Light Between Oceans. The Lantern Sea is the slug's old label, not the
   title. Marlowe, History and Biography are not in the seed. Supported seed
   genres are Fiction, Mystery, Sci-Fi and Historical Fiction.
3. **Slide 43:** the displayed `execute` tool could modify files. The actual
   reviewer file correctly permits only three search tools. Demonstrate that
   file rather than the slide's curly-quoted tool list/count.
4. **Slides 14 and 18:** both add ratings. Run the early prompt comparison as
   an isolated experiment; return to checkpoint 04 for the main sequence so
   checkpoint 06 still has a real rating task to implement.
5. **Slide 22:** Ask is read-only; switch to Agent to save NOTES.md. On
   checkpoint 16 create NOTES.md before `/commit`, otherwise there is no diff.
6. **Slide 27:** Agent edits may already be on disk before acceptance.
   Inspect git status/diff; preserve work before undoing or switching.
7. **Slide 10:** Node 24 was used for this rehearsal as requested by the deck;
   Demo branches now pin 24 in .nvmrc and recommend it in README. The
   original main pin and dependency declarations are unchanged.
8. **Slide 39:** the prompt no longer pins gpt-4.1; it uses the selected
   classroom model. Confirm your model/licence in VS Code.
9. Speaker notes on early poll/objective/agenda slides are stale in places.
   Notes are matched to slides by their relationships, not notes filenames.

## Live classroom verification still needed

Sign in to GitHub Copilot in VS Code, confirm the licence and selected model,
then rehearse completions, inline chat, Ask/Plan/Agent selection, context
attachments, slash commands, api-testing skill activation and reviewer refusal.
These AI/UI behaviours vary by version and model; passing code tests does not
prove them. Advisory guardrails may be ignored; they are not deterministic gates.
Hooks/MCP are discussion-only in the supplied notes. The afternoon to-do app
uses a separate workshop pack and is outside this repository's demos.

The original format check has existing failures; required functional checks
are green. Source files touched by feature work were formatted, but unrelated
starter formatting was preserved.

## Instructor runbook

See [class-demo-guide.md](class-demo-guide.md) for the full slide-to-branch map,
exact prompts, safe stash/switch commands, expected query results, how to
present a reviewer diff, and how to run the deliberately failing exercise.
The accepted search plan is [demo-search-plan.md](demo-search-plan.md).

No changes are merged into main. These checkpoints do not guarantee a
particular AI response; they provide working code to resume the next demo.
