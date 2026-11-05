"use client";

import { useState, useEffect } from "react";
import { CalendarX, PlusCircle, Search, Filter, RotateCcw } from "lucide-react";
import { SectionHeading, PrimaryButton } from "@/components/shared/theme-ui";
import { EventCard } from "@/components/shared/event-card";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Input } from "@/components/ui/input";
import { IEvent } from "@/lib/types/event";

const CATEGORIES = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Health Camp",
  "Winter Relief",
  "Education",
  "Charity",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEvents = async (search: string, category: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) {
        params.append("search", search.trim());
      }
      if (category && category !== "All") {
        params.append("eventType", category);
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events${queryString}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } else {
        setEvents([]);
      }
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEvents(searchTerm, selectedCategory);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedCategory]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <SectionHeading
          title="Upcoming Events"
          subtitle="Discover and take part in grassroots events across Bangladesh. From winter warmth to environmental care, find where you can make a meaningful difference."
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events by title or location (e.g. Mirpur, Ramna, Clean-up)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground shrink-0 hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 w-full sm:w-48 rounded-md border border-input bg-card px-3 text-xs font-semibold text-foreground shadow-xs focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {(searchTerm || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={handleReset}
                className="flex h-10 items-center gap-1 rounded-md border border-border px-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                title="Reset filters"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-8">
          <PageSkeleton />
        </div>
      ) : events.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center shadow-soft">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <CalendarX className="size-8" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-foreground">
            No Events Found
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {searchTerm || selectedCategory !== "All"
              ? "No community events match your active search filters. Try adjusting your query or resetting filters."
              : "There are currently no scheduled events. Be the change-maker who kicks off the next community impact event!"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {searchTerm || selectedCategory !== "All" ? (
              <PrimaryButton variant="outline" onClick={handleReset}>
                <span>Clear Filters</span>
              </PrimaryButton>
            ) : null}
            <PrimaryButton href="/create-event">
              <span>Create an Event</span>
              <PlusCircle className="size-4" />
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}