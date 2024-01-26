import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const PaletItem = (props) => {
  const background = useRef();
  const header = useRef();
  const items = useRef();
  const main = useRef();

  useEffect(() => {
    background.current.style.backgroundColor = props.color[2];
    header.current.style.backgroundColor = props.color[0];
    items.current.style.backgroundColor = props.color[1];
    main.current.style.backgroundColor = props.color[1];
  });
  return (
    <li
      className="w-full h-[200px] rounded-md p-2 flex justify-between gap-5 cursor-pointer"
      ref={background}
      onClick={() => props.handleChangeThemeColor(props.color)}
    >
      <div className="w-[30%] h-full bg-white rounded-md grid grid-cols-1">
        <div
          className="w-full rounded-t-md h-[50px] col-span-1"
          ref={header}
        ></div>
        <div className="h-[120px] p-3 grid grid-cols-1 gap-2">
          <li className="w-full rounded-md h-[100px]" ref={items}></li>
        </div>
      </div>
      <div className="w-[70%] h-full rounded-md" ref={main}></div>
    </li>
  );
};

export default PaletItem;
