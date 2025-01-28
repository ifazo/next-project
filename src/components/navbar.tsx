'use client';

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "./ui/button";
import { CommandMenu } from "./comand-menu";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { CartModal } from "./cart-modal";
import { ThemeCustomizer } from "./theme-customizer";

export function Navbar() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Success",
      description: "Signed out successfully",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-2">
            <ModeSwitcher />
            <ThemeCustomizer />
            <CartModal />
            {session?.user ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="px-2 flex items-center"
              >
                <User />
                <span>Sign out</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="px-2 flex items-center"
              >
                <Link href="/sign-in" className="flex items-center gap-1">
                  <User />
                  <span>Sign in</span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
