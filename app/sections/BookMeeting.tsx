import { useRef, useEffect, RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Roboto } from "../helper/font";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BookMeeting: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const contactEmailRowRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const rowsCount = 3;
  const textCount = 4;
  const smoothScrollBreakPoint = 768; // Replace this with your actual value

  useGSAP(
    () => {
      setTimeout(() => {
        const animations: gsap.core.Tween[] = [];

        const scrollTriggerFactory = (trigger: RefObject<HTMLElement>) => ({
          trigger: trigger.current,
          scrub: window.innerWidth >= smoothScrollBreakPoint ? true : 0.5,
        });

        contactEmailRowRefs.current.forEach((item, i) => {
          if (item) {
            const scrollTrigger = scrollTriggerFactory({ current: item });

            const sumWidth =
              item.offsetWidth -
              window.innerWidth / (window.innerWidth < 700 ? 2 : 4);

            animations.push(
              gsap.fromTo(
                item,
                { x: i % 2 === 0 ? -sumWidth : sumWidth },
                { x: i % 2 === 0 ? 100 : -100, scrollTrigger }
              )
            );
          }
        });

        return () => {
          animations.forEach((animation) => animation.scrollTrigger?.kill());
        };
      }, 7000);
    },
    { scope: contactRef }
  );

  return (
    <section ref={contactRef} className="contact" data-scroll-section>
      <span>
        <span className={`contact__branding ${Roboto.className}`}>
          <span 
            ref={(el) => (contactEmailRowRefs.current[1] = el)}
            className={"contact__Branding__row"}
          >
            <span className={"contact__email__row__text"}>
              UI DESIGN <span>&nbsp; - &nbsp;</span> UX DESIGN{" "}
              <span>&nbsp; - &nbsp;</span> BRANDING <span>&nbsp; - &nbsp;</span>{" "}
              COPYWRITING <span>&nbsp; - &nbsp;</span>
              BRANDING <span>&nbsp; - &nbsp;</span> COPYWRITING{" "}
              <span>&nbsp; - &nbsp;</span> UX DESIGN{" "}
              <span>&nbsp; - &nbsp;</span> UI DESIGN{" "}
              <span>&nbsp; - &nbsp;</span>
              COPYWRITING <span>&nbsp; - &nbsp;</span> BRANDING{" "}
              <span>&nbsp; - &nbsp;</span> UI DESIGN{" "}
              <span>&nbsp; - &nbsp;</span> UX DESIGN
            </span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[2] = el)}
            className={"contact__Branding__row 2"}
          >
            <span className={"contact__email__row__text"}>
            BRANDING <span>&nbsp; - &nbsp;</span> COPYWRITING{" "}
              <span>&nbsp; - &nbsp;</span> UI DESIGN <span>&nbsp; - &nbsp;</span>{" "}
              UX DESIGN <span>&nbsp; - &nbsp;</span>
              BRANDING <span>&nbsp; - &nbsp;</span> COPYWRITING{" "}
              <span>&nbsp; - &nbsp;</span> UX DESIGN{" "}
              <span>&nbsp; - &nbsp;</span> UI DESIGN{" "}
              <span>&nbsp; - &nbsp;</span>
              COPYWRITING <span>&nbsp; - &nbsp;</span> BRANDING{" "}
              <span>&nbsp; - &nbsp;</span> UI DESIGN{" "}
              <span>&nbsp; - &nbsp;</span> UX DESIGN
            </span>
          </span>
        </span>
      </span>
    </section>
  );
};

export default BookMeeting;
