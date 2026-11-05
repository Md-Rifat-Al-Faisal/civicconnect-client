import { Suspense } from "react";
import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { RecentEvents } from "@/components/home/recent-events";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";
import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-16">
      <Banner />
      <Features />
      <Suspense fallback={<PageSkeleton />}>
        <RecentEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </div>
  );
}
