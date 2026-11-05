"use client";

import { motion, useReducedMotion } from "framer-motion";

const partners = [
  {
    name: "JAAGO",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-amber-500 fill-current">
        <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm0 4a10 10 0 1 1-10 10A10.011 10.011 0 0 1 16 6zm-1 3v6.586l4.707 4.707 1.414-1.414L17 14.414V9z" />
      </svg>
    ),
  },
  {
    name: "Bidyanondo",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-emerald-600 dark:text-emerald-400 fill-current">
        <path d="M4 6v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6zm14 2h8v8h-8zm-10 0h8v8H8zm0 10h8v8H8zm10 8v-8h8v8z" />
      </svg>
    ),
  },
  {
    name: "Volunteer BD",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-teal-600 dark:text-teal-400 fill-current">
        <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm6.2 8.7-6.9 8.3a1 1 0 0 1-1.5.1l-3.6-3.6a1 1 0 0 1 1.4-1.4l2.8 2.8 6.2-7.4a1 1 0 0 1 1.6 1.2z" />
      </svg>
    ),
  },
  {
    name: "Red Crescent",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-rose-600 dark:text-rose-400 fill-current">
        <path d="M17 3A13 13 0 0 0 4 16a13 13 0 0 0 13 13c1.7 0 3.3-.3 4.8-.9-6.3-2.1-10.8-8-10.8-15.1 0-7.1 4.5-13 10.8-15.1C20.3 3.3 18.7 3 17 3z" />
      </svg>
    ),
  },
  {
    name: "Footsteps",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-sky-600 dark:text-sky-400 fill-current">
        <path d="M16 2.5C11.5 8 7 13.5 7 18.5a9 9 0 0 0 18 0c0-5-4.5-10.5-9-16zm0 21.5a5 5 0 0 1-5-5c0-2.5 2.5-6 5-9.5 2.5 3.5 5 7 5 9.5a5 5 0 0 1-5 5z" />
      </svg>
    ),
  },
  {
    name: "Spreeha BD",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-emerald-500 fill-current">
        <path d="M16 3L4 9v6c0 7.7 5.1 14.9 12 17 6.9-2.1 12-9.3 12-17V9L16 3zm0 4.2l8 4v4.8c0 5.4-3.5 10.4-8 12-4.5-1.6-8-6.6-8-12V11.2l8-4z" />
      </svg>
    ),
  },
  {
    name: "Mastul",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-indigo-600 dark:text-indigo-400 fill-current">
        <path d="M16 4a12 12 0 1 0 12 12A12.013 12.013 0 0 0 16 4zm0 6a6 6 0 1 1-6 6 6.007 6.007 0 0 1 6-6zm0 14a8 8 0 0 1-6.8-3.8 6 6 0 0 1 13.6 0A8 8 0 0 1 16 24z" />
      </svg>
    ),
  },
  {
    name: "Odommo BD",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-orange-500 fill-current">
        <path d="M16 3l3.7 8.3 9 .8-6.8 6 2 8.9-7.9-4.7-7.9 4.7 2-8.9-6.8-6 9-.8z" />
      </svg>
    ),
  },
  {
    name: "BRAC Youth",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-pink-600 dark:text-pink-400 fill-current">
        <path d="M6 6h20v20H6zm3 3v14h14V9zm3 3h8v8h-8z" />
      </svg>
    ),
  },
  {
    name: "Prothom Alo",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-red-600 dark:text-red-400 fill-current">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 2v4m0 20v4m-14-14h4m20 0h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "ActionAid",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-purple-600 dark:text-purple-400 fill-current">
        <path d="M16 4l11 19H5L16 4zm0 6.5L9.5 20h13L16 10.5z" />
      </svg>
    ),
  },
  {
    name: "Shikho",
    logo: (
      <svg viewBox="0 0 32 32" className="size-7 sm:size-8 shrink-0 text-blue-600 dark:text-blue-400 fill-current">
        <path d="M16 4L3 10l13 6 11-5.1V21h2v-11L16 4zm-7 13.8V23c0 3.9 3.1 7 7 7s7-3.1 7-7v-5.2l-7 3.2-7-3.2z" />
      </svg>
    ),
  },
];

export function Partners() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full border-y border-border/70 bg-card/60 py-10 sm:py-12 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground/90 mb-8 sm:mb-10">
          Collaborating with 50+ grassroots organizations, student foundations & NGOs across Bangladesh
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-6 items-center justify-items-center">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.02 }}
              className="group flex items-center justify-center gap-2.5 sm:gap-3 cursor-default transition-transform duration-200 hover:scale-105"
            >
              <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                {partner.logo}
              </div>
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
