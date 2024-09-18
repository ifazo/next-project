import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Ifaz Next App",
  description: "This project is maintained by Ifaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <head>
        <link rel="icon" href="/img/favicon.png" type="image/png" sizes="any" />
      </head>
      <body className={`${playfairDisplay.className} antialiased`}>
        <Navbar />
          <main>{children}</main>
          <Toaster />
        <Footer />
        </body>
      </Providers>
    </html>
  );
}
