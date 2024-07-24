import React from "react";
import Link from "next/link";
import "./assets/404.css";

const NotFound = () => {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-5 bg-[#0E1016] text-main">
      <div className="eye-int">
        <div className="eye-ext"></div>
        <div className="eye-ext"></div>
      </div>

      <div className="not-found"></div>

      <div>
        <Link href="/" className="text-2xl lowercase ">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
