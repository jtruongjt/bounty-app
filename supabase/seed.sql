insert into public.reps (
  external_rep_id,
  full_name,
  preferred_name,
  title,
  manager_name,
  team_name,
  region,
  segment,
  product_focus,
  role_group,
  quota_summary,
  primary_kpi,
  secondary_kpis
)
values
  ('rep-001', 'Caden Critchfield', 'Caden', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-002', 'Carson Erwin', 'Carson', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-003', 'Chase Maddox', 'Chase', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-004', 'Alan Rodriguez', 'Alan', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-005', 'Nick Goldsberry', 'Nick', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-006', 'Ryan Smith', 'Ryan', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-007', 'Tanner Rees', 'Tanner', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-008', 'Ty Winkelman', 'Ty', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief'),
  ('rep-009', 'Win Elkington', 'Win', 'Account Executive', 'Justin Truong', 'Team JT', 'SMB New Logo', 'SMB', 'New logo sales', 'SMB Account Executive', '7 new logos / $22,700 total quota relief', 'New logos closed', 'Total quota relief')
on conflict (external_rep_id) do update
set
  full_name = excluded.full_name,
  preferred_name = excluded.preferred_name,
  title = excluded.title,
  manager_name = excluded.manager_name,
  team_name = excluded.team_name,
  region = excluded.region,
  segment = excluded.segment,
  product_focus = excluded.product_focus,
  role_group = excluded.role_group,
  quota_summary = excluded.quota_summary,
  primary_kpi = excluded.primary_kpi,
  secondary_kpis = excluded.secondary_kpis,
  is_active = true;

insert into public.bounty_programs (name, description, default_payout)
values
  ('New Logo', 'Bounty for qualifying new logo wins.', 2500),
  ('Multi-Year', 'Bounty for multi-year contract closes.', 3000),
  ('Expansion', 'Bounty for qualifying expansion deals.', 2000)
on conflict (name) do update
set
  description = excluded.description,
  default_payout = excluded.default_payout,
  is_active = true;
