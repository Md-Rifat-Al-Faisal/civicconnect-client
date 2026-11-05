import { Suspense } from "react";
import { Banner } from "@/components/home/banner";
import { AboutUs } from "@/components/home/about-us";
import { RecentEvents } from "@/components/home/recent-events";
import { StatsBar } from "@/components/home/stats-bar";
import { Gallery } from "@/components/home/gallery";
import { Partners } from "@/components/home/partners";
import { Newsletter } from "@/components/home/newsletter";
import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Home() {
  return (
    <div className="flex flex-col gap-14 sm:gap-20 pb-16">
      <Banner />

      <AboutUs />

      <Suspense fallback={<PageSkeleton />}>
        <RecentEvents />
      </Suspense>

      <StatsBar />

      <Gallery />

      <Partners />

      <Newsletter />
    </div>
  );
}
