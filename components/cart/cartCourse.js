import { TopTeachersData } from "@/DB/DataBase";
import mainContext from "@/context/mainContext";
import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { AiFillClockCircle, AiFillDelete, AiTwotoneStar } from "react-icons/ai";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaPercentage } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const CartCourse = (props) => {
  const contextData = useContext(mainContext);
  const teacherInfos = TopTeachersData.find(
    (teacher) => teacher.fullName === props.teacher
  );
  return (
    <div
      className={`w-full p-3 bg-white dark:bg-black rounded-lg md:flex ${
        props.cartCourse ? "border dark:border-[#666]" : "shadow-md"
      } gap-8 justify-between items-center text-white`}
    >
      <div className="relative ">
        <img
          src={props.image}
          alt={props.title}
          className="w-[300px] rounded-md shadow-md md:m-0 mx-auto"
        />
        <div className="absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[-50%] bg-white/90 rounded-full h-[100px] shadow-2xl shadow-gray-400">
          {props.bookList ? (
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
              props.status === "اسان"
                ? "bg-green-400"
                : props.status === "متوسط"
                ? "bg-[#2396f3]"
                : "bg-black"
            } h-6 px-2 py-1 text-xs rounded-lg border-white border `}
          >
            {props.status}
          </span>
          <div className="flex justify-between items-center text-gray-500 dark:text-white gap-5">
            <span
              className={`text-xs px-2 shadow-sm border border-white shadow-white py-1 text-white rounded-md ${
                props.recordingstatus ? "bg-green-500" : "bg-black"
              }`}
            >
              {props.recordingstatus ? "در حال ضبط" : "تمام شده"}
            </span>
            <div className="flex justify-center gap-2 items-center">
              <AiFillClockCircle />
              <span className="text-base">{props.spenddingTime} ماه</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 items-center">
            <div className="w-[35px] h-[35px] bg-gray-100 rounded-full shadow-md shadow-gray-400 justify-center items-center flex cursor-pointer hover:bg-gray-200 transition-colors duration-300">
              {!contextData.bookList.some(
                (course) => course.id === props.id
              ) ? (
                <BsBookmarkPlus
                  size={20}
                  className="text-black"
                  onClick={() => contextData.handleAddToBookList(props.id)}
                />
              ) : (
                <BsFillBookmarkCheckFill size={20} className="text-black" />
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2 items-center justify-start relative left-2 pb-1 border-b border-[#cccccc]">
          <img
            src={teacherInfos?.image}
            alt="profile"
            className="h-10 dark:bg-black rounded-full"
          />
          <span className="text-base hover:text-[#2196f3] transition-colors cursor-pointer text-gray-500 dark:text-gray-300">
            {props.teacher}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-black text-2xl">{props.title}</h1>
          <div className="flex justify-center items-center text-[#4c5c84] gap-5">
            <div className="flex justify-center items-center dark:text-white">
              <PiStudentFill />
              <span>{props.students}</span>
            </div>
            <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24]">
              <AiTwotoneStar />
              <span className="text-white">{props.star}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 dark:text-gray-200">{props.desceiption}</p>
        <div className="flex justify-between items-center h-10">
          <div className="flex justify-start text-black items-center md:gap-5 gap-1">
            <div className="flex gap-1">
              <span className="text-black dark:text-white lg:inline hidden">
                {props.price}
              </span>
            </div>
            {props.Discount && !props.myList ? (
              <div className="bg-[#2196f3] text-white flex gap-1 items-center py-1 px-3 rounded-full">
                <FaPercentage />
                <span>{props.Discount ? props.Discount.percont : null}</span>
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
                  () => props.handleDeleteCourse(props.id)
                )
              }
            >
              <span>حذف</span>
              <AiFillDelete color="white" />
            </button>
          ) : (
            <div className="flex justify-end gap-5">
              <Link href={`/courses/${String(props.id)}`} className="h-fit">
                <button className="rounded-lg bg-green-500 text-white px-3 py-1">
                  جزئیات دوره
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCourse;
