export function ClaimForm() {
  return (
    <section className="panel panel-section">
      <h2 className="panel-section__title">New Claim</h2>
      <p className="panel-section__copy">
        This starter form shows the fields we expect to capture in the first pass.
      </p>

      <form className="form-grid">
        <label className="form-field">
          <span>Rep</span>
          <input placeholder="Sarah Chen" />
        </label>

        <label className="form-field">
          <span>Bounty Type</span>
          <select defaultValue="Expansion">
            <option>Expansion</option>
            <option>Multi-year</option>
            <option>New logo</option>
          </select>
        </label>

        <label className="form-field">
          <span>Account</span>
          <input placeholder="Acme Corp" />
        </label>

        <label className="form-field">
          <span>Expected Payout</span>
          <input placeholder="$2,500" />
        </label>

        <label className="form-field form-field--full">
          <span>Notes</span>
          <textarea
            rows={5}
            placeholder="Add proof details, CRM context, or approval notes."
          />
        </label>
      </form>
    </section>
  );
}
