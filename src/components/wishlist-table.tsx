import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Product, Wishlist } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function getWishlist(email: string): Promise<Wishlist[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/wishlist?userEmail=${email}`
  );
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

export async function WishlistTable() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/sign-in");
  }
  const wishlistItems = await getWishlist(email);
  const productPromises = wishlistItems.map((item) =>
    getProduct(item.productId)
  );
  const products = await Promise.all(productPromises);

  if (products.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product: Product) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.shopName}</p>
            <p className="font-bold mb-2">${product.price.toFixed(2)}</p>
            <p className="text-sm mb-2">
              Stock:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </p>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {/* <span>{product.rating.toFixed(1)}</span> */}
              <span>4</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Product</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
