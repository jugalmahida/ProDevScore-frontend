import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, GitCommit, User } from "lucide-react";
import { useReviewStore } from "@/store/reviewStore";
import { useCodeReview } from "@/hooks/useCodeReview";

export const ReviewConfig = () => {
  const {
    selectedContributor,
    commitCount,
    setCommitCount,
    isReviewing,
    reviewProgress,
    socketId,
    setSelectedContributor,
  } = useReviewStore();

  const { startCodeReview } = useCodeReview();

  if (!selectedContributor) return null;

  return (
    <div className="w-full mt-8 max-w-md bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-xl p-6 flex flex-col items-center text-white shadow-md">
      <img
        src={selectedContributor.avatar_url}
        alt={selectedContributor.login}
        className="w-24 h-24 rounded-full border-2 border-violet-500 mb-4"
      />
      <div className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <User className="w-6 h-6" />
        {selectedContributor.login}
      </div>

      <label className="mb-2 w-full text-sm font-medium text-gray-300">
        Select commits to review:
      </label>
      <select
        value={commitCount}
        onChange={(e) => setCommitCount(parseInt(e.target.value, 10))}
        className="mb-4 w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={isReviewing}
      >
        <option value={3}>Top 3 commits</option>
        <option value={5}>Top 5 commits</option>
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
                value={(reviewProgress.reviewed / reviewProgress.total) * 100}
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
        onClick={startCodeReview}
        disabled={isReviewing || !socketId}
        className="w-full bg-gradient-to-r from-indigo-500 to-violet-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isReviewing ? (
          <>
            <Clock className="w-4 h-4 mr-2 animate-spin" />
            Reviewing...
          </>
        ) : (
          <>
            <GitCommit className="w-4 h-4 mr-2" />
            Review Code
          </>
        )}
      </Button>

      <Button
        variant="ghost"
        className="mt-4 text-gray-400 hover:text-white"
        onClick={() => setSelectedContributor(null)}
        disabled={isReviewing}
      >
        Back to contributors
      </Button>
    </div>
  );
};
