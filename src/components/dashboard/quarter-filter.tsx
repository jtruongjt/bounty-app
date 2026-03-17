"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { quarterOptions } from "@/lib/utils/quarter";

type QuarterFilterProps = {
  value: string;
};

export function QuarterFilter({ value }: QuarterFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(nextQuarter: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("quarter", nextQuarter);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="quarter-filter"
      value={value}
      aria-label="Select quarter"
      onChange={(event) => handleChange(event.target.value)}
    >
      {quarterOptions.map((quarter) => (
        <option key={quarter} value={quarter}>
          {quarter}
        </option>
      ))}
    </select>
  );
}
