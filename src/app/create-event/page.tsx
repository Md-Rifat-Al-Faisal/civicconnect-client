"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Tag,
  ImageIcon,
  FileText,
  AlignLeft,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { authClient } from "@/lib/auth-client";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Cleanup");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !eventType || !imageUrl || !location || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date <= today) {
      toast.error("Event date must be strictly in the future!");
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
      const res = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          eventType,
          imageUrl,
          location,
          date,
          creatorName: session?.user?.name || "Anonymous",
          creatorImage: session?.user?.image || "",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.success("Event created successfully!");
        router.push("/upcoming-events");
        router.refresh();
      } else {
        toast.error(data?.msg || data?.message || "Failed to create event.");
      }
    } catch {
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <SectionHeading
            title="Create Social Initiative"
            subtitle="Mobilize volunteers and lead positive social change in your local community."
          />
        </div>

        <AnimatedCard className="mt-8 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Initiative Title</span>
              </Label>
              <Input
                id="title"
                type="text"
                required
                placeholder="e.g., Winter Warmth Blanket Distribution"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType" className="flex items-center gap-2">
                <Tag className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Initiative Category</span>
              </Label>
              <select
                id="eventType"
                required
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Food Drive">Food Drive</option>
                <option value="Health Camp">Health Camp</option>
                <option value="Winter Relief">Winter Relief</option>
                <option value="Education">Education</option>
                <option value="Charity">Charity</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Event Date</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Location</span>
                </Label>
                <Input
                  id="location"
                  type="text"
                  required
                  placeholder="e.g., Mirpur 10, Dhaka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2">
                <ImageIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Thumbnail Image URL</span>
              </Label>
              <Input
                id="imageUrl"
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <div className="mt-3 aspect-21/9 w-full overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <AlignLeft className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Detailed Description</span>
              </Label>
              <Textarea
                id="description"
                required
                rows={5}
                placeholder="Describe the initiative goals, schedule, needed volunteer roles, and on-site instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3 text-base shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Publishing Initiative...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="size-5" />
                  <span>Publish Initiative</span>
                </>
              )}
            </PrimaryButton>
          </form>
        </AnimatedCard>
      </div>
    </PrivateRoute>
  );
}
