'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Product } from '@prisma/client'
import VariantQuantitySelector from './variant-quantity-selector'

interface QuickViewProps {
  product: Product
  children: React.ReactNode
}

export function ProductQuickView({ product, children }: QuickViewProps) {
  const [mainImage, setMainImage] = useState(product.images[0])

  return (
    <div className='max-w-[900px]'>
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Image
              src={mainImage}
              alt={product.name}
              width={400}
              height={400}
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {product.images.slice(0, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <VariantQuantitySelector product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}