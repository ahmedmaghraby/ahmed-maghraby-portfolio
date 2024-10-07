import "../animations/animate.css";
import AnimatedTitle from "../animations/AnimatedTitle";
import React, { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { lex } from "../helper/lex";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const container = useRef<HTMLElement>(null);
  const about = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ourText = new SplitType(".span", {
        types: "lines",
        lineClass: "content__line font-lightx",
      });
      gsap.fromTo(
        ourText.lines,
        { "--overlay-offset": "0%" },
        {
          "--overlay-offset": "100%",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: about.current,
            start: "top 80%",
            end: "bottom 85%",
            scrub: true,
          },
        }
      );
    },
    { scope: about }
  );

  return (
    <section
      className="py-28 relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center"
      id="about"
      ref={about}
    >
      <div className="mx-auto grid w-[90%] grid-cols-1  flex-row items-center justify-center md:grid-cols-3 lg:max-w-[1212.8px]">
        <h2
          className={
            ` ${lex.className} mb-10 text-left text-xl font-light tracking-tighter text-[#e4ded7] sm:text-2xl md:mb-16 lg:text-4xl`
          }
        >
          Driven by <br  className="hidden md:block" ></br>
          Curiosity.
          <br />
          Guided by
          <br  className="hidden md:block"></br>
          Purpose.
        </h2>

        <div
          className={` mx-auto col-span-2 flex w-full`}
          ref={container as React.RefObject<HTMLDivElement>}
        >
          <div className="flex flex-col w-full gap-4 mb-10 text-lg font-light leading-relaxed tracking-wide content text-t-color md:mb-16 md:gap-6 md:text-lg md:leading-relaxed lg:mb-16 lg:text-xl">
            <span className="span">
              I'm Mohammed Ali an Egyptian product designer with over{" "} {new Date().getFullYear() - 2020} years of experience,specializing in UX design, wireframing, and prototyping. Driven by a passion
              for crafting experiences that matter, I left a stable career to
              pursue what I love—creating digital solutions that are both
              intuitive and impactful. My expertise in user interface, user
              research, enterprise, mobile, and web design.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
