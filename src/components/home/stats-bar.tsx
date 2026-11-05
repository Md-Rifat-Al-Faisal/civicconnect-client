"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import {
  Globe,
  Sprout,
  Users,
  CalendarCheck2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { PrimaryButton } from "@/components/shared/theme-ui";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const statsColumnOne: StatItem[] = [
  {
    value: 65,
    suffix: "K",
    title: "Lives Impacted",
    description: "Direct aid delivered to underserved families.",
    icon: Globe,
  },
  {
    value: 500,
    prefix: "$",
    suffix: "K",
    title: "Funds Raised",
    description: "Grassroots funding mobilized for verified drives.",
    icon: Sprout,
  },
];

const statsColumnTwo: StatItem[] = [
  {
    value: 10,
    suffix: "K",
    title: "Volunteers Engaged",
    description: "Dedicated citizens and youth taking local action.",
    icon: Users,
  },
  {
    value: 500,
    suffix: "+",
    title: "Events Completed",
    description: "Cleanups, food relief, and tree planting drives.",
    icon: CalendarCheck2,
  },
];

function StatCounter({
  target,
  prefix = "",
  suffix = "",
  inView,
  shouldReduceMotion,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
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
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, target, shouldReduceMotion]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({
  item,
  inView,
  shouldReduceMotion,
  delay = 0,
}: {
  item: StatItem;
  inView: boolean;
  shouldReduceMotion: boolean;
  delay?: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="flex min-h-[165px] sm:min-h-[175px] flex-col items-center justify-between rounded-xl border border-border/80 bg-white p-4 sm:p-5 text-center shadow-2xs transition-shadow duration-200 hover:shadow-sm dark:bg-card dark:border-border/60"
    >
      <div className="flex flex-col items-center">
        <div className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xs">
          <Icon className="size-4.5" />
        </div>
        <h3 className="mt-2 text-sm sm:text-base font-bold text-foreground">
          {item.title}
        </h3>
        <p className="mt-1 max-w-[200px] text-[11px] sm:text-xs leading-normal text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-foreground">
        <StatCounter
          target={item.value}
          prefix={item.prefix}
          suffix={item.suffix}
          inView={inView}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </motion.div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      ref={ref}
      aria-label="Our Impact"
      className="w-full border-y border-border/70 bg-[#dce5df] py-10 sm:py-12 lg:py-14 dark:bg-[#0c1f1c]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start lg:col-span-5"
          >
            <span className="text-xs font-bold tracking-wide text-primary">
              Our Impact
            </span>

            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
              Giving Hope to Those{" "}
              <span className="block sm:inline lg:block">in Need</span>
            </h2>

            <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Connecting volunteers across Bangladesh to deliver direct relief, care, and grassroots hope.
            </p>

            <div className="mt-5">
              <PrimaryButton
                href="/upcoming-events"
                className="px-5 py-2.5 shadow-soft"
              >
                <span>See More</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </PrimaryButton>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4.5">
              <div className="flex flex-col gap-4">
                {statsColumnOne.map((item, idx) => (
                  <StatCard
                    key={item.title}
                    item={item}
                    inView={inView}
                    shouldReduceMotion={shouldReduceMotion}
                    delay={idx * 0.08}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:pt-4">
                {statsColumnTwo.map((item, idx) => (
                  <StatCard
                    key={item.title}
                    item={item}
                    inView={inView}
                    shouldReduceMotion={shouldReduceMotion}
                    delay={0.12 + idx * 0.08}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
