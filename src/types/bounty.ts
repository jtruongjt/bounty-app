export type ClaimStatus =
  | "Identified"
  | "Pending Proof"
  | "Submitted"
  | "Expected"
  | "Paid"
  | "Rejected"
  | "Disputed";

export type BountyClaim = {
  id: string;
  accountName: string;
  opportunityName?: string | null;
  repName: string;
  repId?: string;
  bountyType: string;
  expectedAmount: number;
  status: ClaimStatus;
  closeDate?: string | null;
  quarterLabel?: string;
  notes?: string | null;
};

export type ReconciliationRow = {
  rep: string;
  account: string;
  expectedAmount: number;
  actualAmount: number;
};

export type BountyProgramOption = {
  id: string;
  name: string;
  defaultPayout: number | null;
};
