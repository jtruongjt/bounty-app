# Supabase Setup

This app now has a first-pass schema and seed data for the bounty tracker.

## Files

- `supabase/migrations/20260313_001_init_bounty_schema.sql`
- `supabase/seed.sql`

## What the schema includes

- `reps`
- `bounty_programs`
- `bounty_claims`
- `claim_status_history`
- `quarter_leaderboard` view

## Seeded team data

The `reps` seed is based on [team-reps-ai.md](/C:/Users/jtruong/Sales/bounty-app/team-reps-ai.md) and currently includes the nine reps on Team JT under Justin Truong.

## Suggested next steps

1. Create a Supabase project.
2. Run the migration in the SQL editor or through the Supabase CLI.
3. Run `supabase/seed.sql`.
4. Replace the dashboard mock data with reads from `quarter_leaderboard` and `bounty_claims`.
