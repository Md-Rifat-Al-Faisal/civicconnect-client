"use client";

import Link from "next/link";
import {
  HeartHandshake,
  MapPin,
  Mail,
  Phone,
  Send,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm dark:bg-emerald-500 dark:text-slate-950">
                <HeartHandshake className="size-5" />
              </div>
              <span>GatherGood</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              A community-driven civic action platform connecting volunteers, student
              societies, and local organizers across Mirpur, Mohammadpur, Dhanmondi,
              and all of Bangladesh to create, join, and support grassroots social
              development initiatives.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Platform Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/create-event"
                  className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  href="/manage-events"
                  className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Manage Events
                </Link>
              </li>
              <li>
                <Link
                  href="/joined-events"
                  className="text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Community Hub
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Mirpur 10, Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>contact@gathergood.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>+880 1712-345678</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Subscribe to get monthly digests of upcoming social drives, disaster
              relief campaigns, and community impact reports.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Newsletter email address"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-600 cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 GatherGood Foundation. Dedicated to civic community service.</p>
        </div>
      </div>
    </footer>
  );
}
