import React, { cloneElement, useEffect, useRef, useState } from "react";
import "../animations/animate.css";
import AnimatedTitle from "../animations/AnimatedTitle";
import { Tools as ToolsType } from "../types/tools";
import getTools from "../service/GetTools.ts";
import Link from "next/link";
import { lex } from "../helper/lex.ts";
import Slider from "./Slider.tsx";
import Image from "next/image";
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
      className="relative z-10 items-center justify-center w-full py-16 my-10 overflow-hidden bg-center bg-cover bg-main lg:py-20"
      id="tools"
    >
      <div className="flex flex-col items-center justify-center w-full mx-auto ">
        <AnimatedTitle
          text={"Brands We worked with"}
          className={`${lex.className} mb-12 text-lg font-light text-bg-dark md:text-xl lg:text-2xl`}
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
                    className="cursor-pointer-custom w-[250px] object-cover opacity-70 hover:opacity-100"
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
