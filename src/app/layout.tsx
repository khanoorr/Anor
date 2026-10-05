import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANOR — Engineered for Growth",
  description:
    "ANOR is a performance-first growth marketing agency helping ambitious DTC, e-commerce and modern consumer brands build, test and scale measurable growth systems.",
  keywords: [
    "ANOR",
    "Growth Marketing Agency",
    "Performance Marketing",
    "DTC Growth",
    "E-commerce Marketing",
    "Growth Engineering",
    "Attribution",
    "CRO",
    "Paid Media",
  ],
  authors: [{ name: "ANOR Intelligence Team" }],
  openGraph: {
    title: "ANOR — Engineered for Growth",
    description:
      "ANOR is a performance-first growth marketing agency helping ambitious brands build, test and scale measurable growth systems.",
    url: "https://anor.marketing",
    siteName: "ANOR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANOR — Engineered for Growth",
    description:
      "Performance-first growth marketing agency for ambitious DTC, e-commerce and modern consumer brands.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ANOR",
    url: "https://anor.marketing",
    logo: "https://anor.marketing/logo.png",
    description:
      "Performance-first growth marketing agency for ambitious DTC, e-commerce and modern consumer brands.",
    slogan: "ENGINEERED FOR GROWTH.",
    email: "anor.support@gmail.com",
    telephone: "+917208809892",
    sameAs: ["https://instagram.com/anor.grow", "https://x.com/anorgrow"],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0B0B10] text-[#F7F7F5] selection:bg-[#246BFF] selection:text-white`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
