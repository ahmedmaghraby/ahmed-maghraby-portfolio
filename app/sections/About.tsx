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
        },
      );
    },
    { scope: about }
  );

  return (
    <section
      className="relative z-10 items-center justify-center w-full overflow-hidden bg-center bg-cover py-36"
      id="about"
      ref={about}
    >
      <div className="grid flex-row items-center justify-center grid-cols-1 mx-auto max-w-[90%] md:grid-cols-3 lg:max-w-7xl">
        <h2
          className={` ${lex.className} mb-10 text-left text-xl font-light tracking-tighter text-[#e4ded7] sm:text-2xl md:mb-16 lg:text-4xl`}
        >
          Crafting <br className="hidden md:block"></br>
          Tomorrow's
          <br />
          Technology
          <br className="hidden md:block"></br>
          Today.
        </h2>

        <div
          className={` col-span-2 mx-auto flex w-full`}
          ref={container as React.RefObject<HTMLDivElement>}
        >
          <div className="flex flex-col mb-10 text-lg font-light leading-relaxed tracking-wide content text-t-color md:mb-16 md:gap-6 md:text-lg md:leading-relaxed lg:mb-16 lg:text-xl">
            <span className="span">
              I'm Ahmed Maghraby and I'm a software engineer with{" "}
              {new Date().getFullYear() - 2018} years of experience. As a
              software engineer team leader, I have a proven track record of
              delivering robust and scalable software solutions. I have a strong
              foundation in backend, frontend, and mobile development, and I
              thrive on tackling complex challenges within the ERP, FinTech,
              e-commerce, and e-service domains. With a keen eye for innovation,
              I am dedicated to crafting exceptional user experiences.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
