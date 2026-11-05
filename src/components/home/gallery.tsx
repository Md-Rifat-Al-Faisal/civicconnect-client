"use client";

import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";
import { SectionHeading } from "@/components/shared/theme-ui";
import { SafeImage } from "@/components/shared/safe-image";

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
    imageUrl: "/gallery/gallery-1.jpg",
  },
  {
    id: "gal-2",
    title: "Urban Reforestation & Sapling Care",
    category: "Environment",
    location: "Ramna Park, Dhaka",
    imageUrl: "/gallery/gallery-2.jpg",
  },
  {
    id: "gal-3",
    title: "Warm Meal Serving for Night Workers",
    category: "Food Relief",
    location: "Sadarghat, Old Dhaka",
    imageUrl: "/gallery/gallery-3.jpg",
  },
  {
    id: "gal-4",
    title: "Voluntary Mobile Blood Drive",
    category: "Healthcare",
    location: "Uttara, Dhaka",
    imageUrl: "/gallery/gallery-4.jpg",
  },
  {
    id: "gal-5",
    title: "Community Lake Shore Clean-Up",
    category: "Cleanliness",
    location: "Dhanmondi, Dhaka",
    imageUrl: "/gallery/gallery-5.jpg",
  },
  {
    id: "gal-6",
    title: "Backpack & Literacy Station",
    category: "Education",
    location: "Korail, Banani, Dhaka",
    imageUrl: "/gallery/gallery-6.jpg",
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
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:shadow-lift"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
              <SafeImage
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95 z-10" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white z-20">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-xs px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-xs">
                  <Tag className="h-3 w-3" />
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-white group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
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