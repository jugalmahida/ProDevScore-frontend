// utils/usage.ts
export const safePct = (used: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;

export const nf = new Intl.NumberFormat(undefined); // locale-aware formatting
export const pf = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 0,
});

export type UsageSource = {
  reposUsed: number;
  reposTotal: number;
  contribUsed: number;
  contribTotal: number;
  commitsUsed: number;
  commitsTotal: number;
};
