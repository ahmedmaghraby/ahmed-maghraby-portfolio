import React, { useEffect, useState } from "react";
import gsap from "gsap";
// import MorphSVGPlugin from "gsap-trial/MorphSVGPlugin"; //available only in local or for paid licenses

import "./logo.css";
interface LogoProps {
  width?: number;
  height?: number;
}
// gsap.registerPlugin(MorphSVGPlugin);
// if (typeof document !== "undefined") {
//   document.body.setAttribute("style", ""); // Next.js complains about the style attribute which ScrollTrigger affects during registration (even though it ends up empty, Next.js still compains that there's an attribute there at all. And it's not enough to just .removeAttribute() - it must be set to empty first).
//   document.body.removeAttribute("style");
// }

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {
  const [isMounted, setIsMounted] = useState(true); //available only in local or for paid licenses in local start with true
  // useEffect(() => {
  //   // gsap.to("#circle", {
  //   //   duration: 4,
  //   //   morphSVG: "#path",
  //   //   repeatDelay: 0.2,
  //   // });
  //   gsap
  //     .timeline({
  //       repeat: -1,
  //       yoyo: true,
  //       repeatDelay: 0,
  //       defaults: { ease: "none", duration: 3 },
  //     })
  //     .from("#centerGradient #start", { stopColor: "#D1E6FF" }, 0)
  //     .to("#centerGradient #start", { stopColor: "#9AC2FF" }, 0)
  //     .from("#centerGradient #middle", { stopColor: "#0754CA" }, 0)
  //     .to("#centerGradient #middle", { stopColor: "#D1E6FF" }, 0)
  //     .from("#centerGradient #end", { stopColor: "#9AC2FF" }, 0)
  //     .to("#centerGradient #end", { stopColor: "#0754CA" }, 0);

  //   // setTimeout(() => {
  //   //   setIsMounted(true);
  //   // }, 4000);
  // }, []);
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 384 346"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="centerGradient" className="animate-slowspin">
            <stop id="middle" offset="20%" className="animate-gradientMove" />
            <stop
              id="end"
              offset="100%"
              className="animate-reverseGradientMove"
            />
          </linearGradient>
        </defs>
        <path
          d="M92.6771 127.416C92.682 127.421 92.6886 127.424 92.6954 127.424H278.91C280.288 127.424 286.636 123.142 287.768 121.764C296.807 111.21 291.465 96.47 278.964 92.641C277.959 92.3332 276.903 92.235 275.852 92.2336L84.9582 91.9896C40.0752 88.8891 0.901028 48.8783 0.950242 3.35557C0.950242 1.46184 3.25349 0.944092 5.14722 0.944092H284.766C308.782 0.944092 341.51 20.9741 356.914 38.7403C414.198 104.834 371.579 211.776 284.766 218.42C254.746 220.733 204.843 220.684 174.773 218.469C129.27 215.124 90.7001 173.277 92.633 127.433C92.6339 127.411 92.6612 127.4 92.6771 127.416Z"
          fill={isMounted ? "url(#centerGradient)" : "none"}
          strokeDashoffset="0"
        ></path>

        <path
          d="M237.551 341.546C237.551 343.473 236.023 345.064 234.096 345.055C187.368 344.83 146.673 304.177 146.448 257.407C146.439 255.48 148.03 253.952 149.957 253.952H234.526C235.328 253.952 236.098 254.271 236.665 254.838C237.232 255.405 237.551 256.174 237.551 256.976V341.546Z"
          fill={isMounted ? "url(#centerGradient)" : "none"}
        />
      </svg>
    </>
  );
};

export default Logo;
