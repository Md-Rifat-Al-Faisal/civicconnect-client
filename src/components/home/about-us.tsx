"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/shared/theme-ui";
import { SafeImage } from "@/components/shared/safe-image";

const whatWeDoList = [
  { left: "Community Support", right: "Environmental Drives" },
  { left: "Hunger Relief", right: "Emergency Aid" },
  { left: "Education & Mentorship", right: "Health & Blood Camps" },
];

const volunteerAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
];

export function AboutUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card/95 via-card/85 to-primary/5 p-6 sm:p-10 lg:p-12 shadow-soft backdrop-blur-xs">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            About Us
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            Driven by Compassion,{" "}
            <span className="block text-foreground">Powered by People</span>
          </h2>

          <div className="mt-5">
            <PrimaryButton href="/upcoming-events" className="gap-2 px-5 py-2.5">
              <span>Learn More</span>
              <ArrowRight className="size-4" />
            </PrimaryButton>
          </div>

          <div className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            <p>
              CivicConnect was founded on a simple belief: lasting community development begins with compassionate citizens taking direct grassroots action. Whether it is distributing warm blankets across Mohammadpur, organizing clean-up drives around Dhanmondi Lake, or planting saplings at Ramna Park, we unite passionate volunteers with meaningful local causes.
            </p>
            <p>
              We equip community leaders, student societies, and volunteer groups with transparent tools to organize impactful events, verify participant attendance, and build stronger, more resilient neighborhoods across all 64 districts of Bangladesh.
            </p>
          </div>

          <div className="mt-8 w-full border-t border-border/70 pt-6">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              What We Do
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {whatWeDoList.map((row) => (
                <div key={row.left} className="contents">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                    <CheckCircle2 className="size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{row.left}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                    <CheckCircle2 className="size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{row.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-4/3 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-soft">
            <SafeImage
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop"
              alt="Volunteers joining hands in unity"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="absolute top-4 left-4 sm:top-6 sm:-left-6 z-20 rounded-xl border border-border/80 bg-card/95 p-3.5 shadow-lift backdrop-blur-md max-w-[260px] sm:max-w-[270px]"
          >
            <div className="flex items-center -space-x-2">
              {volunteerAvatars.map((url, i) => (
                <img
                  key={url}
                  src={url}
                  alt={`Volunteer ${i + 1}`}
                  loading="eager"
                  className="size-8 rounded-full border-2 border-card object-cover shadow-xs"
                />
              ))}
            </div>

            <p className="mt-2.5 text-xs font-bold text-foreground leading-snug">
              <span className="text-primary font-black">10,000 Volunteers</span>, One Mission:
            </p>
            <p className="text-[11px] font-medium text-muted-foreground mt-0.5">
              Changing Lives Together!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
}
