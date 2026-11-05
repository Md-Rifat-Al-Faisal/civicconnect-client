"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Loader2, AlertTriangle, HelpCircle } from "lucide-react";
import { PrimaryButton } from "@/components/shared/theme-ui";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "danger" | "default";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
  variant = "default",
}: ConfirmDialogProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      const cancelBtn = dialogRef.current?.querySelector<HTMLElement>(
        "[data-confirm-cancel]"
      );
      cancelBtn?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!loading) {
          e.preventDefault();
          onClose();
        }
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElementRef.current?.focus();
    };
  }, [isOpen, loading, onClose]);

  const titleId = "confirm-dialog-title";
  const descId = "confirm-dialog-desc";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !loading) {
              onClose();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <motion.div
            ref={dialogRef}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 8 }
            }
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl",
                    variant === "danger"
                      ? "bg-destructive/15 text-destructive border border-destructive/25"
                      : "bg-primary/10 text-primary border border-primary/20"
                  )}
                >
                  {variant === "danger" ? (
                    <AlertTriangle className="size-5" />
                  ) : (
                    <HelpCircle className="size-5" />
                  )}
                </div>
                <div>
                  <h3
                    id={titleId}
                    className="text-lg font-bold tracking-tight text-foreground"
                  >
                    {title}
                  </h3>
                  <p
                    id={descId}
                    className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-words"
                  >
                    {message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!loading) onClose();
                }}
                disabled={loading}
                aria-label="Close dialog"
                className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2 border-t border-border/80">
              <PrimaryButton
                data-confirm-cancel=""
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => {
                  if (!loading) onClose();
                }}
                className="px-4 py-2 text-sm font-semibold"
              >
                {cancelText}
              </PrimaryButton>

              <PrimaryButton
                type="button"
                variant={variant === "danger" ? "destructive" : "primary"}
                disabled={loading}
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{confirmText}</span>
                )}
              </PrimaryButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}