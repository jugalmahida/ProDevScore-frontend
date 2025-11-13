// components/UsageDropdownCard.tsx
"use client";

import React from "react";
import { nf, safePct } from "@/utils/usage";

function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-800">
      <div
        className="h-1.5 rounded bg-neutral-800 dark:bg-white"
        style={{ width: `${pct}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        role="progressbar"
      />
    </div>
  );
}

export function UsageDropdownCard({
  commitsUsed,
  commitsTotal,
  reposUsed,
  reposTotal,
  contribUsed,
  contribTotal,
}: {
  commitsUsed: number;
  commitsTotal: number;
  reposUsed: number;
  reposTotal: number;
  contribUsed: number;
  contribTotal: number;
}) {
  const commitsPct = safePct(commitsUsed, commitsTotal);
  const reposPct = safePct(reposUsed, reposTotal);
  const contribPct = safePct(contribUsed, contribTotal);

  return (
    <div className="px-4 pb-2 pt-3 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-200">
      <div className="mb-2 flex items-center justify-between">
        <span>Commits</span>
        <span className="tabular-nums">
          {nf.format(commitsUsed)}/{nf.format(commitsTotal)} ({commitsPct}%)
        </span>
      </div>
      <Bar pct={commitsPct} />

      <div className="mt-3 mb-2 flex items-center justify-between">
        <span>Repositories</span>
        <span className="tabular-nums">
          {nf.format(reposUsed)}/{nf.format(reposTotal)} ({reposPct}%)
        </span>
      </div>
      <Bar pct={reposPct} />

      <div className="mt-3 mb-2 flex items-center justify-between">
        <span>Contributors</span>
        <span className="tabular-nums">
          {nf.format(contribUsed)}/{nf.format(contribTotal)} ({contribPct}%)
        </span>
      </div>
      <Bar pct={contribPct} />
    </div>
  );
}
