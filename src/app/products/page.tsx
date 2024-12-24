import { Suspense } from "react";
import { ProductFilters } from "@/components/product-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginatedProducts } from "@/components/paginated-products";

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of premium products.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <ProductFilters />
        </aside>
        <main className="w-full md:w-3/4">
          <Suspense fallback={<ProductsLoading />}>
            <PaginatedProducts />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
