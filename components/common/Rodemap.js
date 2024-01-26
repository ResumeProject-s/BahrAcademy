import React from "react";
import { ImMap } from "react-icons/im";

const Rodemap = ({ title }) => {
  return (
    <div className="w-full px-3 py-2 text-white bg-[#2396f3] flex justify-start items-center gap-3  rounded-md mb-5">
      <ImMap />
      {title}
    </div>
  );
};

export default Rodemap;
