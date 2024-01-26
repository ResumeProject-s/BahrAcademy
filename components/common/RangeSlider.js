import { CoursesContext } from "@/context/coursesContext";
import { Slider } from "@mui/material";
import React, { useContext } from "react";

const RangeSlider = ({ data, max, min }) => {
  const { setPriceRange } = useContext(CoursesContext);
  return (
    <Slider
      value={data}
      onChange={(e) =>
        setPriceRange(
          e.target.value[1] >= 2000000000
            ? [e.target.value[0], 2000000000]
            : e.target.value
        )
      }
      valueLabelDisplay="auto"
      max={max === -Infinity ? 0 : max >= 2000000000 ? 2000000000 : max}
      min={min === Infinity ? 0 : min}
      getAriaValueText={(value) => `${value} ماه`}
      className="mt-3"
    />
  );
};

export default RangeSlider;
