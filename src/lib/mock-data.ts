import type { BountyClaim, ReconciliationRow } from "@/types/bounty";
import type { LeaderboardRow } from "@/types/rep";

export const dashboardSummary = {
  totalExpected: "$42,500",
  activeClaims: 18,
};

export const dashboardLeaderboard: LeaderboardRow[] = [
  {
    rank: 1,
    repId: "rep-001",
    repName: "Caden Critchfield",
    expectedBounty: 12000,
    activeClaims: 5,
    winLabel: "Fastest start to quarter",
    paceLabel: "28% of team total",
  },
  {
    rank: 2,
    repId: "rep-002",
    repName: "Carson Erwin",
    expectedBounty: 10500,
    activeClaims: 4,
    winLabel: "Largest multi-year deal",
    paceLabel: "25% of team total",
  },
  {
    rank: 3,
    repId: "rep-003",
    repName: "Chase Maddox",
    expectedBounty: 8000,
    activeClaims: 3,
    winLabel: "Most efficient close rate",
    paceLabel: "19% of team total",
  },
  {
    rank: 4,
    repId: "rep-004",
    repName: "Alan Rodriguez",
    expectedBounty: 7500,
    activeClaims: 4,
    winLabel: "Most active pipeline",
    paceLabel: "18% of team total",
  },
  {
    rank: 5,
    repId: "rep-005",
    repName: "Nick Goldsberry",
    expectedBounty: 4500,
    activeClaims: 2,
    winLabel: "Biggest late-quarter upside",
    paceLabel: "10% of team total",
  },
];

export const claims: BountyClaim[] = [
  {
    id: "claim_1",
    accountName: "Acme Corp",
    repName: "Caden Critchfield",
    bountyType: "Expansion",
    expectedAmount: 2500,
    status: "Expected",
  },
  {
    id: "claim_2",
    accountName: "North Ridge",
    repName: "Carson Erwin",
    bountyType: "Multi-year",
    expectedAmount: 3000,
    status: "Submitted",
  },
  {
    id: "claim_3",
    accountName: "Bright Labs",
    repName: "Alan Rodriguez",
    bountyType: "New logo",
    expectedAmount: 2000,
    status: "Pending Proof",
  },
];

export const reconciliationRows: ReconciliationRow[] = [
  {
    rep: "Caden Critchfield",
    account: "Acme Corp",
    expectedAmount: 2500,
    actualAmount: 2500,
  },
  {
    rep: "Carson Erwin",
    account: "North Ridge",
    expectedAmount: 3000,
    actualAmount: 2500,
  },
];
