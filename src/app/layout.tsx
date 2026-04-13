import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getBasePath } from "@/lib/base-path";

const assetBase = getBasePath();

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
    icon: `${assetBase}/logo.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
