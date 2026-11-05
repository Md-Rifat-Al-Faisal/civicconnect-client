"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "./theme-toggle";
import {
  HeartHandshake,
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
    <header className="sticky top-0 z-40 w-full border-b-2 border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400"
          >
            <div className="flex size-9 items-center justify-center rounded-sm bg-blue-600 text-white shadow-none dark:bg-blue-600 dark:text-white">
              <HeartHandshake className="size-5" />
            </div>
            <span>CivicConnect</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/upcoming-events"
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                pathname === "/upcoming-events"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              )}
            >
              <Calendar className="size-4" />
              <span>Upcoming Events</span>
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-sm border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 cursor-pointer"
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
                  className="group flex items-center gap-2 rounded-sm border-2 border-border p-1 transition-colors hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {user.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name || "User avatar"}
                      title={user.name || "User"}
                      referrerPolicy="no-referrer"
                      className="size-8 rounded-sm object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div
                      title={user.name || "User"}
                      className="flex size-8 items-center justify-center rounded-sm bg-blue-600 text-sm font-bold text-white dark:bg-blue-600 dark:text-white"
                    >
                      {user.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="size-4" />
                      )}
                    </div>
                  )}
                  <ChevronDown className="mr-1 size-3.5 text-muted-foreground transition-transform group-hover:text-foreground" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-sm border-2 border-border bg-card p-2 text-card-foreground shadow-none ring-1 ring-black/5 dark:ring-white/10 z-50">
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
                        className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      >
                        <PlusCircle className="size-4 text-blue-600 dark:text-blue-400" />
                        <span>Create Event</span>
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      >
                        <FolderKanban className="size-4 text-blue-600 dark:text-blue-400" />
                        <span>Manage Events</span>
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      >
                        <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                        <span>Joined Events</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                      >
                        <User className="size-4 text-blue-600 dark:text-blue-400" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
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
                className="flex items-center gap-1.5 rounded-sm bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <LogIn className="size-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="flex size-9 items-center justify-center rounded-sm border border-border text-foreground hover:bg-muted"
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
        <div className="border-b-2 border-border bg-card px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/upcoming-events"
              className={cn(
                "flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium",
                pathname === "/upcoming-events"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
              <span>Upcoming Events</span>
            </Link>

            {user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      title={user.name || "User"}
                      referrerPolicy="no-referrer"
                      className="size-9 rounded-sm object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex size-9 items-center justify-center rounded-sm bg-blue-600 text-sm font-semibold text-white">
                      {user.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="size-4" />
                      )}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/create-event"
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <PlusCircle className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>Create Event</span>
                </Link>

                <Link
                  href="/manage-events"
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <FolderKanban className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>Manage Events</span>
                </Link>

                <Link
                  href="/joined-events"
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>Joined Events</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <User className="size-4 text-blue-600 dark:text-blue-400" />
                  <span>My Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm border border-red-500/40 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
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
