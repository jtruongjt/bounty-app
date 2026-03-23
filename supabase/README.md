# Neon Setup

This app uses Postgres in Neon for the bounty tracker. The SQL assets still live in this folder.

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

1. Create a Neon project and copy its pooled connection string into `DATABASE_URL`.
2. Run `supabase/migrations/20260313_001_init_bounty_schema.sql` against your Neon database.
3. Run `supabase/seed.sql` against the same database.
4. Start the app and confirm the dashboard and claims pages read from Neon.
