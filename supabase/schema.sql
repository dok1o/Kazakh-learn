-- TIL — production schema (Supabase Postgres). Apply with `supabase db push`.
-- Guest (localStorage) progress migrates client-side into these tables after sign-up.

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  interface_locale text not null default 'en' check (interface_locale in ('en','ru')),
  created_at timestamptz not null default now()
);

create table if not exists public.learning_preferences (
  user_id uuid primary key references public.user_profiles(id) on delete cascade,
  goal text, level text, daily_goal_min int not null default 10,
  show_translit boolean not null default true,
  theme text not null default 'light'
);

create table if not exists public.chapters (
  id int primary key, title_en text not null, title_ru text not null,
  objective_en text, objective_ru text, status text not null default 'draft',
  content_version int not null default 1
);

create table if not exists public.lessons (
  id text primary key, chapter_id int references public.chapters(id),
  title_en text not null, title_ru text not null,
  objective_en text, objective_ru text, ordering int not null,
  review_status text not null default 'pending_teacher_review'
);

create table if not exists public.exercises (
  id text primary key, lesson_id text references public.lessons(id) on delete cascade,
  type text not null, payload jsonb not null, ordering int not null,
  difficulty int not null default 1, skill_tags text[] not null default '{}'
);

create table if not exists public.vocabulary (
  id text primary key, kz text not null, en text not null, ru text not null,
  translit text, pos text, example_kz text, example_en text, example_ru text,
  chapter_id int, audio_url text
);

create table if not exists public.lesson_progress (
  user_id uuid references public.user_profiles(id) on delete cascade,
  lesson_id text references public.lessons(id),
  xp int not null default 0, accuracy int not null default 0,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)  -- idempotent completion
);

create table if not exists public.user_vocabulary (
  user_id uuid references public.user_profiles(id) on delete cascade,
  vocab_id text references public.vocabulary(id),
  srs_box int not null default 0, due_at timestamptz not null default now(),
  seen int not null default 0, correct int not null default 0, wrong int not null default 0,
  saved boolean not null default false,
  primary key (user_id, vocab_id)
);

create table if not exists public.exercise_attempts (
  id bigint generated always as identity primary key,
  user_id uuid references public.user_profiles(id) on delete cascade,
  exercise_id text, correct boolean not null, created_at timestamptz not null default now()
);

create table if not exists public.learning_activity (
  user_id uuid references public.user_profiles(id) on delete cascade,
  day date not null, xp int not null default 0,
  primary key (user_id, day)
);

-- Row Level Security: learners only ever touch their own rows.
alter table public.user_profiles enable row level security;
alter table public.learning_preferences enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.user_vocabulary enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.learning_activity enable row level security;

do $$ begin
  execute 'create policy "own profile" on public.user_profiles for all using (auth.uid() = id) with check (auth.uid() = id)';
  execute 'create policy "own prefs" on public.learning_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  execute 'create policy "own progress" on public.lesson_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  execute 'create policy "own vocab" on public.user_vocabulary for all using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  execute 'create policy "own attempts" on public.exercise_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id)';
  execute 'create policy "own activity" on public.learning_activity for all using (auth.uid() = user_id) with check (auth.uid() = user_id)';
exception when duplicate_object then null; end $$;

create index if not exists idx_uv_due on public.user_vocabulary (user_id, due_at);
create index if not exists idx_attempts_user on public.exercise_attempts (user_id, created_at);
