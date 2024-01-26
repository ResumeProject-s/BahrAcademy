import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPercentage } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import {
  AiFillClockCircle,
  AiFillDelete,
  AiFillHeart,
  AiTwotoneStar,
} from "react-icons/ai";
import Link from "next/link";
import { TopTeachersData } from "@/DB/DataBase";
import mainContext from "@/context/mainContext";
import { useRouter } from "next/router";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  DeleteFavorite,
  DeletelikeCourse,
  addToFavorite,
  likeCourse,
} from "@/core/services/API/course";
import useLocalStorage from "@/hooks/useLocalStorage";

const Course = (props) => {
  const contextData = useContext(mainContext);
  const [courseLike, setCourseLike] = useState(props.likeCount);
  const [userIsLiked, setUserIsLiked] = useState(props.userIsLiked);
  const [userFavorite, setuserFavorite] = useState(props.userFavorite);

  const studentSpace =
    ((props.maxStudents - props.currentRegistrants) / props.maxStudents) * 100;

  const handleLikeCourse = async () => {
    const result = !userIsLiked
      ? await likeCourse(props.courseId, useLocalStorage("token", "", true))
      : await DeletelikeCourse(
          props.courseId,
          useLocalStorage("token", "", true)
        );
    if (result.data?.success) {
      setCourseLike((prev) => (userIsLiked ? (prev -= 1) : (prev += 1)));
      setUserIsLiked((prev) => !prev);
    } else {
      contextData.handleShowSnack(result.data?.message, 3000, "error");
    }
  };

  const handleAddFavorite = async () => {
    const result = !userFavorite
      ? await addToFavorite(props.courseId, useLocalStorage("token", "", true))
      : await DeleteFavorite(
          props.courseId,
          useLocalStorage("token", "", true)
        );
    if (result.data?.success) {
      setuserFavorite((prev) => !prev);
      // addToFavorite(props.courseId, useLocalStorage("token", "", true));
    } else {
      contextData.handleShowSnack(result.data?.message, 3000, "error");
    }
  };

  useEffect(() => {
    if (courseLike !== props.likeCount) {
    }
  }, [courseLike]);
  return (
    <>
      {props.view === "col" || contextData.windowWidth < 640 ? (
        <div
          className="col-span-1 rounded-xl relative h-[400px] overflow-hidden shadow-2xl text-white dark:shadow-xl dark:shadow-zinc-600"
          data-aos={props.index ? "fade-up" : null}
          data-aos-delay={+props.index * 100}
        >
          <div className="w-full relative h-[60%]">
            <img
              src={
                !props.mylist
                  ? props.tumbImageAddress || "/images/noCourseimg.jpg"
                  : props.image
              }
              alt={"مشکلی پیش امده"}
              className="w-full h-full text-center leading-[200px] text-3xl text-black dark:text-white"
            />
            <div className="absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[-50%] bg-white/90 rounded-full h-[200px]  shadow-2xl shadow-gray-400">
              {props.waitingPage ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    color={
                      studentSpace >= 50
                        ? "primary"
                        : studentSpace >= 80
                        ? "warning"
                        : "error"
                    }
                    value={100 - studentSpace}
                    size={200}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      <span className="text-5xl text-black">
                        {`${Math.round(studentSpace)}%`}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </div>
          </div>
          <div className="absolute top-0 pt-1 w-full flex justify-between px-3">
            <span
              className={`${
                !props.myList
                  ? props.levelName
                  : props.status === "اسان"
                  ? "bg-green-400"
                  : !props.myList
                  ? props.levelName
                  : props.status === "متوسط"
                  ? "bg-[#2396f3]"
                  : "bg-black"
              } h-6 px-2 py-1 text-xs rounded-lg border-white`}
            >
              {!props.myList ? props.levelName : props.status}
            </span>
            <button
              className={`${
                userIsLiked
                  ? "bg-red-500 border-red-500"
                  : "bg-black/30 border-black/30"
              } p-2 rounded-lg  hover:border-red-500 border-2 transition-colors lg:text-base text-sm shadow-2xl flex gap-1 items-center`}
              onClick={() => {
                handleLikeCourse(props.courseId, contextData.token);
              }}
            >
              <div>
                <AiFillHeart
                  className={`h-5 ${
                    userIsLiked ? "text-white" : "text-red-500"
                  }`}
                />
              </div>
              <span className="h-5 text-xs">
                {!props.myList ? courseLike : props.like}
              </span>
            </button>
          </div>
          <div className="bg-white dark:bg-black dark:text-white h-[42%] rounded-xl absolute bottom-0 w-full text-[#4c5c84] p-2">
            <div className="flex justify-between items-center text-gray-500 dark:text-white gap-1">
              <span
                className={`text-xs px-2 py-1 shadow-md text-white rounded-md ${
                  !props.myList
                    ? props.statusName
                    : props.recordingStatus
                    ? "bg-green-500"
                    : "bg-black"
                }`}
              >
                {(!props.myList ? props.statusName : props.recordingStatus) ===
                true
                  ? "در حال برگزاری"
                  : "تمام شده"}
              </span>
              <div className="flex justify-center gap-2 items-center">
                <span className="text-xs bg-black text-white px-2 py-1 rounded-md">
                  {!props.myList ? props.classRoomName : props.categori}
                </span>
              </div>
            </div>
            <Link href={`/courses/${String(props.courseId)}`}>
              <h1 className="text-2xl text-center hover:text-[#2196f3] cursor-pointer transition-colors dark:text-white">
                {props.title}
              </h1>
            </Link>
            <div className="w-full flex gap-2 items-center justify-center relative left-2 pb-1 border-b border-[#cccccc] py-3">
              <span className="text-base hover:text-[#2196f3] transition-colors cursor-pointer">
                {!props.myList ? props.teacherName : props.teacher}
              </span>
            </div>
            <div
              className={`flex justify-between items-center ${
                props.myList ? "pt-3" : "pt-5"
              }`}
            >
              <div className="flex justify-between items-center absolute top-[90px] right-0 w-full px-3">
                <div className="w-[35px] h-[35px] bg-gray-100 rounded-full shadow-md shadow-gray-400 justify-center items-center flex cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                  {!userFavorite ? (
                    <BsBookmarkPlus
                      size={20}
                      className="text-black"
                      onClick={handleAddFavorite}
                    />
                  ) : (
                    <BsFillBookmarkCheckFill
                      size={20}
                      className="text-black"
                      onClick={handleAddFavorite}
                    />
                  )}
                </div>
                {props.Discount && !props.myList ? (
                  <div className="bg-[#2196f3] text-white flex gap-1 items-center py-1 px-3 rounded-full">
                    <FaPercentage />
                    <span>
                      {props.Discount ? props.Discount.percont : null}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex justify-center items-center text-[#4c5c84] sm:gap-5 gap-2">
                <div className="flex justify-center items-center dark:text-white">
                  <PiStudentFill />
                  <span>{props.currentRegistrants}</span>
                </div>
                <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24]">
                  <AiTwotoneStar />
                  <span className="text-white">{props.courseRate}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <span>
                  {props.myList || props.waitingPage ? (
                    <button
                      className="bg-red-500 px-2 py-1 rounded-md text-white flex gap-2 sm:text-base text-sm"
                      onClick={() => {
                        contextData.handleShowModal(
                          "ایا مطمئنید که میخواهید این دوره را حذف کنید؟",
                          "error",
                          () =>
                            props.handleDeleteCourse(
                              !props.myList ? props.courseId : props.id
                            )
                        );
                      }}
                    >
                      <span>حذف دوره</span>
                      <MdDelete size={23} color={"white"} className="block" />
                    </button>
                  ) : (
                    props.cost + " تومان"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full p-3 bg-white dark:bg-black rounded-lg md:flex ${
            props.cartCourse ? "border dark:border-[#666]" : "shadow-md"
          } gap-8 justify-between items-center text-white`}
        >
          <div className="relative ">
            <img
              src={
                !props.mylist
                  ? props.tumbImageAddress || "/images/noCourseimg.jpg"
                  : props.image
              }
              alt={"مشکلی پیش امده"}
              className="w-[300px] rounded-md shadow-md md:m-0 mx-auto text-black dark:text-white text-2xl text-center"
            />
            <div className="absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[-50%] bg-white/90 rounded-full h-[100px] shadow-2xl shadow-gray-400">
              {props.waitingPage ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    color={
                      studentSpace >= 50
                        ? "primary"
                        : studentSpace >= 80
                        ? "warning"
                        : "error"
                    }
                    value={100 - studentSpace}
                    size={100}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      <span className="text-2xl text-black">
                        {`${Math.round(studentSpace)}%`}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </div>
          </div>
          <div className="w-full md:mt-0 mt-3">
            <div className="pt-1 w-full flex justify-between items-center mb-1">
              <span
                className={`${
                  !props.myList
                    ? props.levelName === "اسان"
                    : props.status
                    ? "bg-green-400"
                    : !props.myList
                    ? props.levelName === "متوسط"
                    : props.status
                    ? "bg-[#2396f3]"
                    : "bg-black"
                } h-6 px-2 py-1 text-xs rounded-lg border-white border `}
              >
                {!props.myList ? props.levelName : props.status}
              </span>
              <div className="flex justify-between items-center text-gray-500 dark:text-white gap-5">
                <span
                  className={`text-xs px-2 shadow-sm border border-white shadow-white py-1 text-white rounded-md ${
                    !props.myList
                      ? props.statusName
                      : props.recordingStatus
                      ? "bg-green-500"
                      : "bg-black"
                  }`}
                >
                  {!props.myList
                    ? props.statusName
                    : props.recordingStatus
                    ? "در حال ضبط"
                    : "تمام شده"}
                </span>
                <div className="flex justify-center gap-2 items-center">
                  <span className="text-base">
                    {!props.myList ? props.classRoomName : props.categori}
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-3 items-center">
                <div className="w-[35px] h-[35px] bg-gray-100 rounded-full shadow-md shadow-gray-400 justify-center items-center flex cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                  {!userFavorite ? (
                    <BsBookmarkPlus
                      size={20}
                      className="text-black"
                      onClick={handleAddFavorite}
                    />
                  ) : (
                    <BsFillBookmarkCheckFill
                      size={20}
                      className="text-black"
                      onClick={handleAddFavorite}
                    />
                  )}
                </div>
                <button
                  className={`${
                    userIsLiked
                      ? "bg-red-500 border-red-500"
                      : "bg-black/30 border-white/30"
                  } p-2 rounded-lg  hover:border-red-500 border-2 transition-colors lg:text-base text-sm shadow-2xl flex gap-1 items-center`}
                  onClick={() => {
                    handleLikeCourse(props.courseId, contextData.token);
                  }}
                >
                  <div>
                    <AiFillHeart
                      className={`h-5 ${
                        userIsLiked ? "text-white" : "text-red-500"
                      }`}
                    />
                  </div>
                  <span className="h-5 text-xs">
                    {!props.myList ? courseLike : props.like}
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full flex gap-2 items-center justify-start relative left-2 pb-1 border-b border-[#cccccc]">
              <span className="text-base hover:text-[#2196f3] transition-colors cursor-pointer text-gray-500 dark:text-gray-300">
                {!props.myList ? props.teacherName : props.teacher}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h1 className="text-black text-2xl dark:text-white">
                {props.title}
              </h1>
              <div className="flex justify-center items-center text-[#4c5c84] gap-5">
                <div className="flex justify-center items-center dark:text-white">
                  <PiStudentFill />
                  <span>
                    {!props.myList ? props.currentRegistrants : props.students}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24]">
                  <AiTwotoneStar />
                  <span className="text-white">
                    {!props.myList ? props.courseRate : props.star}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-200 my-4 w-full">
              {!props.myList ? props.describe : props.desceiption}
            </p>
            <div className="flex justify-between items-center h-10">
              <div className="flex justify-start text-black items-center md:gap-5 gap-1">
                <div className="flex gap-1">
                  <span className="text-black dark:text-white lg:inline hidden">
                    {!props.myList ? props.cost : props.nuumberprice + " تومان"}
                  </span>
                </div>
                {props.Discount && !props.myList ? (
                  <div className="bg-[#2196f3] text-white flex gap-1 items-center py-1 px-3 rounded-full">
                    <FaPercentage />
                    <span>
                      {props.Discount ? props.Discount.percont : null}
                    </span>
                  </div>
                ) : null}
              </div>
              {props.cartCourse ? (
                <button
                  className="rounded-lg bg-red-500 text-white px-3 py-1 flex items-center gap-3"
                  onClick={() =>
                    contextData.handleShowModal(
                      "ایا مطمئنید که میخواهید این دوره را حذف کنید؟",
                      "error",
                      () =>
                        props.handleDeleteCourse(
                          !props.myList ? props.courseId : props.id
                        )
                    )
                  }
                >
                  <span>حذف</span>
                  <AiFillDelete color="white" />
                </button>
              ) : (
                <div className="flex justify-end gap-5">
                  <Link
                    href={`/courses/${String(props.courseId)}`}
                    className="h-fit"
                  >
                    <button className="rounded-lg bg-green-500 text-white px-3 py-1">
                      جزئیات دوره
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Course;
