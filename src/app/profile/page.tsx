"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  FolderKanban,
  PlusCircle,
  Sparkles,
  Pencil,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { PrivateRoute } from "@/components/shared/private-route";
import {
  AnimatedCard,
  PrimaryButton,
  SectionHeading,
} from "@/components/shared/theme-ui";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
      toast.error("Full name cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await authClient.updateUser({
        name: editName,
        image: editImage.trim() ? editImage.trim() : undefined,
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
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
              <Avatar className="size-24 rounded-sm border-2 border-border shadow-none">
                {user?.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "User"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="size-full rounded-sm bg-blue-600 text-3xl font-extrabold text-white">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    {user?.name || "Community Volunteer"}
                  </h2>
                  <Badge variant="default" className="gap-1 font-semibold">
                    <ShieldCheck className="size-3.5" />
                    <span>{userRole}</span>
                  </Badge>
                </div>

                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
                  <Mail className="size-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{user?.email || "No email available"}</span>
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Joined {memberSince}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Verified Account</span>
                  </div>
                </div>

                <div className="mt-5 flex justify-center sm:justify-start">
                  <PrimaryButton
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditModalOpen(true)}
                    className="gap-2 text-xs py-1.5"
                  >
                    <Pencil className="size-3.5" />
                    <span>Edit Profile</span>
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-border pt-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
                Account Information
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-sm border-2 border-border bg-muted/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <UserIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Full Name</span>
                  </span>
                  <p className="mt-1.5 font-bold text-foreground">
                    {user?.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-sm border-2 border-border bg-muted/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Mail className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Email Address</span>
                  </span>
                  <p className="mt-1.5 truncate font-bold text-foreground">
                    {user?.email || "Not provided"}
                  </p>
                </div>

                <div className="rounded-sm border-2 border-border bg-muted/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Membership Status</span>
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-bold text-foreground">{userRole}</span>
                    <span className="inline-block size-2 rounded-full bg-blue-600"></span>
                  </div>
                </div>

                <div className="rounded-sm border-2 border-border bg-muted/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Impact Recognition</span>
                  </span>
                  <p className="mt-1.5 font-bold text-foreground">
                    Active Volunteer
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t-2 border-border pt-6">
              <h3 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
                Quick Navigation
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/create-event" className="flex-1 min-w-[140px]">
                  <PrimaryButton className="w-full gap-2">
                    <PlusCircle className="size-4" />
                    <span>Host Drive</span>
                  </PrimaryButton>
                </Link>
                <Link href="/manage-events" className="flex-1 min-w-[140px]">
                  <PrimaryButton variant="outline" className="w-full gap-2">
                    <FolderKanban className="size-4" />
                    <span>Manage Drives</span>
                  </PrimaryButton>
                </Link>
                <Link href="/joined-events" className="flex-1 min-w-[140px]">
                  <PrimaryButton variant="outline" className="w-full gap-2">
                    <CheckCircle2 className="size-4" />
                    <span>Joined Events</span>
                  </PrimaryButton>
                </Link>
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
            <div className="space-y-1.5">
              <Label htmlFor="editName" className="flex items-center gap-1.5">
                <UserIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Full Name</span>
              </Label>
              <Input
                id="editName"
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="editImage" className="flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Profile Picture URL</span>
              </Label>
              <Input
                id="editImage"
                type="url"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

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
