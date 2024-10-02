import React, { useContext, useEffect, useState } from "react";
import "./logo.css";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {

  return (
    <>
      <h1 className="max-w-xs text-xl font-thin text-center shadow-md typewriter sm:text-3xl md:text-4xl lg:text-7xl headline sm:max-w-sm md:max-w-3xl lg:max-w-full">
        Designing Beyond
        <br /> Pixels, Building Human
        <br /> Connections
      </h1>
    </>
  );
};

export default Logo;
