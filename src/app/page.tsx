import { KpiCard } from "@/components/dashboard/kpi-card";
import { LeaderboardTable } from "@/components/dashboard/leaderboard-table";
import { QuarterFilter } from "@/components/dashboard/quarter-filter";
import { PageHeader } from "@/components/shared/page-header";
import { getDashboardData } from "@/lib/dashboard-data";
import { getQuarterLabel, quarterOptions } from "@/lib/utils/quarter";

type DashboardPageProps = {
  searchParams?: Promise<{ quarter?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const defaultQuarter = getQuarterLabel(new Date());
  const selectedQuarter =
    resolvedSearchParams.quarter && quarterOptions.includes(resolvedSearchParams.quarter)
      ? resolvedSearchParams.quarter
      : defaultQuarter;
  const { summary, leaderboard } = await getDashboardData(selectedQuarter);

  return (
    <>
      <PageHeader
        title=""
        actions={<QuarterFilter value={selectedQuarter} />}
      />

      <section className="dashboard-grid">
        <div className="dashboard-grid__stats">
          <KpiCard
            label="Total Expected Bounty This Quarter"
            value={summary.totalExpected}
            tone="accent"
          />
          <KpiCard
            label="Total Bounty Claims"
            value={summary.activeClaims.toString()}
          />
        </div>

        <LeaderboardTable rows={leaderboard} />
      </section>
    </>
  );
}
