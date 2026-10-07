import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { asset } from "./content";
import { Footer } from "./site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rydex | Luxury Car Rental",
  description: "Prime collection of luxury and performance cars for rent in Dubai, UAE.",
  icons: { icon: asset.favicon },
};

export const viewport: Viewport = {
  themeColor: "#080805",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <div className="cursor-wrap" aria-hidden>
          <div className="cursor" />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
