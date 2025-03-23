import "./globals.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
const font = Kanit({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phoonix.com"),
  title: "Phoonix | Innovative Software Solutions",
  description: `With over ${
    new Date().getFullYear() - 2018
  } years of expertise, Phoonix delivers cutting-edge software solutions that drive business growth, enhance efficiency, and redefine digital experiences.`,
  generator: "Phoonix",
  applicationName: "Phoonix Landing Page",
  keywords: [
    "Phoonix",
    "software solutions",
    "custom software development",
    "web development",
    "mobile app development",
    "enterprise software",
    "SaaS solutions",
    "AI-driven applications",
    "cloud computing",
    "fintech software",
    "e-commerce platforms",
    "React development",
    "Next.js development",
    "full-stack development",
    "Saudi Arabia software company",
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Phoonix | Innovative Software Solutions",
    description: `With over ${
      new Date().getFullYear() - 2018
    } years of expertise, Phoonix delivers cutting-edge software solutions that drive business growth, enhance efficiency, and redefine digital experiences.`,
    url: "https://phoonix.com/",
    siteName: "Phoonix | Software Solutions",
    images: [
      {
        url: "https://phoonix.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Phoonix | Innovative Software Solutions",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoonix | Innovative Software Solutions",
    description: `Empowering businesses with advanced software solutions for over ${
      new Date().getFullYear() - 2018
    } years. Transforming ideas into scalable digital products.`,
    images: ["https://phoonix.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  category: "Software Development",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${font.className} scroll-smooth bg-bg-dark scrollbar-none scrollbar-track-bg-dark scrollbar-thumb-main`}
      >
        {children}
      </body>
    </html>
  );
}
