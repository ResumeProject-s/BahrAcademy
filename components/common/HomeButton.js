import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";

const HomeButton = ({ relative = false }) => {
  return (
    <Link
      href="/"
      className={`w-32 h-12 bg-[#2396f3] text-white text-center rounded-md ${
        !relative ? "absolute top-3 left-3" : "relative"
      } leading-[50px] text-sm flex justify-center items-center gap-3 border border-gray-300`}
    >
      <span>برگشت به خانه</span>
      <AiFillHome size={"25px"} />
    </Link>
  );
};

export default HomeButton;
