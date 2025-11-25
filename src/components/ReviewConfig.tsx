import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  Code,
  FileText,
  GitCommit,
  TrendingUp,
  User,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { Contributor, ReviewProgress } from "@/lib/types/review";
import { StartReviewPayload } from "@/lib/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { useReviewCode } from "@/hooks/useReviewCode";

interface ReviewConfigProps {
  selectedContributor: Contributor;
  isReviewing: boolean;
  setSelectedContributor: (value: Contributor | null) => void;
  socketId: string;
  reviewProgress: ReviewProgress | null;
  startCodeReview: (payload: StartReviewPayload) => void;
  githubUrl: string;
}

export const ReviewConfig = ({
  selectedContributor,
  isReviewing,
  setSelectedContributor,
  reviewProgress,
  socketId,
  startCodeReview,
  githubUrl,
}: ReviewConfigProps) => {
  const { user } = useAuth();
  const { getContributorData, contributor } = useReviewCode();

  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch detailed contributor data when selected
  useEffect(() => {
    if (selectedContributor?.login && githubUrl) {
      setLoadingDetails(true);
      getContributorData({
        login: selectedContributor.login,
        githubUrl,
      }).finally(() => setLoadingDetails(false));
    }
  }, [selectedContributor?.login, githubUrl]);

  const planLimit =
    user?.subscriptionsDetails?.currentPlan?.limits?.commitsPerContributor ?? 3;

  const allowedOptions = useMemo(() => {
    const opts = [3];
    if (planLimit >= 5) opts.push(5);
    if (planLimit >= 10) opts.push(10);
    return opts;
  }, [planLimit]);

  const [commitCount, setCommitCount] = useState<number | undefined>(
    allowedOptions[0]
  );

  useEffect(() => {
    if (!allowedOptions.includes(commitCount ?? -1)) {
      setCommitCount(allowedOptions[0]);
    }
  }, [allowedOptions, commitCount]);

  if (!selectedContributor) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full mt-8 max-w-4xl mx-auto">
      {/* Main Card */}
      <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-white shadow-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            width={128}
            height={128}
            src={selectedContributor.avatar_url}
            alt={selectedContributor.login}
            className="w-24 h-24 rounded-full border-2 border-violet-500 mb-4"
          />

          <div className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            {contributor?.profile?.name || selectedContributor.login}
          </div>
          <div className="text-gray-400">@{selectedContributor.login}</div>

          {contributor?.profile?.bio && (
            <p className="text-sm text-gray-300 mt-2 max-w-md leading-relaxed">
              {contributor.profile.bio}
            </p>
          )}

          {/* Profile Details */}
          {contributor?.profile && (
            <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm text-gray-400">
              {contributor.profile.company && (
                <span>🏢 {contributor.profile.company}</span>
              )}
              {contributor.profile.location && (
                <span>📍 {contributor.profile.location}</span>
              )}
              <span>📦 {contributor.profile.public_repos} repos</span>
              <span>👥 {contributor.profile.followers} followers</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        {loadingDetails ? (
          <div className="w-full text-center py-8">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-violet-500" />
            <p className="text-gray-400">Loading contributor details...</p>
          </div>
        ) : contributor ? (
          <>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <GitCommit className="w-5 h-5 mx-auto mb-2 text-violet-400" />
                <div className="text-2xl font-bold text-white">
                  {contributor.contributions.total_commits}
                </div>
                <div className="text-xs text-gray-400">Total Commits</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-green-400">
                  +{formatNumber(contributor.statistics.lines_added)}
                </div>
                <div className="text-xs text-gray-400">Lines Added</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <Code className="w-5 h-5 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-red-400">
                  -{formatNumber(contributor.statistics.lines_deleted)}
                </div>
                <div className="text-xs text-gray-400">Lines Deleted</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <FileText className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">
                  {formatNumber(contributor.statistics.total_changes)}
                </div>
                <div className="text-xs text-gray-400">Total Changes</div>
              </div>
            </div>

            {/* Top Commit Highlight */}
            {contributor?.topCommit && (
              <div className="w-full bg-gradient-to-r from-violet-900/30 to-indigo-900/30 border border-violet-700/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-violet-300">
                    Top Commit
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2 leading-relaxed line-clamp-2">
                  {contributor.topCommit.message}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(contributor.topCommit.date)}
                  </span>
                  <span className="text-green-400">
                    +{formatNumber(contributor.topCommit.additions)}
                  </span>
                  <span className="text-red-400">
                    -{formatNumber(contributor.topCommit.deletions)}
                  </span>
                  <span>{contributor.topCommit.files_changed} files</span>
                </div>
              </div>
            )}

            {/* Recent Commits Section - Moved here */}
            {contributor?.recentCommits &&
              contributor.recentCommits.length > 0 && (
                <div className="w-full mb-6">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <GitCommit className="w-4 h-4" />
                    Recent Commits
                  </h3>
                  <div className="space-y-2">
                    {contributor.recentCommits.map((commit) => (
                      <a
                        key={commit.sha}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-200 leading-relaxed line-clamp-2 flex-1">
                            {commit.message}
                          </p>
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-violet-400 flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <span className="font-mono">
                            {commit.sha.substring(0, 7)}
                          </span>
                          <span>{formatDate(commit.date)}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            {/* Contribution Timeline */}
            {contributor?.contributions && (
              <div className="w-full bg-gray-800/30 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">First Commit:</span>
                    <span className="ml-2 text-white font-medium">
                      {formatDate(contributor.contributions.first_commit_date)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Commit:</span>
                    <span className="ml-2 text-white font-medium">
                      {formatDate(contributor.contributions.last_commit_date)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}

        {/* Review Configuration */}
        <div className="w-full max-w-md mx-auto">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Select commits to review:
          </label>
          <select
            value={commitCount ?? allowedOptions[0]}
            onChange={(e) => setCommitCount(parseInt(e.target.value, 10))}
            className="mb-4 w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isReviewing}
          >
            {allowedOptions.map((n) => (
              <option key={n} value={n}>
                {`Top ${n} commits`}
              </option>
            ))}
          </select>

          {isReviewing && (
            <div className="w-full mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
                <span className="text-sm text-yellow-400">
                  Reviewing commits...
                </span>
              </div>

              {reviewProgress && (
                <>
                  <Progress
                    value={
                      (reviewProgress.reviewed / reviewProgress.total) * 100
                    }
                    className="w-full mb-2"
                  />
                  <div className="text-center text-sm text-gray-300">
                    {reviewProgress.reviewed} of {reviewProgress.total} commits
                    reviewed
                  </div>
                </>
              )}
            </div>
          )}

          <Button
            onClick={() =>
              startCodeReview({
                githubUrl,
                login: selectedContributor.login,
                socketId,
                topCommits: commitCount || 3,
              })
            }
            disabled={isReviewing || !socketId || loadingDetails}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isReviewing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                <div className="text-white">Reviewing...</div>
              </>
            ) : (
              <>
                <GitCommit className="w-4 h-4 mr-2" />
                <div className="text-white">Review Code</div>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            className="mt-4 w-full text-gray-400 hover:text-white"
            onClick={() => setSelectedContributor(null)}
            disabled={isReviewing}
          >
            ⬅️ Back to contributors
          </Button>
        </div>
      </div>
    </div>
  );
};
