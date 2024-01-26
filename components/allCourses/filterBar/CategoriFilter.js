import { CoursesContext } from "@/context/coursesContext";
import mainContext from "@/context/mainContext";
import React, { useContext, useState } from "react";
import { SlArrowUp } from "react-icons/sl";

const CategoriFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedCategori, selectedCategori, allCategories } =
    useContext(CoursesContext);
  return (
    <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 transition-all">
      <div className="flex justify-between items-center">
        <h1 className="text-[#555] dark:text-white">دسته بندی </h1>
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
            onClick={() => setSelectedCategori(null)}
            className="h-5"
            checked={selectedCategori === null}
          />
          <span className="block h-5">همه</span>
        </span>
        {allCategories.map((item) => (
          <span
            className="flex gap-3 items-start justify-start my-3"
            key={item.techName}
          >
            <input
              onClick={() => setSelectedCategori(item.id)}
              type="radio"
              name={item.techName}
              className="h-5"
              checked={selectedCategori === item.id}
            />
            <span className="block h-5">{item.techName}</span>
          </span>
        ))}
      </form>
    </div>
  );
};

export default CategoriFilter;
