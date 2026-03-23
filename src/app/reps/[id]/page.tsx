import Link from "next/link";
import { deleteClaim, updateClaimLink } from "@/app/reps/actions";
import { DeleteClaimForm } from "@/components/reps/delete-claim-form";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { getRepClaimsPageData } from "@/lib/claims-data";
import { formatCurrency } from "@/lib/utils/currency";

type RepClaimsPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ edit?: string; updated?: string; deleted?: string; error?: string }>;
};

export default async function RepClaimsPage({
  params,
  searchParams,
}: RepClaimsPageProps) {
  const { id } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const { repName, claims } = await getRepClaimsPageData(id);
  const editingClaimId = resolvedSearchParams.edit;
  const updated = resolvedSearchParams.updated === "1";
  const deleted = resolvedSearchParams.deleted === "1";
  const error = resolvedSearchParams.error;

  return (
    <>
      <PageHeader title={repName ? `${repName} Claims` : "Rep Claims"} />

      {updated ? (
        <section className="panel flash-banner flash-banner--success">
          Claim link updated.
        </section>
      ) : null}

      {deleted ? (
        <section className="panel flash-banner flash-banner--success">
          Claim deleted.
        </section>
      ) : null}

      {error ? (
        <section className="panel flash-banner flash-banner--error">{error}</section>
      ) : null}

      {claims.length > 0 ? (
        <section className="panel table-panel">
          <div className="table-panel__header">
            <div>
              <h2>Submitted Claims</h2>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>SFDC Opportunity</th>
                <th>Expected</th>
                <th>Quarter</th>
                <th>Close Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
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
                  <td>{claim.closeDate ?? "No date"}</td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/reps/${id}?edit=${claim.id}`} className="table-link">
                        Edit
                      </Link>
                      <DeleteClaimForm action={deleteClaim} repId={id} claimId={claim.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <EmptyState
          title="No submitted claims yet"
          description="This rep does not have any bounty claims in the tracker yet."
        />
      )}

      {editingClaimId ? (
        <section className="panel panel-section">
          <h2 className="panel-section__title">Edit Claim Link</h2>
          <form action={updateClaimLink} className="form-grid">
            <input type="hidden" name="repId" value={id} />
            <input type="hidden" name="claimId" value={editingClaimId} />

            <label className="form-field form-field--full">
              <span>SFDC Opportunity Link</span>
              <input
                name="opportunityLink"
                defaultValue={
                  claims.find((claim) => claim.id === editingClaimId)?.opportunityName ?? ""
                }
              />
            </label>

            <div className="form-actions form-field--full">
              <button className="button-primary" type="submit">
                Save link
              </button>
              <Link href={`/reps/${id}`} className="button-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </section>
      ) : null}

      <Link href="/" className="back-link">
        Back to Dashboard
      </Link>
    </>
  );
}
