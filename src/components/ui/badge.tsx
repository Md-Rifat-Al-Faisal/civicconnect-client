import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-card/95 text-foreground border border-border shadow-xs backdrop-blur-md font-bold",
    secondary: "bg-secondary text-secondary-foreground border border-border font-semibold",
    outline: "border border-border bg-card text-foreground font-semibold",
    success: "bg-primary text-primary-foreground shadow-xs font-bold",
    warning: "bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30 font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}