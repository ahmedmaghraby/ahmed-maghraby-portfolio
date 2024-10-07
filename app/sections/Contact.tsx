import Link from "next/link";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedWords from "../animations/AnimatedWords";
import { motion } from "framer-motion";
import ContactBackground from "../components/background/ContactBackground";
import React from "react";
import { Roboto } from  "../helper/font";

const Contact = () => {
  return (
    <motion.section
      className={`${Roboto.className} relative z-10 flex h-[85vh] w-full items-center justify-center overflow-hidden py-16 md:h-[80vh] md:py-20 lg:h-[90vh] lg:pt-0 lg:pb-28`}
      id="contact"
      initial="initial"
      animate="animate"
    >
      <ContactBackground />
      <div className="mx-auto  flex w-[90%] flex-col items-center justify-center pt-10 md:pt-0">
        <div
          className={`flex flex-col items-start justify-center relative w-full sm:items-center lg:max-w-[1440px] `}
        >
          <AnimatedWords
            title={"Find me!"}
            style={
              "flex text-left font-extrabold uppercase leading-[0.9em] text-secondary text-[18vw] flex-row items-center justify-center text-center "
            }
          />
        </div>

        <div className="mt-20 flex w-full flex-col items-center justify-center gap-16 sm:mt-32 sm:gap-12 md:mt-40 md:flex-row md:items-start md:justify-between lg:mt-12 lg:max-w-[1440px]">
          <div className="flex flex-col items-center text-base font-semibold text-center uppercase text-main md:items-start md:text-left">
            <AnimatedBody
              text={"Let's create something amazing together. Contact me!"}
              className={
                "-mb-1 inline-block overflow-hidden pt-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
              }
            />
            <Link
              href="mailto:ahmedhamdy078@gmail.com"
              target="_blank"
              aria-label="Send me an email"
              className="flex-1 mt-1 text-center underline underline-offset-2 hover:no-underline sm:mt-2 lg:mt-4 lg:text-left"
            >
              <AnimatedBody
                text={"Send me an email"}
                className={"text-center cursor-pointer lg:text-left"}
              />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center w-full font-bold text-main md:flex-row md:justify-between ">
            <Link
              href="https://www.linkedin.com/in/moe-uix"
              target="_blank"
              aria-label="View my linkedin Profile"
            >
              <AnimatedTitle
              text={"LINKEDIN"}
                className={"text-base cursor-pointer font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
            <Link
              href="https://github.com/ahmedmaghraby"
              target="_blank"
              aria-label="View GitHub MyProfile"
            >
              <AnimatedTitle
                text={"GITHUB"}
                className={"text-base cursor-pointer font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
            <Link
              href="https://calendar.app.google/rPaupi1Yd5vjJahRA"
              target="_blank"
              aria-label="Book a meeting with me"
            >
              <AnimatedTitle
                text={"CALENDAR"}
                className={"text-base cursor-pointer font-bold text-main"}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
