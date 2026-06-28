create policy "profiles insert own parent"
on public.profiles for insert
to authenticated
with check (id = auth.uid() and role = 'parent');
