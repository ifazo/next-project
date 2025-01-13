import { Suspense } from "react"
import { CategoryList } from "@/components/category-list"
import { CategoryListSkeleton } from "@/components/category-list-skeleton"
import { CreateCategory } from "@/components/create-category"

export default function CategoriesPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your marketplace categories here.
          </p>
        </div>
        <CreateCategory />
      </div>
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  )
}
