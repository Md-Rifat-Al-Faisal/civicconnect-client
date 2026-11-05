"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "outline" | "destructive";
  href?: string;
  children?: React.ReactNode;
}

export function PrimaryButton({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: PrimaryButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    primary:
      "bg-primary hover:bg-[#1e4238] dark:hover:bg-[#275246] text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md transition-all duration-200",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/60 shadow-xs",
    outline:
      "border-2 border-border bg-card/70 backdrop-blur-xs text-foreground hover:bg-muted/80 hover:border-primary/50 shadow-xs",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        )}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={classes}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
    </motion.button>
  );
}

export interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

export function AnimatedCard({
  className,
  glass = false,
  children,
  ...props
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border border-border/80 p-6 text-card-foreground shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md",
        glass ? "bg-card/75 backdrop-blur-md" : "bg-card",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  const words = title.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5",
        centered && "items-center text-center",
        className
      )}
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        <span className="bg-gradient-to-r from-primary via-[#366f5f] to-accent bg-clip-text text-transparent">
          {firstWord}
        </span>{" "}
        {rest}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 56 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "h-1 rounded-full bg-gradient-to-r from-primary to-accent",
          centered && "mx-auto"
        )}
      />
      {subtitle && (
        <p className="mt-1 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
