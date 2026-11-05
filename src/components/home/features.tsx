"use client";

import { SectionHeading, AnimatedCard } from "@/components/shared/theme-ui";
import { Megaphone, HeartHandshake, LineChart } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Megaphone,
      title: "Organize Initiatives",
      description:
        "Launch winter clothing distributions, flood relief centers, or canal cleanups in minutes. Set venues, dates, and volunteer quotas with straightforward tools.",
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    },
    {
      icon: HeartHandshake,
      title: "Volunteer Locally",
      description:
        "Find social development projects taking place right in your community. Join upcoming events with a single click and team up with passionate neighbors.",
      color: "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300",
    },
    {
      icon: LineChart,
      title: "Track Community Impact",
      description:
        "Review your volunteer journey, manage the events you host, and follow the real difference your collective time and dedication make across the country.",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Why GatherGood Matters"
        subtitle="Empowering communities with transparent, reliable tools for civic action and grassroots social service"
        centered
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <AnimatedCard key={index} className="flex flex-col justify-between">
              <div>
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Community Verified
                </span>
              </div>
            </AnimatedCard>
          );
        })}
      </div>
    </section>
  );
}
