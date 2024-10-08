import "./globals.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

export const Roboto = DM_Sans({  
  subsets: ["latin"],
  weight: ['400', '500' ,'700'],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://moalicreates.com"),
  title: "Mohammed Ali | Portfolio",
  description: `I'm Mohammed Ali an Egyptian product designer with over  ${
    new Date().getFullYear() - 2020
  } years of experience,specializing in UX design, wireframing, and prototyping. Driven by a passion
              for crafting experiences that matter`,
  generator: "Next.js",
  applicationName: "Mohammed Ali's Portfolio",
  keywords: [
    "UX Designer",
    "UI Designer ",
    "UX/UI Designer",
    "Product Designer ",
    "UX Researcher ",
    "Prototyping",
    "Design System ",
    "Interaction Design",
    "User Journey Mapping",
    "Figma",
    "Freelancer ",
    "Branding Design ",
    "Design",
    "UX Audit ",
    "Heuristic Evaluation ",
    "Conversion rate optimisation ",
    "Design Handover ",
    "No code designer ",
    "Framer ",
    "Webflow",
    "Graphic Design ",
    "Wireframes",
    "Product road map",
    "Affinity mapping ",
    "Customer Experience",
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Mohammed Ali | Portfolio",
    description: `I'm Mohammed Ali an Egyptian product designer with over  ${
      new Date().getFullYear() - 2020
    } years of experience,specializing in UX design, wireframing, and prototyping. Driven by a passion
              for crafting experiences that matter`,
    url: "https://moalicreates.com",
    siteName: "Mohammed Ali | Portfolio",
    images: [
      {
        url: "./public/metadata.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Ali | Portfolio",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ali | Portfolio",
    description: `I'm Mohammed Ali an Egyptian product designer with over  ${
      new Date().getFullYear() - 2020
    } years of experience,specializing in UX design, wireframing, and prototyping. Driven by a passion
              for crafting experiences that matter`,
    creator: "Ahmed Maghraby",
    creatorId: "0000000000",
    images: ["./public/metadata.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${Roboto.className} scroll-smooth scrollbar-none scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        {children}
      </body>
    </html>
  );
}
