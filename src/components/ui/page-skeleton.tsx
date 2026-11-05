import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-72 max-w-full" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-sm border-2 border-border bg-card p-4 shadow-none"
          >
            <Skeleton className="aspect-video w-full rounded-sm" />
            <div className="mt-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Skeleton className="h-8 w-24 rounded-sm" />
              <Skeleton className="h-8 w-24 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
