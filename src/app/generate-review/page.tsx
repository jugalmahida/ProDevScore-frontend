"use client";

import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { LoaderOne } from "@/components/ui/loader";
import { ContributorList } from "@/components/ContributorList";
import { ReviewConfig } from "@/components/ReviewConfig";
import { ReviewResults } from "@/components/ReviewResults";
import { useReviewCode } from "@/hooks/useReviewCode";
import { GITHUB_PLACEHOLDERS } from "@/utils/reviewUtils";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function GenerateReview() {
  const [githubUrl, setGithubUrl] = useState("");

  const {
    error,
    loading,
    contributors,
    getContributors,
    searchTerm,
    setSearchTerm,
    filteredContributors,
    selectedContributor,
    setSelectedContributor,
    finalResults,
    isReviewing,
    reviewProgress,
    socketId,
    startCodeReview,
    setFinalResults,
  } = useReviewCode();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = githubUrl.trim();
    setGithubUrl(url);
    await getContributors({ githubUrl: url });
  };

  return (
    <BackgroundLines className="h-full w-full">
      {/* Wide page container */}
      <div className="container mx-auto max-w-screen-xl px-4 py-5 sm:px-6">
        <h2 className="mb-3 sm:mb-5 text-xl sm:text-4xl font-bold text-neutral-900 dark:text-white text-center">
          Generate Review
        </h2>

        <p className="mb-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          This beta version & Hosted on render so push your patience limits.
        </p>

        {/* Medium-width input container */}
        <div className="mx-auto w-full max-w-screen-md">
          <PlaceholdersAndVanishInput
            placeholders={GITHUB_PLACEHOLDERS}
            onChange={(e) => setGithubUrl(e.target.value)}
            onSubmit={onSubmit}
          />
        </div>

        {error && (
          <p className="mt-5 text-center text-md text-red-600">{error}</p>
        )}

        {loading && (
          <div className="mt-3 flex justify-center">
            <LoaderOne />
          </div>
        )}

        {/* Contributors grid */}
        {contributors.length > 0 && !selectedContributor && (
          <div className="mt-6">
            <ContributorList
              contributors={filteredContributors}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelectedContributor={setSelectedContributor}
            />
          </div>
        )}

        {/* Single card state (centered) */}
        {selectedContributor && !finalResults && (
          <div className="mt-6">
            <ReviewConfig
              isReviewing={isReviewing}
              reviewProgress={reviewProgress || null}
              selectedContributor={selectedContributor}
              setSelectedContributor={setSelectedContributor}
              socketId={socketId}
              startCodeReview={startCodeReview}
              githubUrl={githubUrl}
            />
          </div>
        )}

        {/* Results (centered and wide) */}
        {finalResults && selectedContributor && (
          <div className="mt-6">
            <ReviewResults
              finalResults={finalResults}
              selectedContributor={selectedContributor}
              setFinalResults={setFinalResults}
              setSelectedContributor={setSelectedContributor}
            />
          </div>
        )}
      </div>
    </BackgroundLines>
  );
}
