"use client";
import Link from "next/link";
import Container from "../components/container/Container";
import React from "react";

const NavBar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href.split("#")[1];
    window.scrollTo({
      top: document.getElementById(href)?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="nowrap fixed top-10 left-0 right-0 z-50 my-0 mx-auto flex items-center justify-center gap-1 px-1 py-1 sm:w-[383.3px] md:p-2 lg:w-[391.3px]">
      <nav className="nowrap top-30 fixed left-0 right-0 z-50 my-0 mx-auto flex items-center justify-center gap-1 rounded-lg px-1 py-1 text-main sm:w-[383.3px] md:p-2 lg:w-[391.3px]">
        <Link
          href="#home"
          data-blobity-magnetic="false"
          onClick={handleScroll}
          aria-label="Scroll to Home Section"
        >
          <h4 className="py-2 px-2 text-[12px] sm:px-4 sm:text-[14px] md:py-1 md:px-4">
            HOME
          </h4>
        </Link>

        <Link
          href="#about"
          data-blobity-magnetic="false"
          onClick={handleScroll}
          aria-label="Scroll to About Section"
        >
          <h4 className="py-2 px-2 text-[12px] sm:px-4 sm:text-[14px] md:py-1 md:px-4">
            ABOUT
          </h4>
        </Link>

        <Link
          href="#work"
          data-blobity-magnetic="false"
          onClick={handleScroll}
          aria-label="Scroll to Work Section"
        >
          <h4 className="py-2 px-2 text-[12px] sm:px-4 sm:text-[14px] md:py-1 md:px-4">
            WORK
          </h4>
        </Link>

        <Link
          href="#contact"
          data-blobity-magnetic="false"
          onClick={handleScroll}
          aria-label="Scroll to Contact Section"
        >
          <h4 className="py-2 px-2 text-[12px] sm:px-4 sm:text-[14px] md:py-1 md:px-4">
            CONTACT
          </h4>
        </Link>
      </nav>
    </nav>
  );
};

export default NavBar;
