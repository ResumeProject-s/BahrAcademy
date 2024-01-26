import { CoursesData } from "@/DB/DataBase";
import mainContext from "@/context/mainContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Calendar } from "react-multi-date-picker";

const Dashbord = (props) => {
  const heroSection = useRef();

  const contextData = useContext(mainContext);

  const [userPanelSideBar, setuserPanelSideBar] = useState(false);

  useEffect(() => {
    heroSection.current.style.background = `linear-gradient(${contextData.themeColor[0]} , ${contextData.themeColor[2]}`;
  });

  const handleToggleUserPanelSideBar = (value) => {
    setuserPanelSideBar(value);
  };

  return (
    <div className="flex justify-between h-[780px] gap-10">
      <div className="2xl:w-[76%] xl:w-[70%]">
        <div
          className="w-full 2xl:h-[300px] xl:h-auto lg:h-[300px] h-auto rounded-lg relative 2xl:pr-5 xl:py-5 lg:pr-5 py-5 2xl:pt-24 xl:pt-16 lg:pt-24 pt-16 2xl:block xl:flex lg:block flex justify-center flex-row flex-wrap"
          ref={heroSection}
        >
          <img
            src="/images/userDashbord.png"
            alt="userDashbord"
            className="absolute -top-2 -left-24 2xl:block xl:hidden lg:block hidden"
          />
          <ul className="2xl:w-[65%] xl:w-full lg:w-[65%] w-full flex flex-row flex-wrap 2xl:justify-normal xl:justify-center lg:justify-normal justify-center gap-x-10 gap-y-5 text-white">
            <li className="flex justify-right gap-x-5 w-fit">
              <span className="text-lg">نام و نام خوانوادگی :</span>
              <span className="text-base">
                {contextData.currentUser?.fullName}
              </span>
            </li>
            <li className="flex justify-right gap-x-5 w-fit">
              <span className="text-lg">تاریخ تولد :</span>
              <span className="text-base">
                {contextData.currentUser?.barthDate}
              </span>
            </li>
            <li className="flex justify-right gap-x-5 w-fit">
              <span className="text-lg">شماره تماس :</span>
              <span className="text-base">
                {contextData.currentUser?.phoneNumber}
              </span>
            </li>
            <li className="flex justify-right gap-x-5 w-fit">
              <span className="text-lg">ایمیل :</span>
              <span className="text-base">
                {contextData.currentUser?.email}
              </span>
            </li>
            <li className="flex justify-right gap-x-5 w-fit">
              <span className="text-lg">کد ملی :</span>
              <span className="text-base">
                {contextData.currentUser?.nationalCode}
              </span>
            </li>
          </ul>
          <button
            className="bg-green-500 px-3 py-2 text-white rounded-md mt-5 2xl:h-auto h-[40px]"
            onClick={() =>
              props.handleItemChange({ textContent: "ویرایش پروفایل" })
            }
          >
            ویرایش پروفایل
          </button>
        </div>
        <div className="bg-zinc-50 dark:bg-gradient-to-t dark:from-[#0a7c4c] dark:to-[#333] shadow-md text-black mt-10 py-3 pb-7 border-zinc-200 dark:border-white dark:shadow-sm dark:shadow-white border dark:border-none dark:border-t rounded-lg h-[440px] overflow-auto">
          <h1 className="text-right mr-3 dark:text-white sm:text-xl text-base">
            اخرین دوره های خریداری شده :
          </h1>
          <table className="w-full border-spacing-4 rounded-md mt-5">
            <thead>
              <tr>
                <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                  تصویر
                </th>
                <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                  نام دوره
                </th>
                <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                  تاریخ شروع
                </th>
                <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                  مدرس
                </th>
                <th className="text-sm font-normal text-gray-700 dark:text-gray-200 md:table-cell hidden">
                  قیمت
                </th>
              </tr>
            </thead>
            <tbody>
              {contextData.userCourses.length ? (
                contextData.userCourses.slice(0, 5).map((course) => {
                  const studentSpace =
                    ((course.maxStudents - course.students) /
                      course.maxStudents) *
                    100;
                  return (
                    <tr key={course.id} className="">
                      <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 flex justify-center">
                        <img
                          src={course.image || "/images/noCourseimg.jpg"}
                          alt={course.title}
                          className=" w-[80px] rounded-sm"
                        />
                      </td>
                      <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300">
                        <span>{course.title}</span>
                      </td>
                      <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 sm:table-cell hidden">
                        <span className={`px-2 rounded-md`}>
                          {course.start}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300  sm:table-cell hidden">
                        <span className={`px-2 rounded-md`}>
                          {course.teacher}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 md:table-cell hidden">
                        <span className={`px-2 rounded-md`}>
                          {course.nuumberprice}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td
                  className="2xl:text-4xl xl:text-3xl lg:text-4xl sm:text-xl text-lg text-center py-36 dark:text-white"
                  colSpan={6}
                >
                  شما هنوز محصولی خریداری نکردید
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {userPanelSideBar || contextData.windowWidth > 1280 ? (
        <div className="w-fit h-full xl:rounded-xl bg-white dark:bg-[#2c2c2c] shadow-lg dark:shadow-md dark:shadow-gray-400 p-5 xl:relative fixed xl:z-[0] z-[3] top-0 left-0 xl:overflow-clip overflow-auto">
          <button
            className="bg-[#2396f3] absolute top-2 right-2 p-1 rounded-md block xl:hidden text-white"
            onClick={() => handleToggleUserPanelSideBar(false)}
          >
            <AiOutlineMenuFold size={25} />
          </button>
          <h1 className="text-2xl block xl:hidden text-center mb-3">
            منوی کاربر
          </h1>
          <Calendar
            calendar={persian}
            locale={persian_fa}
            className="!w-full"
          />
          <div className="bg-zinc-100 dark:bg-gradient-to-t dark:from-[#0a7c4c] dark:to-[#2c2c2c] shadow-md text-black mt-10 py-3 border-zinc-200 dark:border-white dark:shadow-sm dark:shadow-white border dark:border-none dark:border-t rounded-lg h-[250px]">
            <h1 className="text-right mr-3 dark:text-white">
              اخرین تراکنش ها :
            </h1>
            <table className="w-full border-spacing-4 rounded-md mt-3">
              <thead>
                <tr>
                  <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                    مبلغ
                  </th>
                  <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                    تاریخ
                  </th>
                  <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody>
                {contextData.latestTransactions.length ? (
                  contextData.latestTransactions
                    .slice(0.5)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((transaction) => (
                      <tr key={transaction.id} className="">
                        <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300">
                          <span>{transaction.amount}</span>
                        </td>
                        <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300">
                          <span>{transaction.date}</span>
                        </td>
                        <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 ">
                          <span
                            className={`${
                              transaction.status ? "bg-green-400" : "bg-red-400"
                            } text-white px-2 rounded-md`}
                          >
                            {transaction.status ? "موفق" : "نا موفق"}
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <td
                    className="md:text-base text-sm text-center dark:text-white pt-16"
                    colSpan={6}
                  >
                    شما هنوز محصولی خریداری نکردید
                  </td>
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full h-[130px] bg-zinc-100 dark:bg-gradient-to-t dark:from-[#338ffd] dark:to-[#2c2c2c] mt-10 rounded-md shadow-lg dark:shadow-sm dark:shadow-white border-zinc-200 border dark:border-none text-gray-800 dark:text-white">
            <div className="h-full w-full">
              <div className=" flex items-start justify-between">
                <img src="/images/icons/coin.png" alt="coin" />
                <h1 className="text-xl mt-5 ml-2">کیف پول</h1>
              </div>
              <div className="w-full flex justify-between items-center p-2">
                <span>موجودی :</span>
                <span className="dark:text-green-300 text-green-500">
                  1000000 تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <button
        className="bg-red-400 fixed left-0 px-1 h-[100px] rounded-s-lg bottom-[50%] translate-y-[50%] z-[2] block xl:hidden"
        onClick={() => handleToggleUserPanelSideBar(true)}
      >
        <MdOutlineKeyboardArrowRight size={25} className="text-white" />
      </button>
    </div>
  );
};

export default Dashbord;
