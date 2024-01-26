import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const CourseDetailSection = ({ icon: IconComponent, title, value }) => {
  return (
    <div className="border-b border-gray-300 py-3 flex justify-between text-gray-500 dark:text-gray-300 col-span-1 xl:text-lg text-xs">
      <div className="flex items-center gap-2">
        <IconComponent />
        <span>{title}</span>
      </div>
      <span>{value}</span>
    </div>
  );
};

export default CourseDetailSection;
