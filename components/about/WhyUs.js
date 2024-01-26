import React, { useEffect, useRef } from "react";

const WhyUs = (props) => {
  const icon = useRef();

  useEffect(() => {
    icon.current.style.backgroundColor = props.color;
  }, []);
  return (
    <li className="w-[500px] h-[300px] overflow-auto bg-white p-4 rounded-lg shadow-md dark:bg-[#1c1c1c]">
      <div
        className="rounded-full ml-auto w-[100px] h-[100px] text-white flex justify-center items-center"
        ref={icon}
      >
        {props.icon}
      </div>
      <header className="mt-5 text-3xl">{props.title}</header>
      <p className="mt-5 text-gray-700 dark:text-gray-400 text-xl">
        {props.description}
      </p>
    </li>
  );
};

export default WhyUs;
