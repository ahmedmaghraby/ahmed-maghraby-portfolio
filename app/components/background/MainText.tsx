import React from "react";
import "./MainText.css";
import { lex } from "../../helper/lex";
const MainText: React.FC = () => {
  return (
    <>
      <h1
        className={`${lex.className} typewriter  text-center text-xl font-extralight sm:max-w-sm sm:text-3xl md:max-w-3xl md:text-4xl md:leading-10 lg:max-w-full lg:text-7xl lg:leading-[5.25rem]`}
      >
        Elevate Your
        <br />
        World to New Heights
        <br />
        Right Now!
      </h1>
    </>
  );
};

export default MainText;
