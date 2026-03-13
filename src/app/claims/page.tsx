import { ClaimForm } from "@/components/claims/claim-form";
import { ClaimsTable } from "@/components/claims/claims-table";
import { PageHeader } from "@/components/shared/page-header";
import { claims } from "@/lib/mock-data";

export default function ClaimsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Claims"
        title="Track every bounty-eligible deal."
        description="This page is the operating table for reps and managers to log deals, inspect status, and keep proof organized."
      />

      <div className="split-layout">
        <ClaimsTable claims={claims} />
        <ClaimForm />
      </div>
    </>
  );
}
