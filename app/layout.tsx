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
    title: "Ahmed Maghraby | Software Engineer & Developer Portfolio",
    description: `Ahmed Maghraby, a software engineer with over ${new Date().getFullYear() - 2018} years of experience in React, Next.js, .NET Core, and fintech. Explore my projects, skills, and innovative solutions.`,
    generator: "Next.js",
    applicationName: "Maghraby's Portfolio",
    verification: {
        google: "RJzthQ70VJKXHPDZsjqRIT21jlkx6N7AfA0IlrbSsEU",
    },
    keywords: [
        "Ahmed Maghraby",
        "software engineer",
        "developer portfolio",
        "React",
        "Next.js",
        "Vue.js",
        "JavaScript",
        "fintech developer",
        "e-commerce developer",
        "full-stack engineer",
        "Saudi Arabia developer",
    ],
    colorScheme: "dark",
    openGraph: {
        title: "Ahmed Maghraby | Innovative Software Solutions Portfolio",
        description: "Explore my portfolio featuring cutting-edge software projects in fintech, e-commerce, and more.",
        url: "https://ahmedmaghraby.me",
        siteName: "Ahmed Maghraby | Portfolio",
        images: [
            {
                url: "https://ahmedmaghraby.me/logo.png",
                width: 1200,
                height: 630,
                alt: "Ahmed Maghraby - Software Engineer Portfolio",
            },
        ],
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ahmed Maghraby | Portfolio",
        description: "Discover the portfolio of Ahmed Maghraby, a software engineer specializing in fintech, e-commerce, and modern web technologies.",
        images: ["https://ahmedmaghraby.me/logo.png"],
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
                className={`${font.className} scroll-smooth scrollbar-none scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
            >
                {children}
            </body>
        </html>
    );
}
