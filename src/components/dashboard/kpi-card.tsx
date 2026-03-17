type KpiCardProps = {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "accent";
};

export function KpiCard({
  label,
  value,
  detail,
  tone = "default",
}: KpiCardProps) {
  return (
    <article className={`panel kpi-card${tone === "accent" ? " kpi-card--accent" : ""}`}>
      <p className="kpi-card__label">{label}</p>
      <p className="kpi-card__value">{value}</p>
      {detail ? <p className="kpi-card__detail">{detail}</p> : null}
    </article>
  );
}
