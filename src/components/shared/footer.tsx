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
    <footer className="border-t-2 border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400"
            >
              <div className="flex size-9 items-center justify-center rounded-sm bg-blue-600 text-white shadow-none dark:bg-blue-600 dark:text-white">
                <HeartHandshake className="size-5" />
              </div>
              <span>CivicConnect</span>
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
                className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
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
                className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0-.01-2.9 1.45 1.45 0 0 0 .01 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Upcoming Initiatives
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Create Initiative
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-blue-600 dark:hover:text-blue-400">
                  My Joined Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
              Community Hub
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <span>Mirpur 10, Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <span>contact@civicconnect.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <span>+880 1712-345678</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
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
                className="w-full rounded-sm border-2 border-input bg-background px-3 py-2 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 py-2 text-xs font-semibold text-white shadow-none transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 CivicConnect Foundation. Dedicated to civic community service.</p>
        </div>
      </div>
    </footer>
  );
}
