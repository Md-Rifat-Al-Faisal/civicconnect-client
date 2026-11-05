"use client";

import { Calendar, MapPin } from "lucide-react";
import { AnimatedCard, PrimaryButton } from "@/components/shared/theme-ui";
import { EventBadge } from "@/components/shared/event-badge";
import { SafeImage } from "@/components/shared/safe-image";
import { IEvent } from "@/lib/types/event";

export function EventCard({ event }: { event: IEvent }) {
  return (
    <AnimatedCard className="group flex flex-col justify-between overflow-hidden p-0 h-full">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <SafeImage
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 z-20">
          <EventBadge category={event.eventType} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 min-w-0">
        <h3 className="line-clamp-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors break-words">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground break-words">
          {event.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-4 w-4 shrink-0 text-accent" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="mt-6 pt-2">
          <PrimaryButton href={`/events/${event._id}`} className="w-full">
            View Event
          </PrimaryButton>
        </div>
      </div>
    </AnimatedCard>
  );
}