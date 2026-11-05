"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HeartHandshake, Loader2, CheckCircle2, UserX } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { PrimaryButton } from "@/components/shared/theme-ui";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { IEvent } from "@/lib/types/event";

export function JoinButton({ event }: { event: IEvent }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  const isPast = event?.date ? event.date < today : false;

  useEffect(() => {
    if (!session?.user?.email || !event?._id) return;
    let active = true;

    async function checkStatus() {
      try {
        const token = await getTokenFromClient();
        if (!token) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/check-joined/${event._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok && active) {
          const data = await res.json();
          if (data?.joined) {
            setIsJoined(true);
          }
        }
      } catch {}
    }

    checkStatus();

    return () => {
      active = false;
    };
  }, [session?.user?.email, event?._id]);

  const handleJoin = async () => {
    if (loading) return;

    if (!session) {
      toast.error("Please log in to join events");
      router.push(`/login?redirect=/events/${event._id}`);
      return;
    }

    setLoading(true);
    try {
      const token = await getTokenFromClient();
      if (!token) {
        toast.error("Authentication expired. Please sign in again.");
        router.push(`/login?redirect=/events/${event._id}`);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setIsJoined(true);
        toast.success("Successfully joined this event! Thank you for volunteering.");
        router.refresh();
      } else {
        toast.error(data?.msg || data?.message || "Failed to join event.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to join event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelParticipation = async () => {
    if (cancelling) return;
    setCancelling(true);

    try {
      const token = await getTokenFromClient();
      if (!token) {
        toast.error("Authentication expired. Please sign in again.");
        setIsConfirmOpen(false);
        router.push(`/login?redirect=/events/${event._id}`);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/join-event/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setIsConfirmOpen(false);
        setIsJoined(false);
        toast.success("You have left this event.");
        router.refresh();
      } else if (res.status === 404) {
        setIsConfirmOpen(false);
        setIsJoined(false);
        toast.info("You have not joined this event.");
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to cancel participation. Please try again.");
      }
    } catch {
      toast.error("Network error. Could not cancel participation.");
    } finally {
      setCancelling(false);
    }
  };

  if (isJoined) {
    return (
      <>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary shadow-xs">
            <CheckCircle2 className="size-4.5 text-primary" />
            <span>You&apos;ve Joined</span>
          </div>

          {!isPast && session && (
            <PrimaryButton
              type="button"
              variant="outline"
              onClick={() => setIsConfirmOpen(true)}
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 px-4 py-2.5 text-sm font-semibold"
            >
              <UserX className="size-4" />
              <span>Cancel Participation</span>
            </PrimaryButton>
          )}
        </div>

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleCancelParticipation}
          title="Cancel your participation?"
          message={`Are you sure you want to leave "${event.title}"? You can join again later if spots are still open.`}
          confirmText="Yes, cancel"
          cancelText="No, keep me in"
          variant="danger"
          loading={cancelling}
        />
      </>
    );
  }

  return (
    <PrimaryButton
      onClick={handleJoin}
      disabled={loading}
      className="w-full sm:w-auto px-8 py-3 text-base shadow-soft"
    >
      {loading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          <span>Joining Event...</span>
        </>
      ) : (
        <>
          <HeartHandshake className="size-5" />
          <span>Join This Event</span>
        </>
      )}
    </PrimaryButton>
  );
}