# ProDevScore ⭐

<div align="center">
  
  **AI-Powered Developer Performance Analytics**
  
  Stop guessing who deserves that promotion. Get data-driven code quality scores from GitHub repositories.
  
  [![GitHub Stars](https://img.shields.io/github/stars/jugalmahida/prodevscore-frontend?style=social)](https://github.com/jugalmahida/prodevscore-frontend)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

  [Backend](https://github.com/jugalmahida/prodevscore-backend) • 
  [Demo](https://prodevscore.jugalmahida.com) • [Report Bug](https://github.com/jugalmahida/prodevscore-frontend/issues) • [Request Feature](https://github.com/jugalmahida/prodevscore-frontend/issues)
  
</div>

## 🚀 What is ProDevScore?

ProDevScore analyzes GitHub repositories and generates **objective performance scores (0-100)** for individual contributors based on:

- ✅ **Correctness** - Bug detection and issue identification
- 📖 **Readability** - Code clarity and documentation
- 🔒 **Security** - Vulnerability analysis and best practices
- 🛠️ **Maintainability** - Code structure and long-term sustainability
- 🎨 **Code Style** - Formatting consistency and conventions

Perfect for **engineering managers**, **tech leads**, and **HR teams** making data-driven decisions about promotions, bonuses, and performance reviews.

---

## ✨ Features

- 🤖 **AI-Powered Code Analysis** - Advanced ML models review code quality
- 📊 **Visual Dashboards** - Beautiful charts and metrics powered by Recharts
- 🎯 **Contributor Ranking** - Compare top 3, 5, or 15 contributors
- ⚡ **Real-time Processing** - Fast analysis with Next.js Server Actions
- 🌙 **Dark Mode** - Built with Tailwind CSS and shadcn/ui
- 🔐 **Secure Authentication** - Protected routes with middleware
- 🎨 **Modern UI Components** - Aceternity UI animations and effects

---

## 🛠️ Tech Stack

This project is built with modern web technologies:

| Category              | Technology                                                                        |
| --------------------- | --------------------------------------------------------------------------------- |
| **Framework**         | [Next.js 15](https://nextjs.org/) (App Router)                                    |
| **Language**          | [TypeScript](https://www.typescriptlang.org/)                                     |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)                                          |
| **UI Components**     | [shadcn/ui](https://ui.shadcn.com/) + [Aceternity UI](https://ui.aceternity.com/) |
| **State Management**  | React Hooks (useState, useEffect, useContext)                                     |
| **Server Actions**    | Next.js Server Actions                                                            |
| **Backend**           | NodeJS                                                                            |
| **Backend Framework** | Express                                                                           |
| **Backend API Type**  | REST API                                                                          |
| **Database**          | MongoDB                                                                           |
| **Deployment**        | [Vercel](https://vercel.com) (With Custom Domain)                                 |

---

## 📁 Project Structure

## 🎯 Key Features Breakdown

### Server Actions

Server Actions handle GitHub API calls and AI analysis securely on the server:

```typescript
// app/actions/analyze-repo.ts
"use server";

export async function analyzeRepository(repoUrl: string) {
  const commits = await fetchGitHubCommits(repoUrl);
  const scores = await analyzeCodeQuality(commits);
  return scores;
}
```

### Client-Side Hooks

Custom hooks manage state and data fetching:

```typescript
// hooks/use-contributor-scores.ts
export function useContributorScores(repoUrl: string) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hook logic...
  return { scores, loading };
}
```

### Middleware Protection

Protected routes require authentication:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Authentication and route protection logic
}
```

---

## 🎨 UI Components

This project uses a combination of:

- **shadcn/ui** - Headless, accessible components (Button, Card, Dialog, etc.)
- **Aceternity UI** - Beautiful animated components (BackgroundBeams, TextGenerateEffect, etc.)
- **Custom Components** - Built specifically for ProDevScore

Example usage:

```tsx
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

export default function Hero() {
  return (
    <div className="relative">
      <BackgroundBeams />
      <Button>Analyze Repository</Button>
    </div>
  );
}
```

---

## 📊 How It Works

1. **Input GitHub URL** - Paste any public repository URL
2. **Fetch Repository Data** - Server Actions retrieve commits and code
3. **AI Analysis** - OpenAI analyzes code quality across 5 dimensions
4. **Generate Scores** - Each contributor receives a 0-100 score
5. **Visualize Results** - Interactive charts display performance metrics

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Aceternity](https://ui.aceternity.com/) for beautiful animated components
- [Vercel](https://vercel.com) for hosting and deployment platform for frontend
- [Render](https://render.com) for hosting and deployment platform for backend
- The Next.js team for an incredible framework

---

## 📧 Contact

**Jugal Mahida** - [@jugalmahida07](https://twitter.com/jugalmahida07) - jugal.mahida.work@gmail.com

Project Link: [https://github.com/jugalmahida/prodevscore-frontend](https://github.com/jugalmahida/prodevscore-frontend)

---

## ⭐ Give a Star!

If you find **ProDevScore** helpful for evaluating developer performance or making better team decisions, please consider giving it a star! It helps the project grow and motivates continued development.

⭐ **[Star this repository](https://github.com/jugalmahida/prodevscore-frontend)** to show your support!

---
