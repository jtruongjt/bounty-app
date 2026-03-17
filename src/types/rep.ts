export type LeaderboardRow = {
  rank: number;
  repId: string;
  repName: string;
  expectedBounty: number;
  activeClaims: number;
  winLabel: string;
  paceLabel: string;
};

export type RepOption = {
  id: string;
  name: string;
  preferredName?: string | null;
};
