import { Suspense } from "react"
import { ShopGrid } from "@/components/shop-grid"
import { ShopGridSkeleton } from "@/components/shop-grid-skeleton"

export default function ShopsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shops Management</h2>
          <p className="text-muted-foreground">
            Manage all registered shops in the marketplace.
          </p>
        </div>
      </div>
      <Suspense fallback={<ShopGridSkeleton />}>
        <ShopGrid />
      </Suspense>
    </div>
  )
}

