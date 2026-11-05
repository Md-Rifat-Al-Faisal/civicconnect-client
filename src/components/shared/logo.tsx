"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeDimensions = {
    sm: { mark: 26, text: "text-lg" },
    md: { mark: 34, text: "text-xl" },
    lg: { mark: 48, text: "text-3xl" },
  };

  const current = sizeDimensions[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative shrink-0 flex items-center justify-center drop-shadow-xs"
      >
        <svg
          width={current.mark}
          height={current.mark}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="civicLogoGradient" x1="6" y1="2" x2="42" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="65%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
            <linearGradient id="innerGlow" x1="16" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <path
            d="M24 2C13.5 2 5 10.5 5 21C5 33 21 44.5 23.1 45.9C23.6 46.2 24.4 46.2 24.9 45.9C27 44.5 43 33 43 21C43 10.5 34.5 2 24 2Z"
            fill="url(#civicLogoGradient)"
          />

          <circle cx="18.5" cy="15.5" r="3.5" fill="url(#innerGlow)" />
          <circle cx="29.5" cy="15.5" r="3.5" fill="url(#innerGlow)" />

          <path
            d="M12.5 26.5C12.5 22.8 15.5 21 18.5 21C21 21 23 22.2 24 24C25 22.2 27 21 29.5 21C32.5 21 35.5 22.8 35.5 26.5"
            stroke="url(#innerGlow)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M21.5 24.5C22.5 25.8 24 26.5 24 26.5C24 26.5 25.5 25.8 26.5 24.5"
            stroke="var(--accent)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {showText && (
        <span className={cn("font-black tracking-tight leading-none", current.text)}>
          <span className="text-foreground">Civic</span>
          <span className="bg-gradient-to-r from-primary via-teal-500 to-accent bg-clip-text text-transparent">
            Connect
          </span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="CivicConnect Home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}
