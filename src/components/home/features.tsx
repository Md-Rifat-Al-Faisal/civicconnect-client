"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  MapPin,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create Event",
    desc: "Draft dates, venues, volunteer quotas, and instructions with future-date checks.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Discover Causes",
    desc: "Filter nearby cleanups, winter drives, and food distributions across Dhaka.",
    icon: MapPin,
  },
  {
    step: "03",
    title: "Join on Site",
    desc: "1-click RSVP with instant confirmation, meeting point info, and easy leave option.",
    icon: HeartHandshake,
  },
  {
    step: "04",
    title: "Track Impact",
    desc: "Maintain a verified log of organized and attended events on your volunteer profile.",
    icon: ShieldCheck,
  },
];

const capabilities = [
  {
    title: "Organize Events in Minutes",
    desc: "Set dates, venues, volunteer quotas, and instructions with guided forms and automated volunteer rosters.",
    icon: Calendar,
    tag: "Future Date Validated",
    accent: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Find Causes Near You",
    desc: "Explore verified social events mapped across Mirpur, Mohammadpur, Dhanmondi, and cities nationwide.",
    icon: MapPin,
    tag: "18+ Active Areas",
    accent: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25",
  },
  {
    title: "One-Click Volunteering",
    desc: "RSVP to community events with real-time status confirmation, duplicate blocking, and cancellation dialog.",
    icon: HeartHandshake,
    tag: "Instant Confirmation",
    accent: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/25",
  },
  {
    title: "Safe & Verified Sessions",
    desc: "Cryptographic JWT authentication and verified credentials protect both organizers and volunteers.",
    icon: ShieldCheck,
    tag: "JWT Protected",
    accent: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  },
];

export function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 shadow-soft backdrop-blur-xs">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary mb-2">
              <Sparkles className="size-3 text-accent" />
              <span>How CivicConnect Works</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              From Neighborhood Idea to Grassroots Action
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            A streamlined toolkit for citizens, student societies, and community organizers across Bangladesh.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-background/80 p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wider text-primary">
                      {item.step}
                    </span>
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </div>
                  </div>
                  <h3 className="mt-2.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-border/70">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                className="flex flex-col justify-between rounded-xl border border-border/60 bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`flex size-6 items-center justify-center rounded-md border ${cap.accent}`}>
                      <Icon className="size-3" />
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {cap.tag}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-foreground">
                    {cap.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
