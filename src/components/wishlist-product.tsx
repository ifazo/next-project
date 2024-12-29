"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";
import { Package, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductQuickView } from "./product-quickview";

export default function WishlistProduct({
  id,
  productId,
  email,
}: {
  id: string;
  productId: string;
  email: string;
}) {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Error loading product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (!email) {
      toast({
        title: "Error",
        description:
          "You must be signed in to remove a product from your wishlist",
        variant: "destructive",
      });
      return;
    }
    try {
      await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          email,
        },
      });
      setProduct(null);
      toast({
        title: "Success",
        description: "Product removed from wishlist",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An unexpected error occurred: " + err + ".",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <Card>
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
        <CardFooter className="px-4 py-2 flex flex-row gap-2 justify-center items-center">
          <ProductQuickView product={product}>
          <Button variant="outline" className="w-full">
            <Package className="h-4 w-4 mr-2" />
            View Product
          </Button>
          </ProductQuickView>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="w-full text-destructive bg-destructive-foreground hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash className="h-4 w-4 mr-2" />
            Remove Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
