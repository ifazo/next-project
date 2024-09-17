import { CarouselPlugin } from "@/components/CarouselPlugin";
import CategoriesOverview from "@/components/CategoriesOverview";
import ProductCarousel from "@/components/ProductCarousel";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <CarouselPlugin />
      <CategoriesOverview />
      <ProductCarousel />
    </div>
  )
}
