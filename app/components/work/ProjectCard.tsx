import { ProjectProps } from "../../types/project";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "../../animations/AnimatedTitle";
import AnimatedBody from "../../animations/AnimatedBody";
import { motion } from "framer-motion";
import Container from "../container/Container";
import React from "react";
import { SiGithub } from "react-icons/si";
import { GoArrowUpRight } from "react-icons/go";
import { iconMapper } from "../../helper/iconMapper";
import { Roboto } from "../../helper/font";

const ProjectCard = ({
  id,
  name,
  description,
  demo,
  image,
  available,
}: ProjectProps) => {
  return (
    <motion.div
      className={`relative z-10 flex w-full flex-col items-stretch justify-center gap-4 py-0 pb-20 md:gap-6 lg:gap-8 `}
      initial="initial"
      animate="animate"
    >
      <div className="flex flex-row items-center justify-between">
        <AnimatedTitle
          text={name}
          className={`${Roboto.className} max-w-[50%] text-lg font-semibold leading-none text-t-color md:max-w-max md:text-xl lg:text-2xl`}
          wordSpace={"mr-[0.25em]"}
          charSpace={"-mr-[0.01em]"}
        />
        {available ? (
          <>
            {demo && (
              <Link
                href={demo}
                target="_blank"
                aria-label="Open Live Demo"
                className="text-xs font-light caseStudy md:text-md text-t-color md:pr-4 lg:text-lg"
                data-no-blobity
              >
                Case Study
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="MyGradient">
                      <stop offset="5%" stop-color="#EBAB58" />
                      <stop offset="95%" stop-color="#f5d393" />
                    </linearGradient>
                  </defs>

                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.17574 8.82426C1.41005 9.05858 1.78995 9.05858 2.02426 8.82426L7.8 3.04853V7.6C7.8 7.93137 8.06863 8.2 8.4 8.2C8.73137 8.2 9 7.93137 9 7.6V1.6C9 1.26863 8.73137 1 8.4 1H2.4C2.06863 1 1.8 1.26863 1.8 1.6C1.8 1.93137 2.06863 2.2 2.4 2.2H6.95147L1.17574 7.97574C0.941421 8.21005 0.941421 8.58995 1.17574 8.82426Z"
                    fill="#EBAB58"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            )}
          </>
        ) : (
          <span className="text-xs font-light md:text-md text-t-color md:pr-4 lg:text-lg">
            COMING SOON
          </span>
        )}
      </div>

      <AnimatedBody
        text={description}
        className={`${Roboto.className} md:text-md max-w-full text-sm font-light text-t-color md:pr-10 lg:text-lg `}
      />
      {demo ? (
        <Link
          href={demo}
          target="_blank"
          aria-label="Open Live Demo"
          className="text-xs font-light hoverPointer md:text-md text-t-color md:pr-4 lg:text-lg"
          data-no-blobity
        >
          <Image
            src={image}
            alt={name}
            className={`w-full`}
            width={10}
            height={10}
            priority={true}
          />
        </Link>
      ) : (
        <Image
          src={image}
          alt={name}
          className={`w-full`}
          width={10}
          height={10}
          priority={true}
        />
      )}
      {/* <Container
        width="100%"
        height="100%"
        borderRadius={25}
        color="transparent"
        blur={false}
        top="0px"
        left="0px"
        angle={0}
      >
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className={`none absolute -bottom-2 w-[70%] md:block lg:max-w-[55%] ${
            id % 2 === 0 ? "right-0" : "left-0"
          }`}
          priority={true}
        />
        <div
          className={`absolute top-0 text-[#0E1016] ${
            id % 2 === 0 ? "left-0 ml-8 lg:ml-14" : "right-0 mr-8 lg:mr-14"
          } mt-6 flex  items-center justify-center gap-4 lg:mt-10`}
        >
          {available ? (
            <>
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  aria-label="Open GitHub Repository"
                  className=" rounded-full bg-white p-5 text-[20px] md:text-[24px]  lg:text-[28px]"
                  data-blobity
                  data-blobity-radius="35"
                  data-blobity-offset-x="4"
                  data-blobity-offset-y="4"
                  data-blobity-magnetic="false"
                >
                  <SiGithub />
                </Link>
              )}
              {demo && (
                <Link
                  href={demo}
                  target="_blank"
                  aria-label="Open Live Demo"
                  className=" rounded-full bg-white p-5 text-[20px] md:text-[24px]  lg:text-[28px]"
                  data-blobity
                  data-blobity-radius="35"
                  data-blobity-offset-x="4"
                  data-blobity-offset-y="4"
                  data-blobity-magnetic="false"
                >
                  <BsLink45Deg />
                </Link>
              )}
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div
          className={`absolute text-white  ${
            !(id % 2 === 0)
              ? "right-0 top-24 mr-0 ml-10 md:right-0 md:ml-0 lg:right-0 lg:top-52  lg:mr-4"
              : "left-10 top-24 ml-0 md:mr-12 lg:top-52 lg:ml-4"
          } mb-10  md:mb-16 lg:mb-14 `}
        >
        
        </div>
      </Container> */}
    </motion.div>
  );
};

export default ProjectCard;
