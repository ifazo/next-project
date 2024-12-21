import Image from "next/image";
import { Star, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoreProducts from "@/components/more-products";
import ColorQuantitySelector from "@/components/color-quantity-selector";

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
        <div className="space-y-4">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {product.images.map(({ image }: { image: string }) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt="Product main image"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-center space-x-2">
            {product.images.map(({ image }: { image: string }) => (
              <Image
                key={image}
                src={image}
                alt="card image"
                width={60}
                height={60}
                className="rounded-md object-cover cursor-pointer hover:ring-2 hover:ring-primary"
              />
            ))}
          </div>
        </div>
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
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">John Doe</div>
                    <div className="flex">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="w-4 h-4 fill-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Great wallet! The leather quality is excellent, and it has
                    plenty of space for all my cards.
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              Post Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      <MoreProducts shopName={product.shopName} currentProductId={id} />
    </div>
  );
}
