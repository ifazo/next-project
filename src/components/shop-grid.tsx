"use client"

import { useEffect, useState } from "react"
import { ShopCard } from "./shop-card"
import { ShopModal } from "./shop-modal"
import { Shop } from "@prisma/client"

export function ShopGrid() {
    const [shops, setShops] = useState<Shop[]>([])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  useEffect(() => {
    fetch("/api/shops")
        .then((res) => res.json())
        .then(setShops)
        .catch(console.error)
    }, [])

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            onSelect={() => setSelectedShop(shop)}
          />
        ))}
      </div>
      <ShopModal
        shop={selectedShop}
        onClose={() => setSelectedShop(null)}
      />
    </div>
  )
}

