import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";

const RatingStar = ({
  handleRatingClick,
  handleRatingHover,
  selectedRating,
  ratingSelected,
}) => {
  return (
    <div className=" flex justify-start items-center w-full h-fit mb-5 gap-5 ">
      <div className="md:text-xl text-sm font-bold text-white">
        امتیاز دهید:
      </div>
      <div className="rate rtl">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="cursor-pointer"
            onMouseEnter={() => handleRatingHover(value)}
            onMouseLeave={() => ratingSelected || handleRatingHover(0)}
            onClick={() => handleRatingClick(value)}
          >
            <Field
              type="radio"
              id={`star${value}`}
              className="star hidden"
              name="star"
              value={value}
            />
            <label
              htmlFor={`star${value}`}
              title={`${value} ستاره`}
              className={`text-3xl ${
                selectedRating >= value ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </label>
          </span>
        ))}
      </div>
      <span className="text-white md:text-lg text-sm">
        {selectedRating} ستاره
      </span>
      <span className="text-[#ff3434] font-bold">
        <ErrorMessage name="star" />
      </span>
    </div>
  );
};

export default RatingStar;
