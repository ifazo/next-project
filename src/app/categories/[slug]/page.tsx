import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag, Package, Calendar, ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/categories/${slug}`, {
    cache: "no-cache",
  });
  const category = await res.json();

  if (!category) {
    notFound();
  }

  const productsRes = await fetch(
    `${process.env.BASE_URL}/api/products?categorySlug=${category.slug}`,
    {
      cache: "no-cache",
    }
  );
  const products = await productsRes.json();

  return (
    <div className="container mx-auto py-10">
      <Link
        href="/categories"
        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Categories
      </Link>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader className="p-0">
            <div className="relative h-64 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-3xl mb-2">{category.name}</CardTitle>
                <p className="text-muted-foreground">{category.details}</p>
              </div>
              <Badge variant="secondary" className="text-lg py-1">
                <Tag className="h-5 w-5 mr-2" />
                Category
              </Badge>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Created {new Date(category.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {products.length} Products
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">
            Products in {category.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <Card key={product.id}>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="font-bold">${product.price.toFixed(2)}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                There are no products in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
