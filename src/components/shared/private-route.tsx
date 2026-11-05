"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PageSkeleton } from "@/components/ui/page-skeleton";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <PageSkeleton />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
