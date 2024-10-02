"use client";
import Link from "next/link";
import Container from "../components/container/Container";
import React, { useEffect, useState } from "react";

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

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        // Adjust threshold as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolled ? "nav-scrolled" : ""
      } nowrap top-30 fixed left-0 right-0 z-50 mx-auto  my-0 flex items-center justify-center gap-1 rounded-lg px-1 py-2 text-main md:p-2`}
    >
      <svg
        width="31"
        height="45"
        viewBox="0 0 24 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.77 11.6735L20.0017 9.33358C20.0663 9.28679 20.1046 9.21184 20.1046 9.13205V6.12058C20.1046 5.92099 20.328 5.80288 20.4925 5.91584C22.4262 7.24307 23.2634 7.97028 23.4108 8.86712C23.4129 8.87957 23.4138 8.89221 23.4138 8.90483V22.6949C23.3217 23.5598 22.7558 24.2148 20.487 25.6843C20.3223 25.7909 20.1046 25.6728 20.1046 25.4766V11.5592C20.1046 11.3568 19.8757 11.2391 19.7111 11.3568L11.8638 16.9687C11.7775 17.0304 11.6616 17.0306 11.5751 16.9692L3.628 11.3293C3.46325 11.2124 3.23519 11.3302 3.23519 11.5322V25.4701C3.23519 25.6677 3.01563 25.7862 2.85071 25.6773C0.857442 24.362 -0.0273673 23.6247 0.000643971 22.6949V8.88587C0.0832102 7.95984 0.821537 7.33704 2.84445 5.92332C3.00906 5.80828 3.23519 5.926 3.23519 6.12684V9.13117C3.23519 9.21145 3.27393 9.2868 3.33921 9.33352L6.66813 11.7155V4.14473C6.66813 4.12156 6.67629 4.09901 6.69109 4.0812C6.9002 3.82962 7.10994 3.59303 7.33595 3.35943C7.38366 3.30965 7.43292 3.25968 7.48374 3.20944C8.25498 2.44093 9.23989 1.67683 11.0003 0.48525C11.2049 0.340773 11.4171 0.191225 11.6373 0.0360886L11.6381 0.0354995L11.6628 0.0180791C11.6964 -0.00557169 11.7425 -0.0060148 11.7767 0.0167322C14.6798 1.94841 15.721 2.82173 16.747 4.05613C16.7618 4.07394 16.77 4.09649 16.77 4.11965V11.6735ZM13.3613 14.1415V2.91516C13.3613 2.88341 13.3461 2.85356 13.3205 2.83482L11.7638 1.69632C11.7369 1.69085 11.7083 1.69658 11.6851 1.71351L10.1176 2.8599C10.092 2.87864 10.0768 2.90848 10.0768 2.94023V14.1546L11.574 15.2259C11.661 15.2881 11.7781 15.2878 11.8647 15.2251L13.3613 14.1415ZM16.6705 28.2834V18.0131C16.6705 17.9318 16.5783 17.8848 16.5123 17.9321C16.2691 18.1066 16.034 18.272 15.8098 18.4297L15.8096 18.4298C14.645 19.2491 13.7772 19.8597 13.6133 20.4437C13.6111 20.4517 13.61 20.4598 13.61 20.4681L13.5122 30.8749C13.5115 30.9531 13.5978 31.0012 13.6644 30.9601C15.6641 29.7238 16.5079 29.0834 16.6685 28.3027C16.6698 28.2964 16.6705 28.2899 16.6705 28.2834ZM6.76766 28.3085V18.0381C6.76766 17.9569 6.85983 17.9099 6.92584 17.9572C7.16911 18.1317 7.40429 18.2972 7.62848 18.4549L7.6285 18.4549L7.62852 18.4549L7.62854 18.4549C8.79309 19.2742 9.66093 19.8848 9.8248 20.4688C9.82703 20.4768 9.82807 20.4849 9.82815 20.4931L9.92587 30.8999C9.9266 30.9782 9.84028 31.0263 9.7737 30.9851C7.77398 29.7488 6.93018 29.1085 6.76959 28.3278C6.76828 28.3214 6.76766 28.3149 6.76766 28.3085Z"
          fill="url(#paint0_linear_460_55)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_460_55"
            x1="1.64215"
            y1="9.57923"
            x2="27.1453"
            y2="26.3491"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F5D38E" />
            <stop offset="1" stop-color="#E48D2E" />
          </linearGradient>
        </defs>
      </svg>

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
  );
};

export default NavBar;
