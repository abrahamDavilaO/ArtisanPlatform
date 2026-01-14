import { Navbar } from "@/components/sections/Navbar";
import { AnimatedHero } from "@/components/sections/AnimatedHero";
import { Collections } from "@/components/sections/Collections";
import { Furniture } from "@/components/sections/Furniture";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { About } from "@/components/sections/About";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnimatedHero />
      <Collections />
      <Furniture />
      <ArtGallery />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}
