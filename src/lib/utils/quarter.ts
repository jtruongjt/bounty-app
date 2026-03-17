export const quarterOptions = ["Q1 2027", "Q2 2027", "Q3 2027", "Q4 2027"];

export function getQuarterLabel(date: Date) {
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  const fiscalYear = date.getFullYear() + 1;
  return `Q${quarter} ${fiscalYear}`;
}
