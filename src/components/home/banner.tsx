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
import { SafeImage } from "@/components/shared/safe-image";

export function Banner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-background to-background py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,rgba(13,148,136,0.18),transparent)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-4 flex justify-center order-2 lg:order-1"
          >
            <div className="size-56 sm:size-64 lg:size-72 shrink-0 overflow-hidden rounded-sm border-2 border-border shadow-none bg-muted">
              <SafeImage
                src="/hero-image.jpg"
                alt="Child supported by community volunteer programs"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col items-start order-1 lg:order-2">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Badge
                variant="default"
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold shadow-xs"
              >
                <Sparkles className="size-3.5 text-accent" />
                <span>Grassroots Social Development Platform</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight"
            >
              Empower Your Community.{" "}
              <span className="bg-gradient-to-r from-primary via-[#366f5f] to-accent bg-clip-text text-transparent block sm:inline">
                Drive Real Change.
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed"
            >
              Join dedicated volunteers and civic organizers across Bangladesh. Create, discover, and take part in local social development events—from winter blanket drives to urban reforestation.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <PrimaryButton
                href="/upcoming-events"
                className="px-5 py-2.5 text-sm gap-2 shadow-soft"
              >
                <Calendar className="size-4" />
                <span>Explore Events</span>
                <ArrowRight className="size-4" />
              </PrimaryButton>

              <PrimaryButton
                href="/create-event"
                variant="outline"
                className="px-5 py-2.5 text-sm gap-2"
              >
                <PlusCircle className="size-4 text-primary" />
                <span>Create an Event</span>
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
