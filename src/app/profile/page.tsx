"use client";

import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useAuth } from "@/hooks/useAuth";
import { LoaderOne } from "@/components/ui/loader";

// tiny helper
const pct = (used: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;

function ProfileComponent() {
  const { user, loading } = useAuth();

  // data extraction (note: subscriptionDetails key)
  const details = user?.personalDetails;
  const subs = user?.subscriptionsDetails;
  const limits = subs?.currentPlan?.limits;
  const usage = subs?.currentUsage;

  const commitsUsed = usage?.totalCommits ?? 0;
  const commitsTotal = limits?.totalCommitReviews ?? 0;

  const reposUsed = Array.isArray(usage?.usedRepositories)
    ? usage!.usedRepositories.length
    : usage?.totalRepositories ?? 0;
  const reposTotal = limits?.repositories ?? 0;

  const contribUsed = Array.isArray(usage?.usedContributors)
    ? usage!.usedContributors.length
    : usage?.totalContributors ?? 0;
  const contribTotal = limits?.contributors ?? 0;

  const planName = subs?.currentPlan?.name ?? "—";
  const planTier = subs?.currentPlan?.tier ?? "—";
  const priceMonthly = subs?.currentPlan?.price?.monthly ?? 0;
  const currency = subs?.currentPlan?.price?.currency ?? "INR";

  const commitPct = useMemo(
    () => pct(commitsUsed, commitsTotal),
    [commitsUsed, commitsTotal]
  );
  const repoPct = useMemo(
    () => pct(reposUsed, reposTotal),
    [reposUsed, reposTotal]
  );
  const contribPct = useMemo(
    () => pct(contribUsed, contribTotal),
    [contribUsed, contribTotal]
  );

  const resetLabel = subs?.renewalDate
    ? new Date(subs.renewalDate).toLocaleDateString()
    : "—";

  return (
    <BackgroundLines className="flex items-center justify-center w-full min-h-[100dvh] flex-col px-3 sm:px-4">
      <div className="relative z-20 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-6xl font-sans font-bold tracking-tight">
            Profile
          </h1>
          <p className="mt-2 md:mt-3 text-neutral-700 dark:text-neutral-400 text-sm md:text-base">
            Manage your account, plan, and usage in one place.
          </p>
        </div>

        {/* Top grid: Identity + Plan */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Identity card */}
          <div className="md:col-span-2 rounded-xl border p-4 md:p-5 shadow-sm md:shadow bg-white/90 dark:bg-neutral-900/80 md:bg-neutral-50 md:dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs md:text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Account
                </div>
                <div className="mt-1 md:mt-2 text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white">
                  {loading ? "Loading..." : details?.fullName ?? "—"}
                </div>
                <div className="mt-1 text-neutral-700 dark:text-neutral-300 break-all text-sm md:text-base">
                  {details?.email ?? "—"}
                </div>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-[11px] md:text-xs text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-neutral-900/60">
                    Role: {details?.role ?? "—"}
                  </span>
                  <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-[11px] md:text-xs text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-neutral-900/60">
                    {details?.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-white dark:text-black font-semibold">
                {details?.fullName
                  ?.trim()
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U"}
              </div>
            </div>
          </div>

          {/* Plan card */}
          <div className="rounded-xl border p-4 md:p-5 shadow-sm md:shadow bg-white/90 dark:bg-neutral-900/80 md:bg-neutral-50 md:dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
            <div className="text-xs md:text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Current Plan
            </div>
            <div className="mt-1 md:mt-2 text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
              {planName}
            </div>
            <div className="mt-0.5 md:mt-1 text-neutral-700 dark:text-neutral-300 capitalize text-sm md:text-base">
              Tier: {planTier}
            </div>
            <div className="mt-2 md:mt-3 inline-flex items-center gap-2">
              <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-neutral-300 dark:border-neutral-700 text-[11px] md:text-xs text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-neutral-900/60">
                {currency} {priceMonthly}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Usage section */}
        <div className="mt-5 md:mt-6 rounded-xl border p-4 md:p-5 shadow-sm md:shadow bg-white/90 dark:bg-neutral-900/80 md:bg-neutral-50 md:dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs md:text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Usage
            </div>
            <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              Resets on {resetLabel}
            </div>
          </div>

          <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Commits */}
            <div>
              <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                <span>Commits</span>
                <span className="tabular-nums">
                  {commitsUsed}/{commitsTotal}
                </span>
              </div>
              <div className="mt-2 h-1.5 md:h-2 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-1.5 md:h-2 rounded bg-neutral-800 dark:bg-white"
                  style={{ width: `${commitPct}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={commitPct}
                />
              </div>
            </div>

            {/* Repositories */}
            <div>
              <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                <span>Repositories</span>
                <span className="tabular-nums">
                  {reposUsed}/{reposTotal}
                </span>
              </div>
              <div className="mt-2 h-1.5 md:h-2 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-1.5 md:h-2 rounded bg-neutral-800 dark:bg-white"
                  style={{ width: `${repoPct}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={repoPct}
                />
              </div>
            </div>

            {/* Contributors */}
            <div>
              <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
                <span>Contributors</span>
                <span className="tabular-nums">
                  {contribUsed}/{contribTotal}
                </span>
              </div>
              <div className="mt-2 h-1.5 md:h-2 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-1.5 md:h-2 rounded bg-neutral-800 dark:bg-white"
                  style={{ width: `${contribPct}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={contribPct}
                />
              </div>
            </div>
          </div>

          {/* Used lists */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 md:p-4">
              <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Used Repositories
              </div>
              {Array.isArray(usage?.usedRepositories) &&
              usage!.usedRepositories.length > 0 ? (
                <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                  {usage!.usedRepositories.map((r) => (
                    <li key={r} className="truncate">
                      {r}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  No repositories used yet.
                </div>
              )}
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 md:p-4">
              <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Used Contributors
              </div>
              {Array.isArray(usage?.usedContributors) &&
              usage!.usedContributors.length > 0 ? (
                <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                  {usage!.usedContributors.map((c) => (
                    <li key={c} className="truncate">
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  No contributors used yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 md:mt-6 flex flex-wrap gap-2 md:gap-3">
          <Link href="/generate-review">
            <HoverBorderGradient
              containerClassName="rounded-full cursor-pointer"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2 text-sm md:text-base"
            >
              <span>Start Reviewing Code</span>
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </BackgroundLines>
  );
}

export default function Profile() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderOne />
        </div>
      }
    >
      <ProfileComponent />
    </Suspense>
  );
}
