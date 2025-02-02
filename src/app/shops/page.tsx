import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Store } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shop } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

async function ShopsContent() {
  const res = await fetch(`${process.env.BASE_URL}/api/shops`, {
    cache: "no-cache",
  });
  const shops = await res.json();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shops</h1>
          <p className="text-muted-foreground">Browse all available shops</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop: Shop) => (
          <Card key={shop.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={shop.image}
                  alt="Shop Image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl">{shop.name}</CardTitle>
                <Badge variant="secondary">
                  <Store className="h-3 w-3 mr-1" />
                  Shop
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {shop.details.length > 50
                  ? `${shop.details.slice(0, 50)}...`
                  : shop.details}
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-1">{shop.address}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Added {new Date(shop.createdAt).toLocaleDateString()}
              </div>
              <Link
                href={`/shops/${shop.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View Shop →
              </Link>
            </CardFooter>
          </Card>
        ))}
        {shops.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Store className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No shops found</h2>
            <p className="text-muted-foreground">
              There are no shops available at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopsPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<ShopsPageSkeleton />}>
        <ShopsContent />
      </Suspense>
    </div>
  );
}

function ShopsPageSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-5 w-48" />
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
                <Skeleton className="h-6 w-24" />
                <Badge variant="secondary">
                  <Store className="h-3 w-3 mr-1" />
                  Shop
                </Badge>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
