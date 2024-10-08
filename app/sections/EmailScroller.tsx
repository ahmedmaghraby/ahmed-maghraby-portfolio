import { useRef, useEffect, RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Roboto } from "../helper/font";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const EmailScroller: React.FC = () => {
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

        contactEmailRowRefs.current.forEach((item) => {
          if (item) {
            const scrollTrigger = scrollTriggerFactory({ current: item });

            const sumWidth =
              item.offsetWidth +
              window.innerWidth / (window.innerWidth < 700 ? 2 : 4);

            animations.push(
              gsap.fromTo(
                item,
                { x: window.innerWidth },
                { x: -sumWidth, scrollTrigger }
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
        <span className={`${Roboto.className} contact__email`}>
          {[...Array(rowsCount)].map((_, rowIndex) => (
            <span
              key={rowIndex}
              ref={(el) => (contactEmailRowRefs.current[rowIndex] = el)}
              className={"contact__email__row"}
            >
              {[...Array(textCount)].map((_, textKey) => (
                <a key={textKey} href="mailto:moalicreates@gmail.com" className={"contact__email__row__text"}>
                  Send me an <span className={"serif"}>email</span>
                  {textKey !== textCount - 1 && <span>&nbsp; - &nbsp;</span>}
                </a>
              ))}
            </span>
          ))}
        </span>
      </span>
    </section>
  );
};

export default EmailScroller;