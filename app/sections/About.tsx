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
      const path = document.getElementById("decorativePath");

      // Set initial state
      if (path instanceof SVGPathElement) {
        gsap.set(path, {
          strokeDasharray: path.getTotalLength(),
          strokeDashoffset: path.getTotalLength(),
        });
      }

      // Create the animation
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: path,
          start: "top 120%",
          end: "top top",

          // markers:true,
          toggleActions: "play none none reverse",
          scrub: true,
        },
      });
    },
    { scope: about }
  );

  return (
    <section
      className="container relative z-10 items-center justify-center w-full py-20 overflow-hidden bg-center bg-cover"
      id="about"
      ref={about}
    >
      <div className="grid flex-row items-center justify-center grid-cols-1 md:grid-cols-3 ">
        <h2
          className={` ${lex.className}  gradiant-Text animate-rotateGradient text-left text-2xl font-light tracking-tighter text-main sm:text-3xl md:mb-16 lg:text-5xl`}
        >
          Crafting <br className="hidden md:block"></br>
          Tomorrow's
          <br />
          Technology
          <br className="hidden md:block"></br>
          Today.
        </h2>

        <div
          className={` relative  col-span-2 flex w-full`}
          ref={container as React.RefObject<HTMLDivElement>}
        >
          <div className="flex flex-col text-xl font-light leading-relaxed tracking-wide content text-t-color md:text-2xl md:leading-loose lg:text-3xl lg:leading-10">
            <div className="hidden mt-2 lg:block">
              At
              <svg
                className=" scale-1 absolute top-[2%]  left-[-40%] w-full"
                width="140"
                height="65"
                viewBox="0 0 263 122"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="decorativePath"
                  d="M317.759 88.5042C429.77 19.8617 192.443 -3.9228 84.5 2.5C-23.4435 8.92279 -12.3097 47.6304 40 72.5C92.3097 97.3696 404.538 32.9261 404.538 32.9261"
                  stroke="#FFBF00"
                  stroke-width="2"
                />
              </svg>{" "}
              PHOENIX,
            </div>
            <span className="span">
              with over 6 years of experience, we are passionate about crafting
              innovative software solutions that empower businesses and redefine
              digital experiences. As a forward-thinking technology company, we
              combine cutting-edge development, seamless functionality, and
              intuitive design to create powerful, scalable, and future-ready
              solutions. Our mission is to transform ideas into reality, helping
              our clients thrive in an ever-evolving digital landscape.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
