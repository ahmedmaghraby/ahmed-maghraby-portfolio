'use client';

import React, { useState } from 'react';
import { useEffectOnce, useEventListener } from 'usehooks-ts';

import PreLoader    from '../components/other/PreLoader.tsx';
import NavBar       from '../sections/NavBar.tsx';
import Hero         from '../sections/Hero.tsx';
import About        from '../sections/About.tsx';
import Work         from '../sections/Work.tsx';
import Contact      from '../sections/Contact.tsx';
import Footer       from '../sections/Footer.tsx';
import Tools        from '../sections/Tools.tsx';
import EmailScroller from '../sections/EmailScroller.tsx';
import BookMeeting  from '../sections/BookMeeting.tsx';
import Services     from '../sections/Services.tsx';

export default function LegacyPortfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffectOnce(() => {
    window.scrollTo({ top: 0, left: 0 });
    setIsMobile(window.innerWidth < 768);
  });

  useEventListener('resize', () => {
    setIsMobile(window.innerWidth < 768);
  });

  return (
    <>
      <PreLoader />
      <NavBar />
      <main className="flex flex-col items-center justify-center bg-black">
        <Hero />
        <About />
        <Services />
        <Work />
        <BookMeeting />
        <Tools />
        <EmailScroller />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
