"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getQuarterPayout } from "@/lib/bounty-rules";
import { getNeonSql } from "@/lib/neon/server";
import { getQuarterLabel } from "@/lib/utils/quarter";
import type { ClaimStatus } from "@/types/bounty";

const DEFAULT_STATUS: ClaimStatus = "Identified";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createClaim(formData: FormData) {
  const sql = getNeonSql();

  if (!sql) {
    redirect("/claims?error=Database+is+not+configured");
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

  try {
    const countRows = (await sql`
      select count(*)::int as count
      from bounty_claims
      where rep_id = ${repId}
        and quarter_label = ${quarterLabel}
    `) as { count: number }[];

    const claimNumber = (countRows[0]?.count ?? 0) + 1;
    const expectedAmount = getQuarterPayout(quarterLabel, claimNumber);

    await sql`
      insert into bounty_claims (
        rep_id,
        account_name,
        opportunity_name,
        status,
        expected_amount,
        close_date,
        quarter_label
      ) values (
        ${repId},
        ${accountName},
        ${opportunityName || null},
        ${status},
        ${expectedAmount},
        ${closeDate || null},
        ${quarterLabel}
      )
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create claim";
    redirect(`/claims?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/claims");
  redirect("/claims?created=1");
}
