"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getQuarterPayout } from "@/lib/bounty-rules";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getQuarterLabel } from "@/lib/utils/quarter";
import type { ClaimStatus } from "@/types/bounty";

const DEFAULT_STATUS: ClaimStatus = "Identified";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createClaim(formData: FormData) {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    redirect("/claims?error=Supabase+is+not+configured");
  }

  const repId = getString(formData, "repId");
  const opportunityName = getString(formData, "opportunityName");
  const closeDate = getString(formData, "closeDate");
  const status = DEFAULT_STATUS;

  if (!repId) {
    redirect("/claims?error=Rep+is+required");
  }

  const accountName = opportunityName || "Pending claim";

  const quarterLabel = closeDate
    ? getQuarterLabel(new Date(`${closeDate}T12:00:00`))
    : getQuarterLabel(new Date());

  const { count, error: countError } = await supabase
    .from("bounty_claims")
    .select("id", { count: "exact", head: true })
    .eq("rep_id", repId)
    .eq("quarter_label", quarterLabel);

  if (countError) {
    redirect(`/claims?error=${encodeURIComponent(countError.message)}`);
  }

  const claimNumber = (count ?? 0) + 1;
  const expectedAmount = getQuarterPayout(quarterLabel, claimNumber);

  const { error } = await supabase.from("bounty_claims").insert({
    rep_id: repId,
    account_name: accountName,
    opportunity_name: opportunityName || null,
    status,
    expected_amount: expectedAmount,
    close_date: closeDate || null,
    quarter_label: quarterLabel,
  });

  if (error) {
    redirect(`/claims?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/claims");
  redirect("/claims?created=1");
}
