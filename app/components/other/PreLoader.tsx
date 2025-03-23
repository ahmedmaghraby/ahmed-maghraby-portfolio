import React, { useEffect } from "react";
import gsap from "gsap";
import { lex } from "../../helper/lex";

const PreLoader: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Preloader Animation
    const preLoaderAnim = () => {
      tl.to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
        .from(".texts-container span", {
          duration: 0.4,
          x: 700,
          skewX: 25,
          stagger: 0.4,
          ease: "Power3.easeOut",
        })
        .to(".texts-container span", {
          duration: 0.4,
          x: -700,
          skewX: -25,
          stagger: 0.2,
          ease: "Power3.easeOut",
        })
        .to("body", {
          delay: 1,
          duration: 0.02,
          css: { overflowY: "scroll" },
          ease: "power3.inOut",
        })
        .from(".sub", {
          duration: 1,
          opacity: 0,
          x: 80,
          ease: "expo.easeOut",
        })
        .to(
          ".preloader",
          {
            duration: 1.5,
            height: "0vh",
            ease: "Power3.easeOut",
            onComplete: mobileLanding,
          },
          "-=2"
        )
        .to(".preloader", {
          duration: 0,
          css: { display: "none" },
        });
    };

    const mobileLanding = () => {
      if (window.innerWidth < 763) {
        tl.from(".landing__main2", {
          duration: 1,
          delay: 0,
          opacity: 0,
          y: 80,
          ease: "expo.easeOut",
        });
      }
    };

    preLoaderAnim();
  }, []); // Empty dependency array to run the animation only on mount

  return (
    <div className="preloader fixed bottom-0 left-0 right-0 z-[55] flex h-[100vh] w-full flex-col items-center justify-center  overflow-hidden bg-bg-dark text-t-color">
      <div
        className={`${lex.className} texts-container w-500 md:tex-3xl flex items-center justify-center overflow-hidden  text-t-color opacity-0 sm:gap-3 sm:text-xl lg:text-7xl`}
      >
        <span>P</span>
        <span>H</span>
        <span>O</span>
        <span>E</span>
        <span>N</span>
        <span>I</span>
        <span>X</span>

        <div className="hidden sub"></div>
      </div>
    </div>
  );
};

export default PreLoader;
