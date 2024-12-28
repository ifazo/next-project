"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { ProductQuickView } from "./product-quickview";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          userEmail: session?.user?.email,
        }),
      });
      toast({
        title: "Success",
        description: "Product added to wishlist.",
      });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <ProductQuickView product={product}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Eye className="h-5 w-5" />
            <span className="sr-only">Quick view</span>
          </Button>
        </ProductQuickView>
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute left-2 top-2">
            Out of Stock
          </Badge>
        )}
        {product.stock < 50 && product.stock > 0 && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            Low Stock
          </Badge>
        )}
        {product.stock >= 50 && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            In Stock
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              {product.name.length > 15
                ? `${product.name.slice(0, 20)}...`
                : product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.shopName}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => handleAddToWishlist()} className="w-full">
        <Heart className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Adding...' : 'Add to wishlist'}
        </Button>
      </CardFooter>
    </Card>
  );
}
