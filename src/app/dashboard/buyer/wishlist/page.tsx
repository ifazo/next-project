import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { WishlistTable } from '@/components/wishlist-table'

export const dynamic = 'force-dynamic'

export default function WishlistPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <Suspense fallback={<WishlistSkeleton />}>
        <WishlistTable />
      </Suspense>
    </div>
  )
}

function WishlistSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

