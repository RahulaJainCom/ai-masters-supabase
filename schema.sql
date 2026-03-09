create extension if not exists "pgcrypto";

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  official_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references schools(id) on delete cascade,
  school_name text not null,
  program_name text not null,
  slug text not null unique,
  degree_type text not null,
  program_scope text not null check (program_scope in ('exact_ai','applied_ai','ai_related','management_ai')),
  modality text not null,
  total_credits integer,
  tuition_total_usd numeric,
  tuition_per_credit_usd numeric,
  duration text,
  gre_policy text,
  official_url text not null,
  source_type text not null,
  source_url text not null,
  last_verified_at date not null,
  verification_notes text,
  confidence text not null check (confidence in ('high','medium','low')),
  editorial_rank integer,
  editorial_rank_score numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_programs_rank on programs(editorial_rank);
create index if not exists idx_programs_slug on programs(slug);
create index if not exists idx_programs_scope on programs(program_scope);
create index if not exists idx_programs_tuition on programs(tuition_total_usd);
