"use client";
import React from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { LoaderOne } from "@/components/ui/loader";
import { ContributorList } from "@/components/ContributorList";
import { ReviewConfig } from "@/components/ReviewConfig";
import { ReviewResults } from "@/components/ReviewResults";
import { useReviewStore } from "@/store/reviewStore";
import { useSocket } from "@/hooks/useSocket";
import { useContributors } from "@/hooks/useContributors";
import { GITHUB_PLACEHOLDERS } from "@/utils/reviewUtils";

export default function GenerateReview() {
  const {
    githubUrl,
    setGithubUrl,
    contributorsList,
    contributorLoading,
    selectedContributor,
    finalResults,
  } = useReviewStore();

  const { fetchContributors, filteredContributors } = useContributors();

  // Initialize Socket.IO connection
  useSocket();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGithubUrl(githubUrl.trim());
    fetchContributors();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center pt-8 px-4">
      <h2 className="mb-3 sm:mb-5 text-xl text-center sm:text-4xl font-bold text-white drop-shadow-lg">
        Generate Review
      </h2>
      <div className="mb-5">This beta version, Push your patience limits.</div>

      <PlaceholdersAndVanishInput
        placeholders={GITHUB_PLACEHOLDERS}
        onChange={(e) => setGithubUrl(e.target.value)}
        onSubmit={onSubmit}
      />

      {contributorLoading && (
        <div className="mt-3">
          <LoaderOne />
        </div>
      )}

      {contributorsList.length > 0 && !selectedContributor && (
        <ContributorList contributors={filteredContributors} />
      )}

      {selectedContributor && !finalResults && <ReviewConfig />}

      {finalResults && selectedContributor && <ReviewResults />}
    </div>
  );
}
