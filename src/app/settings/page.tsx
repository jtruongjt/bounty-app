import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Define bounty types and payout assumptions."
        description="Keep the first version lightweight: a small set of bounty types with clear descriptions and default payout amounts."
      />
      <EmptyState
        title="Settings are ready for rules"
        description="Next we can add bounty program records, default payout amounts, and an admin editing flow."
      />
    </>
  );
}
