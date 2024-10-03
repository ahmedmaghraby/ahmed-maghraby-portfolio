import React, { cloneElement, useEffect, useRef, useState } from "react";
import "../animations/animate.css";
import AnimatedTitle from "../animations/AnimatedTitle";
import { Tools as ToolsType } from "../types/tools";
import getTools from "../service/GetTools.ts";
import Link from "next/link";
import { Roboto } from "../helper/font";
import Animated from "../animations/Animated.tsx";
import Slider from "./Slider.tsx";
import Image from "next/image";
import Container from "../components/container/Container.tsx";
const Tools = () => {
  const [tools, setTools] = useState<ToolsType>();
  const logosRef = useRef<HTMLUListElement>(null); // Define the type here

  useEffect(() => {
    getTools().then(({ result, error }) => {
      if (error) {
        console.log(error);
      } else {
        const res = result;
        console.log(res);

        setTools(res as ToolsType);
      }
    });
    const ul = logosRef.current;
    if (ul) {
      const clone = ul.cloneNode(true) as HTMLUListElement;
      clone.setAttribute("aria-hidden", "true");
      ul.insertAdjacentElement("afterend", clone);
    }
  }, []);

  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016]
       bg-cover bg-center pt-16  md:pt-20 lg:pt-20"
      id="tools"
    >
      <div className="flex flex-col items-center justify-center w-full mx-auto ">
        <AnimatedTitle
          text={"Brands I worked with"}
          className={`${Roboto.className} text-t-color} text-lg font-light md:text-xl lg:text-2xl mb-12`}
          wordSpace={"mr-[8px]"}
          charSpace={"mr-[0.001em]"}
        />

          {tools && tools.Other?.length > 0 && (
            <Slider
              width="250px"
              duration={40}
              pauseOnHover={true}
              blurBorders={false}
              blurBoderColor={"#fff"}
            >
              {tools.Other.map((tool, i) => (
                <Slider.Slide key={Math.random()} className="mx-2">
                  <Link
                    href={tool?.link || ""}
                    target="_blank"
                    aria-label={`Learn more about ${tool?.name || ""}`}
                    title={tool?.name || ""}
                    data-blobity-tooltip={tool?.name || ""}
                    data-blobity-magnetic="false"
                  >
                    <Image
                      className="cursor-pointer-custom w-[250px] brands-Img object-cover "
                      src={tool?.img || ""}
                      alt={tool?.name || ""}
                      width={150}
                      height={150}
                    />
                  </Link>
                </Slider.Slide>
              ))}
            </Slider>
          )}
      </div>
    </section>
  );
};

export default Tools;
