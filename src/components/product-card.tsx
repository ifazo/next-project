import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    isNew?: boolean
    isSale?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        {product.isNew && (
          <Badge className="absolute left-2 top-2">New</Badge>
        )}
        {product.isSale && (
          <Badge variant="destructive" className="absolute left-2 top-2">
            Sale
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

