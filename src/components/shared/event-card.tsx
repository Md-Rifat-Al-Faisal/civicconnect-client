"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { AnimatedCard, PrimaryButton } from "@/components/shared/theme-ui";
import { Badge } from "@/components/ui/badge";
import { IEvent } from "@/lib/types/event";

export function EventCard({ event }: { event: IEvent }) {
  return (
    <AnimatedCard className="group flex flex-col justify-between overflow-hidden p-0 h-full">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1593113512602-0e2069c4dd8d?auto=format&fit=crop&w=800&q=80";
            e.currentTarget.onerror = null;
          }}
        />
        <div className="absolute right-3 top-3">
          <Badge variant="default" className="shadow-sm">
            {event.eventType}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="mt-6 pt-2">
          <Link href={`/events/${event._id}`} className="block w-full">
            <PrimaryButton className="w-full">
              View Event
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </AnimatedCard>
  );
}
