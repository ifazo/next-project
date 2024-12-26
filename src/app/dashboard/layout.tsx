import "../../app/globals.css";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "../providers";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth, AuthSession } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "next-auth";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: "400",
  style: ["normal", "italic"],
});

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const user = session?.user as User;
  const role = (session as AuthSession).role;
  return (
    <html lang="en">
      <Providers>
        <body className={`${playfairDisplay.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <SidebarProvider>
              <AppSidebar user={user} role={role} />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                <main>{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
