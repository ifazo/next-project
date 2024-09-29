"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<string>("dashboard");

  const getLinkClass = (link: string) =>
    selected === link
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="mt-16 flex flex-col items-center gap-4 px-2 py-4">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  onClick={() => setSelected("dashboard")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("dashboard")} md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/cart"
                  onClick={() => setSelected("cart")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("cart")} md:h-8 md:w-8`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Cart</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/orders"
                  onClick={() => setSelected("orders")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("orders")} md:h-8 md:w-8`}
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => setSelected("customers")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("customers")} md:h-8 md:w-8`}
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => setSelected("analytics")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("analytics")} md:h-8 md:w-8`}
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>

          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={() => setSelected("settings")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${getLinkClass("settings")} md:h-8 md:w-8`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <div className="flex flex-col sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setSelected("dashboard")}
                    className={`flex items-center gap-4 px-2.5 ${getLinkClass("dashboard")}`}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/cart"
                    onClick={() => setSelected("cart")}
                    className={`flex items-center gap-4 px-2.5 ${getLinkClass("cart")}`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    onClick={() => setSelected("orders")}
                    className={`flex items-center gap-4 px-2.5 ${getLinkClass("orders")}`}
                  >
                    <Package className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setSelected("customers")}
                    className={`flex items-center gap-4 px-2.5 ${getLinkClass("customers")}`}
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setSelected("analytics")}
                    className={`flex items-center gap-4 px-2.5 ${getLinkClass("analytics")}`}
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
