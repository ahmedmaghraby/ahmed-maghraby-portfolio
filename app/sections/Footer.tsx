import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBody from "../animations/AnimatedBody";
import React from "react";
import { Roboto } from  "../helper/font";

const Footer = () => {
    return (
        <motion.section
            className="items-center justify-center w-full py-10 font-bold uppercase"
            initial="initial"
            animate="animate"
        >
            <motion.div className={`${Roboto.className} mx-auto flex w-[90%] flex-row items-center justify-end text-center text-base text-main `}>
                <AnimatedBody
                    text={"© Mo Ali," + new Date().getFullYear()}
                    className={"m-0 p-0"}
                />
            </motion.div>
        </motion.section>
    );
};

export default Footer;
