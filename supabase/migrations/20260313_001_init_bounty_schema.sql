create extension if not exists "pgcrypto";

create table if not exists public.reps (
  id uuid primary key default gen_random_uuid(),
  external_rep_id text not null unique,
  full_name text not null,
  preferred_name text,
  title text not null,
  manager_name text not null,
  team_name text not null,
  region text not null,
  segment text not null,
  product_focus text,
  role_group text,
  quota_summary text,
  primary_kpi text,
  secondary_kpis text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bounty_programs (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  default_payout numeric(12,2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bounty_claims (
  id uuid primary key default gen_random_uuid(),
  rep_id uuid not null references public.reps(id) on delete restrict,
  bounty_program_id uuid references public.bounty_programs(id) on delete set null,
  account_name text not null,
  opportunity_name text,
  crm_deal_id text,
  status text not null check (status in (
    'Identified',
    'Pending Proof',
    'Submitted',
    'Expected',
    'Paid',
    'Rejected',
    'Disputed'
  )),
  deal_amount numeric(12,2),
  expected_amount numeric(12,2) not null default 0,
  actual_paid_amount numeric(12,2),
  close_date date,
  quarter_label text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.claim_status_history (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references public.bounty_claims(id) on delete cascade,
  status text not null,
  note text,
  changed_by text,
  changed_at timestamptz not null default now()
);

create index if not exists idx_reps_manager_name on public.reps(manager_name);
create index if not exists idx_bounty_claims_rep_id on public.bounty_claims(rep_id);
create index if not exists idx_bounty_claims_quarter_status on public.bounty_claims(quarter_label, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reps_set_updated_at on public.reps;
create trigger reps_set_updated_at
before update on public.reps
for each row
execute function public.set_updated_at();

drop trigger if exists bounty_programs_set_updated_at on public.bounty_programs;
create trigger bounty_programs_set_updated_at
before update on public.bounty_programs
for each row
execute function public.set_updated_at();

drop trigger if exists bounty_claims_set_updated_at on public.bounty_claims;
create trigger bounty_claims_set_updated_at
before update on public.bounty_claims
for each row
execute function public.set_updated_at();

create or replace view public.quarter_leaderboard as
select
  bc.quarter_label,
  r.id as rep_id,
  r.full_name,
  r.preferred_name,
  count(*) filter (
    where bc.status not in ('Paid', 'Rejected')
  ) as active_claims,
  coalesce(sum(bc.expected_amount), 0)::numeric(12,2) as expected_bounty
from public.bounty_claims bc
join public.reps r on r.id = bc.rep_id
group by bc.quarter_label, r.id, r.full_name, r.preferred_name;
