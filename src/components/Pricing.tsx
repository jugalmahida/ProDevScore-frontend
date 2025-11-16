"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconCurrencyDollar, IconEaseInOut } from "@tabler/icons-react";

export function Pricing() {
  const features = [
    {
      title: "Free",
      description: "This plan for the freelancer, students.",
      link: "",
      highlights: [
        "For Small Users",
        "Limited 1 Repository",
        "Limited 2 contributors",
        "Limited 3 commits per contributor",
        "Total 6 commits",
      ],
    },
    {
      title: "Pro (399 / Month)",
      description: "This plan for the startup companies.",
      icon: <IconEaseInOut />,
      link: "",
      highlights: [
        "For The Startup Companies",
        "10 Repository",
        "10 Contributors",
        "Max 5 commits per contributor",
        "Total 50 commits",
      ],
    },
    {
      title: "Enterprise (799 / Month)",
      description: "This plan for the big tech companies.",
      icon: <IconCurrencyDollar />,
      link: "",
      highlights: [
        "For Big tech companies",
        "50 Repository",
        "50 Contributors",
        "Max 15 commits per contributor",
        "Total 750 commits",
      ],
    },
  ];
  return (
    <div id="pricing">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Pricing
      </h2>
      <HoverEffect items={features} />
    </div>
  );
}
