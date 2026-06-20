import "./globals.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";

const font = DM_Sans({
    subsets: ["latin"],
    display: "block",
    weight: ["400", "500", "700"],
});

const BASE_URL = "https://ahmedmaghraby.me";
const YEARS_EXP = new Date().getFullYear() - 2019;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ahmed Maghraby | Associate Principal Engineer & Portfolio",
    template: "%s | Ahmed Maghraby",
  },
  description: `Ahmed Maghraby is an Associate Principal Engineer with ${YEARS_EXP}+ years of experience leading front-end and mobile teams. Specialized in React, Next.js, Micro Frontends, Flutter, and fintech. Based in Riyadh, Saudi Arabia.`,
  generator: "Next.js",
  applicationName: "Ahmed Maghraby — Maghraby.OS Portfolio",
  authors: [{ name: "Ahmed Maghraby", url: BASE_URL }],
  creator: "Ahmed Maghraby",
  publisher: "Ahmed Maghraby",
  verification: {
    google: "RJzthQ70VJKXHPDZsjqRIT21jlkx6N7AfA0IlrbSsEU",
  },
  keywords: [
    "Ahmed Maghraby",
    "Associate Principal Engineer",
    "front-end architect",
    "micro frontends",
    "React developer",
    "Next.js developer",
    "Flutter developer",
    "React Native developer",
    "TypeScript engineer",
    "Vue.js developer",
    "fintech developer",
    "Saudi Arabia developer",
    "Riyadh software engineer",
    "Lendo engineer",
    "UI library developer",
    "mobile app developer",
    "software portfolio",
  ],
  colorScheme: "dark",
  themeColor: "#f5d393",
  openGraph: {
    title:
      "Ahmed Maghraby | Associate Principal Engineer — MAGHRABY.OS Portfolio",
    description: `${YEARS_EXP}+ years leading front-end & mobile teams. Expert in React, Next.js, Micro Frontends, Flutter, and fintech engineering. Based in Riyadh, Saudi Arabia.`,
    url: BASE_URL,
    siteName: "Ahmed Maghraby | MAGHRABY.OS",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Ahmed Maghraby — Associate Principal Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Maghraby | MAGHRABY.OS Portfolio",
    description: `Associate Principal Engineer with ${YEARS_EXP}+ years in fintech, Micro Frontends, and mobile engineering.`,
    images: [`${BASE_URL}/logo.png`],
    creator: "@ahmedmaghraby",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "Software Development",
  alternates: {
    canonical: BASE_URL,
  },
};

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Maghraby",
    jobTitle: "Associate Principal Engineer",
    description:
        `Associate Principal Engineer with ${YEARS_EXP}+ years of experience in front-end architecture, micro frontends, mobile development, and fintech engineering.`,
    url: BASE_URL,
    sameAs: [
        "https://www.linkedin.com/in/amaghraby/",
        "https://github.com/ahmedmaghraby",
    ],
    email: "ahmedhamdy078@gmail.com",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Riyadh",
        addressCountry: "SA",
    },
    knowsAbout: [
        "React", "Next.js", "TypeScript", "Vue.js", "Flutter", "React Native",
        "Micro Frontends", "Front-End Architecture", "Fintech", "UI Libraries",
        "ASP.NET Core", "Firebase", "GraphQL",
    ],
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Banha University",
        location: "Egypt",
    },
    worksFor: {
        "@type": "Organization",
        name: "Lendo",
        location: "Riyadh, Saudi Arabia",
    },
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ahmed Maghraby — MAGHRABY.OS Portfolio",
    url: BASE_URL,
    author: { "@type": "Person", name: "Ahmed Maghraby" },
    description: "Interactive OS-style portfolio showcasing Ahmed Maghraby's engineering work, skills, and experience.",
    inLanguage: "en-US",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <head>
                <Script
                    id="schema-person"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <Script
                    id="schema-website"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </head>
            <body
                className={`${font.className} scroll-smooth scrollbar-none scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
            >
                {children}
            </body>
        </html>
    );
}
