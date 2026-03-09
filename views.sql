create or replace view v_best_online_ai_programs as
select editorial_rank, school_name, program_name, slug, program_scope, modality, tuition_total_usd, gre_policy, confidence, editorial_rank_score
from programs
order by editorial_rank asc;

create or replace view v_no_gre_ai_programs as
select * from v_best_online_ai_programs
where lower(coalesce(gre_policy, '')) like 'no%';

create or replace view v_affordable_ai_programs as
select * from v_best_online_ai_programs
where tuition_total_usd is not null and tuition_total_usd <= 20000
order by tuition_total_usd asc, editorial_rank asc;
