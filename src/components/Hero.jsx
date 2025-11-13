"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const { user } = useAuth();

  // Conditional link based on authentication state
  const targetHref = user
    ? "/generate-review"
    : "/login?redirect=/generate-review";

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        AI-Powered Code Review, <br /> Instant Contributor Scoring.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Paste GitHub URL, pick a contributor, get AI-powered code quality scores
        out of 100. Instant insights into their coding performance based on
        Correctness, Readability, Security, Maintainability.
      </p>

      <Link href={targetHref}>
        <HoverBorderGradient
          containerClassName="rounded-full mt-5 cursor-pointer"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>{user ? "Get Started" : "Try for free"}</span>
        </HoverBorderGradient>
      </Link>
    </BackgroundLines>
  );
}
