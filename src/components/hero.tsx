import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "./ui/icons";

export function Hero() {
  return (
    <section className="relative">
      {/* Background with overlay */}
      {/* <div className="absolute inset-0">
        <Image
            height={800}
            width={1600}
          src="/img/bg-image.jpg"
          alt="Background"
          className="object-cover object-center -z-10 opacity-75"
          priority
        />
      </div> */}

      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge className="inline-block" variant="secondary">
                New Collection 2024
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Your Perfect Style
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:mx-0">
                Explore our curated collection of premium fashion items. Quality
                meets style in every piece.
              </p>
            </div>

            <div className="mx-auto flex flex-col gap-4 min-[400px]:flex-row lg:mx-0">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/shops">
                  View Shops <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mx-auto flex items-center justify-center gap-4 lg:mx-0 lg:justify-start">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-background flex items-center justify-center">
                  <Icons.apple className="h-6 w-6 text-current" />
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-background flex items-center justify-center">
                  <Icons.twitter className="h-6 w-6 text-current" />
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-background flex items-center justify-center">
                  <Icons.paypal className="h-6 w-6 text-current" />
                </div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Over 2k+ happy customers</div>
                <div className="flex items-center text-muted-foreground">
                  <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                  4.8/5 ratings
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-md gap-4 lg:max-w-none">
            <Card>
              <CardContent className="flex gap-4 p-6">
                <Image
                  src="/img/bg-image.jpg"
                  alt="Featured Product"
                  width={200}
                  height={200}
                  className="aspect-square rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <Badge>Featured</Badge>
                  <h3 className="font-semibold">Premium Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover our handpicked selection of premium items
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">$299</div>
                    <Badge variant="secondary" className="line-through">
                      $399
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Free Shipping",
                  description: "On orders over $100",
                },
                {
                  title: "Money Back",
                  description: "30 day guarantee",
                },
                {
                  title: "Secure Payments",
                  description: "Powered by Stripe",
                },
                {
                  title: "24/7 Support",
                  description: "Live chat & phone",
                },
              ].map((feature, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
