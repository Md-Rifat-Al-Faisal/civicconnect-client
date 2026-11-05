import Link from "next/link";
import { CalendarX, PlusCircle } from "lucide-react";
import { SectionHeading, PrimaryButton } from "@/components/shared/theme-ui";
import { EventCard } from "@/components/shared/event-card";
import { IEvent } from "@/lib/types/event";

export const metadata = {
  title: "Upcoming Initiatives - GatherGood",
  description:
    "Browse and join upcoming community social development drives and volunteer activities across Bangladesh.",
};

async function getUpcomingEvents(): Promise<IEvent[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function UpcomingEventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <SectionHeading
          title="Upcoming Initiatives"
          subtitle="Discover and take part in grassroots drives across Bangladesh. From winter warmth to environmental care, find where you can make a meaningful difference."
        />
      </div>

      {events.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CalendarX className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            No Upcoming Initiatives Found
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            There are currently no scheduled events in your area. Be the change-maker who kicks off the next community impact initiative!
          </p>
          <div className="mt-6">
            <Link href="/create-event">
              <PrimaryButton>
                <span>Organize an Initiative</span>
                <PlusCircle className="h-4 w-4" />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
