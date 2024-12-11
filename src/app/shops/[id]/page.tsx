import Image from "next/image";
import { notFound } from "next/navigation";
import { Store, MapPin, Mail, Calendar, Package } from "lucide-react";

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

export default async function ShopByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const shopRes = await fetch(
    `${process.env.BASE_URL}/api/shops/${params.id}`,
    {
      cache: "no-cache",
    }
  );
  const shop = await shopRes.json();

  if (!shop) {
    notFound();
  }

  const productsRes = await fetch(`${process.env.BASE_URL}/api/products?shopName=${shop.name}`, {
    cache: "no-cache",
  });
  const products = await productsRes.json();

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader className="p-0">
            <div className="relative h-64 w-full">
              <Image
                src={shop.image}
                alt={shop.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-3xl mb-2">{shop.name}</CardTitle>
                <p className="text-muted-foreground">{shop.details}</p>
              </div>
              <Badge variant="secondary" className="text-lg py-1">
                <Store className="h-5 w-5 mr-2" />
                Shop
              </Badge>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{shop.address}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{shop.sellerEmail}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>
                  Joined {new Date(shop.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <Card key={product.id}>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
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
                  <Button className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                This shop hasn&apos;t added any products yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
