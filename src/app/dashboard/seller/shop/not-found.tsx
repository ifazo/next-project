import Link from 'next/link'
import { Store } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <Store className="h-20 w-20 mx-auto text-muted-foreground" />
      <h2 className="mt-6 text-3xl font-bold">No Shop Found</h2>
      <p className="mt-2 text-muted-foreground">Ops! You do not have a shop yet.</p>
      <Button asChild className="mt-8">
        <Link href="/dashboard/seller/shop/create">
          Create Shop
        </Link>
      </Button>
    </div>
  )
}

