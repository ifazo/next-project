import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { Package } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ShopProductsPage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const email = session?.user?.email;

  const shopRes = await fetch(
    `${process.env.BASE_URL}/api/shops?sellerEmail=${email}`,
    {
      cache: "no-cache",
    }
  );
  const shop = await shopRes.json();

  if (!shop) {
    redirect("/dashboard/seller/shop");
  }

  const productsRes = await fetch(
    `${process.env.BASE_URL}/api/products?shopNames=${shop.name}`,
    {
      cache: "no-cache",
    }
  );
  const data = await productsRes.json();

  if (!data) {
    redirect("/dashboard/seller/shop");
  }

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-bold mb-6">Shop Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.products.map((product: Product) => (
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
              <div className="flex flex-row gap-2">
                <Button variant="outline" className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  Edit Product
                </Button>
                <Button variant="outline" className="w-full text-destructive bg-destructive-foreground hover:text-destructive-foreground hover:bg-destructive">
                  <Package className="h-4 w-4 mr-2" />
                  Delete Product
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {data.totalProducts === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No products found</h3>
          <p className="text-muted-foreground">
            This shop hasn&apos;t added any products yet.
          </p>
        </div>
      )}
    </div>
  );
}
