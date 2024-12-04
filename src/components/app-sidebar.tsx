"use client"

import * as React from "react"
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
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

// This is sample data.
const data = {
  user: {
    name: "Name",
    email: "mail@mail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Admin",
      url: "/dashboard/admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Shops",
          url: "/dashboard/admin/shops",
        },
        {
          title: "Category",
          url: "/dashboard/admin/categories",
        },
      ],
    },
    {
      title: "Seller",
      url: "/dashboard/seller",
      icon: Bot,
      items: [
        {
          title: "Shops",
          url: "/dashboard/seller/shops",
        },
        {
          title: "Products",
          url: "/dashboard/seller/products",
        },
        {
          title: "Revenue",
          url: "/dashboard/seller/revenue",
        },
      ],
    },
    {
      title: "User",
      url: "/dashboard/user",
      icon: BookOpen,
      items: [
        {
          title: "Cart",
          url: "/dashboard/user/cart",
        },
        {
          title: "Orders",
          url: "/dashboard/user/orders",
        },
        {
          title: "Wishlist",
          url: "/dashboard/user/wishlist",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  console.log("session role", session);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
