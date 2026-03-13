import { KpiCard } from "@/components/dashboard/kpi-card";
import { LeaderboardTable } from "@/components/dashboard/leaderboard-table";
import { QuarterFilter } from "@/components/dashboard/quarter-filter";
import { PageHeader } from "@/components/shared/page-header";
import { dashboardLeaderboard, dashboardSummary } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quarterly Snapshot"
        title="Bounty scoreboard for the whole floor."
        description="Track expected payouts, active claims, and rep standings in one shared place before quarter-end reconciliation."
        actions={<QuarterFilter value="Q1 2026" />}
      />

      <section className="dashboard-grid">
        <div className="dashboard-grid__stats">
          <KpiCard
            label="Total Expected Bounty This Quarter"
            value={dashboardSummary.totalExpected}
          />
          <KpiCard
            label="Active Bounty Claims"
            value={dashboardSummary.activeClaims.toString()}
          />
        </div>

        <LeaderboardTable rows={dashboardLeaderboard} />
      </section>
    </>
  );
}
