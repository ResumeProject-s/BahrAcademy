import Link from "next/link";
import React from "react";
import Aboutus from "./Aboutus";

const HeroSection = (props) => {
  return (
    <div
      className=" w-full md:h-[480px] h-[580px] relative sm:rounded-lg text-white"
      data-aos="zoom-in-up"
      style={{
        backgroundImage: "url(/images/herosection.jpg)",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="absolute top-0 w-full h-full bg-[#4b9fffcc] sm:rounded-lg">
        <div className="mx-auto md:w-[700px] w-full h-full">
        <h1 className="w-full text-center mt-12 text-4xl font-bold">گروه آموزش بحر </h1>
          <h2 className="w-full text-center mt-8 text-3xl font-bold">
            آموزش آنلاین ویدیویی، مهارت برای اشتغال
          </h2>
          <p className="text-center mt-5 text-xl">
            برای حرفه‌ای شدن حرفه‌ای آموزش ببینید
          </p>
          <div className="w-full flex justify-center gap-4 mt-5">
            <Link href={"/courses"}>
              <button className="border border-white text-white bg-transparent px-3 py-1 hover:bg-white rounded-md transition-all duration-150 hover:-translate-y-[2px] hover:text-blue-400">
                شروع یادگیری
              </button>
            </Link>
            <Link href={"/about"}>
              <button className="border border-white text-white bg-transparent px-3 py-1 hover:bg-white rounded-md transition-all duration-150 hover:-translate-y-[2px] hover:text-blue-400">
                درباره ما
              </button>
            </Link>
          </div>
          <div className="w-full flex justify-center mt-9 gap-5 flex-wrap flex-row">
            {Object.keys(props.AboutUsData).map((item, index) => {
              return (
                <Aboutus
                  key={index}
                  number={props.AboutUsData[item]}
                  text={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
