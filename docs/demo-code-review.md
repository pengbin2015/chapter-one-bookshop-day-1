# Day 1 follow-up code and checkpoint review

Reviewed the application changes, tests, class guide, instruction files,
commit prompt, branch progression and remote refs. All corrections below are
committed on the demo branches. Main is preserved at
`2ef86b8b02a4394faa1f37f70d8305016756bb43`.

## Findings and resolution

| Priority | Finding                                                                                                                              | Resolution / affected checkpoints                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | `git show demo/...` and `git diff demo/...` fail in a fresh clone because those local branches do not exist. Reproduced the failure. | All guides now use `origin/demo/...` refs for cross-checkpoint commands. Fresh-clone rehearsal passes.                                                                                                         |
| P1       | Committing on a local checkpoint advances it; switching back does not restore its original state.                                    | Work on fresh `class/...` branches with `--no-track` from remote checkpoint refs. Recovery preserves stashed tracked and new files; no reset or force-push.                                                    |
| P2       | Read-only reviewer cannot be assumed to execute arbitrary Git comparisons; a clean checkpoint has no diff to review.                 | Guide prepares an actual unstaged morning-feature patch before selecting Reviewer. Patch applies cleanly and its working tree passes 37 tests.                                                                 |
| P2       | Node 20 pin, Node 24 slides, and saved cloud startup instructions disagree.                                                          | All demo branches pin Node 24; README and saved install/start instructions agree. Validated installed Node v24.22.1 and npm 11.9.0. Original main remains untouched.                                           |
| P2       | `/commit` pins a model which may not exist in the classroom account.                                                                 | Removed the model pin on all demo branches; use the selected available model. Actual Copilot licence/model access still requires VS Code rehearsal.                                                            |
| P2       | `BookLike` omits required `coverImage`, permitting incomplete render inputs.                                                         | Corrected public/app.d.ts on all demo branches; type checking passes.                                                                                                                                          |
| P2       | Express URL-decoding and JSON-parser errors return HTML, violating the API JSON error contract.                                      | Finished checkpoint only: added scoped API error middleware preserving 4xx status, masking internal errors, and deferring when headers are sent. Four regression cases fail before the fix and pass afterward. |
| P3       | NOTES.md redirection could overwrite earlier exploration notes; instructions called file creation staging.                           | Noclobber subshell prevents overwrite; guide distinguishes creating, staging and committing. Both existing-file protection and clean retry were rehearsed.                                                     |
| P3       | Verification Markdown uses an unescaped pipe in the deliberate-failure row, breaking the table.                                      | Corrected the table and marked the original report as historical. This report records current results.                                                                                                         |
| P3       | README promises 12 tests on every checkpoint, although feature checkpoints add tests.                                                | README now states that counts vary; the starter still has exactly 12.                                                                                                                                          |

No additional functional defect was found in the implemented low-stock,
whitespace-id, rating or search/filter workflows after these corrections.
The finished branch adds the API error hardening after the teaching sequence;
earlier branches deliberately retain the starter's framework error behaviour
so those checkpoints keep their original demo scope and test counts.

## Current validation

- Re-ran tests, type checking and lint on all 22 branches under Node v24.22.1.
  All 19 numbered checkpoints and both completed examples are green.
- Started a fresh server for every branch and verified health, catalogue,
  detail, unknown-id response, HTML, JavaScript, stylesheet and cover image.
  Feature branches additionally verified ratings, whitespace-id handling and
  search/filter behaviour. The final API error response was checked over HTTP.
- Independently calculated expected results for 42 search/genre combinations;
  all matched, and the catalogue was unchanged afterward.
- Audited 133 feature-presence assertions across the 19 numbered checkpoints:
  no feature appears early or goes missing. Dependency manifests, lockfiles,
  API testing skill and reviewer tool restrictions are unchanged from main.
- Fresh local clone with no local checkpoint names: npm ci and all 12 starter
  tests pass; reviewer patch passes 37 tests; notes cannot be overwritten;
  commit/retry leaves backup refs unchanged; stash apply restores tracked and
  untracked work with 37 passing tests.
- The four new API error cases cover malformed percent encoding, malformed
  UTF-8 URL encoding, malformed JSON, and oversized request bodies (413).
  All four fail against the pre-fix app; all pass with the fix.

