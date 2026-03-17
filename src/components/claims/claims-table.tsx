import { formatCurrency } from "@/lib/utils/currency";
import type { BountyClaim } from "@/types/bounty";

type ClaimsTableProps = {
  claims: BountyClaim[];
};

export function ClaimsTable({ claims }: ClaimsTableProps) {
  return (
    <section className="panel table-panel">
      <div className="table-panel__header">
        <div>
          <h2>All Claims</h2>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rep</th>
            <th>SFDC Opportunity</th>
            <th>Expected</th>
            <th>Quarter</th>
          </tr>
        </thead>
        <tbody>
          {claims.length > 0 ? (
            claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.repName}</td>
                <td>
                  {claim.opportunityName ? (
                    <a href={claim.opportunityName} target="_blank" rel="noreferrer">
                      Open link
                    </a>
                  ) : (
                    "Missing link"
                  )}
                </td>
                <td>{formatCurrency(claim.expectedAmount)}</td>
                <td>{claim.quarterLabel ?? "Unassigned"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="table-panel__empty">
                No claims yet. Add the first bounty on the right to start the quarter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
