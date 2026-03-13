type QuarterFilterProps = {
  value: string;
};

export function QuarterFilter({ value }: QuarterFilterProps) {
  return (
    <select className="quarter-filter" defaultValue={value} aria-label="Select quarter">
      <option>Q1 2026</option>
      <option>Q4 2025</option>
      <option>Q3 2025</option>
    </select>
  );
}
