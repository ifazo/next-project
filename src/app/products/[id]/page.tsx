import Image from "next/image"
import { Star, Truck, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {[...Array(5)].map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={`/placeholder.svg?text=Product+Image+${index + 1}`}
                    alt={`Product Image ${index + 1}`}
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
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src={`/placeholder.svg?text=Thumb+${index + 1}`}
                alt={`Thumbnail ${index + 1}`}
                width={60}
                height={60}
                className="rounded-md object-cover cursor-pointer hover:ring-2 hover:ring-primary"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Premium Leather Wallet</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.8 (120 reviews)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">$89.99</div>
            <div className="text-sm text-gray-600 line-through">$120.00</div>
            <div className="text-sm font-medium text-green-600">You save $30.01 (25%)</div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div>
              <Label htmlFor="color">Color</Label>
              <RadioGroup id="color" defaultValue="black" className="flex gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="black" id="black" />
                  <Label htmlFor="black">Black</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="brown" id="brown" />
                  <Label htmlFor="brown">Brown</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tan" id="tan" />
                  <Label htmlFor="tan">Tan</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center mt-2">
                <Button variant="outline" size="icon">-</Button>
                <Input
                  id="quantity"
                  type="number"
                  className="w-20 text-center mx-2"
                  value="1"
                  readOnly
                />
                <Button variant="outline" size="icon">+</Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Button className="w-full">Add to Cart</Button>
            <Button variant="outline" className="w-full">Add to Wishlist</Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $100</span>
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
          <p>
            Our Premium Leather Wallet is crafted from the finest Italian leather, offering both style and durability. 
            With multiple card slots, a bill compartment, and RFID protection, it&apos;s the perfect blend of fashion and function.
          </p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>Material: Genuine Italian leather</li>
            <li>Dimensions: 4.5&quot; x 3.5&quot; x 0.5&quot;</li>
            <li>Card slots: 6</li>
            <li>Bill compartment: 1</li>
            <li>RFID protection: Yes</li>
            <li>Warranty: 2 years</li>
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
                        <Star key={starIndex} className="w-4 h-4 fill-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Great wallet! The leather quality is excellent, and it has plenty of space for all my cards.
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">
              Load More Reviews
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

