import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { CoursesData, indexPageCourseFilters } from "@/DB/DataBase";
import Course from "../../common/Course";
import CourseIndexFilter from "./CourseIndexFilter";
import Link from "next/link";

const IndexCourses = (props) => {
  const [CoursesData, setCoursesData] = useState(
    props.CoursesData.courseFilterDtos
  );
  const [filterSelected, setFilterSelected] = useState(1);
  const [mainCourses, setMainCourses] = useState(CoursesData);
  const [showAll, setShowAll] = useState(false);
  const select = useRef(null);

  useEffect(() => {
    let filterCourses;
    if (filterSelected === 1) {
      filterCourses = CoursesData;
    } else if (filterSelected === 2) {
      filterCourses = [...CoursesData].sort((a, b) => b.star - a.star);
    } else if (filterSelected === 3) {
      filterCourses = [...CoursesData].sort((a, b) => b.students - a.students);
    } else if (filterSelected === 4) {
      filterCourses = [...CoursesData].filter((item) => item.Discount);
    }
    setMainCourses(filterCourses);
  }, [filterSelected]);

  return (
    <div className="mt-20 w-full">
      <div className="flex justify-between px-3 items-center">
        <select
          onChange={() => {
            setFilterSelected(Number(select.current.value));
          }}
          ref={select}
          name="filter"
          className="bg-[#2196f3] p-1 lg:hidden block rounded-md md:h-auto md:w-auto sm:w-28 w-24 text-xs sm:text-sm md:text-base text-white"
        >
          {indexPageCourseFilters.map((item, index) => (
            <option value={item.id} selected={!index} key={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <h1 className="md:text-3xl sm:text-2xl text-xl dark:text-white text-[#4c5c84]">
          دوره های ما
        </h1>
        <div className="lg:flex justify-center gap-3 hidden">
          {indexPageCourseFilters.map((filter) => (
            <CourseIndexFilter
              {...filter}
              key={filter.id}
              setFilterSelected={setFilterSelected}
              filterSelected={filterSelected}
            />
          ))}
        </div>
        <Link href={"/courses"}>
          <button className="text-[#2196f3] md:text-base sm:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
            مشاهده دوره ها
            <MdKeyboardArrowLeft />
          </button>
        </Link>
      </div>
      <div className="mt-14 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {mainCourses
          .slice(0, showAll ? mainCourses.length : 8)
          .map((course, index) => (
            <Course {...course} index={index} key={course.id} view="col" />
          ))}
      </div>
      {mainCourses.length > 8 ? (
        <div className="w-full flex items-center justify-center mt-14">
          <button
            className="rounded-full bg-[#2396f3] text-white mx-auto px-4 py-2"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "مشاهده کمتر" : "مشاهده بیشتر"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default IndexCourses;
