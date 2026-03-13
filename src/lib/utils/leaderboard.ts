import type { BountyClaim } from "@/types/bounty";

export function getActiveClaimCount(claims: BountyClaim[]) {
  return claims.filter((claim) => claim.status !== "Paid" && claim.status !== "Rejected")
    .length;
}
