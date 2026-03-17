import { claims as mockClaims } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { BountyClaim, BountyProgramOption, ClaimStatus } from "@/types/bounty";
import type { RepOption } from "@/types/rep";

type ClaimRow = {
  id: string;
  account_name: string;
  opportunity_name: string | null;
  status: ClaimStatus;
  expected_amount: number | string;
  close_date: string | null;
  quarter_label: string;
  notes: string | null;
  reps: { id: string; full_name: string } | { id: string; full_name: string }[] | null;
  bounty_programs:
    | { id: string; name: string }
    | { id: string; name: string }[]
    | null;
};

type RepRow = {
  id: string;
  full_name: string;
  preferred_name: string | null;
};

type ProgramRow = {
  id: string;
  name: string;
  default_payout: number | string | null;
};

function toNumber(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function flattenRelation<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

export async function getClaimsPageData() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return {
      claims: mockClaims,
      reps: [] as RepOption[],
      programs: [] as BountyProgramOption[],
      source: "mock" as const,
    };
  }

  const [{ data: claimsData, error: claimsError }, { data: repsData, error: repsError }, { data: programsData, error: programsError }] =
    await Promise.all([
      supabase
        .from("bounty_claims")
        .select(
          "id, account_name, opportunity_name, status, expected_amount, close_date, quarter_label, notes, reps(id, full_name), bounty_programs(id, name)",
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("reps")
        .select("id, full_name, preferred_name")
        .eq("is_active", true)
        .order("full_name", { ascending: true }),
      supabase
        .from("bounty_programs")
        .select("id, name, default_payout")
        .eq("is_active", true)
        .order("name", { ascending: true }),
    ]);

  if (claimsError || repsError || programsError) {
    return {
      claims: mockClaims,
      reps: [] as RepOption[],
      programs: [] as BountyProgramOption[],
      source: "mock" as const,
    };
  }

  const claims = ((claimsData ?? []) as ClaimRow[]).map((claim) => {
    const rep = flattenRelation(claim.reps);
    const program = flattenRelation(claim.bounty_programs);

    return {
      id: claim.id,
      accountName: claim.account_name,
      opportunityName: claim.opportunity_name,
      repName: rep?.full_name ?? "Unknown rep",
      repId: rep?.id,
      bountyType: program?.name ?? "Unassigned",
      expectedAmount: toNumber(claim.expected_amount),
      status: claim.status,
      closeDate: claim.close_date,
      quarterLabel: claim.quarter_label,
      notes: claim.notes,
    } satisfies BountyClaim;
  });

  const reps = ((repsData ?? []) as RepRow[]).map((rep) => ({
    id: rep.id,
    name: rep.full_name,
    preferredName: rep.preferred_name,
  }));

  const programs = ((programsData ?? []) as ProgramRow[]).map((program) => ({
    id: program.id,
    name: program.name,
    defaultPayout: program.default_payout === null ? null : toNumber(program.default_payout),
  }));

  return {
    claims,
    reps,
    programs,
    source: "supabase" as const,
  };
}

export async function getRepClaimsPageData(repId: string) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    const repClaims = mockClaims.filter((claim) => claim.repId === repId);
    return {
      repName: repClaims[0]?.repName ?? "Rep",
      claims: repClaims,
    };
  }

  const [{ data: repData, error: repError }, { data: claimsData, error: claimsError }] =
    await Promise.all([
      supabase.from("reps").select("full_name").eq("id", repId).maybeSingle(),
      supabase
        .from("bounty_claims")
        .select("id, account_name, opportunity_name, status, expected_amount, close_date, quarter_label, notes")
        .eq("rep_id", repId)
        .order("created_at", { ascending: false }),
    ]);

  if (repError || claimsError || !claimsData) {
    return {
      repName: "Rep",
      claims: [] as BountyClaim[],
    };
  }

  const claims = ((claimsData ?? []) as Omit<ClaimRow, "reps" | "bounty_programs">[]).map(
    (claim) =>
      ({
        id: claim.id,
        accountName: claim.account_name,
        opportunityName: claim.opportunity_name,
        repName: repData?.full_name ?? "Rep",
        expectedAmount: toNumber(claim.expected_amount),
        status: claim.status,
        closeDate: claim.close_date,
        quarterLabel: claim.quarter_label,
        notes: claim.notes,
        bountyType: "Unassigned",
      }) satisfies BountyClaim,
  );

  return {
    repName: repData?.full_name ?? "Rep",
    claims,
  };
}
