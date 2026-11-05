import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Tag,
  User,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JoinButton } from "@/components/events/join-button";
import { IEvent } from "@/lib/types/event";

export const dynamic = "force-dynamic";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

const fallbackSeeds: Record<string, IEvent> = {
  "seed-1": {
    _id: "seed-1",
    title: "Winter Clothes Distribution Mirpur 10",
    description: "Collecting and handing out warm winter jackets, sweaters, and blankets for vulnerable families and street children in Mirpur 10. Bring pre-loved warm clothes or join us in sorting, packaging, and distributing relief packs to individuals enduring chilly winter nights across urban hubs.",
    eventType: "Winter Relief",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    location: "Mirpur 10 Roundabout, Dhaka",
    date: "2026-11-20",
    creatorName: "Community Action Dhaka",
    creatorEmail: "action@civicconnect.org",
  },
  "seed-2": {
    _id: "seed-2",
    title: "Mohammadpur Warm Blanket Drive",
    description: "Distributing quality thick blankets to elderly residents and displaced families living near the Mohammadpur embankment area. Volunteers will assemble at Town Hall ground before distributing packages directly to underprivileged households.",
    eventType: "Charity",
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbd58eea6d?q=80&w=800&auto=format&fit=crop",
    location: "Town Hall Ground, Mohammadpur, Dhaka",
    date: "2026-11-22",
    creatorName: "Care Network",
    creatorEmail: "care@civicconnect.org",
  },
  "seed-3": {
    _id: "seed-3",
    title: "Ramna Green Tree Plantation Campaign",
    description: "Planting native shade and fruit trees around Ramna to boost urban biodiversity and foster environmental stewardship among youth. Gardening gloves, tools, and saplings will be provided on site.",
    eventType: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop",
    location: "Ramna Park Main Entrance, Dhaka",
    date: "2026-11-25",
    creatorName: "Green Earth Dhaka",
    creatorEmail: "green@civicconnect.org",
  },
  "seed-4": {
    _id: "seed-4",
    title: "Uttara Voluntary Blood Donation Camp",
    description: "Join registered doctors and voluntary donors to support thalassemia patients and emergency units across public hospitals. Safe screening and post-donation refreshments will be administered by certified medical professionals.",
    eventType: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=800&auto=format&fit=crop",
    location: "Sector 7 Community Center, Uttara, Dhaka",
    date: "2026-11-28",
    creatorName: "LifeLine Volunteers",
    creatorEmail: "lifeline@civicconnect.org",
  },
  "seed-5": {
    _id: "seed-5",
    title: "Dhanmondi Lake Clean-Up Drive",
    description: "Volunteer morning dedicated to plastic waste removal, trash segregation, and spreading lake conservation awareness among morning walkers and lakeside visitors.",
    eventType: "Cleanliness",
    imageUrl: "https://images.unsplash.com/photo-1617260814674-f2a875a5cb33?q=80&w=800&auto=format&fit=crop",
    location: "Dhanmondi Lake Amphitheater, Dhaka",
    date: "2026-12-02",
    creatorName: "Eco Warriors BD",
    creatorEmail: "ecowarriors@civicconnect.org",
  },
  "seed-6": {
    _id: "seed-6",
    title: "Free School Supplies & Bag Drive",
    description: "Providing backpacks, notebooks, pens, and storybooks to underprivileged children enrolled in informal slum schools. Help pack stationery kits and inspire youth through early literacy.",
    eventType: "Education",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
    location: "Korail Slum Learning Center, Banani, Dhaka",
    date: "2026-12-05",
    creatorName: "Light for Tomorrow",
    creatorEmail: "light@civicconnect.org",
  },
};

async function getEvent(id: string): Promise<IEvent | null> {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, { cache: "no-store" });
    if (!res.ok) {
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, { cache: "no-store" });
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {}

  if (fallbackSeeds[id]) {
    return fallbackSeeds[id];
  }

  return null;
}

export async function generateMetadata({ params }: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) {
    return {
      title: "Event Not Found - CivicConnect",
    };
  }
  return {
    title: `${event.title} - CivicConnect`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/upcoming-events"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Upcoming Initiatives</span>
      </Link>

      <div className="relative aspect-21/9 w-full overflow-hidden rounded-sm border-2 border-border bg-muted shadow-none">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="default" className="px-3 py-1 text-xs font-semibold shadow-none">
            {event.eventType}
          </Badge>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {event.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-sm border-2 border-border bg-card p-5 shadow-none sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Calendar className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </p>
              <p className="text-sm font-semibold text-foreground">
                {event.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {event.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <User className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Organized By
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {event.creatorName || "Community Member"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Tag className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {event.eventType}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-sm border-2 border-border bg-card p-6 shadow-none sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            About This Social Initiative
          </h2>
          <div className="mt-4 text-base leading-relaxed text-muted-foreground">
            {event.description}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-sm border-2 border-blue-500/30 bg-blue-500/5 p-6 shadow-none sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Ready to take action in your community?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Join fellow volunteers on site and help make this initiative a success.
            </p>
          </div>
          <JoinButton event={event} />
        </div>
      </div>
    </div>
  );
}
