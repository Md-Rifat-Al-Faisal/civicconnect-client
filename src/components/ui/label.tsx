import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentProps<"label"> {
  required?: boolean;
  optional?: boolean;
}

export function Label({
  className,
  required,
  optional,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {required && (
        <>
          <span aria-hidden="true" className="text-destructive font-bold ml-0.5">*</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
      {optional && (
        <span className="text-xs font-normal text-muted-foreground ml-1">(optional)</span>
      )}
    </label>
  );
}
