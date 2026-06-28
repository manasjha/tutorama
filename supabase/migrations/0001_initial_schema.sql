create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  phone text,
  display_name text,
  role text not null default 'parent' check (role in ('parent', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_name text not null,
  grade text not null,
  board text,
  city text not null default 'Bengaluru',
  service_area text not null default 'HSR Layout',
  allowed_subjects text[] not null default array['Maths', 'Science', 'SST'],
  onboarding_status text not null default 'not_started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tutors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  subjects text[],
  grades text[],
  service_area text,
  status text not null default 'pending_review'
    check (status in ('active', 'inactive', 'pending_review')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tuitions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  parent_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  grade_snapshot text not null,
  service_area text not null default 'HSR Layout',
  tutor_id uuid references public.tutors(id) on delete set null,
  status text not null default 'setup_pending'
    check (status in ('setup_pending', 'tutor_matching', 'active', 'paused', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  grade text not null,
  subject text not null,
  topic_name text not null,
  description text,
  sequence_order integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  tuition_id uuid not null references public.tuitions(id) on delete cascade,
  student_id uuid not null references public.student_profiles(id) on delete cascade,
  parent_id uuid not null references public.profiles(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete set null,
  subject_snapshot text not null,
  grade_snapshot text not null,
  topic_id uuid references public.topics(id) on delete set null,
  topic_text text,
  scheduled_start_at timestamptz,
  scheduled_end_at timestamptz,
  status text not null default 'booking_initiated'
    check (
      status in (
        'booking_initiated',
        'details_submitted',
        'payment_initiated',
        'payment_completed',
        'tutor_assignment_pending',
        'tutor_assigned',
        'class_scheduled',
        'class_in_progress',
        'class_completed',
        'class_rescheduled',
        'class_cancelled'
      )
    ),
  payment_status text not null default 'not_started'
    check (payment_status in ('not_started', 'initiated', 'completed', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.class_content (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  pre_class_notes text,
  in_class_activities text,
  homework text,
  post_class_summary text,
  parent_visible boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid references public.student_profiles(id) on delete set null,
  tuition_id uuid references public.tuitions(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  amount_in_paise integer not null check (amount_in_paise >= 0),
  currency text not null default 'INR',
  status text not null default 'not_started'
    check (status in ('not_started', 'initiated', 'completed', 'failed', 'refunded')),
  provider text,
  provider_order_id text,
  provider_payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  anonymous_id text,
  event_name text not null,
  properties jsonb not null default '{}'::jsonb,
  page_path text,
  created_at timestamptz not null default now()
);

create index student_profiles_parent_id_idx on public.student_profiles(parent_id);
create index tuitions_parent_id_idx on public.tuitions(parent_id);
create index tuitions_student_subject_idx on public.tuitions(student_id, subject);
create index classes_parent_id_idx on public.classes(parent_id);
create index classes_tuition_id_idx on public.classes(tuition_id);
create index classes_scheduled_start_at_idx on public.classes(scheduled_start_at);
create index class_content_class_id_idx on public.class_content(class_id);
create index payments_parent_id_idx on public.payments(parent_id);
create index events_user_id_idx on public.events(user_id);
create index events_event_name_idx on public.events(event_name);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_student_profiles_updated_at
before update on public.student_profiles
for each row execute function public.set_updated_at();

create trigger set_tutors_updated_at
before update on public.tutors
for each row execute function public.set_updated_at();

create trigger set_tuitions_updated_at
before update on public.tuitions
for each row execute function public.set_updated_at();

create trigger set_topics_updated_at
before update on public.topics
for each row execute function public.set_updated_at();

create trigger set_classes_updated_at
before update on public.classes
for each row execute function public.set_updated_at();

create trigger set_class_content_updated_at
before update on public.class_content
for each row execute function public.set_updated_at();

create trigger set_payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role, created_at, updated_at)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    'parent',
    now(),
    now()
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role and not public.is_admin(auth.uid()) then
    raise exception 'Only admins can update profile roles.';
  end if;

  return new;
end;
$$;

create trigger prevent_profile_role_escalation
before update on public.profiles
for each row execute function public.prevent_profile_role_escalation();

alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.tutors enable row level security;
alter table public.tuitions enable row level security;
alter table public.topics enable row level security;
alter table public.classes enable row level security;
alter table public.class_content enable row level security;
alter table public.payments enable row level security;
alter table public.events enable row level security;

create policy "profiles select own or admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles update own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "profiles admin update"
on public.profiles for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "student profiles parent select"
on public.student_profiles for select
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "student profiles parent insert"
on public.student_profiles for insert
to authenticated
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "student profiles parent update"
on public.student_profiles for update
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()))
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "student profiles parent delete"
on public.student_profiles for delete
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "tutors admin all"
on public.tutors for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "tuitions parent select"
on public.tuitions for select
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "tuitions parent insert"
on public.tuitions for insert
to authenticated
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "tuitions parent update"
on public.tuitions for update
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()))
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "topics authenticated select active"
on public.topics for select
to authenticated
using (is_active = true or public.is_admin(auth.uid()));

create policy "topics admin all"
on public.topics for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "classes parent select"
on public.classes for select
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "classes parent insert"
on public.classes for insert
to authenticated
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "classes parent update"
on public.classes for update
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()))
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "class content parent select visible"
on public.class_content for select
to authenticated
using (
  public.is_admin(auth.uid())
  or (
    parent_visible = true
    and exists (
      select 1
      from public.classes
      where classes.id = class_content.class_id
        and classes.parent_id = auth.uid()
    )
  )
);

create policy "class content admin all"
on public.class_content for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "payments parent select"
on public.payments for select
to authenticated
using (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "payments parent insert"
on public.payments for insert
to authenticated
with check (parent_id = auth.uid() or public.is_admin(auth.uid()));

create policy "payments admin update"
on public.payments for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "events authenticated insert"
on public.events for insert
to authenticated
with check (user_id = auth.uid() or user_id is null);

create policy "events admin select"
on public.events for select
to authenticated
using (public.is_admin(auth.uid()));
