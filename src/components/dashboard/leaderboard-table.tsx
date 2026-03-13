import type { LeaderboardRow } from "@/types/rep";

type LeaderboardTableProps = {
  rows: LeaderboardRow[];
};

export function LeaderboardTable({ rows }: LeaderboardTableProps) {
  return (
    <section className="panel table-panel">
      <div className="table-panel__header">
        <div>
          <h2>Leaderboard by Rep</h2>
          <p>Ranked by expected bounty for the selected quarter.</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Rep Name</th>
            <th>Expected Bounty</th>
            <th>Active Claims</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.repId}>
              <td>{row.rank}</td>
              <td>{row.repName}</td>
              <td>{row.expectedBounty}</td>
              <td>{row.activeClaims}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
