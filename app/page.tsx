"use client";
import React, {useState} from "react";
import { useEffectOnce, useEventListener } from 'usehooks-ts';

import PreLoader from "./components/other/PreLoader.tsx";
import useBlobity from "./components/blobity/useBlobity.ts";
import { GsapTimelineProvider } from './context/gsapTimeLIne.tsx';

import NavBar from "./sections/NavBar.tsx";
import Hero from "./sections/Hero.tsx";
import About from "./sections/About.tsx";
import Work from "./sections/Work.tsx";
import Contact from "./sections/Contact.tsx";
import Footer from "./sections/Footer.tsx";
import Tools from "./sections/Tools.tsx";
import EmailScroller from "./sections/EmailScroller.tsx";
import BookMeeting from "./sections/BookMeeting.tsx";
import Banner from "./components/other/plastine.tsx";


export default function Home() {

    const [isMobile, setIsMobile] = useState(false);

    useEffectOnce(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
        setIsMobile(window.innerWidth < 768);
    });

    useEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    useBlobity(
        {
            licenseKey: "opensource",
            focusableElementsOffsetX: 4,
            focusableElementsOffsetY: 4,
            color: "#ffffff",
            dotColor: "#ffffff",
            invert: true,
            focusableElements:
                "[data-blobity], a:not([data-no-blobity]), h4:not([data-no-blobity]), li:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
            font: "'Montserrat','Source Sans Pro',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
            fontSize: 16,
            fontWeight: 900,
            opacity: 1.0,
            fontColor: "#ffffff",
            zIndex: 35,
            size: 50,
            radius: 5,
            magnetic: false,
        }
    );

    return (
        <>
            <GsapTimelineProvider>
             <Banner />
            <PreLoader />
            <NavBar />
            <main
                className="flex flex-col items-center justify-center bg-black"
            >
                <Hero />
                <About />
                <BookMeeting />
                <Work />
                <Tools />
                <EmailScroller />
                <Contact />
                <Footer />
            </main>
            </GsapTimelineProvider>
        </>
    );
}
