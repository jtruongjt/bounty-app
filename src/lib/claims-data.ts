import { claims as mockClaims } from "@/lib/mock-data";
import { getNeonSql } from "@/lib/neon/server";
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
  rep_id: string | null;
  rep_full_name: string | null;
  program_id: string | null;
  program_name: string | null;
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

export async function getClaimsPageData() {
  const sql = getNeonSql();

  if (!sql) {
    return {
      claims: mockClaims,
      reps: [] as RepOption[],
      programs: [] as BountyProgramOption[],
      source: "mock" as const,
    };
  }

  try {
    const [claimsData, repsData, programsData] = (await Promise.all([
      sql`
        select
          bc.id,
          bc.account_name,
          bc.opportunity_name,
          bc.status,
          bc.expected_amount,
          bc.close_date,
          bc.quarter_label,
          bc.notes,
          r.id as rep_id,
          r.full_name as rep_full_name,
          bp.id as program_id,
          bp.name as program_name
        from bounty_claims bc
        left join reps r on r.id = bc.rep_id
        left join bounty_programs bp on bp.id = bc.bounty_program_id
        order by bc.created_at desc
      `,
      sql`
        select id, full_name, preferred_name
        from reps
        where is_active = true
        order by full_name asc
      `,
      sql`
        select id, name, default_payout
        from bounty_programs
        where is_active = true
        order by name asc
      `,
    ])) as [ClaimRow[], RepRow[], ProgramRow[]];

    const claims = claimsData.map((claim) => {
      return {
        id: claim.id,
        accountName: claim.account_name,
        opportunityName: claim.opportunity_name,
        repName: claim.rep_full_name ?? "Unknown rep",
        repId: claim.rep_id ?? undefined,
        bountyType: claim.program_name ?? "Unassigned",
        expectedAmount: toNumber(claim.expected_amount),
        status: claim.status,
        closeDate: claim.close_date,
        quarterLabel: claim.quarter_label,
        notes: claim.notes,
      } satisfies BountyClaim;
    });

    const reps = repsData.map((rep) => ({
      id: rep.id,
      name: rep.full_name,
      preferredName: rep.preferred_name,
    }));

    const programs = programsData.map((program) => ({
      id: program.id,
      name: program.name,
      defaultPayout: program.default_payout === null ? null : toNumber(program.default_payout),
    }));

    return {
      claims,
      reps,
      programs,
      source: "neon" as const,
    };
  } catch {
    return {
      claims: mockClaims,
      reps: [] as RepOption[],
      programs: [] as BountyProgramOption[],
      source: "mock" as const,
    };
  }
}

export async function getRepClaimsPageData(repId: string) {
  const sql = getNeonSql();

  if (!sql) {
    const repClaims = mockClaims.filter((claim) => claim.repId === repId);
    return {
      repName: repClaims[0]?.repName ?? "Rep",
      claims: repClaims,
    };
  }

  try {
    const [repData, claimsData] = (await Promise.all([
      sql`
        select full_name
        from reps
        where id = ${repId}
        limit 1
      `,
      sql`
        select
          id,
          account_name,
          opportunity_name,
          status,
          expected_amount,
          close_date,
          quarter_label,
          notes
        from bounty_claims
        where rep_id = ${repId}
        order by created_at desc
      `,
    ])) as [
      { full_name: string }[],
      Omit<ClaimRow, "rep_id" | "rep_full_name" | "program_id" | "program_name">[],
    ];

    const repName = repData[0]?.full_name ?? "Rep";

    const claims = claimsData.map(
      (claim) =>
        ({
          id: claim.id,
          accountName: claim.account_name,
          opportunityName: claim.opportunity_name,
          repName,
          expectedAmount: toNumber(claim.expected_amount),
          status: claim.status,
          closeDate: claim.close_date,
          quarterLabel: claim.quarter_label,
          notes: claim.notes,
          bountyType: "Unassigned",
        }) satisfies BountyClaim,
    );

    return {
      repName,
      claims,
    };
  } catch {
    return {
      repName: "Rep",
      claims: [] as BountyClaim[],
    };
  }
}
