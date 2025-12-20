import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, GitCommit } from "lucide-react";
import { getScoreColor, getScoreLabel } from "@/utils/reviewUtils";
import { Contributor, FinalResults } from "@/lib/types/review";

interface ReviewResultsProps {
  finalResults: FinalResults;
  setFinalResults: (value: FinalResults | null) => void;
  setSelectedContributor: (value: Contributor | null) => void;
}

export const ReviewResults = ({
  finalResults,
  setFinalResults,
  setSelectedContributor,
}: ReviewResultsProps) => {
  return (
    <div className="w-full mt-8 max-w-6xl space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {finalResults.averageScore
                ? `${finalResults.averageScore}/100`
                : "N/A"}
            </div>
            <Badge
              className={`mt-2 ${getScoreColor(finalResults.averageScore)}`}
            >
              {getScoreLabel(finalResults.averageScore)}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
              <GitCommit className="w-4 h-4" />
              Commits Reviewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {finalResults.reviewResults.length}
            </div>
            <p className="text-sm text-gray-400 mt-2">Total commits analyzed</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Review Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Complete</div>
            <p className="text-sm text-gray-400 mt-2">
              Review finished successfully
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Commit Scores */}
      <Card className="bg-gray-900/90 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Individual Commit Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {finalResults.reviewResults.map((result, index) => (
              <div
                key={result.sha}
                className="flex flex-col gap-1 p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">#{index + 1}</span>
                    <code className="text-blue-400 text-sm font-mono">
                      {result.sha.substring(0, 8)}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {result.score ? `${result.score}/100` : "No Score"}
                    </span>
                    <Badge className={getScoreColor(result.score)}>
                      {getScoreLabel(result.score)}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-1">{result.review}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mb-10">
        <Button
          onClick={() => {
            setFinalResults(null);
            setSelectedContributor(null);
          }}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-800"
        >
          Review Another Contributor
        </Button>

        {/* <Button
          onClick={resetAll}
          className="bg-gradient-to-r from-indigo-500 to-violet-700"
        >
          Start New Review
        </Button> */}
      </div>
    </div>
  );
};
