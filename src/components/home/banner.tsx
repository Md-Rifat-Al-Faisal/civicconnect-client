"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/shared/theme-ui";

export function Banner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-background to-background pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(13,148,136,0.18),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <Badge
              variant="default"
              className="flex items-center gap-1.5 px-3.5 py-1 text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles className="size-3.5 text-accent" />
              <span>Grassroots Social Development Platform</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Empower Your Community.{" "}
            <span className="bg-gradient-to-r from-primary via-teal-500 to-accent bg-clip-text text-transparent">
              Drive Real Change.
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
          >
            Join dedicated volunteers and civic organizers across Mirpur,
            Mohammadpur, Dhanmondi, and communities throughout Bangladesh.
            Create, discover, and take part in local social development events—from
            winter blanket drives to urban reforestation.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <PrimaryButton
              href="/upcoming-events"
              className="px-6 py-3.5 text-sm gap-2"
            >
              <Calendar className="size-4" />
              <span>Explore Events</span>
              <ArrowRight className="size-4" />
            </PrimaryButton>

            <PrimaryButton
              href="/create-event"
              variant="outline"
              className="px-6 py-3.5 text-sm gap-2"
            >
              <PlusCircle className="size-4 text-primary" />
              <span>Create an Event</span>
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}