'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found.</p>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <Button asChild>
          <Link href="/">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

