import { createClaim } from "@/app/claims/actions";
import { ClaimForm } from "@/components/claims/claim-form";
import { ClaimsTable } from "@/components/claims/claims-table";
import { PageHeader } from "@/components/shared/page-header";
import { getClaimsPageData } from "@/lib/claims-data";

type ClaimsPageProps = {
  searchParams?: Promise<{ created?: string; error?: string }>;
};

export default async function ClaimsPage({ searchParams }: ClaimsPageProps) {
  const emptySearchParams: { created?: string; error?: string } = {};
  const [{ claims, reps }, resolvedSearchParams] =
    await Promise.all([
      getClaimsPageData(),
      searchParams ?? Promise.resolve(emptySearchParams),
    ]);

  const created = resolvedSearchParams.created === "1";
  const error = resolvedSearchParams.error;

  return (
    <>
      <PageHeader
        title="Bounty Claim"
      />

      {created ? (
        <section className="panel flash-banner flash-banner--success">
          Claim created and added to the live bounty tracker.
        </section>
      ) : null}

      {error ? (
        <section className="panel flash-banner flash-banner--error">{error}</section>
      ) : null}

      <div className="split-layout">
        <ClaimsTable claims={claims} />
        <ClaimForm reps={reps} action={createClaim} />
      </div>
    </>
  );
}
