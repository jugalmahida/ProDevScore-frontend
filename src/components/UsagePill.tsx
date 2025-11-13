// components/UsagePill.tsx
"use client";

import React from "react";
import { nf } from "@/utils/usage";

export function UsagePill({
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
  return (
    <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-200 backdrop-blur">
      <span className="whitespace-nowrap">
        Commits {nf.format(commitsUsed)}/{nf.format(commitsTotal)}
      </span>
      <span className="text-neutral-400">•</span>
      <span className="whitespace-nowrap">
        Repos {nf.format(reposUsed)}/{nf.format(reposTotal)}
      </span>
      <span className="text-neutral-400">•</span>
      <span className="whitespace-nowrap">
        Contrib {nf.format(contribUsed)}/{nf.format(contribTotal)}
      </span>
    </div>
  );
}
