import type { RepOption } from "@/types/rep";

type ClaimFormProps = {
  reps: RepOption[];
  action: (formData: FormData) => void | Promise<void>;
};

export function ClaimForm({ reps, action }: ClaimFormProps) {
  return (
    <section className="panel panel-section">
      <h2 className="panel-section__title">New Claim</h2>

      <form action={action} className="form-grid">
        <label className="form-field">
          <span>Rep</span>
          <select name="repId" required defaultValue="">
            <option value="" disabled>
              Select rep
            </option>
            {reps.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>SFDC Opportunity Link</span>
          <input name="opportunityName" />
        </label>

        <label className="form-field">
          <span>Close Date</span>
          <input name="closeDate" type="date" />
        </label>

        <div className="form-actions form-field--full">
          <button className="button-primary" type="submit">
            Add claim
          </button>
        </div>
      </form>
    </section>
  );
}
