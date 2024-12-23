import { Star, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoreProducts from "@/components/more-products";
import ColorQuantitySelector from "@/components/color-quantity-selector";
import { ProductReviews } from "@/components/product-reviews";
import ProductImages from "@/components/product-images";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
    cache: "no-cache",
  });
  const product = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <ProductImages images={product.images} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                4.8 (120 reviews)
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">${product.price}</div>
            {/* <div className="text-sm text-gray-600 line-through">${product.price}</div> */}
            {/* <div className="text-sm font-medium text-green-600">You save $30.01 (25%)</div> */}
          </div>
          <Separator />
          <ColorQuantitySelector product={product} />
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-5 h-5" />
                <span>Product will shipping by: {product.shopName}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <p>{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            {product.specifications.map((specification: string) => (
              <li key={specification}>{specification}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <ProductReviews productId={id} />
        </TabsContent>
      </Tabs>
      <hr className="my-4" />
      <MoreProducts shopName={product.shopName} currentProductId={id} />
    </div>
  );
}
