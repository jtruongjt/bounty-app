import type { BountyClaim, ReconciliationRow } from "@/types/bounty";
import type { LeaderboardRow } from "@/types/rep";

export const dashboardSummary = {
  totalExpected: "$42,500",
  activeClaims: 18,
};

export const dashboardLeaderboard: LeaderboardRow[] = [
  { rank: 1, repId: "rep_1", repName: "Sarah Chen", expectedBounty: "$12,000", activeClaims: 5 },
  { rank: 2, repId: "rep_2", repName: "Mike Alvarez", expectedBounty: "$10,500", activeClaims: 4 },
  { rank: 3, repId: "rep_3", repName: "Jordan Lee", expectedBounty: "$8,000", activeClaims: 3 },
  { rank: 4, repId: "rep_4", repName: "Priya Patel", expectedBounty: "$7,500", activeClaims: 4 },
  { rank: 5, repId: "rep_5", repName: "Alex Johnson", expectedBounty: "$4,500", activeClaims: 2 },
];

export const claims: BountyClaim[] = [
  {
    id: "claim_1",
    accountName: "Acme Corp",
    repName: "Sarah Chen",
    bountyType: "Expansion",
    expectedAmount: 2500,
    status: "Expected",
  },
  {
    id: "claim_2",
    accountName: "North Ridge",
    repName: "Mike Alvarez",
    bountyType: "Multi-year",
    expectedAmount: 3000,
    status: "Submitted",
  },
  {
    id: "claim_3",
    accountName: "Bright Labs",
    repName: "Priya Patel",
    bountyType: "New logo",
    expectedAmount: 2000,
    status: "Pending Proof",
  },
];

export const reconciliationRows: ReconciliationRow[] = [
  {
    rep: "Sarah Chen",
    account: "Acme Corp",
    expectedAmount: 2500,
    actualAmount: 2500,
  },
  {
    rep: "Mike Alvarez",
    account: "North Ridge",
    expectedAmount: 3000,
    actualAmount: 2500,
  },
];
