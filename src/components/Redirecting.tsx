// components/redirecting.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface RedirectingProps {
  message?: string;
  submessage?: string;
}

export function Redirecting({
  message = "Success!",
  submessage = "Redirecting you to dashboard...",
}: RedirectingProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-6">
        {/* Success checkmark animation */}
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400 animate-in zoom-in duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{message}</h3>
          <p className="text-sm text-muted-foreground">
            {submessage}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        </div>

        {/* Spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      </div>
    </div>
  );
}
