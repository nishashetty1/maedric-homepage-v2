import type { Metadata } from "next";
import { Figtree, Cinzel } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { HeaderContainer } from "@/components/layout";
import ScrollToTop from '@/components/ui/basic-components/ScrollToTop';
import { Footer } from "@/components/layout";

// Figtree font
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Cinzel font
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Quiche Display (local font)
const quicheDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/Quiche_Display_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Quiche_Display_Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-quiche-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maedric HomePage",
  description: "A homepage built on Next.js for Maedric",
  icons: {
    icon: "favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${quicheDisplay.variable} ${cinzel.variable} antialiased`}
      >
        <HeaderContainer />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}