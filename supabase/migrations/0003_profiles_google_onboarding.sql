alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists onboarding_status text not null default 'not_started',
  add column if not exists last_login_at timestamptz;

alter table public.profiles
  alter column onboarding_status set default 'not_started';

update public.profiles
set onboarding_status = 'not_started'
where onboarding_status is null;

alter table public.profiles
  alter column onboarding_status set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_onboarding_status_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_onboarding_status_check
      check (onboarding_status in ('not_started', 'in_progress', 'completed'));
  end if;
end;
$$;
