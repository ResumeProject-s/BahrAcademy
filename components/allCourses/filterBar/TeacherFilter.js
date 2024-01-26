import { CoursesContext } from "@/context/coursesContext";
import mainContext from "@/context/mainContext";
import React, { useContext, useState } from "react";
import { SlArrowUp } from "react-icons/sl";

const TeacherFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedTeacher, selectedTeacher, teachers } =
    useContext(CoursesContext);
  return (
    <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 transition-all">
      <div className="flex justify-between items-center">
        <h1 className="text-[#555] dark:text-white">اساتید</h1>
        <SlArrowUp
          className={`${
            isOpen ? "rotate-0" : "rotate-180"
          } cursor-pointer transition-all`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <form
        className={`text-[#444] dark:text-[#999] mt-5 transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <span className="flex gap-3 items-start justify-start my-3">
          <input
            type="radio"
            name="همه"
            onClick={() => setSelectedTeacher(null)}
            className="h-5"
            checked={selectedTeacher === null}
          />
          <span className="block h-5">همه</span>
        </span>
        {teachers
          .filter((teacher) => teacher.courseCounts)
          .map((item) => (
            <span
              className="flex gap-3 items-start justify-start my-3"
              key={item.fullName}
            >
              <input
                onClick={() => setSelectedTeacher(item.teacherId)}
                type="radio"
                name={item.fullName}
                className="h-5"
                checked={selectedTeacher === item.teacherId}
              />
              <span className="block h-5">{item.fullName}</span>
            </span>
          ))}
      </form>
    </div>
  );
};

export default TeacherFilter;
