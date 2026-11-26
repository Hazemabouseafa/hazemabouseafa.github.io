import type { Metadata } from "next";
import {
  Cairo,
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Tajawal,
} from "next/font/google";
import { IDENTITY } from "@/content";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-ar",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-ar",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-en",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(IDENTITY.siteUrl),
  title: {
    default: "ENG HAZEM | حازم أبوسعيفة — Software Engineer",
    template: "%s | ENG HAZEM",
  },
  description:
    "حازم أبوسعيفة (ENG HAZEM) — Software Engineer. مواقع ومتاجر إلكترونية، تطبيقات موبايل، منصات تعليمية وأنظمة أعمال، وواجهات برمجية ولوحات تحكم.",
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    url: IDENTITY.siteUrl,
    siteName: IDENTITY.brand,
    title: "ENG HAZEM | حازم أبوسعيفة — Software Engineer",
    description: "أنا حازم — أحوّل فكرتك لمنتج الناس تستخدمه.",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    images: ["/studio/portrait-desk.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ENG HAZEM | Software Engineer",
    description: "I turn your idea into a product people actually use.",
    images: ["/studio/portrait-desk.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: IDENTITY.englishName,
    alternateName: [IDENTITY.brand, IDENTITY.arabicName],
    jobTitle: "Software Engineer",
    url: IDENTITY.siteUrl,
    sameAs: [IDENTITY.facebookUrl],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    knowsAbout: [
      "Websites and e-commerce",
      "Mobile applications",
      "Educational platforms and business systems",
      "Backend APIs and admin dashboards",
    ],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} ${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: "#131315", color: "#F5F2EC" }}
    >
      <body style={{ backgroundColor: "#131315", color: "#F5F2EC" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
