import Image from "next/image";
import Link from "next/link";
import { Store, ArrowRight, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shop } from "@prisma/client";

export async function FeaturedShops() {
  const res = await fetch(`${process.env.BASE_URL}/api/shops/random`, {
    cache: "no-cache",
  });
  const shops = await res.json();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Shops
            </h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of top-rated shops
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/shops">
              View all shops
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop: Shop) => (
            <Card key={shop.id} className="group">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-xl">{shop.name}</h3>
                  <Badge variant="secondary">
                    <Store className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {shop.details}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{shop.address}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/shops/${shop.id}`}>
                    Visit Shop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {shops.length === 0 && (
          <div className="text-center py-12">
            <Store className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No featured shops</h3>
            <p className="text-muted-foreground">
              Check back later for featured shops.
            </p>
          </div>
        )}

        <Button asChild variant="ghost" className="w-full mt-8 md:hidden">
          <Link href="/shops">
            View all shops
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
