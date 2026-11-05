"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "destructive";
}

export function PrimaryButton({
  className,
  variant = "primary",
  children,
  ...props
}: PrimaryButtonProps) {
  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-muted",
    outline:
      "border-2 border-border bg-transparent text-foreground hover:bg-muted",
    destructive:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedCard({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-sm border-2 border-border bg-card p-6 text-card-foreground shadow-none transition-all",
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
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        centered && "items-center text-center",
        className
      )}
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        <span className="text-blue-600 dark:text-blue-400">{title.split(" ")[0]}</span>{" "}
        {title.split(" ").slice(1).join(" ")}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
