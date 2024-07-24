import React, { useEffect, useState } from "react";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedTools from "../animations/AnimatedTools.tsx";
import { iconMapper } from "../helper/iconMapper";
import { Tools as ToolsType } from "../types/tools";
import getTools from "../service/GetTools.ts";
import Link from "next/link";
const Tools = () => {
  const [tools, setTools] = useState<ToolsType>();
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
  }, []);

  return (
    <section
      className="bg-[#0E1016] relative z-10 w-full items-center justify-center overflow-hidden
       bg-cover bg-center pt-16  md:pt-20 lg:pt-20"
      id="tools"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={"Some of My Tools."}
          className={
            "mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
          }
          wordSpace={"mr-[14px]"}
          charSpace={"mr-[0.001em]"}
        />

        <div className="mx-auto w-[100%] justify-center lg:max-w-[1200px]">
          {tools && tools.Design.length > 0 && (
            <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
              <AnimatedBody delay={0.1} text="Design" />
              <div>
                <AnimatedTools
                  className="grid grid-cols-5 gap-4"
                  delay={0.1}
                  stepSize={0.1}
                  iconSize={50}
                >
                  {tools.Design.map((tool) => (
                    <Link
                      href={iconMapper(tool)?.link}
                      target="_blank"
                      aria-label={`Learn more about ${tool}`}
                      title={tool}
                      data-blobity-tooltip={tool}
                      data-blobity-magnetic="false"
                    >
                      {iconMapper(tool)?.icon}{" "}
                    </Link>
                  ))}
                </AnimatedTools>
              </div>
            </div>
          )}
          {tools && tools.Frontend?.length > 0 && (
            <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
              <AnimatedBody delay={0.2} text="Frontend" />
              <div>
                <AnimatedTools
                  className="grid grid-cols-5 gap-4"
                  delay={0.2}
                  stepSize={0.1}
                  iconSize={50}
                >
                  {tools.Frontend.map((tool) => (
                    <Link
                      key={tool + Math.random()}
                      href={iconMapper(tool)?.link}
                      target="_blank"
                      aria-label={`Learn more about ${tool}`}
                      title={tool}
                      data-blobity-tooltip={tool}
                      data-blobity-magnetic="false"
                    >
                      {iconMapper(tool)?.icon}{" "}
                    </Link>
                  ))}
                </AnimatedTools>
              </div>
            </div>
          )}
          {tools && tools.Mobile?.length > 0 && (
            <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
              <AnimatedBody delay={0.2} text="Mobile" />
              <div>
                <AnimatedTools
                  className="grid grid-cols-5 gap-4"
                  delay={0.2}
                  stepSize={0.1}
                  iconSize={50}
                >
                  {tools.Mobile.map((tool) => (
                    <Link
                      key={tool + Math.random()}
                      href={iconMapper(tool)?.link}
                      target="_blank"
                      aria-label={`Learn more about ${tool}`}
                      title={tool}
                      data-blobity-tooltip={tool}
                      data-blobity-magnetic="false"
                    >
                      {iconMapper(tool)?.icon}{" "}
                    </Link>
                  ))}
                </AnimatedTools>
              </div>
            </div>
          )}
          {tools && tools.Backend?.length > 0 && (
            <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
              <AnimatedBody delay={0.3} text="Backend" />
              <div>
                <AnimatedTools
                  className="grid grid-cols-5 gap-4"
                  delay={0.1}
                  stepSize={0.1}
                  iconSize={50}
                >
                  {tools.Backend.map((tool) => (
                    <Link
                      href={iconMapper(tool)?.link}
                      target="_blank"
                      key={tool + Math.random()}
                      aria-label={`Learn more about ${tool}`}
                      title={tool}
                      data-blobity-tooltip={tool}
                      data-blobity-magnetic="false"
                    >
                      {iconMapper(tool)?.icon}{" "}
                    </Link>
                  ))}
                </AnimatedTools>
              </div>
            </div>
          )}
          {tools && tools.Other?.length > 0 && (
            <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
              <AnimatedBody delay={0.4} text="Other" />
              <div>
                <AnimatedTools
                  className="grid grid-cols-5 gap-4"
                  delay={0.4}
                  stepSize={0.1}
                  iconSize={50}
                >
                  {tools.Other.map((tool) => (
                    <Link
                      href={iconMapper(tool)?.link}
                      target="_blank"
                      key={tool + Math.random()}
                      aria-label={`Learn more about ${tool}`}
                      title={tool}
                      data-blobity-tooltip={tool}
                      data-blobity-magnetic="false"
                    >
                      {iconMapper(tool)?.icon}{" "}
                    </Link>
                  ))}
                </AnimatedTools>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tools;
