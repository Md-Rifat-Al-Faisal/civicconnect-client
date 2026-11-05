"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusCircle, Loader2 } from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SafeImage } from "@/components/shared/safe-image";
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minDate = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

  const validateImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url.startsWith("https://")) {
        resolve(false);
        return;
      }
      const img = new Image();
      let timer: NodeJS.Timeout | null = null;
      const cleanup = () => {
        if (timer) clearTimeout(timer);
        img.onload = null;
        img.onerror = null;
      };
      timer = setTimeout(() => {
        cleanup();
        resolve(false);
      }, 6000);
      img.onload = () => {
        cleanup();
        resolve(true);
      };
      img.onerror = () => {
        cleanup();
        resolve(false);
      };
      img.src = url;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "A short, clear name is required.";
    }

    if (!eventType) {
      newErrors.eventType = "Please choose an event type.";
    }

    if (!date) {
      newErrors.date = "Please select a date for the event.";
    } else if (date <= minDate) {
      newErrors.date = "Pick a date from tomorrow onwards. Today and past dates are not allowed.";
    }

    if (!location.trim()) {
      newErrors.location = "Please provide an area and city.";
    }

    if (!imageUrl.trim()) {
      newErrors.imageUrl = "Cover photo link is required.";
    } else if (!imageUrl.startsWith("https://")) {
      newErrors.imageUrl = "Paste a direct image link starting with https://";
    }

    if (!description.trim()) {
      newErrors.description = "Please describe what will happen at this event.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const isValidImage = await validateImage(imageUrl.trim());
    if (!isValidImage) {
      setLoading(false);
      setErrors((prev) => ({
        ...prev,
        imageUrl:
          "This link doesn't load an image. Paste a direct image link (ends in .jpg, .png or .webp), not a web page link.",
      }));
      return;
    }

    try {
      const token = await getTokenFromClient();
      if (!token) {
        toast.error("Authentication expired. Please sign in again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          eventType: eventType.trim(),
          imageUrl: imageUrl.trim(),
          location: location.trim(),
          date: date.trim(),
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

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <SectionHeading
            title="Create Event"
            subtitle="Mobilize volunteers and lead positive social change in your local community."
          />
        </div>

        <AnimatedCard className="mt-8 p-6 sm:p-8">
          <p className="mb-4 text-xs text-muted-foreground">
            Fields marked with <span className="text-destructive font-bold">*</span> are required.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Event Title"
              htmlFor="title"
              required
              hint="A short, clear name, e.g. Winter Blanket Distribution"
              error={errors.title}
            >
              <Input
                id="title"
                type="text"
                required
                placeholder="e.g., Winter Blanket Distribution in Mirpur"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
            </FormField>

            <FormField
              label="Event Type"
              htmlFor="eventType"
              required
              hint="Choose the type that fits best"
              error={errors.eventType}
            >
              <select
                id="eventType"
                required
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value);
                  if (errors.eventType) setErrors((prev) => ({ ...prev, eventType: "" }));
                }}
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
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
            </FormField>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                label="Event Date"
                htmlFor="date"
                required
                hint="Pick a date from tomorrow onwards. Today and past dates are not allowed."
                error={errors.date}
              >
                <Input
                  id="date"
                  type="date"
                  required
                  min={minDate}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                />
              </FormField>

              <FormField
                label="Event Location"
                htmlFor="location"
                required
                hint="Area and city, e.g. Mirpur 10, Dhaka"
                error={errors.location}
              >
                <Input
                  id="location"
                  type="text"
                  required
                  placeholder="e.g., Mirpur 10, Dhaka"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
                  }}
                />
              </FormField>
            </div>

            <FormField
              label="Cover Photo Link"
              htmlFor="imageUrl"
              required
              hint="Paste a direct image link (ends in .jpg, .png or .webp), not a web page link."
              error={errors.imageUrl}
            >
              <Input
                id="imageUrl"
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: "" }));
                }}
              />
              {imageUrl && !errors.imageUrl && (
                <div className="mt-3 aspect-21/9 w-full overflow-hidden rounded-xl border border-border bg-muted">
                  <SafeImage
                    src={imageUrl}
                    alt="Cover preview"
                    className="h-full w-full"
                  />
                </div>
              )}
            </FormField>

            <FormField
              label="What will happen at this event?"
              htmlFor="description"
              required
              hint="Mention the time, meeting point, what to bring and what volunteers will do."
              error={errors.description}
            >
              <Textarea
                id="description"
                required
                rows={5}
                placeholder="Describe the schedule, assembly point, volunteer tasks, and supplies needed..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
                }}
              />
            </FormField>

            <PrimaryButton
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-3 text-base shadow-soft"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Publishing Event...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="size-5" />
                  <span>Publish Event</span>
                </>
              )}
            </PrimaryButton>
          </form>
        </AnimatedCard>
      </div>
    </PrivateRoute>
  );
}