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
  repName: string;
  bountyType: string;
  expectedAmount: number;
  status: ClaimStatus;
};

export type ReconciliationRow = {
  rep: string;
  account: string;
  expectedAmount: number;
  actualAmount: number;
};
