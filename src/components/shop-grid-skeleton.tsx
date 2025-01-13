import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ShopGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="p-0">
            <Skeleton className="aspect-square" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

