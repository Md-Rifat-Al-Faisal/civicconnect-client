"use client";

import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";
import { SectionHeading } from "@/components/shared/theme-ui";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Mirpur 10 Winter Care Drive",
    category: "Winter Relief",
    location: "Mirpur, Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1593113512602-0e2069c4dd8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gal-2",
    title: "Urban Reforestation & Sapling Care",
    category: "Environment",
    location: "Ramna Park, Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gal-3",
    title: "Warm Meal Serving for Night Workers",
    category: "Food Relief",
    location: "Sadarghat, Old Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gal-4",
    title: "Voluntary Mobile Blood Drive",
    category: "Healthcare",
    location: "Uttara, Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gal-5",
    title: "Community Lake Shore Clean-Up",
    category: "Cleanliness",
    location: "Dhanmondi, Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gal-6",
    title: "Backpack & Literacy Station",
    category: "Education",
    location: "Korail, Banani, Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=800&auto=format&fit=crop",
  },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        centered
        title="Impact Gallery"
        subtitle="Memories of compassion, unity, and hands-on grassroots action across our cities."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-xs">
                  <Tag className="h-3 w-3" />
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
