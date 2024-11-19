import "./globals.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({
    subsets: ["latin"],
    display: "block",
    weight: ["400", "500", "700",],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://ahmedmaghraby.me"),
    title: "Ahmed Maghraby | Portfolio",
    description:`I'm Ahmed Maghraby and I'm a software engineer with ${new Date().getFullYear() - 2018} years of experience.`,
    generator: "Next.js",
    applicationName: "Maghraby's Portfolio",
    verification: {
        google: "RJzthQ70VJKXHPDZsjqRIT21jlkx6N7AfA0IlrbSsEU",
    },
    keywords: [
        "Ahmed Maghraby",
        "maghraby",
        "ahmed maghraby",
        "ahmed",
        "ahmed portfolio",
        "ahmed maghraby portfolio",
        "ahmed maghraby portfolio website",
        "portfolio",
        "portfolio website",
        "portfolio website maghraby",
        "freelance",
        "developer",
        "freelance developer",
        "frontend",
        "nextjs",
        "Nuxt",
        "Nuxt 3",
        "next 13",
        "next 13.0",
        "next 13.0.0",
        "vue",
        "vuejs",
        "reactjs",
        "javascript",
        "web developer",
        "web engineer",
        "web developer portfolio",
        "web engineer portfolio",
        "web developer portfolio website",
        "web engineer portfolio website",
        "web developer portfolio website maghraby",
        "web engineer portfolio website maghraby",
        "react",
        "frontend developer",
        "frontend engineer",
        "creative",
        "creative developer",
        "creative engineer",
        "tech",
        "gsap",
        "typescript",
        "developer",
        "software engineer",
        "software engineer portfolio",
        "software engineer portfolio website",
        "software engineer portfolio website maghraby",
        "anmation",
        "3d",
        "software",
        "software developer",
        "portfolio",
        "frontend developer portfolio",
        "creative developer portfolio",
        "creative engineer portfolio",
        "software developer portfolio",
        "frontend engineer portfolio",
    ],
    colorScheme: "dark",
    openGraph: {
        title: "Ahmed maghraby | Portfolio",
        description:`I'm Ahmed Maghraby and I'm a software engineer with ${new Date().getFullYear() - 2018} years of experience.`,
        url: "https://ahmedmaghraby.me",
        siteName: "Ahmed Maghraby | Portfolio",
        images: [
            {
                url: "./public/metadata.png",
                width: 1200,
                height: 630,
                alt: "Ahmed Maghraby | Portfolio",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ahmed Maghraby | Portfolio",
        description:`I'm Ahmed Maghraby and I'm a software engineer with ${new Date().getFullYear() - 2018} years of experience.`,
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
                className={`${font.className} scroll-smooth scrollbar-none scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
            >
                {children}
            </body>
        </html>
    );
}
