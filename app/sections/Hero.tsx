import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import Banner from "../assets/banner.png";
import MainText from "../components/background/MainText.tsx";
const Hero = () => {
  const [isWelcomeMessageFinished, setIsWelcomeMessageFinished] =
    useState<boolean>(false);
  return (
    <motion.section
      className="container relative z-20 flex justify-center w-full"
      id="home"
      initial="initial"
      animate="animate"
    >
      {/* <HeroBackground /> */}

      <Image
        src={Banner}
        alt="hero"
        width={1920}
        height={1080}
        className="object-cover w-full h-auto rounded-2xl"
      />
      <div className="flex flex-col items-center justify-center mt-0 md:mt-10">
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center`}
        >
          {/* {!isWelcomeMessageFinished ? (
            <MachineGun text={"Welcome to My Portfolio, are you ready?"} finished={()=>setIsWelcomeMessageFinished(true)} /> //available only in local or for paid licenses  
          ) : ( */}
          <MainText />
          {/* )} */}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
