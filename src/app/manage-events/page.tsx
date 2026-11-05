"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  PlusCircle,
  FolderKanban,
  AlertTriangle,
  Loader2,
  FileText,
  Tag,
  ImageIcon,
  AlignLeft,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
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

  const minDate = new Date().toISOString().split("T")[0];

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
      toast.error("Failed to load your initiatives.");
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
        toast.success("Initiative deleted successfully!");
        setDeleteModalOpen(false);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to delete event.");
      }
    } catch {
      toast.error("An error occurred while deleting the initiative.");
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
    setEditModalOpen(true);
  };

  const handleConfirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!editTitle || !editDescription || !editEventType || !editDate || !editLocation || !editImageUrl) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (editDate <= today) {
      toast.error("Event date must be strictly in the future!");
      return;
    }

    setActionLoading(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          eventType: editEventType,
          date: editDate,
          location: editLocation,
          imageUrl: editImageUrl,
        }),
      });

      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) =>
            e._id === selectedEvent._id
              ? {
                  ...e,
                  title: editTitle,
                  description: editDescription,
                  eventType: editEventType,
                  date: editDate,
                  location: editLocation,
                  imageUrl: editImageUrl,
                }
              : e
          )
        );
        toast.success("Initiative updated successfully!");
        setEditModalOpen(false);
      } else {
        const data = await res.json().catch(() => null);
        toast.error(data?.msg || "Failed to update event.");
      }
    } catch {
      toast.error("An error occurred while updating the initiative.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SectionHeading
            title="Manage Initiatives"
            subtitle="View, update, or cancel social development drives you have organized."
          />
          <Link href="/create-event">
            <PrimaryButton className="gap-2">
              <PlusCircle className="size-4" />
              <span>Create Initiative</span>
            </PrimaryButton>
          </Link>
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        ) : events.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card/50 p-12 text-center shadow-none">
            <div className="flex size-16 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FolderKanban className="size-8" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              No Initiatives Created Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You haven&apos;t organized any community drives yet. Step forward and launch your first initiative today!
            </p>
            <div className="mt-6">
              <Link href="/create-event">
                <PrimaryButton>
                  <span>Create New Initiative</span>
                  <PlusCircle className="size-4" />
                </PrimaryButton>
              </Link>
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
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1593113512602-0e2069c4dd8d?auto=format&fit=crop&w=800&q=80";
                        e.currentTarget.onerror = null;
                      }}
                    />
                    <div className="absolute right-3 top-3">
                      <Badge variant="default" className="shadow-xs">
                        {event.eventType}
                      </Badge>
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
                        <Calendar className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-border bg-card/60 p-4">
                  <PrimaryButton
                    variant="outline"
                    onClick={() => handleOpenEdit(event)}
                    className="flex-1 py-1.5 text-xs font-semibold"
                  >
                    <Pencil className="size-3.5" />
                    <span>Edit</span>
                  </PrimaryButton>

                  <PrimaryButton
                    variant="destructive"
                    onClick={() => handleOpenDelete(event)}
                    className="flex-1 py-1.5 text-xs font-semibold"
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
          title="Delete Initiative"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-sm border-2 border-red-500/20 bg-red-500/10 p-4 text-red-700 dark:text-red-300">
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
          title="Edit Initiative"
        >
          <form onSubmit={handleConfirmEdit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="editTitle" className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Title</span>
              </Label>
              <Input
                id="editTitle"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="editEventType" className="flex items-center gap-1.5">
                <Tag className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Category</span>
              </Label>
              <select
                id="editEventType"
                required
                value={editEventType}
                onChange={(e) => setEditEventType(e.target.value)}
                className="flex h-10 w-full rounded-sm border-2 border-input bg-card px-3 py-2 text-sm text-foreground shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="editDate" className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Date</span>
                </Label>
                <Input
                  id="editDate"
                  type="date"
                  required
                  min={minDate}
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="editLocation" className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Location</span>
                </Label>
                <Input
                  id="editLocation"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="editImageUrl" className="flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Thumbnail Image URL</span>
              </Label>
              <Input
                id="editImageUrl"
                type="url"
                required
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="editDescription" className="flex items-center gap-1.5">
                <AlignLeft className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Description</span>
              </Label>
              <Textarea
                id="editDescription"
                required
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>

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
