"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getNeonSql } from "@/lib/neon/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateClaimLink(formData: FormData) {
  const sql = getNeonSql();

  if (!sql) {
    redirect("/claims?error=Database+is+not+configured");
  }

  const repId = getString(formData, "repId");
  const claimId = getString(formData, "claimId");
  const opportunityLink = getString(formData, "opportunityLink");

  if (!repId || !claimId) {
    redirect("/claims?error=Missing+claim+information");
  }

  try {
    await sql`
      update bounty_claims
      set
        opportunity_name = ${opportunityLink || null},
        account_name = ${opportunityLink || "Pending claim"}
      where id = ${claimId}
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update claim";
    redirect(`/reps/${repId}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/claims");
  revalidatePath(`/reps/${repId}`);
  redirect(`/reps/${repId}?updated=1`);
}

export async function deleteClaim(formData: FormData) {
  const sql = getNeonSql();

  if (!sql) {
    redirect("/claims?error=Database+is+not+configured");
  }

  const repId = getString(formData, "repId");
  const claimId = getString(formData, "claimId");

  if (!repId || !claimId) {
    redirect("/claims?error=Missing+claim+information");
  }

  try {
    await sql`
      delete from bounty_claims
      where id = ${claimId}
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete claim";
    redirect(`/reps/${repId}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/claims");
  revalidatePath(`/reps/${repId}`);
  redirect(`/reps/${repId}?deleted=1`);
}
