"use client";

import Link from "next/link";
import { Home, Compass, FileQuestion } from "lucide-react";
import { PrimaryButton } from "@/components/shared/theme-ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-soft">
        <FileQuestion className="size-10" />
      </div>

      <h1 className="font-mono text-7xl font-black tracking-tighter text-foreground sm:text-9xl">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        The community event or page you are looking for does not exist, has been removed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <PrimaryButton className="gap-2 px-6">
            <Home className="size-4" />
            <span>Return Home</span>
          </PrimaryButton>
        </Link>
        <Link href="/upcoming-events">
          <PrimaryButton variant="outline" className="gap-2 px-6">
            <Compass className="size-4" />
            <span>Explore Events</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}