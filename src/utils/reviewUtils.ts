export const getScoreColor = (score: number | null): string => {
  if (!score) return "bg-gray-500";
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

export const getScoreLabel = (score: number | null): string => {
  if (!score) return "No Score";
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Improvement";
};

export const GITHUB_PLACEHOLDERS = [
  "https://github.com/hiteshchoudhary/apihub",
  "https://github.com/hiteshchoudhary/nextjs-imagekit-challenge",
  "https://github.com/n8n-io/n8n",
  "https://github.com/hiteshchoudhary/chai-backend",
];
