// store/reviewStore.ts
import { create } from "zustand";
import { ReviewState } from "@/lib/types/review";

export const useReviewStore = create<ReviewState>((set) => ({
  // Initial States
  githubUrl: "",
  contributorsList: [],
  contributorLoading: false,
  searchTerm: "",
  selectedContributor: null,
  commitCount: 3,
  socket: null,
  socketId: "",
  isReviewing: false,
  reviewProgress: null,
  finalResults: null,

  // Setters
  setGithubUrl: (url) => set({ githubUrl: url }),
  setContributorsList: (list) => set({ contributorsList: list }),
  setContributorLoading: (loading) => set({ contributorLoading: loading }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedContributor: (contributor) =>
    set({ selectedContributor: contributor, finalResults: null }),
  setCommitCount: (count) => set({ commitCount: count }),
  setSocket: (socket) => set({ socket }),
  setSocketId: (id) => set({ socketId: id }),
  setIsReviewing: (reviewing) => set({ isReviewing: reviewing }),
  setReviewProgress: (progress) => set({ reviewProgress: progress }),
  setFinalResults: (results) => set({ finalResults: results }),

  // Actions
  resetReview: () =>
    set({
      isReviewing: false,
      reviewProgress: null,
      finalResults: null,
    }),

  resetAll: () =>
    set({
      githubUrl: "",
      contributorsList: [],
      contributorLoading: false,
      searchTerm: "",
      selectedContributor: null,
      commitCount: 3,
      isReviewing: false,
      reviewProgress: null,
      finalResults: null,
    }),
}));
