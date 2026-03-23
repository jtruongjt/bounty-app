"use client";

import type { ReactNode } from "react";

type DeleteClaimFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  repId: string;
  claimId: string;
  children?: ReactNode;
};

export function DeleteClaimForm({
  action,
  repId,
  claimId,
  children = "Delete",
}: DeleteClaimFormProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Delete this claim? This cannot be undone from the UI.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="repId" value={repId} />
      <input type="hidden" name="claimId" value={claimId} />
      <button className="table-link table-link--danger" type="submit">
        {children}
      </button>
    </form>
  );
}
