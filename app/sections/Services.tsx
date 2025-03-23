import { useRef, useEffect, RefObject } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const services = [
  "ERP Systems",
  "CRM Systems",
  "Consultations",
  "Cloud Services",
  "Web Development",
  "Mobile Development",
];

const Services: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const contactEmailRowRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const smoothScrollBreakPoint = 768; // Replace this with your actual value
  const shuffleServices = (repeats: number = 3) => {
    let shuffled: Array<string> = [];
    let count = 0;

    for (let i = 0; i <= repeats; i++) {
      const shuffle = services.sort(() => Math.random() - 0.5);
      shuffled = shuffled.concat(shuffle);
    }
    return shuffled.join(" <span>&nbsp; - &nbsp;</span> ");
  };

  useGSAP(
    () => {
      setTimeout(() => {
        const animations: gsap.core.Tween[] = [];

        const scrollTriggerFactory = (trigger: RefObject<HTMLElement>) => ({
          trigger: trigger.current,
          start: "top 120%",
          end: "top top",
          scrub: window.innerWidth >= smoothScrollBreakPoint ? true : 0.25,
        });

        contactEmailRowRefs.current.forEach((item, i) => {
          if (item) {
            const scrollTrigger = scrollTriggerFactory({ current: item });

            const sumWidth =
              item.offsetWidth -
              window.innerWidth / (window.innerWidth < 700 ? 0.5 : 4);

            animations.push(
              gsap.fromTo(
                item,
                {
                  x: i % 2 === 0 ? -sumWidth : sumWidth,
                  // y: i % 2 === 0 ? 0 : "150%",
                },
                {
                  x: i % 2 === 0 ? 100 : -20,
                  // y: i % 2 === 0 ? "150%" : 0,

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
    <section
      ref={contactRef}
      className="z-10 py-20 contact"
      data-scroll-section
    >
      <span>
        <span className={`contact__branding`}>
          <span
            ref={(el) => (contactEmailRowRefs.current[0] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[1] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[2] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[3] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[4] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
          <span
            ref={(el) => (contactEmailRowRefs.current[5] = el)}
            className={"contact__Servies__row 2"}
          >
            <span
              className={"contact__Servies__row__text"}
              dangerouslySetInnerHTML={{ __html: shuffleServices(4) }}
            ></span>
          </span>
        </span>
      </span>
    </section>
  );
};

export default Services;
