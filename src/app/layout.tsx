import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeWrapper } from "@/components/theme-wrapper";

import "./globals.css";
import "./themes.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ifaz Next App",
  description: "Created by ziaul karim ifaz",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeWrapper>
            <Providers>
              <main>{children}</main>
              <Toaster />
            </Providers>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
