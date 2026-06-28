# Tutorama

Tutorama is a managed offline home tutoring service starting in HSR Layout, Bengaluru. This repository contains the PRD 0 foundation plus the PRD 1 landing page and login entry.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, RLS, and migrations
- Google Fonts: Poppins for headings, Manrope for body/UI
- Vercel deployment from GitHub

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` is documented for future server-only work, but PRD 0 does not use it and does not require it.

## Supabase Setup

1. Create a Supabase project.
2. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the anon key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. In Supabase Auth, enable email/password auth.
5. Set the local Site URL to `http://localhost:3000`.
6. Add redirect URLs for `http://localhost:3000/auth/callback`, `https://tutorama.in/auth/callback`, and relevant Vercel preview callback URLs while testing.
7. Run all SQL files in `supabase/migrations` with the Supabase CLI or SQL editor.

### Email/password confirmation

If Supabase Auth has email confirmation enabled, a parent can create an account but cannot log in with email/password until the confirmation email is completed. In that case the app shows a clear "Please confirm your email before logging in" message.

For local end-to-end testing of immediate signup -> logout -> login, either:

- Disable email confirmation in Supabase Auth for the local/test project, or
- Keep confirmation enabled and verify the email before trying to log back in.

### Google OAuth setup

Google login uses Supabase OAuth through the existing `/auth/callback` route. Do not add Google Client ID or Client Secret to client environment variables.

Manual setup required:

1. Create a Google OAuth web client in Google Cloud Console.
2. Add the Supabase callback URL to Google authorized redirect URIs:

```text
https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
```

3. Enable the Google provider in Supabase Auth.
4. Add the Google Client ID and Client Secret in Supabase.
5. Add app redirect URLs in Supabase:

```text
http://localhost:3000/auth/callback
https://tutorama.in/auth/callback
```

Also add relevant Vercel preview URLs while testing.

6. Set `NEXT_PUBLIC_SITE_URL` correctly for local and production.

Google login is not complete until both the app code and the Supabase/Google dashboard setup are tested.

To make a founder admin, sign up normally, then update that profile row in Supabase:

```sql
update public.profiles
set role = 'admin'
where email = 'founder@example.com';
```

## Routes

- `/` PRD 1 public landing page
- `/login` email/password sign up/login and Google login entry
- `/auth/callback` Supabase callback support
- `/dashboard`, `/profile`, `/tuitions`, `/tuitions/[tuitionId]`
- `/classes/schedule`, `/classes/[classId]`
- `/admin`, `/admin/students`, `/admin/tuitions`, `/admin/classes`, `/admin/tutors`, `/admin/payments`

Protected parent/student routes redirect unauthenticated users to `/login`. Admin routes check `profiles.role` in the admin route layout.

## Commands

```bash
npm run lint
npm run build
```

## Deployment Notes

Connect the GitHub repo to Vercel, set the same public Supabase variables in Vercel, and add the Vercel `/auth/callback` URL to Supabase Auth redirect URLs. Keep GitHub as the source of truth and deploy from `main`.

## Codex Guardrails

- Do not create duplicate UI components or a second design system.
- Do not introduce random colors.
- Do not use Inter as the default font.
- Do not implement full onboarding, scheduling, payment gateway, tutor login, or automations in PRD 1.
- Keep Supabase as the source of truth for Auth, Postgres, RLS, and migrations.
- Do not expose or require `SUPABASE_SERVICE_ROLE_KEY` for PRD 0.
