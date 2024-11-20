import { useRef, useEffect, RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Services: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const contactEmailRowRefs = useRef<Array<HTMLSpanElement | null>>([]);

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
              window.innerWidth / (window.innerWidth < 700 ? 1.3 : 4);

            animations.push(
              gsap.fromTo(
                item,
                {
                  x: i % 2 === 0 ? -sumWidth : sumWidth,
                  y: i % 2 === 0 ? 0 : "150%",
                  skewY: i % 2 === 0 ? -8 : 8,
                  skewX:i % 2 === 0 ? -10 : 10,
                },
                {
                  x: i % 2 === 0 ? 100 : -20    ,
                  y: i % 2 === 0 ? "150%" : 0,
                  skewY: i % 2 === 0 ? 8 : -8,
                  skewX: i % 2 === 0 ? 10 : -10,

                  scrollTrigger,
                }
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
    <section ref={contactRef} className="z-10 contact" data-scroll-section>
      <span>
        <span className={`contact__branding`}>
          <span
            ref={(el) => (contactEmailRowRefs.current[1] = el)}
            className={"contact__Branding__row"}
          >
            <span className={"contact__email__row__text"}>
              FRONTEND <span>&nbsp; - &nbsp;</span> BACKEND{" "}
              <span>&nbsp; - &nbsp;</span> Consultations <span>&nbsp; - &nbsp;</span>{" "}
              MOBILE <span>&nbsp; - &nbsp;</span>
              Consultations <span>&nbsp; - &nbsp;</span> MOBILE{" "}
              <span>&nbsp; - &nbsp;</span> BACKEND{" "}
              <span>&nbsp; - &nbsp;</span> FRONTEND{" "}
              <span>&nbsp; - &nbsp;</span>
              MOBILE <span>&nbsp; - &nbsp;</span> Consultations{" "}
              <span>&nbsp; - &nbsp;</span> FRONTEND{" "}
              <span>&nbsp; - &nbsp;</span> BACKEND
            </span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[2] = el)}
            className={"contact__Branding__row 2"}
          >
            <span className={"contact__email__row__text"}>
              Consultations <span>&nbsp; - &nbsp;</span> MOBILE{" "}
              <span>&nbsp; - &nbsp;</span> FRONTEND{" "}
              <span>&nbsp; - &nbsp;</span> BACKEND{" "}
              <span>&nbsp; - &nbsp;</span>
              Consultations <span>&nbsp; - &nbsp;</span> MOBILE{" "}
              <span>&nbsp; - &nbsp;</span> BACKEND{" "}
              <span>&nbsp; - &nbsp;</span> FRONTEND{" "}
              <span>&nbsp; - &nbsp;</span>
              MOBILE <span>&nbsp; - &nbsp;</span> Consultations{" "}
              <span>&nbsp; - &nbsp;</span> FRONTEND{" "}
              <span>&nbsp; - &nbsp;</span> BACKEND
            </span>
          </span>
        </span>
      </span>
    </section>
  );
};

export default Services;
