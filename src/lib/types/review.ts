import { Socket } from "socket.io-client";

export interface ReviewStartedData {
  total: number;
  message: string;
}

export interface ReviewErrorData {
  reviewed: number;
  total: number;
  commit: string;
  error: string;
}

export interface ReviewProgress {
  reviewed: number;
  total: number;
  currentCommit?: {
    sha: string;
    message: string;
  };
  result: {
    sha: string;
    review: string;
    score: number | null;
  };
  percentage: number;
}

export interface ReviewResult {
  sha: string;
  review: string;
  score: number | null;
}

export interface FinalResults {
  success: boolean;
  reviewResults: ReviewResult[];
  averageScore: number | null;
  totalReviewed: number;
  validScoresCount: number;
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
  site_admin: boolean;
}

export interface ReviewState {
  // GitHub URL
  githubUrl: string;
  setGithubUrl: (url: string) => void;

  // Contributors
  contributorsList: Contributor[];
  setContributorsList: (list: Contributor[]) => void;
  contributorLoading: boolean;
  setContributorLoading: (loading: boolean) => void;

  // Search & Selection
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedContributor: Contributor | null;
  setSelectedContributor: (contributor: Contributor | null) => void;

  // Commit Count
  commitCount: number;
  setCommitCount: (count: number) => void;

  // Socket
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  socketId: string;
  setSocketId: (id: string) => void;

  // Review State
  isReviewing: boolean;
  setIsReviewing: (reviewing: boolean) => void;
  reviewProgress: ReviewProgress | null;
  setReviewProgress: (progress: ReviewProgress | null) => void;
  finalResults: FinalResults | null;
  setFinalResults: (results: FinalResults | null) => void;

  // Actions
  resetReview: () => void;
  resetAll: () => void;
}
