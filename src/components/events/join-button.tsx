"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HeartHandshake, Loader2, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { PrimaryButton } from "@/components/shared/theme-ui";
import { IEvent } from "@/lib/types/event";

export function JoinButton({ event }: { event: IEvent }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (!session?.user?.email || !event?._id) return;
    let active = true;

    async function checkStatus() {
      try {
        const token = await getTokenFromClient();
        if (!token) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/check-joined/${event._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    if (!session) {
      toast.error("Please log in to join events");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const token = await getTokenFromClient();
      if (!token) {
        toast.error("Authentication expired. Please sign in again.");
        router.push("/login");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/join-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          title: event.title,
          eventType: event.eventType,
          location: event.location,
          date: event.date,
          imageUrl: event.imageUrl,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setIsJoined(true);
        toast.success("Successfully joined this initiative! Thank you for volunteering.");
        router.refresh();
      } else {
        toast.error(data?.msg || data?.message || "Failed to join event.");
      }
    } catch {
      toast.error("Unable to reach backend server. Please make sure gathergood-server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  if (isJoined) {
    return (
      <PrimaryButton
        disabled
        variant="secondary"
        className="w-full sm:w-auto px-6 py-3 cursor-default opacity-90 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
      >
        <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
        <span>Already Joined</span>
      </PrimaryButton>
    );
  }

  return (
    <PrimaryButton
      onClick={handleJoin}
      disabled={loading}
      className="w-full sm:w-auto px-8 py-3 text-base shadow-md"
    >
      {loading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          <span>Joining Initiative...</span>
        </>
      ) : (
        <>
          <HeartHandshake className="size-5" />
          <span>Join This Initiative</span>
        </>
      )}
    </PrimaryButton>
  );
}
