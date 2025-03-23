import React, { useEffect } from "react";
import gsap from "gsap";

const MouseMove: React.FC = () => {
  useEffect(() => {
    if (window.innerWidth > 1100) {
      document.addEventListener("mousemove", function e(t) {
        try {
          t.target;
          gsap
            .timeline({ defaults: { x: t.clientX, y: t.clientY } })
            .to(".cursor1", { ease: "power2.out" })
            .to(".cursor2", { ease: "power2.out" }, "-=0.4");
        } catch (o) {
          console.log(o);
        }
      });
    }
    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, []); // Empty dependency array to run the animation only on mount

  return (
    <>
      <div className="cursor1 border-1  pointer-events-none fixed left-0 top-0 z-[999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-main/40 bg-zinc-200/20 backdrop-invert  lg:block "></div>
      <div className="cursor2  pointer-events-none fixed left-0 top-0 z-[999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full   bg-main   lg:block"></div>
    </>
  );
};

export default MouseMove;
