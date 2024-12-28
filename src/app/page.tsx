import BrowseCategories from "@/components/browse-categories";
import FeaturedShops from "@/components/featured-shops";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedShops />
      <BrowseCategories />
    </div>
  );
}
