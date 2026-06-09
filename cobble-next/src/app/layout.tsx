import type { Metadata } from "next";
import { Instrument_Sans, Crimson_Text } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer";
import { SavedProvider } from "@/context/SavedContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cobble Studio",
  description: "Handcrafted ceramic objects for everyday rituals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${crimsonText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <LanguageProvider>
          <CartProvider>
            <SavedProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </SavedProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
