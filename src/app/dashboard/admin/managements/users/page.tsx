import { Suspense } from "react"
import { UsersTable } from "@/components/users-table"
import { UsersTableSkeleton } from "@/components/users-table-skeleton"
// import { DataTableToolbar } from "@/components/data-table-toolbar"

export default function AdminUsersPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">
            Here you can manage all registered users in the system.
          </p>
        </div>
      </div>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  )
}

