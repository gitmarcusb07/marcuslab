import type { Metadata, Viewport } from "next";
import {
  Sora,
  Manrope,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { socials } from "@/data/socials";
import { assetPath } from "@/lib/utils";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: "%s | MarcusLab",
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: "Marcus Scout" }],
  creator: "Marcus Scout",
  publisher: "Marcus Scout",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "1K11CreVe2No15ee606EKCeifrkudO3rQh1rTYE2CXg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "MarcusLab",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    creator: "@dis_marcus07",
    images: [assetPath("/opengraph-image")],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: assetPath("/icon.png") },
      { url: assetPath("/icon.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: assetPath("/icon.png") }],
  },
};

export const viewport: Viewport = {
  themeColor: "#18120d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcus Scout",
    alternateName: ["MarcusLab", "Marcus Lab"],
    url: siteConfig.url,
    jobTitle: "Developer and Creator",
    sameAs: socials
      .map((social) => social.url)
      .filter((url): url is string => Boolean(url)),
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`.site-loader{display:none!important}.reveal,.hero-enter{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
