import React from "react";
import CountUp from "react-countup";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";
import { RiArticleLine, RiVideoLine } from "react-icons/ri";

const Aboutus = (props) => {
  return (
    <div className="bg-[#5beb8c]/80  w-32 h-32 p-3 box-border rounded-md ">
      <span className="w-full block text-center">
        <CountUp start={0} end={props.number} duration={4} />
      </span>
      <span className="text-center block text-xl mt-2">
        {props.text === "teacherCount"
          ? "استید"
          : props.text === "courseCount"
          ? "دوره ها"
          : props.text === "newsCount"
          ? "مقاله"
          : "دانشجو"}
        <div className="w-full flex justify-center mt-2">
          {props.text === "teacherCount" ? (
            <LiaChalkboardTeacherSolid size={35} />
          ) : props.text === "courseCount" ? (
            <RiVideoLine size={35} />
          ) : props.text === "newsCount" ? (
            <RiArticleLine size={35} />
          ) : (
            <PiStudentFill size={35} />
          )}
        </div>
      </span>
    </div>
  );
};

export default Aboutus;
