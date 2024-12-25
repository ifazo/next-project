"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { Category, Product, Shop } from "@prisma/client";

export function ProductFilters({
  setProducts,
  setTotalProducts,
}: {
  setProducts: (products: Product[]) => void;
  setTotalProducts: (total: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const shopResponse = await fetch("/api/shops");
        const categoryResponse = await fetch("/api/categories");
        const shopData = await shopResponse.json();
        const categoryData = await categoryResponse.json();
        setShops(shopData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleShopChange = (shop: string) => {
    setSelectedShops((prev) =>
      prev.includes(shop) ? prev.filter((s) => s !== shop) : [...prev, shop]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const clearAllFilters = async () => {
    setPriceRange([0, 1000]);
    setSelectedShops([]);
    setSelectedCategories([]);
  
    await applyFilters({
      minPrice: 0,
      maxPrice: 1000,
      shopNames: [],
      categorySlugs: [],
    });
  };
  
  const applyFilters = async ({
    minPrice = priceRange[0],
    maxPrice = priceRange[1],
    shopNames = selectedShops,
    categorySlugs = selectedCategories,
  } = {}) => {
    const queryParams = new URLSearchParams();
  
    queryParams.set("minPrice", minPrice.toString());
    queryParams.set("maxPrice", maxPrice.toString());
  
    if (shopNames.length > 0) {
      queryParams.set("shopNames", shopNames.join(","));
    }
    if (categorySlugs.length > 0) {
      queryParams.set("categorySlugs", categorySlugs.join(","));
    }
  
    try {
      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered products");
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
      setIsOpen(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };  

  const FilterContent = () => (
    <>
      <Button
        onClick={clearAllFilters}
        variant="outline"
        className="w-full mb-4"
      >
        Clear All Filters
      </Button>
      <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Shops</h3>
          {shops.map((shop) => (
            <div key={shop.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`shop-${shop.id}`}
                checked={selectedShops.includes(shop.name)}
                onCheckedChange={() => handleShopChange(shop.name)}
              />
              <label
                htmlFor={`shop-${shop}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {shop.name}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryChange(category.slug)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => applyFilters()} className="w-full mt-4">
        Apply Filters
      </Button>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Filter Products</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Adjust your product filters here.
              </SheetDescription>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      ) : (
        <div className="bg-background border rounded-lg p-6 w-[300px] max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-background z-10 pb-2">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <FilterContent />
        </div>
      )}
    </>
  );
}
