import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { CONTACT, SITE } from "./brand";
import { InlineScript } from "./inline-script";
import { Footer, Header } from "./site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ceramic Coating & Auto Detailing Kelowna | Auto Spa Kelowna",
    template: "%s | Auto Spa Kelowna",
  },
  description:
    "Ceramic coating, paint correction, detailing and window tint in Kelowna. Fixed quotes, written 3 to 10 year warranties, serving the Okanagan.",
  openGraph: { siteName: "Auto Spa Kelowna", locale: "en_CA", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

// Saved theme wins, light is the default. Runs before first paint (Next guide: preventing flash before hydration).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Auto Spa Kelowna",
  url: SITE,
  telephone: "+1-236-660-7227",
  email: CONTACT.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "715 Evans Ct",
    addressLocality: "Kelowna",
    addressRegion: "BC",
    postalCode: "V1X 6G4",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 49.8879, longitude: -119.544 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  areaServed: CONTACT.areas,
  sameAs: [CONTACT.instagram, CONTACT.maps],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" data-theme="light" className={figtree.variable} suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
        <script
          type="application/ld+json"
          // Static object we own; escape "<" so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <div className="cursor-wrap" aria-hidden>
          <div className="cursor" />
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
