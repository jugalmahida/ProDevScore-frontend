import { useReviewStore } from "@/store/reviewStore";
import { apiService } from "@/services/apiService";

export const useCodeReview = () => {
  const {
    githubUrl,
    selectedContributor,
    commitCount,
    socketId,
    setIsReviewing,
    setReviewProgress,
    setFinalResults,
  } = useReviewStore();

  const startCodeReview = async () => {
    if (!selectedContributor || !socketId || !githubUrl) {
      alert(
        "Please wait for socket connection or select a contributor or enter the GitHub URL"
      );
      return;
    }

    setIsReviewing(true);
    setReviewProgress(null);
    setFinalResults(null);

    try {
      await apiService.startReview({
        githubUrl,
        login: selectedContributor.login,
        topCommits: commitCount,
        socketId,
      });
    } catch (error: any) {
      alert(error.message);
      setIsReviewing(false);
    }
  };

  return {
    startCodeReview,
  };
};
