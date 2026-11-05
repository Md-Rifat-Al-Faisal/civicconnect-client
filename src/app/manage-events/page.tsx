"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  PlusCircle,
  FolderKanban,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { EventBadge } from "@/components/shared/event-badge";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { SafeImage } from "@/components/shared/safe-image";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { IEvent } from "@/lib/types/event";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEventType, setEditEventType] = useState("Cleanup");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

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

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const token = await getTokenFromClient();
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error("Failed to load your events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleOpenDelete = (event: IEvent) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;
    setActionLoading(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== selectedEvent._id));
        toast.success("Event deleted successfully!");
        setDeleteModalOpen(false);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to delete event.");
      }
    } catch {
      toast.error("An error occurred while deleting the event.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenEdit = (event: IEvent) => {
    setSelectedEvent(event);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditEventType(event.eventType);
    setEditDate(event.date);
    setEditLocation(event.location);
    setEditImageUrl(event.imageUrl);
    setEditErrors({});
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const newErrors: Record<string, string> = {};

    if (!editTitle.trim()) {
      newErrors.title = "A short, clear name is required.";
    }

    if (!editEventType) {
      newErrors.eventType = "Please choose an event type.";
    }

    if (!editDate) {
      newErrors.date = "Please select a date for the event.";
    } else if (editDate <= minDate) {
      newErrors.date = "Pick a date from tomorrow onwards. Today and past dates are not allowed.";
    }

    if (!editLocation.trim()) {
      newErrors.location = "Please provide an area and city.";
    }

    if (!editImageUrl.trim()) {
      newErrors.imageUrl = "Cover photo link is required.";
    } else if (!editImageUrl.startsWith("https://")) {
      newErrors.imageUrl = "Paste a direct image link starting with https://";
    }

    if (!editDescription.trim()) {
      newErrors.description = "Please describe what will happen at this event.";
    }

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }

    setEditErrors({});
    setActionLoading(true);

    const isValidImage = await validateImage(editImageUrl.trim());
    if (!isValidImage) {
      setActionLoading(false);
      setEditErrors((prev) => ({
        ...prev,
        imageUrl:
          "This link doesn't load an image. Paste a direct image link (ends in .jpg, .png or .webp), not a web page link.",
      }));
      return;
    }

    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
          eventType: editEventType.trim(),
          date: editDate.trim(),
          location: editLocation.trim(),
          imageUrl: editImageUrl.trim(),
        }),
      });

      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) =>
            e._id === selectedEvent._id
              ? {
                  ...e,
                  title: editTitle.trim(),
                  description: editDescription.trim(),
                  eventType: editEventType.trim(),
                  date: editDate.trim(),
                  location: editLocation.trim(),
                  imageUrl: editImageUrl.trim(),
                }
              : e
          )
        );
        toast.success("Event updated successfully!");
        setEditModalOpen(false);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to update event.");
      }
    } catch {
      toast.error("An error occurred while updating the event.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            title="Manage Events"
            subtitle="View, update, or cancel social development events you have organized."
          />
          <PrimaryButton href="/create-event" className="gap-2">
            <PlusCircle className="size-4" />
            <span>Create Event</span>
          </PrimaryButton>
        </div>

        {loading ? (
          <div className="mt-8">
            <PageSkeleton />
          </div>
        ) : events.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center shadow-soft">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <FolderKanban className="size-8" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              No Events Created Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You haven&apos;t organized any community events yet. Step forward and launch your first event today!
            </p>
            <div className="mt-6">
              <PrimaryButton href="/create-event">
                <span>Create New Event</span>
                <PlusCircle className="size-4" />
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <AnimatedCard
                key={event._id}
                className="flex flex-col justify-between overflow-hidden p-0 h-full"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <SafeImage
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full"
                    />
                    <div className="absolute right-3 top-3 z-20">
                      <EventBadge category={event.eventType} />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 shrink-0 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-accent" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-border bg-card/60 p-4">
                  <PrimaryButton
                    href={`/events/${event._id}`}
                    variant="outline"
                    className="flex-1 py-1.5 text-xs font-semibold gap-1.5"
                  >
                    <Eye className="size-3.5" />
                    <span>View</span>
                  </PrimaryButton>

                  <PrimaryButton
                    variant="outline"
                    onClick={() => handleOpenEdit(event)}
                    className="flex-1 py-1.5 text-xs font-semibold gap-1.5"
                  >
                    <Pencil className="size-3.5" />
                    <span>Edit</span>
                  </PrimaryButton>

                  <PrimaryButton
                    variant="destructive"
                    onClick={() => handleOpenDelete(event)}
                    className="flex-1 py-1.5 text-xs font-semibold gap-1.5"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Delete</span>
                  </PrimaryButton>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Event"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertTriangle className="size-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold">Confirm Deletion</p>
                <p className="mt-1">
                  Are you sure you want to delete{" "}
                  <span className="font-bold">&ldquo;{selectedEvent?.title}&rdquo;</span>?
                  This action is permanent and will cancel all volunteer registrations.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <PrimaryButton
                type="button"
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </PrimaryButton>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Event"
        >
          <form onSubmit={handleConfirmEdit} className="space-y-4">
            <FormField
              label="Event Title"
              htmlFor="editTitle"
              required
              hint="A short, clear name, e.g. Winter Blanket Distribution"
              error={editErrors.title}
            >
              <Input
                id="editTitle"
                required
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editErrors.title) setEditErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
            </FormField>

            <FormField
              label="Event Type"
              htmlFor="editEventType"
              required
              hint="Choose the type that fits best"
              error={editErrors.eventType}
            >
              <select
                id="editEventType"
                required
                value={editEventType}
                onChange={(e) => {
                  setEditEventType(e.target.value);
                  if (editErrors.eventType) setEditErrors((prev) => ({ ...prev, eventType: "" }));
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Event Date"
                htmlFor="editDate"
                required
                hint="Pick a date from tomorrow onwards. Today and past dates are not allowed."
                error={editErrors.date}
              >
                <Input
                  id="editDate"
                  type="date"
                  required
                  min={minDate}
                  value={editDate}
                  onChange={(e) => {
                    setEditDate(e.target.value);
                    if (editErrors.date) setEditErrors((prev) => ({ ...prev, date: "" }));
                  }}
                />
              </FormField>

              <FormField
                label="Event Location"
                htmlFor="editLocation"
                required
                hint="Area and city, e.g. Mirpur 10, Dhaka"
                error={editErrors.location}
              >
                <Input
                  id="editLocation"
                  required
                  value={editLocation}
                  onChange={(e) => {
                    setEditLocation(e.target.value);
                    if (editErrors.location) setEditErrors((prev) => ({ ...prev, location: "" }));
                  }}
                />
              </FormField>
            </div>

            <FormField
              label="Cover Photo Link"
              htmlFor="editImageUrl"
              required
              hint="Paste a direct image link (ends in .jpg, .png or .webp), not a web page link."
              error={editErrors.imageUrl}
            >
              <Input
                id="editImageUrl"
                type="url"
                required
                value={editImageUrl}
                onChange={(e) => {
                  setEditImageUrl(e.target.value);
                  if (editErrors.imageUrl) setEditErrors((prev) => ({ ...prev, imageUrl: "" }));
                }}
              />
              {editImageUrl && !editErrors.imageUrl && (
                <div className="mt-2 aspect-21/9 w-full overflow-hidden rounded-xl border border-border bg-muted">
                  <SafeImage
                    src={editImageUrl}
                    alt="Preview"
                    className="h-full w-full"
                  />
                </div>
              )}
            </FormField>

            <FormField
              label="What will happen at this event?"
              htmlFor="editDescription"
              required
              hint="Mention the time, meeting point, what to bring and what volunteers will do."
              error={editErrors.description}
            >
              <Textarea
                id="editDescription"
                required
                rows={4}
                value={editDescription}
                onChange={(e) => {
                  setEditDescription(e.target.value);
                  if (editErrors.description) setEditErrors((prev) => ({ ...prev, description: "" }));
                }}
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <PrimaryButton
                type="button"
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton type="submit" disabled={actionLoading}>
                {actionLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </PrivateRoute>
  );
}