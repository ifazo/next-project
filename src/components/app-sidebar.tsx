import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { User } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const adminNav = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    items: [
      {
        title: "Overview",
        url: "/dashboard/admin",
        isActive: true,
      },
      {
        title: "Analytics",
        url: "/dashboard/admin/analytics",
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    items: [
      {
        title: "All Products",
        url: "/products",
      },
      {
        title: "Add Product",
        url: "/products/add",
      },
    ],
  },
];

const sellerNav = [
  {
    title: "Dashboard",
    url: "/dashboard/seller",
    items: [
      {
        title: "Overview",
        url: "/dashboard/seller",
        isActive: true,
      },
      {
        title: "Analytics",
        url: "/dashboard/seller/analytics",
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    items: [
      {
        title: "All Products",
        url: "/products",
      },
      {
        title: "Add Product",
        url: "/products/add",
      },
    ],
  },
];

const buyerNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        isActive: true,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    items: [
      {
        title: "All Products",
        url: "/products",
      },
    ],
  },
];

export function AppSidebar({ user, role }: { user: User; role: string }) {
  const navMain =
    role === "admin" ? adminNav : role === "seller" ? sellerNav : buyerNav;
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-secondary text-sidebar-primary-foreground">
                  <Image height={24} width={24} src="/logo.png" alt="logo" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Ifaz.next</span>
                  <span className="">{role}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
