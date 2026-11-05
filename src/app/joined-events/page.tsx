"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  CalendarCheck,
  ArrowRight,
  UserX,
  Eye,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { EventBadge } from "@/components/shared/event-badge";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/shared/safe-image";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface JoinedEventItem {
  _id: string;
  eventId: string;
  title: string;
  eventType: string;
  location: string;
  date: string;
  imageUrl: string;
  userEmail: string;
  userName: string;
  joinedAt?: string;
}

export default function JoinedEventsPage() {
  const [joinedEvents, setJoinedEvents] = useState<JoinedEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCancelItem, setSelectedCancelItem] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchJoined = async () => {
    setLoading(true);
    try {
      const token = await getTokenFromClient();
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setJoinedEvents(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error("Failed to load your joined events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoined();
  }, []);

  const handleConfirmCancel = async () => {
    if (!selectedCancelItem || cancelling) return;
    setCancelling(true);

    try {
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${selectedCancelItem.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setJoinedEvents((prev) =>
          prev.filter((item) => item._id !== selectedCancelItem.id)
        );
        toast.success(`You have left "${selectedCancelItem.title}".`);
        setSelectedCancelItem(null);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to cancel participation.");
      }
    } catch {
      toast.error("An error occurred while cancelling your participation.");
    } finally {
      setCancelling(false);
    }
  };

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            title="My Joined Events"
            subtitle="Track community events you have signed up to support as an active volunteer."
          />
          <PrimaryButton href="/upcoming-events" variant="outline" className="gap-2">
            <span>Explore More</span>
            <ArrowRight className="size-4" />
          </PrimaryButton>
        </div>

        {loading ? (
          <div className="mt-8">
            <PageSkeleton />
          </div>
        ) : joinedEvents.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center shadow-soft">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <CalendarCheck className="size-8" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              No Joined Events Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You haven&apos;t joined any social development events yet. Discover upcoming events and volunteer with neighbors!
            </p>
            <div className="mt-6">
              <PrimaryButton href="/upcoming-events">
                <span>Discover Upcoming Events</span>
                <ArrowRight className="size-4" />
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((item) => {
              const isPast = item.date < today;
              return (
                <AnimatedCard
                  key={item._id}
                  className="flex flex-col justify-between overflow-hidden p-0 h-full"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full"
                      />
                      <div className="absolute right-3 top-3 flex gap-1.5 z-20">
                        {isPast ? (
                          <Badge
                            variant="secondary"
                            className="shadow-md bg-card/95 text-muted-foreground border border-border/80 font-bold text-xs px-2.5 py-1 backdrop-blur-md"
                          >
                            Completed
                          </Badge>
                        ) : null}
                        <EventBadge category={item.eventType} />
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
                        {isPast ? (
                          <Clock className="size-4 text-muted-foreground" />
                        ) : (
                          <CheckCircle2 className="size-4 text-primary" />
                        )}
                        <span className={isPast ? "text-muted-foreground" : ""}>
                          {isPast ? "Past Event" : "Confirmed Volunteer"}
                        </span>
                      </div>

                      <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 shrink-0 text-primary" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 shrink-0 text-accent" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-border bg-card/60 p-4">
                    <PrimaryButton
                      href={`/events/${item.eventId}`}
                      variant="outline"
                      className="flex-1 py-1.5 text-xs font-semibold"
                    >
                      <Eye className="size-3.5" />
                      <span>View</span>
                    </PrimaryButton>

                    {!isPast && (
                      <PrimaryButton
                        variant="destructive"
                        onClick={() =>
                          setSelectedCancelItem({
                            id: item._id,
                            title: item.title,
                          })
                        }
                        className="flex-1 py-1.5 text-xs font-semibold gap-1.5"
                      >
                        <UserX className="size-3.5" />
                        <span>Cancel RSVP</span>
                      </PrimaryButton>
                    )}
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        )}

        <ConfirmDialog
          isOpen={!!selectedCancelItem}
          onClose={() => setSelectedCancelItem(null)}
          onConfirm={handleConfirmCancel}
          title="Cancel your participation?"
          message={`Are you sure you want to leave "${selectedCancelItem?.title}"? You can join again later if spots are still open.`}
          confirmText="Yes, cancel"
          cancelText="No, keep me in"
          variant="danger"
          loading={cancelling}
        />
      </div>
    </PrivateRoute>
  );
}