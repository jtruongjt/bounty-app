const Q1_2027_PAYOUTS = [250, 300, 350, 400];
const Q1_2027_MAX_PAYOUT = 450;

export function getPayoutForClaimNumber(claimNumber: number) {
  if (claimNumber <= 0) {
    return 0;
  }

  if (claimNumber <= Q1_2027_PAYOUTS.length) {
    return Q1_2027_PAYOUTS[claimNumber - 1];
  }

  return Q1_2027_MAX_PAYOUT;
}

export function getQuarterPayout(quarterLabel: string, claimNumber: number) {
  if (quarterLabel === "Q1 2027") {
    return getPayoutForClaimNumber(claimNumber);
  }

  return 0;
}
