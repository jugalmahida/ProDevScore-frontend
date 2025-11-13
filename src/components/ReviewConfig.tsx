import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, GitCommit, User } from "lucide-react";
import Image from "next/image";
import { Contributor, ReviewProgress } from "@/lib/types/review";
import { StartReviewPayload } from "@/lib/types/auth";
import { useAuth } from "@/hooks/useAuth";

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

  // PLAN LIMIT: free=3, pro=5, enterprise=10
  const planLimit =
    user?.subscriptionsDetails?.currentPlan?.limits?.commitsPerContributor ?? 3;

  // Allowed options up to the plan limit (3 → [3], 5 → [3,5], 10 → [3,5,10])
  const allowedOptions = useMemo(() => {
    const opts = [3];
    if (planLimit >= 5) opts.push(5);
    if (planLimit >= 10) opts.push(10);
    return opts;
  }, [planLimit]);

  const [commitCount, setCommitCount] = useState<number | undefined>(
    allowedOptions[0]
  );

  // Clamp selection if plan changes
  useEffect(() => {
    if (!allowedOptions.includes(commitCount ?? -1)) {
      setCommitCount(allowedOptions[0]);
    }
  }, [allowedOptions, commitCount]);

  if (!selectedContributor) return null;

  return (
    <div className="w-full mt-8 max-w-md mx-auto bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-xl p-6 flex flex-col items-center text-white shadow-md">
      <Image
        width={128}
        height={128}
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
        {/* If you prefer to show blocked choices, keep these and add disabled */}
        {/* <option value={10} disabled={planLimit < 10}>Top 10 commits</option> */}
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
        onClick={() =>
          startCodeReview({
            githubUrl,
            login: selectedContributor.login,
            socketId,
            topCommits: commitCount || 3,
          })
        }
        disabled={isReviewing || !socketId}
        className="w-full bg-gradient-to-r from-indigo-500 to-violet-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isReviewing ? (
          <>
            <Clock className="w-4 h-4 mr-2 animate-spin" />
            <div className="text-white"> Reviewing... </div>
          </>
        ) : (
          <>
            <GitCommit className="w-4 h-4 mr-2" />
            <div className="text-white"> Review Code </div>
          </>
        )}
      </Button>

      <Button
        variant="ghost"
        className="mt-4 text-gray-400 hover:text-white"
        onClick={() => setSelectedContributor(null)}
        disabled={isReviewing}
      >
        ⬅️ Back to contributors
      </Button>
    </div>
  );
};
