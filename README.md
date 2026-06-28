# Tutorama

Tutorama is a managed tutoring service starting in HSR Layout, Bengaluru. This repository contains the PRD 0 MVP foundation only.

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
6. Add redirect URLs for `http://localhost:3000/auth/callback` and the future Vercel production callback URL.
7. Run `supabase/migrations/0001_initial_schema.sql` with the Supabase CLI or SQL editor.

To make a founder admin, sign up normally, then update that profile row in Supabase:

```sql
update public.profiles
set role = 'admin'
where email = 'founder@example.com';
```

## Routes

- `/` public placeholder
- `/login` email/password sign up and login
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
- Do not implement full onboarding, scheduling, payment gateway, tutor login, or automations in PRD 0.
- Keep Supabase as the source of truth for Auth, Postgres, RLS, and migrations.
- Do not expose or require `SUPABASE_SERVICE_ROLE_KEY` for PRD 0.
