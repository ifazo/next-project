'use client'

import * as React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// Example product data (15 items)
const products = [
    { name: 'Smartphone', category: 'Electronics', price: '$699', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Laptop', category: 'Electronics', price: '$1,299', availability: 'Sold Out', imageUrl: '/img/logo.png' },
    { name: 'Headphones', category: 'Audio', price: '$299', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Smartwatch', category: 'Wearables', price: '$199', availability: 'Sold Out', imageUrl: '/img/logo.png' },
    { name: 'Camera', category: 'Photography', price: '$499', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Tablet', category: 'Electronics', price: '$399', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'TV', category: 'Home Entertainment', price: '$999', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Game Console', category: 'Gaming', price: '$499', availability: 'Sold Out', imageUrl: '/img/logo.png' },
    { name: 'Speaker', category: 'Audio', price: '$149', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Fitness Tracker', category: 'Wearables', price: '$99', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Drone', category: 'Photography', price: '$799', availability: 'Sold Out', imageUrl: '/img/logo.png' },
    { name: 'Smart Light', category: 'Home Automation', price: '$49', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Microwave', category: 'Appliances', price: '$299', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Coffee Maker', category: 'Appliances', price: '$149', availability: 'In Stock', imageUrl: '/img/logo.png' },
    { name: 'Vacuum Cleaner', category: 'Home Appliances', price: '$399', availability: 'Sold Out', imageUrl: '/img/logo.png' },
]

export default function ProductCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % (products.length - 4)) // Loop over the products, but stop after the last visible set
        }, 1500) 

        return () => clearInterval(interval)
    }, [])

    const moveNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % (products.length - 4))
    }

    const movePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? products.length - 4 : prevIndex - 1))
    }

    return (
        <div className="relative w-full">
            <Carousel className="w-full overflow-hidden">
                <CarouselContent
                    className="flex transition-transform duration-700"
                    style={{
                        transform: `translateX(-${activeIndex * 25}%)`, // Each card is 25% wide (4 cards per view)
                    }}
                >
                    {products.map((product, index) => (
                        <CarouselItem
                            key={index}
                            className="flex-none w-1/4" // Each item takes up 25% of the screen width
                        >
                            <div className="p-1">
                                <Card className="h-full">
                                    <CardContent className="flex flex-col items-center p-6">
                                        {/* Product Image */}
                                        <div
                                            className="w-full h-40 bg-cover bg-center rounded-lg mb-4"
                                            style={{ backgroundImage: `url(${product.imageUrl})` }}
                                        ></div>

                                        {/* Product Info */}
                                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                        <p className="text-lg font-bold text-gray-800 mb-4">{product.price}</p>

                                        {/* Availability Indicator */}
                                        <div className="flex items-center">
                                            <span
                                                className={`w-3 h-3 rounded-full mr-2 ${product.availability === 'In Stock' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}
                                            ></span>
                                            <span className="text-sm text-gray-600">
                                                {product.availability}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel Previous Button */}
                <CarouselPrevious
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                    onClick={movePrevious}
                >
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-3">
                        ◀
                    </button>
                </CarouselPrevious>

                {/* Carousel Next Button */}
                <CarouselNext
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                    onClick={moveNext}
                >
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-3">
                        ▶
                    </button>
                </CarouselNext>
            </Carousel>
        </div>
    )
}
