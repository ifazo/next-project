import { Suspense } from "react"

import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

// Sample product data - replace with your actual data fetching logic
const products = [
  {
    id: "1",
    name: "Classic White Sneakers",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Footwear",
    isNew: true,
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
  },
  {
    id: "3",
    name: "Denim Jacket",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    isSale: true,
  },
  {
    id: "4",
    name: "Gold Pendant Necklace",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Jewelry",
    isNew: true,
  },
  {
    id: "5",
    name: "Wool Blend Sweater",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
  },
  {
    id: "6",
    name: "Canvas Backpack",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    isSale: true,
  },
  {
    id: "7",
    name: "Leather Loafers",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Footwear",
  },
  {
    id: "8",
    name: "Gold Hoop Earrings",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Jewelry",
  }
]

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of premium products.
        </p>
      </div>
      <ProductFilters />
      <Suspense fallback={<ProductsLoading />}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

