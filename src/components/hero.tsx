"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Store } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Product } from "@prisma/client";

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products/random");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 lg:w-1/2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ifaz next E-Commerce Solution
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[600px] lg:max-w-none">
                Buy unique products or sell own creations. Join our thriving
                marketplace today!
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products" className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products" className="flex items-center">
                  <Store className="mr-2 h-5 w-5" />
                  Start Selling
                </Link>
              </Button>
            </div>
          </div>
          <Card className="w-full mt-8 lg:mt-0 lg:w-1/2">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Featured Products</h3>
              <div className="grid grid-cols-2 gap-4">
                {isLoading
                  ? Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="aspect-square" />
                      ))
                  : products.slice(0, 4).map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="relative aspect-square rounded-md overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      </Link>
                    ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 w-full"
              >
                View All Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
