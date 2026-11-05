import { ArrowRight, CalendarX } from "lucide-react";
import { SectionHeading, PrimaryButton } from "@/components/shared/theme-ui";
import { EventCard } from "@/components/shared/event-card";
import { IEvent } from "@/lib/types/event";

async function getRecentEvents(): Promise<IEvent[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`, {
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

export async function RecentEvents() {
  const events = await getRecentEvents();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading
          title="Recent Events"
          subtitle="Explore the latest social development events organized by dedicated community changemakers."
        />
        <PrimaryButton
          href="/upcoming-events"
          variant="outline"
          className="hidden md:inline-flex"
        >
          <span>View All Events</span>
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>

      {events.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/40 p-12 text-center shadow-soft">
          <CalendarX className="size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-bold text-foreground">
            No Upcoming Events Found
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            There are no scheduled community events right now. Take the lead and launch your own local event today!
          </p>
          <div className="mt-6">
            <PrimaryButton href="/create-event">
              Create an Event
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center md:hidden">
        <PrimaryButton
          href="/upcoming-events"
          variant="outline"
          className="w-full"
        >
          <span>View All Events</span>
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </section>
  );
}