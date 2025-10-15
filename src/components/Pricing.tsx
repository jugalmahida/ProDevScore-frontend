"use client"
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  IconEaseInOut,
} from "@tabler/icons-react";

export function Pricing() {
  const features = [
    {
      title: "Free",
      description:
        "This plan for the freelancer, students.",
      link: "",
      highlights: [
        "For Small Users",
        "Limited 2 Repository",
        "Limited 5 commits to review",
      ],
    },
    {
      title: "Pro (699 / Month)",
      description:
        "This plan for the companies whose looking for the employee's performance based on code and commits.",
      icon: <IconEaseInOut />,
      link: "",
      highlights: [
        "For Companies",
        "Unlimited repository",
        "Unlimited commits to review",
      ],
    },
    // {
    //   title: "Enterprise (899 / Month)",
    //   description:
    //     "Our prices are best in the market. No cap, no lock, no credit card required.",
    //   icon: <IconCurrencyDollar />,
    //   link: "",
    //   highlights: [
    //     "For Small User",
    //     "Only 3 Review",
    //     "Only top 5 commit review",
    //   ],
    // },
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
