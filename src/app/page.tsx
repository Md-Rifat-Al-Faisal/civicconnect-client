import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Banner />
      <Features />
      <div className="py-2" />
      <Newsletter />
    </div>
  );
}
