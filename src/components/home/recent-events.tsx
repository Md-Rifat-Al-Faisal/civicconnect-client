import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading, PrimaryButton } from "@/components/shared/theme-ui";
import { EventCard } from "@/components/shared/event-card";
import { IEvent } from "@/lib/types/event";

const fallbackEvents: IEvent[] = [
  {
    _id: "seed-1",
    title: "Winter Clothes Distribution Mirpur 10",
    description: "Collecting and handing out warm winter jackets, sweaters, and blankets for vulnerable families and street children in Mirpur 10.",
    eventType: "Winter Relief",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    location: "Mirpur 10 Roundabout, Dhaka",
    date: "2026-11-20",
    creatorName: "Community Action Dhaka",
  },
  {
    _id: "seed-2",
    title: "Mohammadpur Warm Blanket Drive",
    description: "Distributing quality thick blankets to elderly residents and displaced families living near the Mohammadpur embankment area.",
    eventType: "Charity",
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbd58eea6d?q=80&w=800&auto=format&fit=crop",
    location: "Town Hall Ground, Mohammadpur, Dhaka",
    date: "2026-11-22",
    creatorName: "Care Network",
  },
  {
    _id: "seed-3",
    title: "Ramna Green Tree Plantation Campaign",
    description: "Planting native shade and fruit trees around Ramna to boost urban biodiversity and foster environmental stewardship among youth.",
    eventType: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop",
    location: "Ramna Park Main Entrance, Dhaka",
    date: "2026-11-25",
    creatorName: "Green Earth Dhaka",
  },
  {
    _id: "seed-4",
    title: "Uttara Voluntary Blood Donation Camp",
    description: "Join registered doctors and voluntary donors to support thalassemia patients and emergency units across public hospitals.",
    eventType: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=800&auto=format&fit=crop",
    location: "Sector 7 Community Center, Uttara, Dhaka",
    date: "2026-11-28",
    creatorName: "LifeLine Volunteers",
  },
  {
    _id: "seed-5",
    title: "Dhanmondi Lake Clean-Up Drive",
    description: "Volunteer morning dedicated to plastic waste removal, trash segregation, and spreading lake conservation awareness.",
    eventType: "Cleanliness",
    imageUrl: "https://images.unsplash.com/photo-1617260814674-f2a875a5cb33?q=80&w=800&auto=format&fit=crop",
    location: "Dhanmondi Lake Amphitheater, Dhaka",
    date: "2026-12-02",
    creatorName: "Eco Warriors BD",
  },
  {
    _id: "seed-6",
    title: "Free School Supplies & Bag Drive",
    description: "Providing backpacks, notebooks, pens, and storybooks to underprivileged children enrolled in informal slum schools.",
    eventType: "Education",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
    location: "Korail Slum Learning Center, Banani, Dhaka",
    date: "2026-12-05",
    creatorName: "Light for Tomorrow",
  },
];

async function getRecentEvents(): Promise<IEvent[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return fallbackEvents;
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}

export async function RecentEvents() {
  const events = await getRecentEvents();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading
          title="Recent Initiatives"
          subtitle="Explore the latest social development drives organized by dedicated community changemakers."
        />
        <Link href="/upcoming-events">
          <PrimaryButton variant="outline" className="hidden md:inline-flex">
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.slice(0, 6).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/upcoming-events" className="w-full">
          <PrimaryButton variant="outline" className="w-full">
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
