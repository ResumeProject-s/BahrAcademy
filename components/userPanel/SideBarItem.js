import mainContext from "@/context/mainContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { useContext, useEffect, useRef, useState } from "react";

const SideBarItem = (props) => {
  const item = useRef();
  const [itemHover, setItemHover] = useState(false);

  const contextData = useContext(mainContext);
  useEffect(() => {
    item.current.style.backgroundColor = props.color
      ? `#${props.color}`
      : props.title === props.selectedItem
      ? props.themeColor[0]
      : props.themeColor[1];
    item.current.style.boxShadow = props.shadow
      ? `0 0 5px 1px #${props.shadow}`
      : props.title === props.selectedItem
      ? `0 0 5px 1px ${contextData.themeColor[0]}`
      : null;
  });

  return (
    <li
      ref={item}
      className={`col-span-1 h-16 rounded-md cursor-pointer text-end flex ${
        props.sideBarOpen || contextData.windowWidth < 1280
          ? "justify-end pr-3 text-base"
          : "justify-center 2xl:text-sm text-xs 2xl:font-normal font-bold"
      } ${
        props.color || props.title === props.selectedItem
          ? "text-white"
          : "text-gray-700 dark:!bg-gray-200"
      } items-center gap-3 py-4`}
      onClick={() => {
        if (props.event) {
          props.event();
        } else {
          props.handleItemChange(item.current);
        }
      }}
      onMouseOver={() => setItemHover(true)}
      onMouseLeave={() => setItemHover(false)}
    >
      {props.sideBarOpen || contextData.windowWidth < 1280 ? (
        <span>{props.title}</span>
      ) : null}
      {props.sideBarOpen || contextData.windowWidth < 1280 ? (
        <div>{props.icon}</div>
      ) : !props.sideBarOpen && itemHover ? (
        props.title
      ) : (
        props.icon
      )}
    </li>
  );
};

export default SideBarItem;
