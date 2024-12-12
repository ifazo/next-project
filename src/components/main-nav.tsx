"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <Image height={24} width={24} src="/logo.png" alt="logo" />
        <span className="hidden font-bold lg:inline-block">
            Ifaz.next
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/products" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Products
        </Link>
        <Link
          href="/shops"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/shops" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Shops
        </Link>
        <Link
          href="/categories"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/categories")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Categories
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/dashboard")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  )
}