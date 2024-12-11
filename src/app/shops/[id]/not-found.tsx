import Link from 'next/link'
import { Store } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <Store className="h-20 w-20 mx-auto text-muted-foreground" />
      <h2 className="mt-6 text-3xl font-bold">Shop Not Found</h2>
      <p className="mt-2 text-muted-foreground">We couldn&apos;t find the shop you&apos;re looking for.</p>
      <Button asChild className="mt-8">
        <Link href="/shops">
          Back to Shops
        </Link>
      </Button>
    </div>
  )
}

