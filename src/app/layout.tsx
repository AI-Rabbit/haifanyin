import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getBasePath } from "@/lib/base-path";

const assetBase = getBasePath();
const siteUrl = "https://haifanyin.github.io";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haifan Yin (尹海帆) — Professor, HUST",
  description: "Personal academic homepage of Prof. Haifan Yin. Research in 5G/6G, Massive MIMO, RIS, Signal Processing, and Machine Learning. School of Electronic Information and Communications, Huazhong University of Science and Technology.",
  keywords: ["Haifan Yin", "尹海帆", "Massive MIMO", "RIS", "5G", "6G", "Signal Processing", "HUST", "Professor"],
  authors: [{ name: "Haifan Yin" }],
  icons: {
    icon: `${assetBase}/sitelogo.jpg`,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Haifan Yin (尹海帆) — Professor, HUST",
    description: "Research in 5G/6G, Massive MIMO, RIS, Signal Processing. MCSP Lab, Huazhong University of Science and Technology.",
    siteName: "Haifan Yin — Academic Homepage",
    images: [
      {
        url: `${assetBase}/professor.jpg`,
        width: 288,
        height: 370,
        alt: "Prof. Haifan Yin",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haifan Yin (尹海帆) — Professor, HUST",
    description: "Research in 5G/6G, Massive MIMO, RIS, Signal Processing. MCSP Lab, HUST.",
    images: [`${assetBase}/professor.jpg`],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Haifan Yin",
    alternateName: "尹海帆",
    url: siteUrl,
    image: `${assetBase}/professor.jpg`,
    jobTitle: "Professor",
    affiliation: {
      "@type": "Organization",
      name: "Huazhong University of Science and Technology",
      department: "School of Electronic Information and Communications",
    },
    sameAs: [
      "https://scholar.google.com/citations?user=W5lKb4EAAAAJ",
      "https://dblp.org/pid/y/haifanyin.html",
    ],
    knowsAbout: ["Massive MIMO", "Reconfigurable Intelligent Surfaces", "5G", "6G", "Signal Processing", "FDD MIMO", "Channel Prediction", "Superdirective Arrays", "Holographic MIMO"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
