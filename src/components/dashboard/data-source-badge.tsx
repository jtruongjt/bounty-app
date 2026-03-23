type DataSourceBadgeProps = {
  source: "neon" | "mock";
};

export function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const label =
    source === "neon" ? "Live Neon data" : "Sample data until Neon is connected";

  return <span className="data-source-badge">{label}</span>;
}