The tested commits below precede only this documentation report on the final
branch. Each is retained in history. Published branch tips can move forward
with documentation without changing the tested application.

| Branch                            | Tests                     | Typecheck / lint | Runtime                             | Tested commit  |
| --------------------------------- | ------------------------- | ---------------- | ----------------------------------- | -------------- |
| `demo/01-setup`                   | 12 passed (12)            | pass / pass      | passed                              | `7124b1dc48ed` |
| `demo/02-prompt-race`             | 12 passed (12)            | pass / pass      | passed                              | `7124b1dc48ed` |
| `demo/03-low-stock`               | 12 passed (12)            | pass / pass      | passed                              | `5f23f66bd58e` |
| `demo/04-completions`             | 12 passed (12)            | pass / pass      | passed                              | `3b25bbacda66` |
| `demo/05-inline-chat`             | 14 passed (14)            | pass / pass      | passed                              | `1526c9363c59` |
| `demo/06-agent-ratings`           | 17 passed (17)            | pass / pass      | passed                              | `ae83be3387d2` |
| `demo/07-context`                 | 20 passed (20)            | pass / pass      | passed                              | `3c2b4953ae12` |
| `demo/08-ask`                     | 20 passed (20)            | pass / pass      | passed                              | `81dbb41be156` |
| `demo/09-plan`                    | 20 passed (20)            | pass / pass      | passed                              | `81dbb41be156` |
| `demo/10-build-phase-1`           | 20 passed (20)            | pass / pass      | passed                              | `25c6c75c44a7` |
| `demo/11-build-phase-2`           | 25 passed (25)            | pass / pass      | passed                              | `7b4d2d5e5b67` |
| `demo/12-run-test-fix`            | 29 passed (29)            | pass / pass      | passed                              | `28650c280bde` |
| `demo/13-review`                  | 37 passed (37)            | pass / pass      | passed                              | `0351603d6bc2` |
| `demo/14-standards`               | 37 passed (37)            | pass / pass      | passed                              | `0351603d6bc2` |
| `demo/15-scoped-rules`            | 37 passed (37)            | pass / pass      | passed                              | `5565b32e6980` |
| `demo/16-commit`                  | 37 passed (37)            | pass / pass      | passed                              | `5565b32e6980` |
| `demo/17-api-skill`               | 37 passed (37)            | pass / pass      | passed                              | `c250e5742e41` |
| `demo/18-reviewer`                | 40 passed (40)            | pass / pass      | passed                              | `62a2c45848fe` |
| `demo/19-finished`                | 44 passed (44)            | pass / pass      | passed                              | `0176b53c6df2` |
| `demo/bug-search-case-sensitive`  | 4 failed ; 36 passed (40) | pass / pass      | passed (intentional bug reproduced) | `7ad159b97552` |
| `demo/example-low-stock-complete` | 19 passed (19)            | pass / pass      | passed                              | `0d8f62e48a21` |
| `demo/example-ratings-complete`   | 15 passed (15)            | pass / pass      | passed                              | `f4d688d42872` |

## Remaining classroom checks

Copilot sign-in/licence, UI command availability, model selection, completions,
inline chat, Ask/Plan/Agent interactions, skill activation and reviewer refusal
were not automated here. Validate them in the actual VS Code classroom setup.
The reviewer still has no terminal/edit tools; an instruction against printing
a patch is advisory, while lack of edit tools prevents direct application.

The supplied PPTX has not been edited. Its previously documented corrections
remain relevant: use encoded whitespace for slide 17, actual seed title/author
and genres for slide 23, and the real reviewer file for slide 43. See the
[instructor guide](class-demo-guide.md) and [original rehearsal report](demo-verification.md).
Formatting failures in unrelated starter files were not mass-reformatted.

The reusable cloud configuration draft now stores Node 24 install/start
instructions and checkpoint-aware test expectations. Saving that draft does
not publish a new environment version; review/save it in environment settings
and publish the updated environment when ready. No credentials or network
policy changes are required.

All review commits are normal fast-forward additions to existing demo
branches. Main is not merged, rewritten or modified. Use fresh class branches
for rehearsal; do not push classroom experiments over the demo checkpoints.
