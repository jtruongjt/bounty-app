import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

type ClaimDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Claim Detail"
        title={`Claim ${id}`}
        description="This detail page will hold the deal story: notes, proof, status changes, and reconciliation history."
      />
      <EmptyState
        title="Claim detail scaffolded"
        description="We have the route in place. Next we can wire this page to Neon and show the selected claim."
      />
    </>
  );
}
