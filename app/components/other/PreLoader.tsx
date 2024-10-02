import React, { useContext, useEffect } from "react";
import { GsapTimelineContext } from "../../context/gsapTimeLIne";

const PreLoader: React.FC = () => {
  const tl = useContext(GsapTimelineContext);

  useEffect(() => {
    // Preloader Animation
    const preLoaderAnim = () => {
      if(tl == null) return
      tl.to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
        .from(".texts-container span", {
          duration: 1.5,
          y: 250,
          skewY: 7,
          stagger: 0.4,
          delay: 0.5,
          ease: "Power3.easeOut",
        })
        .to(".texts-container span", {
          duration: 1.5,
          y: 250,
          delay: 2,
          skewY: -7,
          stagger: 0.2,
          ease: "Power3.easeOut",
        })
        .to("body", {
          duration: 0.01,
          css: { overflowY: "scroll" },
          ease: "power3.inOut",
        })
        .from(".sub", {
          duration: 1,
          opacity: 0,
          y: 80,
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
      if(tl == null) return

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
    <div className="preloader fixed bottom-0 left-0 right-0 z-[55] flex h-[100vh] w-full flex-col items-center justify-center gap-[5px] overflow-hidden bg-black text-t-color sm:gap-3">
      <div className="flex items-center justify-center overflow-hidden font-bold opacity-0 texts-container text-t-color sm:text-3xl md:text-5xl lg:text-7xl">
        <span className="block">Design is so simple,
          <br /> that's why it is so
          <br/> complicated.</span>

        <div className="hidden sub"></div>
      </div>
      <div className="flex items-center justify-start overflow-hidden font-light opacity-0 texts-container text-t-color sm:text-3xl md:text-5xl lg:text-7xl">
        <span>- Paul Rand</span>
        <div className="hidden sub"></div>
      </div>
    </div>
  );
};

export default PreLoader;
