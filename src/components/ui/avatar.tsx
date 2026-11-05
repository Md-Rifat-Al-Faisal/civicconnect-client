import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  src,
  alt = "",
  ...props
}: React.ComponentProps<"img">) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-emerald-600 font-medium text-white",
        className
      )}
      {...props}
    />
  );
}
