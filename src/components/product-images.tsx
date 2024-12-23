"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

//   const handleNext = () => {
//     setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrevious = () => {
//     setSelectedImageIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

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
        {/* <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} /> */}
      </Carousel>

      <div className="flex justify-center space-x-2">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail image ${index + 1}`}
            width={60}
            height={60}
            className={`rounded-md object-cover cursor-pointer hover:ring-2 ${
              selectedImageIndex === index ? "ring-primary ring-2" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
