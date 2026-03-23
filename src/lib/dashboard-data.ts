import { dashboardLeaderboard, dashboardSummary } from "@/lib/mock-data";
import { getNeonSql } from "@/lib/neon/server";
import { formatCurrency } from "@/lib/utils/currency";
import type { ClaimStatus } from "@/types/bounty";
import type { LeaderboardRow } from "@/types/rep";

type QuarterLeaderboardRecord = {
  quarter_label: string;
  rep_id: string;
  full_name: string;
  preferred_name: string | null;
  active_claims: number | null;
  expected_bounty: number | string | null;
};

type QuarterClaimRecord = {
  expected_amount: number | string | null;
  status: ClaimStatus;
};

export type DashboardData = {
  summary: {
    totalExpected: string;
    activeClaims: number;
  };
  leaderboard: LeaderboardRow[];
  source: "neon" | "mock";
};

function getEmptyDashboardData(source: "neon" | "mock"): DashboardData {
  return {
    summary: {
      totalExpected: formatCurrency(0),
      activeClaims: 0,
    },
    leaderboard: [],
    source,
  };
}

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

export async function getDashboardData(
  quarterLabel: string,
): Promise<DashboardData> {
  const sql = getNeonSql();

  if (!sql) {
    if (quarterLabel !== "Q1 2027") {
      return getEmptyDashboardData("mock");
    }

    return {
      summary: dashboardSummary,
      leaderboard: dashboardLeaderboard,
      source: "mock",
    };
  }

  try {
    const [leaderboardRows, claimRows] = (await Promise.all([
      sql`
        select
          quarter_label,
          rep_id,
          full_name,
          preferred_name,
          active_claims,
          expected_bounty
        from quarter_leaderboard
        where quarter_label = ${quarterLabel}
        order by expected_bounty desc
      `,
      sql`
        select expected_amount, status
        from bounty_claims
        where quarter_label = ${quarterLabel}
          and status in (
            'Identified',
            'Pending Proof',
            'Submitted',
            'Expected',
            'Disputed'
          )
      `,
    ])) as [QuarterLeaderboardRecord[], QuarterClaimRecord[]];

    const totalExpected = claimRows.reduce((sum, claim) => {
      return sum + toNumber(claim.expected_amount);
    }, 0);

    const leaderboard = leaderboardRows.map((row, index, rows) => {
      const expectedBounty = toNumber(row.expected_bounty);
      const totalPool = rows.reduce(
        (sum, current) => sum + toNumber(current.expected_bounty),
        0,
      );
      const share = totalPool > 0 ? Math.round((expectedBounty / totalPool) * 100) : 0;
      const activeClaims = row.active_claims ?? 0;

      return {
        rank: index + 1,
        repId: row.rep_id,
        repName: row.full_name,
        expectedBounty,
        activeClaims,
        winLabel:
          activeClaims === 1
            ? "1 active claim in play"
            : `${activeClaims} active claims in play`,
        paceLabel: `${share}% of team total`,
      };
    });

    return {
      summary: {
        totalExpected: formatCurrency(totalExpected),
        activeClaims: claimRows.length,
      },
      leaderboard,
      source: "neon",
    };
  } catch {
    if (quarterLabel !== "Q1 2027") {
      return getEmptyDashboardData("mock");
    }

    return {
      summary: dashboardSummary,
      leaderboard: dashboardLeaderboard,
      source: "mock",
    };
  }
}
