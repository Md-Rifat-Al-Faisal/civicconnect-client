"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  FolderKanban,
  PlusCircle,
  Pencil,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setEditName(session.user.name || "");
      setEditImage(session.user.image || "");
    }
  }, [session?.user]);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  const userRole = (user as { role?: string })?.role || "Community Member";

  const memberSince = (user as { createdAt?: string | Date })?.createdAt
    ? new Date((user as { createdAt?: string | Date }).createdAt!).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Active Member";

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setNameError("Your full name cannot be empty.");
      return;
    }

    setNameError("");
    setIsUpdating(true);
    try {
      const res = await authClient.updateUser({
        name: editName.trim(),
        image: editImage.trim() ? editImage.trim() : (null as any),
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setIsEditModalOpen(false);
      }
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="My Profile"
          subtitle="Manage and view your CivicConnect community volunteer credentials."
        />

        <div className="mt-8 space-y-6">
          <AnimatedCard className="p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <UserAvatar
                src={user?.image}
                name={user?.name}
                size="xl"
                className="size-24 border-2 border-primary/20 shadow-soft"
              />

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    {user?.name || "Community Volunteer"}
                  </h2>
                  <Badge variant="default" className="gap-1 font-semibold shadow-xs">
                    <ShieldCheck className="size-3.5 text-accent" />
                    <span>{userRole}</span>
                  </Badge>
                </div>

                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
                  <Mail className="size-3.5 text-primary" />
                  <span>{user?.email || "No email available"}</span>
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-primary" />
                    <span>Joined {memberSince}</span>
                  </div>
                </div>

                <div className="mt-5 flex justify-center sm:justify-start">
                  <PrimaryButton
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setNameError("");
                      setIsEditModalOpen(true);
                    }}
                    className="gap-2 text-xs py-1.5"
                  >
                    <Pencil className="size-3.5" />
                    <span>Edit Profile</span>
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
                Account Information
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card/60 p-4 shadow-xs">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <UserIcon className="size-3.5 text-primary" />
                    <span>Full Name</span>
                  </span>
                  <p className="mt-1.5 font-bold text-foreground">
                    {user?.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4 shadow-xs">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Mail className="size-3.5 text-primary" />
                    <span>Email Address</span>
                  </span>
                  <p className="mt-1.5 truncate font-bold text-foreground">
                    {user?.email || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4 shadow-xs">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-primary" />
                    <span>Membership Status</span>
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-bold text-foreground">{userRole}</span>
                    <span className="inline-block size-2 rounded-full bg-primary"></span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4 shadow-xs">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Calendar className="size-3.5 text-primary" />
                    <span>Registration Date</span>
                  </span>
                  <p className="mt-1.5 font-bold text-foreground">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
                Quick Navigation
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <PrimaryButton href="/create-event" className="flex-1 min-w-[140px] gap-2">
                  <PlusCircle className="size-4" />
                  <span>Create Event</span>
                </PrimaryButton>
                <PrimaryButton href="/manage-events" variant="outline" className="flex-1 min-w-[140px] gap-2">
                  <FolderKanban className="size-4" />
                  <span>Manage Events</span>
                </PrimaryButton>
                <PrimaryButton href="/joined-events" variant="outline" className="flex-1 min-w-[140px] gap-2">
                  <CheckCircle2 className="size-4" />
                  <span>Joined Events</span>
                </PrimaryButton>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile"
        >
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <FormField
              label="Your Full Name"
              htmlFor="editName"
              required
              hint="As you want it shown on your profile"
              error={nameError}
            >
              <Input
                id="editName"
                type="text"
                required
                value={editName}
                onChange={(e) => {
                  setEditName(e.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder="Your full name"
              />
            </FormField>

            <FormField
              label="Profile Photo Link"
              htmlFor="editImage"
              optional
              hint="Paste a direct image link, or leave empty to clear"
            >
              <Input
                id="editImage"
                type="url"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="https://images.unsplash.com/... (leave blank to clear)"
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <PrimaryButton
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton type="submit" disabled={isUpdating}>
                {isUpdating ? (
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