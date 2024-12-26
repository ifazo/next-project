"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "next-auth";

const adminNav = [
  {
    title: "Admin",
    url: "/dashboard/admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "Users", url: "/dashboard/admin/users" },
      { title: "Shops", url: "/dashboard/admin/shops" },
      { title: "Category", url: "/dashboard/admin/categories" },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/dashboard/settings/profile" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

const sellerNav = [
  {
    title: "Seller",
    url: "/dashboard/seller",
    icon: Bot,
    items: [
      { title: "Shops", url: "/dashboard/seller/shops" },
      { title: "Products", url: "/dashboard/seller/products/add" },
      { title: "Revenue", url: "/dashboard/seller/revenue" },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/dashboard/settings/profile" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

const buyerNav = [
  {
    title: "Buyer",
    url: "/dashboard/buyer",
    icon: BookOpen,
    items: [
      { title: "Wishlist", url: "/dashboard/buyer/wishlist" },
      { title: "Orders", url: "/dashboard/buyer/orders" },
      { title: "Following", url: "/dashboard/buyer/following" },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    items: [
      { title: "Profile", url: "/dashboard/settings/profile" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

const shop = [
  {
    name: "Ifaz Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Ifaz Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Ifaz Org.",
    logo: Command,
    plan: "Free",
  },
];

const HomeNav = [
  {
    name: "Home",
    url: "/",
    icon: Frame,
  },
  {
    name: "Products",
    url: "/products",
    icon: PieChart,
  },
  {
    name: "Shops",
    url: "/shops",
    icon: Map,
  },
  {
    name: "Categories",
    url: "/categories",
    icon: PieChart,
  },
];

export function AppSidebar({ user, role }: { user: User; role: string }) {
  console.log("User role", role);
  const navItems =
    role === "admin" ? adminNav : role === "seller" ? sellerNav : buyerNav;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={shop} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects projects={HomeNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
