import React, { useContext } from "react";
import FilterItem from "../allCourses/filterBar/FilterItem";
import RangeSlider from "./RangeSlider";
import { CoursesContext } from "@/context/coursesContext";
import CategoriFilter from "../allCourses/filterBar/CategoriFilter";
import TeacherFilter from "../allCourses/filterBar/TeacherFilter";
import LevelFilter from "../allCourses/filterBar/LevelFilter";
import CoursesTypeFilter from "../allCourses/filterBar/CoursesTypesFilter";
import CoursesTypesFilter from "../allCourses/filterBar/CoursesTypesFilter";

const FilterBar = ({ userpanel, handleResetFilters }) => {
  const {
    allCourses,
    minPriceRange,
    maxPriceRange,
    priceRange,
    setPriceRange,
  } = useContext(CoursesContext);

  const handleMinPrice = (event) => {
    if (!event.target.value) {
      setPriceRange((prev) => [
        +allCourses.reduce((prev, current) => {
          if (current.cost < prev) {
            return current.cost;
          }
          return prev;
        }, allCourses[0]?.cost),
        +prev[1],
      ]);
    } else {
      setPriceRange((prev) => [+event.target.value, +prev[1]]);
    }
  };
  const handleMaxPrice = (event) => {
    if (!event.target.value) {
      setPriceRange((prev) => [
        +prev[0],
        +allCourses.reduce((prev, current) => {
          if (current.cost > prev) {
            return current.cost;
          }
          return prev;
        }, allCourses[0]?.cost),
      ]);
    } else {
      setPriceRange((prev) => [+prev[0], +event.target.value]);
    }
  };

  return (
    <div className="col-span-1 lg:m-0 mt-3">
      <button
        className="bg-green-500 text-center py-2 w-full text-white rounded-lg mb-3"
        onClick={handleResetFilters}
      >
        تنظیم مجدد فیلتر ها
      </button>
      <CategoriFilter />
      <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 mt-5">
        <div className="flex gap-2 items-center">
          <h1 className="text-[#555] dark:text-white h-7">قیمت</h1>
        </div>
        <div className="grid gap-4 grid-cols-2 w-full mt-3">
          <input
            type="number"
            placeholder="تا :"
            className={`rounded-lg overflow-hidden bg-[#e9e9ed] px-2 text-black ${
              userpanel
                ? "2xl:text-lg lg:text-xs sm:text-lg text-sm"
                : "xl:text-lg lg:text-sm sm:text-lg text-sm"
            }`}
            onChange={(event) => handleMaxPrice(event)}
            value={priceRange[1]}
          />
          <input
            type="number"
            placeholder="از :"
            className={`rounded-lg overflow-hidden bg-[#e9e9ed] px-2 text-black ${
              userpanel
                ? "2xl:text-lg lg:text-xs sm:text-lg text-sm"
                : "xl:text-lg lg:text-sm sm:text-lg text-sm"
            }`}
            onChange={(event) => handleMinPrice(event)}
            value={priceRange[0]}
          />
        </div>
        <RangeSlider
          data={priceRange}
          max={maxPriceRange}
          min={minPriceRange}
        />
      </div>
      <div className="mt-5">
        <TeacherFilter />
      </div>
      <div className="mt-5">
        <LevelFilter />
      </div>
      <div className="mt-5">
        <CoursesTypesFilter />
      </div>
    </div>
  );
};

export default FilterBar;
