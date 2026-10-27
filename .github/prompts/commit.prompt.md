---
description: Stage and write a clean commit for the current changes.
agent: agent
model: gpt-4.1
tools: ["search/codebase", "execute/runInTerminal", "edit/editFiles"]
---

Review the current working changes with `git status` and `git diff`, then:

1. Group the changes into one logical commit (or tell me if they should be
   split).
2. Stage the relevant files.
3. Write a commit message in this form:
   - a Conventional Commits summary line — `type(scope): summary` — under
     ~60 characters (e.g. "feat(books): add search and genre filter");
   - a blank line;
   - a short body explaining **why**, if it is not obvious.
4. Use the project's domain vocabulary from `docs/glossary.md`.
5. Show me the staged files and the message, then run the commit.

Do not commit `node_modules`, secrets, or unrelated changes.
