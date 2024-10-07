import React, { useContext, useEffect, useState } from "react";
import "./logo.css";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {

  return (
    <>
      <h1 className="max-w-xs text-xl text-center shadow-md font-extralight md:leading-10 lg:leading-[5.25rem] typewriter sm:text-3xl md:text-4xl lg:text-7xl sm:max-w-sm md:max-w-3xl lg:max-w-full">
        Designing Beyond
        <br /> Pixels, Building Human
        <br /> Connections
      </h1>
    </>
  );
};

export default Logo;
