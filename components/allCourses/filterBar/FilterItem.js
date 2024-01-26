import React, { useState } from "react";
import { SlArrowUp } from "react-icons/sl";

const FilterItem = ({ titleKeyName, selected, data, setSelected, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 transition-all">
      <div className="flex justify-between items-center">
        <h1 className="text-[#555] dark:text-white">{title}</h1>
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
            onClick={() => setSelected("همه")}
            className="h-5"
            checked={selected === "همه"}
          />
          <span className="block h-5">همه</span>
        </span>
        {data.map((item) => (
          <span
            className="flex gap-3 items-start justify-start my-3"
            key={titleKeyName ? item[titleKeyName] : item}
          >
            <input
              onClick={() =>
                setSelected(titleKeyName ? item[titleKeyName] : item)
              }
              type="radio"
              name={titleKeyName ? item[titleKeyName] : item}
              className="h-5"
              checked={selected === (titleKeyName ? item[titleKeyName] : item)}
            />
            <span className="block h-5">
              {titleKeyName ? item[titleKeyName] : item}
            </span>
          </span>
        ))}
      </form>
    </div>
  );
};

export default FilterItem;
