import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variantStyles = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-border bg-transparent text-foreground hover:bg-muted",
    secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
    link: "text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
    icon: "size-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
