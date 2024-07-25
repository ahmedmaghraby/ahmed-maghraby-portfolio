import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBody from "../animations/AnimatedBody";
import React from "react";

const Footer = () => {
    return (
        <motion.section
            className=" h-[15vh] w-full  items-center justify-center bg-[#0E1016] pt-10  font-bold uppercase md:h-[20vh] md:py-16 lg:h-[10vh] lg:pt-6 lg:pb-0"
            initial="initial"
            animate="animate"
        >
            <motion.div className="mx-auto flex w-[90%] flex-row items-center justify-between text-center text-base text-main ">
                <AnimatedBody
                    text={"© Ahmed Maghraby" + new Date().getFullYear()}
                    className={"m-0 p-0"}
                />
                <div className="flex flex-row gap-1 md:flex-col md:gap-2">
                    <AnimatedBody text={"Deployed by"} className={"m-0 p-0"} />
                    <Link
                        href="https://ahmedmaghraby.me"
                        target="_blank"
                        aria-label="Ahmed Maghraby's Portfolio"
                    >
                        <span className="underline cursor-pointer underline-offset-2 hover:no-underline">
                            <AnimatedBody text={"Ahmed Maghraby"} className={"m-0 p-0"} />
                        </span>{" "}
                    </Link>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Footer;
