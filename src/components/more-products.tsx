import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@prisma/client";

export default async function MoreProducts({
  shopName,
  currentProductId,
}: {
  shopName: string;
  currentProductId: string;
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products?shopNames=${shopName}`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();

  const filteredProducts = data.products.filter(
    (product: Product) => product.id !== currentProductId
  );

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          More product from this shop
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <Card key={product.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="p-4 flex flex-col gap-2">
                <h3 className="font-medium">{product.name}</h3>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/products/${product.id}`}>Visit</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
