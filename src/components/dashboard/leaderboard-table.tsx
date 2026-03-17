import Link from "next/link";
import type { LeaderboardRow } from "@/types/rep";
import { formatCurrency } from "@/lib/utils/currency";

type LeaderboardTableProps = {
  rows: LeaderboardRow[];
};

export function LeaderboardTable({ rows }: LeaderboardTableProps) {
  const topAmount = rows[0]?.expectedBounty ?? 1;

  return (
    <section className="panel table-panel">
      <div className="table-panel__header">
        <div>
          <h2>Leaderboard</h2>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Rep Name</th>
            <th>Expected Bounty</th>
            <th>Claims</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.repId}>
                <td>
                  <span className={`rank-pill rank-pill--${row.rank}`}>
                    #{row.rank}
                  </span>
                </td>
                <td>
                  <div className="leaderboard-rep">
                    <strong>
                      <Link href={`/reps/${row.repId}`}>{row.repName}</Link>
                    </strong>
                  </div>
                </td>
                <td>
                  <div className="leaderboard-amount">
                    <strong>{formatCurrency(row.expectedBounty)}</strong>
                    <div className="leaderboard-bar">
                      <span
                        style={{
                          width: `${Math.max(
                            18,
                            Math.round((row.expectedBounty / topAmount) * 100),
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td>{row.activeClaims}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="table-panel__empty">
                No bounty claims for this quarter yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
