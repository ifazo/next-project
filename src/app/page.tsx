import BrowseCategories from "@/components/browse-categories";
import { FeaturedShops } from "@/components/featured-shops";
import { Hero } from "@/components/hero";

export default function Home() {

  return (
    <div>
      <Hero />
      <FeaturedShops />
      <BrowseCategories />
    </div>
  );
}
