"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function GithubCallback() {
  const searchParams = useSearchParams();
  const { loginWithGithubCallback, githubCallbackStatus, error, goToLogin } =
    useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    loginWithGithubCallback({ code: code ?? "", state: state ?? "" });
  }, [searchParams]);

  if (githubCallbackStatus === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-xl">Authentication Failed</div>
          <p className="text-muted-foreground">{error}</p>
          <button onClick={goToLogin} className="text-primary underline">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Completing GitHub login...</p>
      </div>
    </div>
  );
}
