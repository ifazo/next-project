"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  return (
    <SessionProvider>
      <Provider store={store}>
      {!isDashboard && <Navbar />}
        {children}
        </Provider>
    </SessionProvider>
  );
}