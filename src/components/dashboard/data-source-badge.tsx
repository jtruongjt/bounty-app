type DataSourceBadgeProps = {
  source: "supabase" | "mock";
};

export function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const label =
    source === "supabase" ? "Live Supabase data" : "Sample data until Supabase is connected";

  return <span className="data-source-badge">{label}</span>;
}
