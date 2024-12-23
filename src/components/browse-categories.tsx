import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@prisma/client";
import { ArrowRight } from "lucide-react";

export default async function BrowseCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api/categories/random`, {
    cache: "no-cache",
  });
  const categories = await res.json();

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
      <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
              <p className="text-muted-foreground">
                Explore our collection of products across various categories
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {categories.map((category: Category) => (
              <Card
                key={category.id}
                className="group overflow-hidden border-0"
              >
                <CardContent className="p-0">
                  <Link href={`/categories/${category.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-black/0 p-6 text-white">
                        <h3 className="mb-2 text-xl font-bold">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/90">
                          {category.details}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
