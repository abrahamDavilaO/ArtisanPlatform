import { Navbar } from "@/components/sections/Navbar";
import { AnimatedHero } from "@/components/sections/AnimatedHero";
import { Furniture } from "@/components/sections/Furniture";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { About } from "@/components/sections/About";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { getAllCategories, getFeaturedArtPieces } from "@/app/actions/database";

export default async function Home() {
  const [categories, artPieces] = await Promise.all([
    getAllCategories(),
    getFeaturedArtPieces(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnimatedHero />
      <Furniture categories={categories} />
      <ArtGallery pieces={artPieces} />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}
