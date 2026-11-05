"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  optional = false,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  const describedBy = [
    hint ? `${htmlFor}-hint` : null,
    error ? `${htmlFor}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} required={required} optional={optional}>
        {label}
      </Label>
      <div data-form-control="">{children}</div>
      {hint && !error && (
        <p
          id={`${htmlFor}-hint`}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Info className="size-3.5 shrink-0" />
          <span>{hint}</span>
        </p>
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-xs font-medium text-destructive"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}