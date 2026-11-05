"use client";

import { cn } from "@/lib/utils";

interface EventBadgeProps {
  category: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

interface CategoryStyle {
  container: string;
  dot: string;
}

export function getCategoryGlassStyle(category: string): CategoryStyle {
  const norm = (category || "").toLowerCase().trim();

  if (norm.includes("clean")) {
    return {
      container:
        "bg-teal-950/80 text-teal-200 border-teal-400/40 shadow-teal-950/50 hover:bg-teal-900/90",
      dot: "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)]",
    };
  }

  if (
    norm.includes("plant") ||
    norm.includes("tree") ||
    norm.includes("environ") ||
    norm.includes("green")
  ) {
    return {
      container:
        "bg-emerald-950/80 text-emerald-200 border-emerald-400/40 shadow-emerald-950/50 hover:bg-emerald-900/90",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]",
    };
  }

  if (norm.includes("food") || norm.includes("meal") || norm.includes("hunger")) {
    return {
      container:
        "bg-orange-950/80 text-orange-200 border-orange-400/40 shadow-orange-950/50 hover:bg-orange-900/90",
      dot: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.9)]",
    };
  }

  if (
    norm.includes("health") ||
    norm.includes("blood") ||
    norm.includes("camp") ||
    norm.includes("medic")
  ) {
    return {
      container:
        "bg-rose-950/80 text-rose-200 border-rose-400/40 shadow-rose-950/50 hover:bg-rose-900/90",
      dot: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)]",
    };
  }

  if (
    norm.includes("winter") ||
    norm.includes("relief") ||
    norm.includes("cloth") ||
    norm.includes("blanket") ||
    norm.includes("warm")
  ) {
    return {
      container:
        "bg-sky-950/80 text-sky-200 border-sky-400/40 shadow-sky-950/50 hover:bg-sky-900/90",
      dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]",
    };
  }

  if (norm.includes("donat")) {
    return {
      container:
        "bg-amber-950/80 text-amber-200 border-amber-400/40 shadow-amber-950/50 hover:bg-amber-900/90",
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]",
    };
  }

  if (
    norm.includes("educat") ||
    norm.includes("school") ||
    norm.includes("book") ||
    norm.includes("bag")
  ) {
    return {
      container:
        "bg-indigo-950/80 text-indigo-200 border-indigo-400/40 shadow-indigo-950/50 hover:bg-indigo-900/90",
      dot: "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]",
    };
  }

  if (norm.includes("charity")) {
    return {
      container:
        "bg-purple-950/80 text-purple-200 border-purple-400/40 shadow-purple-950/50 hover:bg-purple-900/90",
      dot: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]",
    };
  }

  return {
    container:
      "bg-slate-950/80 text-slate-200 border-slate-400/40 shadow-slate-950/50 hover:bg-slate-900/90",
    dot: "bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.9)]",
  };
}

export function EventBadge({
  category,
  className,
  size = "md",
}: EventBadgeProps) {
  const style = getCategoryGlassStyle(category);

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-xs font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md font-bold tracking-wide shadow-md transition-all duration-200 select-none",
        sizeClasses[size],
        style.container,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0 animate-pulse", style.dot)} />
      <span className="truncate">{category}</span>
    </span>
  );
}
