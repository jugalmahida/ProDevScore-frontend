export type User = {
  personalDetails: UserDetails;
  subscriptionsDetails: Subscription;
};

type UserDetails = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: number;
};

type Subscription = {
  id: string; // or ObjectIdString
  currentUsage: CurrentUsage;
  currentPlan: CurrentPlan;
  startDate: string; // ISO 8601 e.g. "2025-11-05T05:25:32.240Z"
  endDate: string; // ISO 8601
  renewalDate: string; // ISO 8601
};

type CurrentUsage = {
  totalRepositories: number;
  totalCommits: number;
  totalContributors: number;
  usedContributors: string[];
  usedRepositories: string[];
};

type CurrentPlan = {
  name: string;
  tier: "free" | "pro" | "enterprise";
  price: PlanPrice;
  limits: PlanLimits;
};

type PlanPrice = {
  monthly: number;
  yearly: number;
  currency: string;
};

type PlanLimits = {
  repositories: number;
  contributors: number;
  commitsPerContributor: number;
  totalCommitReviews: number;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type Github = {
  url: string;
  state: string;
};

export type GithubCallBack = {
  code: string;
  state: string;
};


export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      maxAge: number;
      path: "/";
    }
  ) => void;
  get: (key: string) => { value: string } | undefined;
  delete: (key: string) => void;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyCodePayload {
  email: string;
  code: number;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface VerifyTokenAndSetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface StartReviewPayload {
  githubUrl: string;
  login: string;
  topCommits: number;
  socketId: string;
}

export interface GetContributorsPayload {
  githubUrl: string;
}
