"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  PlusCircle,
  Calendar,
  Users,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Banner() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-emerald-500/10 via-background to-background py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.500/15),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <Badge
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-medium"
            >
              <Sparkles className="size-3.5" />
              <span>Grassroots Social Development Platform</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Empower Your Community.{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              Drive Real Change.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
          >
            Join dedicated volunteers and civic organizers across Mirpur,
            Mohammadpur, Dhanmondi, and communities throughout Bangladesh.
            Create, discover, and take part in local social service initiatives—from
            winter blanket drives to urban reforestation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-600"
            >
              <Calendar className="size-4" />
              <span>Explore Events</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <PlusCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Create an Event</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <HeartHandshake className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">150+ Drives</p>
              <p className="text-xs text-muted-foreground">
                Winter clothes, warm blankets, and meal programs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12,500+ Helpers</p>
              <p className="text-xs text-muted-foreground">
                Active students, youth clubs, and citizens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              <MapPin className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">64 Districts</p>
              <p className="text-xs text-muted-foreground">
                Bridging local compassion nationwide
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
