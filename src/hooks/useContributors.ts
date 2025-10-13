import { useMemo } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { apiService } from "@/services/apiService";

export const useContributors = () => {
  const {
    githubUrl,
    contributorsList,
    searchTerm,
    setContributorsList,
    setContributorLoading,
    setSelectedContributor,
    setSearchTerm,
    setFinalResults,
  } = useReviewStore();

  const fetchContributors = async () => {
    if (!githubUrl.trim()) {
      alert("Please enter a GitHub URL");
      return;
    }

    setContributorLoading(true);
    setFinalResults(null);

    try {
      const data = await apiService.getContributors({ githubUrl });

      if (data.count > 0) {
        setContributorsList(data.data);
        setSelectedContributor(null);
        setSearchTerm("");
      }
    } catch (error) {
      alert(
        "Failed to fetch contributors. Please check the URL and try again."
      );
    } finally {
      setContributorLoading(false);
    }
  };

  const filteredContributors = useMemo(() => {
    if (!searchTerm.trim()) return contributorsList;
    return contributorsList.filter((contributor) =>
      contributor.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contributorsList]);

  return {
    fetchContributors,
    filteredContributors,
  };
};
