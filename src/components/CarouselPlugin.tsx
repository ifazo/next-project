"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sentences = [
  "Welcome to our website! Discover the latest trends in tech.",
  "Our products are designed to make your life easier and more enjoyable.",
  "Check out our new collection of gadgets and accessories.",
  "Join us on our journey to innovate and inspire.",
  "Contact us for personalized recommendations and support.",
];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="relative w-full max-w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="flex">
          {sentences.map((sentence, index) => (
            <CarouselItem
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <div className="flex items-center justify-center p-4">
                <Card className="flex h-full w-full items-center justify-center">
                  <CardContent className="aspect-square flex items-center justify-center p-6">
                    <span className="text-lg font-semibold">{sentence}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform" />
      </Carousel>
    </div>
  );
}
