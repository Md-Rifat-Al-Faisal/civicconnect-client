import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <PageSkeleton />
    </div>
  );
}
