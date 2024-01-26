import PrivateRoute from "@/components/PrivateRoute";
import React, { useContext, useRef, useState } from "react";
import {
  AiFillMessage,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdDarkMode, MdOutlineKeyboardArrowDown } from "react-icons/md";

import SideBarItem from "@/components/userPanel/SideBarItem";
import { RiHome2Line, RiPaletteFill } from "react-icons/ri";
import { IconButton, Tooltip } from "@mui/material";
import { FaLightbulb } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import mainContext from "@/context/mainContext";
import Link from "next/link";
import PaletItem from "./PaletItem";
import { userPanelColorsData } from "@/DB/DataBase";
import { useEffect } from "react";

const UserPanelLayout = ({
  children,
  handleItemChange,
  selectedItem,
  items,
  handleToggleSideBar,
  sideBarOpen,
  handleToggleResponsiveSideBar,
  responsiveSideBarOpen,
}) => {
  const background = useRef();
  const header = useRef();
  const main = useRef();

  const [paletSideBarOpen, setPanelSideBarOpen] = useState(false);
  const [switchUserIsOpen, setSwitchUserIsOpen] = useState(false);

  const contextData = useContext(mainContext);
  const messages = [];

  useEffect(() => {
    if (
      typeof background.current !== "undefined" &&
      background.current !== null
    ) {
      background.current.style.background = contextData.themeColor[2];
    }
    if (typeof header.current !== "undefined" && header.current !== null) {
      header.current.style.background = contextData.themeColor[0];
    }
    if (typeof main.current !== "undefined" && main.current !== null) {
      main.current.style.background = contextData.themeColor[1];
    }
  });

  const handleTogglePaletSideBar = (value) => {
    setPanelSideBarOpen(value);
  };
  return (
    <PrivateRoute message="برای دسترسی به این صفحه اول ثبت نام کنید">
      <div
        className={`w-full h-[100vh] pl-5 dark:!bg-black py-5 grid gap-10 ${
          !sideBarOpen ? "grid-cols-10" : "grid-cols-5"
        } ${contextData.windowWidth < 1280 ? "pr-5" : null}`}
        ref={background}
      >
        {responsiveSideBarOpen || contextData.windowWidth > 1280 ? (
          <div
            className="col-span-1 xl:w-auto lg:w-[30%] sm:w-[40%] w-[60%] h-full bg-white dark:bg-[#2c2c2c] rounded-s-md xl:relative absolute top-0 right-0 overflow-y-auto overflow-x-visible z-[2] shadow-xl"
            dir="ltr"
          >
            <div
              className="cursor-pointer"
              onClick={() => {
                if (contextData.windowWidth > 1280) {
                  handleToggleSideBar();
                } else {
                  handleToggleResponsiveSideBar(!responsiveSideBarOpen);
                }
              }}
            >
              {sideBarOpen ? (
                <AiOutlineMenuUnfold
                  className="w-6 absolute z-10 text-white left-3 top-3"
                  size={30}
                />
              ) : (
                <AiOutlineMenuFold
                  className="w-6 absolute z-10 text-white left-3 top-3"
                  size={30}
                />
              )}
            </div>
            <div
              className={`w-full ${
                sideBarOpen || contextData.windowWidth < 1280
                  ? "h-[20vh] lg:pt-[3vh] pt-[5vh]"
                  : "h-[100px] pt-[7px]"
              } relative mb-24`}
              ref={header}
            >
              {sideBarOpen || contextData.windowWidth < 1280 ? (
                <div className="flex justify-center items-center cursor-pointer">
                  {contextData.users.length > 1 ? (
                    <MdOutlineKeyboardArrowDown
                      size={35}
                      className={`text-white transition-all ${
                        switchUserIsOpen ? "rotate-180" : ""
                      }`}
                      onClick={() => setSwitchUserIsOpen((prev) => !prev)}
                    />
                  ) : null}
                  <h1
                    className={`text-center 2xl:text-3xl ${
                      contextData.windowWidth > 1280
                        ? "lg:text-2xl text-2xl"
                        : "text-3xl"
                    } text-white`}
                  >
                    {contextData.currentUser?.fullName}
                    <ul
                      className={`w-fit bg-white absolute left-[50%] translate-x-[-50%] z-[1] rounded-md shadow-xl mt-2 transition-all h-[120px] overflow-auto ${
                        switchUserIsOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      {contextData.users.map((user) => (
                        <li
                          className="flex justify-end gap-2 items-center text-black h-[60px]"
                          onClick={() => contextData.handleToggleUser(user.id)}
                        >
                          <span className="text-base text-gray-700 w-[200px]">
                            {user.fullName}
                          </span>
                          <img
                            alt="profile"
                            src={
                              user.profile
                                ? user.profile
                                : "/images/icons/profile.jpg"
                            }
                            className="rounded-full h-full"
                          />
                        </li>
                      ))}
                    </ul>
                  </h1>
                </div>
              ) : null}
              <div
                className={`left-[50%] translate-x-[-50%] bg-white rounded-full absolute ${
                  sideBarOpen || contextData.windowWidth < 1280
                    ? "xl:mt-[3vh] mt-[6vh] xl:w-[17vh] w-[13vh] xl:h-[17vh] h-[13vh]"
                    : "mt-[50px] 2xl:w-[100px] w-[70px] 2xl:h-[100px] h-[70px]"
                }`}
              >
                <img
                  src={
                    contextData.currentUser?.profile
                      ? contextData.currentUser?.profile
                      : "/images/icons/profile.jpg"
                  }
                  alt="profile"
                  className={
                    "rounded-full w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all"
                  }
                />
              </div>
            </div>
            <ul
              className={`${
                sideBarOpen || contextData.windowWidth < 1280
                  ? "px-7"
                  : "2xl:px-3"
              } grid grid-cols-1 gap-4 h-[60vh] overflow-auto py-3`}
            >
              {items.map((item) => (
                <SideBarItem
                  sideBarOpen={sideBarOpen}
                  {...item}
                  themeColor={contextData.themeColor}
                  selectedItem={selectedItem}
                  handleItemChange={handleItemChange}
                />
              ))}
            </ul>
          </div>
        ) : null}

        <div
          className={`${
            sideBarOpen
              ? "xl:col-span-4 col-span-5"
              : "xl:col-span-9 col-span-10"
          } h-full rounded-xl overflow-auto dark:!bg-white/20`}
          ref={main}
        >
          <header className="w-full md:py-1 py-5 px-3 bg-white dark:bg-[#1c1c1c] flex justify-between md:gap-0 gap-2 sticky top-0 z-[1] shadow-md dark:shadow-gray-500">
            <ul className="flex items-center md:gap-4 gap-2">
              <li
                className="bg-[#2396f3] cursor-pointer  rounded-full shadow text-gray-700 block xl:hidden"
                onClick={() => {
                  handleToggleResponsiveSideBar(true);
                  handleTogglePaletSideBar(false);
                }}
              >
                <Tooltip title="notifications">
                  <IconButton>
                    <AiOutlineMenuFold size={25} className="text-white" />
                  </IconButton>
                </Tooltip>
              </li>
              <li className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer  rounded-full shadow text-gray-700">
                <Tooltip title="notifications">
                  <IconButton>
                    <IoIosNotifications size={25} className="dark:text-white" />
                  </IconButton>
                </Tooltip>
              </li>
              <li className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer  rounded-full shadow text-gray-700 relative">
                <Tooltip title="message">
                  <IconButton>
                    <AiFillMessage size={25} className="dark:text-white" />
                  </IconButton>
                </Tooltip>
                {messages.length ? (
                  <span className="bg-[#2396f3] rounded-full absolute -top-2 -right-2 px-2 text-white">
                    {messages.length}
                  </span>
                ) : null}
              </li>
            </ul>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[100px] md:block hidden"
            />
            <ul className="flex items-center md:gap-4 gap-2">
              <li className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer  rounded-full shadow text-gray-700 relative">
                <Tooltip title="palet">
                  <IconButton>
                    <RiPaletteFill
                      className="dark:text-white"
                      onClick={() => {
                        handleTogglePaletSideBar(true);
                        handleToggleResponsiveSideBar(false);
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </li>
              <li
                onClick={() => contextData.toggleThem()}
                className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer p-2 rounded-full shadow"
              >
                {contextData.theme === "dark" ? (
                  <MdDarkMode
                    className="dark:text-[#cfcfcf] text-[#4c5c83]"
                    size="25px"
                  />
                ) : contextData.theme === "light" ? (
                  <FaLightbulb
                    className="dark:text-[#cfcfcf] text-[#4c5c83]"
                    size="25px"
                  />
                ) : (
                  <CgDarkMode
                    className="dark:text-[#cfcfcf] text-[#4c5c83]"
                    size="25px"
                  />
                )}
              </li>
              <li className="bg-[#f4f6f8] text-white rounded-full">
                <Link href="/">
                  <Tooltip title="Home">
                    <IconButton>
                      <RiHome2Line />
                    </IconButton>
                  </Tooltip>
                </Link>
              </li>
            </ul>
          </header>
          <main className="p-5 relative">{children}</main>
        </div>
        {paletSideBarOpen ? (
          <div className="h-full 2xl:w-[20%] lg:w-[30%] md:w-[40%] sm:w-[50%] w-[80%] bg-white absolute left-0 top-0 p-5 overflow-y-auto dark:bg-[#2c2c2c] dark:shadow-md dark:shadow-white shadow-md shadow-gray-700 z-[3]">
            <button
              className="bg-[#2396f3] p-1 absolute top-2 right-2 rounded-md cursor-pointer text-white"
              onClick={() => {
                handleTogglePaletSideBar(false);
              }}
            >
              <AiOutlineMenuFold size={25} />
            </button>
            <h1 className="text-center text-3xl text-black dark:text-white h-fit">
              پالت رنگ
            </h1>
            <ul className="mt-10 grid grid-cols-1 gap-10">
              {userPanelColorsData.map((color) => (
                <PaletItem
                  color={color}
                  handleChangeThemeColor={contextData.handleChangePanelTheme}
                  key={color[0]}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </PrivateRoute>
  );
};

export default UserPanelLayout;
