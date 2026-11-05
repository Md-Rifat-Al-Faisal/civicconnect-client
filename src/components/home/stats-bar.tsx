"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import {
  CalendarCheck2,
  Users,
  MapPin,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
  color: string;
}

const statsData: StatItem[] = [
  {
    value: 120,
    suffix: "+",
    label: "Events Completed",
    sublabel: "Social development drives",
    icon: CalendarCheck2,
    color: "bg-primary/10 text-primary border border-primary/20",
  },
  {
    value: 5400,
    suffix: "+",
    label: "Volunteers Joined",
    sublabel: "Engaged citizens & students",
    icon: Users,
    color: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25",
  },
  {
    value: 18,
    suffix: "",
    label: "Areas Covered",
    sublabel: "Dhaka & nationwide cities",
    icon: MapPin,
    color: "bg-secondary text-secondary-foreground border border-border",
  },
  {
    value: 25000,
    suffix: "+",
    label: "Lives Touched",
    sublabel: "Blankets, meals, trees, blood",
    icon: HeartHandshake,
    color: "bg-primary/15 text-primary border border-primary/25",
  },
];

function StatCounter({
  target,
  suffix,
  inView,
  shouldReduceMotion,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  shouldReduceMotion: boolean;
}) {
  const [count, setCount] = useState(shouldReduceMotion ? target : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    if (inView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, target, shouldReduceMotion]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      ref={ref}
      aria-label="Community Statistics"
      className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 sm:-mt-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-border/80 bg-card/85 p-6 shadow-lift backdrop-blur-md sm:p-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center transition-transform hover:-translate-y-1 sm:items-start sm:text-left"
              >
                <div
                  className={`mb-3 flex size-12 items-center justify-center rounded-xl ${stat.color} shadow-xs transition-transform group-hover:scale-110`}
                >
                  <Icon className="size-6" />
                </div>
                <div className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  <StatCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 border-t border-border/60 pt-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Community milestones across our network
          </p>
        </div>
      </div>
    </section>
  );
}