"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  CalendarCheck,
  ArrowRight,
  Trash2,
  Loader2,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { Badge } from "@/components/ui/badge";
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
  const [cancellingId, setCancellingId] = useState<string | null>(null);

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
      toast.error("Failed to load your joined initiatives.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoined();
  }, []);

  const handleCancelRsvp = async (id: string, title: string) => {
    setCancellingId(id);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setJoinedEvents((prev) => prev.filter((item) => item._id !== id));
        toast.success(`RSVP cancelled for "${title}".`);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to cancel RSVP.");
      }
    } catch {
      toast.error("An error occurred while cancelling your RSVP.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            title="My Joined Initiatives"
            subtitle="Track community drives you have signed up to support as an active volunteer."
          />
          <Link href="/upcoming-events">
            <PrimaryButton variant="outline" className="gap-2">
              <span>Explore More</span>
              <ArrowRight className="size-4" />
            </PrimaryButton>
          </Link>
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        ) : joinedEvents.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card/50 p-12 text-center shadow-none">
            <div className="flex size-16 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CalendarCheck className="size-8" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              No Joined Initiatives Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You haven&apos;t joined any social development events yet. Discover upcoming drives and volunteer with neighbors!
            </p>
            <div className="mt-6">
              <Link href="/upcoming-events">
                <PrimaryButton>
                  <span>Discover Upcoming Initiatives</span>
                  <ArrowRight className="size-4" />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((item) => (
              <AnimatedCard
                key={item._id}
                className="flex flex-col justify-between overflow-hidden p-0 h-full"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1593113512602-0e2069c4dd8d?auto=format&fit=crop&w=800&q=80";
                        e.currentTarget.onerror = null;
                      }}
                    />
                    <div className="absolute right-3 top-3">
                      <Badge variant="default" className="shadow-xs">
                        {item.eventType}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <CheckCircle2 className="size-4" />
                      <span>Confirmed Volunteer</span>
                    </div>

                    <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                      {item.title}
                    </h3>

                    <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-border bg-card/60 p-4">
                  <Link href={`/events/${item.eventId}`} className="flex-1">
                    <PrimaryButton
                      variant="outline"
                      className="w-full py-1.5 text-xs font-semibold"
                    >
                      <Eye className="size-3.5" />
                      <span>View</span>
                    </PrimaryButton>
                  </Link>

                  <PrimaryButton
                    variant="destructive"
                    onClick={() => handleCancelRsvp(item._id, item.title)}
                    disabled={cancellingId === item._id}
                    className="flex-1 py-1.5 text-xs font-semibold"
                  >
                    {cancellingId === item._id ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        <span>Cancelling...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-3.5" />
                        <span>Cancel RSVP</span>
                      </>
                    )}
                  </PrimaryButton>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
