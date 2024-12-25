import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

async function CategoriesContent() {
  const res = await fetch(`${process.env.BASE_URL}/api/categories`, {
    cache: "no-cache",
  });
  const categories = await res.json();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Browse all product categories</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <Badge variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  Category
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {category.details}
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Added {new Date(category.createdAt).toLocaleDateString()}
              </div>
              <Button asChild variant="ghost" className="text-sm font-medium">
                <Link href={`/categories/${category.id}`}>
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No categories found</h2>
            <p className="text-muted-foreground">
              There are no product categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<CategoriesPageSkeleton />}>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}

function CategoriesPageSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-9 w-40 mb-2" />
          <Skeleton className="h-5 w-56" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Badge variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  Category
                </Badge>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Button variant="ghost" className="text-sm font-medium" disabled>
                <Skeleton className="h-4 w-24 mr-2" />
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
