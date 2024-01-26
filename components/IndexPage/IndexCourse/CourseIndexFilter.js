import React from "react";

const CourseIndexFilter = ({
  id,
  title,
  setFilterSelected,
  filterSelected,
  coursesPage,
  userpanel,
}) => {
  return (
    <button
      className={`border-white border-2 shadow-sm py-1 rounded-2xl transition-colors cursor-pointer ${
        coursesPage
          ? "xl:px-4 md:px-3 px-2 md:text-sm text-xs xl:text-sm 2xl:text-lg"
          : userpanel
          ? "px-7 py-2 text-sm lg:text-sm"
          : "px-8 text-sm lg:text-lg"
      } ${
        filterSelected === id
          ? "bg-[#2196f3] text-white"
          : "bg-gray-200 hover:bg-gray-300 text-[#4c5c84]"
      }`}
      onClick={() => setFilterSelected(id)}
    >
      {title}
    </button>
  );
};

export default CourseIndexFilter;
