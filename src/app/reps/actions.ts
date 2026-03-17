"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateClaimLink(formData: FormData) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    redirect("/claims?error=Supabase+is+not+configured");
  }

  const repId = getString(formData, "repId");
  const claimId = getString(formData, "claimId");
  const opportunityLink = getString(formData, "opportunityLink");

  if (!repId || !claimId) {
    redirect("/claims?error=Missing+claim+information");
  }

  const { error } = await supabase
    .from("bounty_claims")
    .update({
      opportunity_name: opportunityLink || null,
      account_name: opportunityLink || "Pending claim",
    })
    .eq("id", claimId);

  if (error) {
    redirect(`/reps/${repId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/claims");
  revalidatePath(`/reps/${repId}`);
  redirect(`/reps/${repId}?updated=1`);
}
