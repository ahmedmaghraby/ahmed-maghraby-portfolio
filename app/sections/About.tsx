import "../animations/animate.css";
import AnimatedTitle from "../animations/AnimatedTitle";
import React, { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const container = useRef<HTMLElement>(null);
  const about = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ourText = new SplitType(".span", {
        types: "lines",
        lineClass: "content__line sm:text-[15px] md:text-[20px] lg:text-[25px]",
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
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 md:pt-20lg:pt-20"
      id="about"
      ref={about}
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={"Crafting Tomorrow's Technology Today."}
          className={
            "mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
          }
          wordSpace={"mr-[14px]"}
          charSpace={"mr-[0.001em]"}
        />

        <div
          className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20"
          ref={container as React.RefObject<HTMLDivElement>}
        >
          <div className="content mb-10 flex w-[100%] flex-col gap-4 text-[18px]  font-medium leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed  lg:mb-16 lg:max-w-[90%] lg:text-[24px]">
            <span className="span">
            I'm Ahmed Maghraby and I'm a software engineer with {new Date().getFullYear() - 2018} years of experience.

              As a software engineer team leader, I have a proven track record
              of delivering robust and scalable software solutions. I have a
              strong foundation in backend, frontend, and mobile development,
              and I thrive on tackling complex challenges within the ERP,
              FinTech, e-commerce, and e-service domains. With a keen eye for
              innovation, I am dedicated to crafting exceptional user
              experiences.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
