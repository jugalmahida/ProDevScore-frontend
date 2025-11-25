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

// Updated Contributor type to match API response
export interface ContributorProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface ContributorData {
  profile: ContributorProfile;
  repository: {
    name: string;
    owner: string;
    full_name: string;
  };
  contributions: {
    total_commits: number;
    total_contributions: number;
    first_commit_date: string;
    last_commit_date: string;
    recent_commits_30_days: number;
  };
  statistics: {
    lines_added: number;
    lines_deleted: number;
    total_changes: number;
  };
  topCommit: {
    sha: string;
    message: string;
    date: string;
    additions: number;
    deletions: number;
    total_changes: number;
    files_changed: number;
  } | null;
  recentCommits: Array<{
    sha: string;
    message: string;
    date: string;
    url: string;
  }>;
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
