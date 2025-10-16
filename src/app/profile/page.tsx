import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export default function Profile() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full min-h-screen flex-col px-4">
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center justify-center mb-6">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
            Coming Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-6xl lg:text-7xl font-sans py-4 font-bold tracking-tight">
          Your Profile Page
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl">
            Is On Its Way
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-700 dark:text-neutral-400 mt-6 mb-8 leading-relaxed">
          We're building an amazing profile experience where you'll be able to
          view your code review history.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 mt-10">
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Review History
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Track all your past code reviews and scores
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Analytics
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Insights into coding patterns and trends
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Settings
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Customize your profile and preferences
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/generate-review">
          <HoverBorderGradient
            containerClassName="rounded-full cursor-pointer"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Start Reviewing Code</span>
          </HoverBorderGradient>
        </Link>

        {/* Additional Info */}
        <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-8">
          Want updates? We'll notify you when your profile page goes live.
        </p>
      </div>
    </BackgroundLines>
  );
}
