import { motion } from "framer-motion";
import Logo from "../components/svg/Logo.tsx";
import HeroBackground from "../components/background/HeroBackground.tsx";
import MachineGun from "../components/background/MachineGun.tsx";
import React, { useState } from "react";

const Hero = () => {
  const [isWelcomeMessageFinished, setIsWelcomeMessageFinished] =
    useState<boolean>(false);
  return (
    <motion.section
      className="relative z-10 flex h-[100vh]  w-full justify-center"
      id="home"
      initial="initial"
      animate="animate"
    >
      <HeroBackground />
      <div className="flex flex-col items-center justify-center mt-0 md:mt-10">
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center  pointer-events-none`}
        >
          {/* {!isWelcomeMessageFinished ? (
            <MachineGun text={"Welcome to My Portfolio, are you ready?"} finished={()=>setIsWelcomeMessageFinished(true)} /> //available only in local or for paid licenses  
          ) : ( */}
            <Logo width={250} height={250} />
          {/* )} */}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
