"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import {
  Calendar,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  LogOut,
  LogIn,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  const handleLogout = async () => {
    setDropdownOpen(false);
    await authClient.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto hidden h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          <Logo size="md" />
        </div>

        <nav className="flex items-center justify-center gap-6 justify-self-center">
          <Link
            href="/upcoming-events"
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold transition-colors hover:text-primary",
              pathname === "/upcoming-events"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Calendar className="size-4" />
            <span>Upcoming Events</span>
            {pathname === "/upcoming-events" && (
              <motion.div
                layoutId="nav-active-indicator"
                className="absolute -bottom-4 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="size-3.5" />
                <span>Logout</span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  title={user.name || "User profile"}
                  aria-label="User navigation menu"
                  className="group flex items-center gap-2 rounded-lg border border-border p-1 transition-colors hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <UserAvatar
                    src={user.image}
                    name={user.name}
                    size="sm"
                  />
                  <ChevronDown className="mr-1 size-3.5 text-muted-foreground transition-transform group-hover:text-foreground" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 text-card-foreground shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50">
                    <div className="border-b border-border px-3 py-2">
                      <p className="truncate text-sm font-bold text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/create-event"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <PlusCircle className="size-4 text-primary" />
                        <span>Create Event</span>
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <FolderKanban className="size-4 text-primary" />
                        <span>Manage Events</span>
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <CheckCircle2 className="size-4 text-primary" />
                        <span>Joined Events</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <User className="size-4 text-primary" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
                      >
                        <LogOut className="size-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-lg bg-primary hover:bg-[#1e4238] dark:hover:bg-[#275246] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all hover:shadow-md"
              >
                <LogIn className="size-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-16 items-center justify-between px-4 md:hidden">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-border bg-card px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/upcoming-events"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                pathname === "/upcoming-events"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <Calendar className="size-4 text-primary" />
              <span>Upcoming Events</span>
            </Link>

            {user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <UserAvatar
                    src={user.image}
                    name={user.name}
                    size="md"
                  />
                  <div className="truncate">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/create-event"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <PlusCircle className="size-4 text-primary" />
                  <span>Create Event</span>
                </Link>

                <Link
                  href="/manage-events"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <FolderKanban className="size-4 text-primary" />
                  <span>Manage Events</span>
                </Link>

                <Link
                  href="/joined-events"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <CheckCircle2 className="size-4 text-primary" />
                  <span>Joined Events</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <User className="size-4 text-primary" />
                  <span>My Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-destructive/30 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#1e4238] dark:hover:bg-[#275246] py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/25"
                >
                  <LogIn className="size-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
