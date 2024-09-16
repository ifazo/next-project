import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const libreBaskerville = Libre_Baskerville({
  weight: "400",
  subsets: ["latin"],
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
      <head>
        <link rel="icon" href="/img/favicon.png" type="image/png" sizes="any" />
      </head>
      <body className={`${libreBaskerville.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
