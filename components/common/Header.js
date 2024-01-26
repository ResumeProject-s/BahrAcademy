import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { BsCartFill, BsNewspaper } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { CoursesData, navbar, newsAndArticlesData } from "@/DB/DataBase";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { usePathname } from "next/navigation";
import { CgDarkMode } from "react-icons/cg";
import { IoIosArrowUp } from "react-icons/io";
import mainContext from "@/context/mainContext";
import { RiArticleLine } from "react-icons/ri";
import * as _ from "lodash";
import { getAllCourses } from "@/core/services/API/course";
import { getAllNews } from "@/core/services/API/Home";

export const Header = () => {
  const contextData = useContext(mainContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathName = usePathname();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchOn, setSearchOn] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [mainOptions, setMainOptions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [coursorInSearchBox, setCoursorInSearchBox] = useState(false);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (searchTitle !== "") {
      setMainOptions(
        allOptions.filter((option) =>
          _.includes(option.title.toLowerCase(), searchTitle.toLowerCase())
        )
      );
    } else {
      setMainOptions([]);
    }
  }, [searchTitle]);
  useEffect(() => {
    const fetchOptions = async () => {
      const coursesData = (await getAllCourses()).data.courseFilterDtos;
      const newsAndArticlesData = (await getAllNews()).data.news;
      return [...coursesData, ...newsAndArticlesData];
    };

    fetchOptions().then((data) => setAllOptions(data));
  }, []);

  return (
    <>
      <div
        className={`top-0 w-full z-20 sticky ${
          scrollPosition > 0 ? "h-[80px]" : "h-[100px]"
        }`}
      >
        <div
          className={`w-full bg-white border-b-[1px] relative z-40 border-[#f4f4f4] transition-all dark:border-b-[1px] dark:border-[#161616] dark:bg-[#1c1c1c] flex items-center pt-3 ${
            scrollPosition > 0 ? "h-[80px]" : "h-[100px]"
          }} px-4 ${scrollPosition > 200 ? "shadow-md" : null}  m-0`}
        >
          <div className="w-full mx-auto md:max-w-[950px] relative lg:max-w-[1280px] container h-fit flex justify-between items-center">
            <div className="lg:hidden block">
              <AiOutlineMenu
                onClick={() => setIsSideBarOpen(true)}
                size="30px"
                className="dark:text-[#cfcfcf] text-[#353f53]"
              />
            </div>
            <div className="flex justify-center items-center gap-10">
              <div className={`${scrollPosition > 0 ? "w-20" : "w-24"}`}>
                <img
                  src="/images/logo.png"
                  className="w-[90%] relative sm:right-9 right-5"
                />
              </div>
              <span className="font-semibold text-[#36a0f4] text-3xl max-[600px]:hidden">آموزشگاه بحر</span>
            </div>
            <div className=" hidden lg:block">
              <form className="h-fit relative ">
                <input
                  placeholder="جستجو..."
                  className="pr-10 dark:text-white bg-[#f5f5f5] dark:bg-black outline-none w-[510px] font-iran rounded-lg focus:rounded-b-none h-[47px]"
                  onFocus={() => setSearchOn(true)}
                  onBlur={() =>
                    !coursorInSearchBox ? setSearchOn(false) : null
                  }
                  onChange={(event) => setSearchTitle(event.target.value)}
                />
                <IoSearchOutline
                  className="absolute top-3 right-2"
                  size={"25px"}
                  color="#64748b"
                />
                <ul
                  className={`w-full ${
                    mainOptions.length <= 4 ? "h-fit" : "h-[300px]"
                  } overflow-auto text-black absolute right-0 bottom-auto bg-white rounded-b-md dark:shadow-sm dark:shadow-gray-300 shadow-xl shadow-gray-300 transition-opacity flex flex-col hover:!opacity-100 hover:!visible ${
                    searchOn && searchTitle
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  onMouseEnter={() => setCoursorInSearchBox(true)}
                  onMouseOut={() => setCoursorInSearchBox(false)}
                >
                  {mainOptions.length && searchTitle ? (
                    mainOptions.map((option) => (
                      <Link
                        href={`${
                          option.courseId
                            ? `/courses/${option.courseId}`
                            : `/news&Articles/${option.id}`
                        }`}
                        key={option.id}
                      >
                        <li className="flex justify-between w-full pr-3 items-center h-fit pt-3 hover:bg-gray-100 pb-5 cursor-pointer">
                          <div className="flex justify-start items-center h-full w-fit gap-3">
                            <img
                              src={option.image || "/images/noCourseimg.jpg"}
                              alt={`not found`}
                              className="w-[80px] rounded-md"
                            />
                            <span>
                              {option.title.length > 20
                                ? option.title.substring(0, 20) + "..."
                                : option.title}
                            </span>
                          </div>
                          <div className="h-full flex items-center pl-4 text-gray-700">
                            {option.courseId ? (
                              <MdOutlineVideoLibrary size={30} />
                            ) : option.newsCatregoryName === "مقالات" ? (
                              <RiArticleLine size={30} />
                            ) : (
                              <BsNewspaper size={30} />
                            )}
                          </div>
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li className="text-right leading-0 px-3 pb-3">
                      متاسفانه اطلاعاتی یافت نشد
                    </li>
                  )}
                </ul>
              </form>
            </div>
            <div className="w-fit">
              <ul className="flex gap-5 items-center cursor-pointer">
                <li
                  onClick={() => contextData.toggleThem()}
                  className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer p-3 rounded-full shadow"
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
                <Link href="/cart" className="hidden sm:block">
                  <li className="bg-[#f4f6f8] dark:bg-[#2e2e2e] cursor-pointer p-3 rounded-full shadow relative">
                    <BsCartFill
                      className="dark:text-[#cfcfcf] text-[#4c5c83]"
                      size="25px"
                    />
                    {contextData.cartCourses.length &&
                    contextData.currentUser ? (
                      <span className="w-6 h-6 bg-[#2396f3] absolute -top-2 -right-2 text-white rounded-full text-center">
                        {contextData.cartCourses.length}
                      </span>
                    ) : null}
                  </li>
                </Link>
                <Link
                  href={`${
                    contextData.currentUser
                      ? "/userpanel"
                      : "/Authentication/login"
                  }`}
                >
                  <li className="flex gap-4 bg-[#36a0f4] md:rounded-lg rounded-full p-3">
                    {!contextData.currentUser ? (
                      <>
                        <BiSolidUser color="#ffffff" size={"25px"} />
                        <span className="font-iran md:inline hidden text-white">
                          ورود / ثبت‌نام
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/icons/profile.jpg"
                          alt="profile"
                          className="w-[25px] rounded-full"
                        />
                        <span className="font-iran md:inline hidden text-white">
                          پنل کاربر
                        </span>
                      </>
                    )}
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`bg-white dark:bg-[#1c1c1c] hidden lg:block z-30 relative transition-all duration-300 w-full mb-7 ${
            scrollPosition > 0 ? "pt-[0.5rem] pb-[0.75rem]" : "py-5"
          } ${scrollPosition > 100 ? "-top-96" : "top-0"} shadow-md`}
        >
          <ul
            className={`w-[680px] gap-[74px] ${
              scrollPosition > 0 ? "text-base" : "font-[15px]"
            }  font-bold m-auto flex text-[#4c5c84] dark:text-[#fdfdfd]`}
          >
            {navbar.map((item) => {
              return (
                <Link href={item.link} key={item.id}>
                  <li
                    className={`flex justify-between ${
                      item.link === pathName ? "text-[#36a0f4]" : ""
                    } items-center`}
                  >
                    <span>{item.title}</span>
                    {item.hasSubMenu ? (
                      <MdOutlineKeyboardArrowDown color="#4dabf5" />
                    ) : null}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div
          className={`fixed flex top-0 overflow-hidden h-[100vh] z-50 transition-all ${
            isSideBarOpen ? "w-full" : "w-0"
          }`}
        >
          <div className="w-[55%] h-full px-3 bg-white dark:bg-[#1c1c1c]">
            <div className="pt-2">
              <img src="/images/logo.png" className="w-[100px] m-auto" />
            </div>
            <form className="relative">
              <input
                placeholder="جستجو..."
                className="bg-[#f5f5f5] dark:bg-black dark:text-white mt-2 h-10 pr-3 outline-none rounded-md w-full"
              />
              <IoSearchOutline
                size={"25px"}
                color={"#64748b"}
                className="absolute top-4 left-2 cursor-pointer"
              />
            </form>
            <div className="w-full border-[#ebebeb] border-y dark:border-[#000] py-2 mt-3 cursor-pointer">
              <Link href="/cart">
                <button className="bg-[#f5f5f5] dark:bg-[#2d2d2d] font-bold px-8 text-base text-[#475566] p-3 m-auto rounded-md flex items-center justify-center gap-2">
                  <BsCartFill
                    color={contextData.theme ? "#475566" : "#d7d7d7"}
                    size={"25px"}
                  />
                  <span className="dark:text-[#d7d7d7]">سبد خرید</span>
                </button>
              </Link>
            </div>
            <ul className="mt-3">
              {navbar.map((item) => (
                <Link key={item.id} href={item.link}>
                  <li className="flex items-center my-6 font-bold">
                    <span
                      className={`${
                        item.hasSubMenu
                          ? "w-[80%] border-l border-[#ebebeb]"
                          : "w-full"
                      } ${
                        item.link === pathName
                          ? "text-[#36a0f4]"
                          : "text-[#475566] dark:text-[#cfcfcf]"
                      } text-base`}
                    >
                      {item.title}
                    </span>
                    {item.hasSubMenu ? (
                      <MdOutlineKeyboardArrowDown
                        className="w-[20%]"
                        size={"30px"}
                        color="#475566"
                      />
                    ) : null}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div
            onClick={() => setIsSideBarOpen(false)}
            className="w-[45%] transition-none h-full bg-black/30"
          ></div>
        </div>
      </div>
      <div
        className={`bg-[#2396f3] rounded-full p-3 text-white text-lg fixed ${
          scrollPosition >= 300 ? "bottom-5" : "-bottom-14"
        } transition-transform right-5 z-10 cursor-pointer`}
        onClick={contextData.scrollToTop}
      >
        <IoIosArrowUp />
      </div>
    </>
  );
};
