import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const ModalBar = (props) => {
  return (
    <>
      <div className="w-[500px] p-4 bg-white rounded-md shadow-2xl dark:shadow-gray-500 dark:shadow-md fixed top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%] z-[100]">
        <span className="text-md text-gray-500 block w-full text-center mt-10">
          {props.title}
        </span>
        <div className="flex justify-center items-center gap-2 w-full mt-9">
          <button
            className={`text-white px-7 py-1 rounded-md ${
              props.status === "error" ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => {
              props.handleCloseModal();
            }}
          >
            لغو
          </button>
          <button
            className={`text-white px-6 py-1 rounded-md ${
              props.status === "error" ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={() => {
              props.handleCloseModal();
              props.event();
            }}
          >
            تایید
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalBar;
