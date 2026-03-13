type ClaimStatusBadgeProps = {
  status: string;
};

export function ClaimStatusBadge({ status }: ClaimStatusBadgeProps) {
  return <span className="status-badge">{status}</span>;
}
