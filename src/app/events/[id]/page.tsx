import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Tag,
  User,
  ArrowLeft,
} from "lucide-react";
import { EventBadge } from "@/components/shared/event-badge";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/shared/safe-image";
import { JoinButton } from "@/components/events/join-button";
import { IEvent } from "@/lib/types/event";

export const dynamic = "force-dynamic";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string): Promise<IEvent | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {}
  return null;
}

export async function generateMetadata({ params }: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) {
    return {
      title: "Event Not Found - CivicConnect",
    };
  }
  return {
    title: `${event.title} - CivicConnect`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/upcoming-events"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Upcoming Events</span>
      </Link>

      <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-soft">
        <SafeImage
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full"
        />
        <div className="absolute top-4 right-4 z-20">
          <EventBadge category={event.eventType} size="lg" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl break-words">
            {event.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Calendar className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </p>
              <p className="text-sm font-semibold text-foreground break-words leading-snug">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
              <MapPin className="size-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </p>
              <p className="text-sm font-semibold text-foreground break-words leading-snug">
                {event.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <User className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Organized By
              </p>
              <p className="text-sm font-semibold text-foreground break-words leading-snug">
                {event.creatorName || "Community Member"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground border border-border">
              <Tag className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </p>
              <p className="text-sm font-semibold text-foreground break-words leading-snug">
                {event.eventType}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8 min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            About This Social Event
          </h2>
          <div className="mt-4 text-base leading-relaxed text-muted-foreground break-words whitespace-pre-wrap">
            {event.description}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-6 shadow-soft sm:flex-row sm:items-center sm:p-8 min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-foreground break-words">
              Ready to take action in your community?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground break-words">
              Join fellow volunteers on site and help make this event a success.
            </p>
          </div>
          <JoinButton event={event} />
        </div>
      </div>
    </div>
  );
}