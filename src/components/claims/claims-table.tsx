import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currency";
import type { BountyClaim } from "@/types/bounty";
import { ClaimStatusBadge } from "./claim-status-badge";

type ClaimsTableProps = {
  claims: BountyClaim[];
};

export function ClaimsTable({ claims }: ClaimsTableProps) {
  return (
    <section className="panel table-panel">
      <div className="table-panel__header">
        <div>
          <h2>All Claims</h2>
          <p>Use this table to monitor every bounty-eligible deal in flight.</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Rep</th>
            <th>Bounty Type</th>
            <th>Expected</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>
                <Link href={`/claims/${claim.id}`}>{claim.accountName}</Link>
              </td>
              <td>{claim.repName}</td>
              <td>{claim.bountyType}</td>
              <td>{formatCurrency(claim.expectedAmount)}</td>
              <td>
                <ClaimStatusBadge status={claim.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
