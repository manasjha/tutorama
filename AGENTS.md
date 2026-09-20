<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tutorama Codex Working Instructions

## Project context

Tutorama is a managed tutoring service, not a tutor marketplace, generic edtech app, or SaaS dashboard.

The primary buyer is the parent. The student is the learner. Tutorama manages tutor matching, service delivery, continuity, parent support, and quality.

Optimize for:
- MVP shipping speed
- parent clarity and trust
- mobile-first UX
- simple, maintainable implementation
- preservation of existing working functionality

Do not introduce unrelated refactors, duplicate implementations, a second design system, unsupported claims, fake testimonials, or unnecessary complexity.

## Standard implementation workflow

For every implementation task:

1. Inspect the current repository state and run `git status`.
2. Never discard, overwrite, or reset existing uncommitted user work.
3. If the working tree is not clean, stop and report what is uncommitted before making changes.
4. Feature work must not be implemented directly on `main`.
5. If currently on `main`, update it safely with the latest remote state when possible and create a new feature branch.
6. Use a descriptive branch name, preferably:
   `codex/<short-task-name>`
7. Keep all changes scoped to the requested feature or fix.
8. Reuse existing routes, components, services, styling conventions, and architecture wherever possible.
9. Do not rename or remove existing working routes/components unless the task explicitly requires it.

## PRD implementation rules

When a PRD or implementation prompt is provided:

- Treat it as the source of truth for scope and behavior.
- Implement only the requested scope.
- Preserve existing working functionality.
- Do not invent major product decisions that are not specified.
- Follow existing Tutorama brand/UI conventions.
- Keep mobile behavior in scope for every user-facing change.
- If a requirement conflicts with the existing codebase, explain the conflict rather than silently changing unrelated architecture.

## Supabase and database rules

For every database schema change:

- Create a version-controlled SQL migration under `supabase/migrations/`.
- Never rely only on a manual Supabase Dashboard schema change.
- Never expose or commit secrets.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client code.
- Do not apply destructive production database changes unless explicitly instructed.
- Clearly report any migration that must be applied before the feature can work.

## Validation requirements

After implementation:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Fix errors caused by the implementation before considering the task complete.
4. Do not treat unrelated non-blocking warnings as implementation failures, but report them.
5. Review the final diff for unintended file changes.

## Git and pull request workflow

Once the requested work is complete and validation passes:

1. Commit the scoped changes with a clear commit message.
2. Leave the working tree clean.
3. In a normal authenticated local checkout, push the feature branch to GitHub and create a pull request targeting `main`.
4. In Codex Cloud, where the task container may not have a configured Git remote or GitHub CLI credentials:
   - create the feature branch and commit the completed changes
   - run all required validation
   - leave the working tree clean
   - make the change ready for the Codex Cloud `Create PR` action
   - do not treat the inability to run `git push` or `gh pr create` as a failure
5. Include in the PR:
   - what changed
   - files/areas affected
   - testing performed
   - any database migration required
   - any manual setup required
6. Do not merge the PR.
7. The founder will test the Vercel Preview Deployment and approve the merge.

When refining an existing open feature/PR:

- Continue on the same feature branch.
- Commit and push the refinement to the same branch.
- Do not create a second PR unless explicitly requested.

## Safety rules

Never:

- force-push unless explicitly requested
- delete or reset user work
- merge into `main`
- deploy directly to production
- change production secrets
- make untracked production database changes
- refactor unrelated code

## Completion report

At the end of every implementation task, report:

- branch name
- summary of changes
- files changed
- `npm run lint` result
- `npm run build` result
- migration/manual setup requirements
- commit created
- push status
- PR status/link if created
- anything the founder should specifically test in the Vercel Preview
