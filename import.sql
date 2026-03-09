drop table if exists programs_import_stage;
create temporary table programs_import_stage (
  school_name text,
  program_name text,
  slug text,
  degree_type text,
  program_scope text,
  modality text,
  total_credits integer,
  tuition_total_usd numeric,
  tuition_per_credit_usd numeric,
  duration text,
  gre_policy text,
  official_url text,
  source_type text,
  source_url text,
  last_verified_at date,
  verification_notes text,
  confidence text,
  editorial_rank_score numeric,
  editorial_rank integer
);

-- psql example:
-- \copy programs_import_stage from 'database/seed_programs.csv' with (format csv, header true);

insert into schools (name, slug, official_url)
select distinct
  school_name,
  regexp_replace(lower(school_name), '[^a-z0-9]+', '-', 'g'),
  min(official_url)
from programs_import_stage
group by school_name
on conflict (slug) do update set official_url = excluded.official_url, updated_at = now();

insert into programs (
  school_id, school_name, program_name, slug, degree_type, program_scope, modality,
  total_credits, tuition_total_usd, tuition_per_credit_usd, duration, gre_policy,
  official_url, source_type, source_url, last_verified_at, verification_notes,
  confidence, editorial_rank_score, editorial_rank
)
select
  s.id, p.school_name, p.program_name, p.slug, p.degree_type, p.program_scope, p.modality,
  p.total_credits, p.tuition_total_usd, p.tuition_per_credit_usd, p.duration, p.gre_policy,
  p.official_url, p.source_type, p.source_url, p.last_verified_at, p.verification_notes,
  p.confidence, p.editorial_rank_score, p.editorial_rank
from programs_import_stage p
join schools s
  on s.slug = regexp_replace(lower(p.school_name), '[^a-z0-9]+', '-', 'g')
on conflict (slug) do update set
  school_id = excluded.school_id,
  school_name = excluded.school_name,
  program_name = excluded.program_name,
  degree_type = excluded.degree_type,
  program_scope = excluded.program_scope,
  modality = excluded.modality,
  total_credits = excluded.total_credits,
  tuition_total_usd = excluded.tuition_total_usd,
  tuition_per_credit_usd = excluded.tuition_per_credit_usd,
  duration = excluded.duration,
  gre_policy = excluded.gre_policy,
  official_url = excluded.official_url,
  source_type = excluded.source_type,
  source_url = excluded.source_url,
  last_verified_at = excluded.last_verified_at,
  verification_notes = excluded.verification_notes,
  confidence = excluded.confidence,
  editorial_rank_score = excluded.editorial_rank_score,
  editorial_rank = excluded.editorial_rank,
  updated_at = now();
