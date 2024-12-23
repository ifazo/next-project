"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function ProductImages({ images }: { images: string[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="space-y-4">
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          <CarouselItem>
            <Image
              src={images[selectedImageIndex]}
              alt={`Product main image ${selectedImageIndex + 1}`}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center space-x-2">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail image ${index + 1}`}
            width={60}
            height={60}
            className={`rounded-md object-cover cursor-pointer ${
              selectedImageIndex === index ? "ring-primary ring-2" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
