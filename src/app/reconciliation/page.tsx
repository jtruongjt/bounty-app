import { PageHeader } from "@/components/shared/page-header";
import { reconciliationRows } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils/currency";

export default function ReconciliationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reconciliation"
        title="Compare expected bounty to actual payout."
        description="Quarter-end review lives here so you can validate RevOps payouts against your internal tracking."
      />

      <section className="panel table-panel">
        <div className="table-panel__header">
          <div>
            <h2>Quarter-End Variance</h2>
            <p>Flag differences before the quarter is finalized.</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Rep</th>
              <th>Account</th>
              <th>Expected</th>
              <th>Actual</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {reconciliationRows.map((row) => (
              <tr key={`${row.rep}-${row.account}`}>
                <td>{row.rep}</td>
                <td>{row.account}</td>
                <td>{formatCurrency(row.expectedAmount)}</td>
                <td>{formatCurrency(row.actualAmount)}</td>
                <td>{formatCurrency(row.actualAmount - row.expectedAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
