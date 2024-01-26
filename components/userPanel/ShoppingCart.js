import Snack from "@/components/common/Snack";
import Course from "@/components/common/Course";
import mainContext from "@/context/mainContext";
import Layout from "@/layout/Layout";
import React, { useContext, useEffect, useState } from "react";

const ShoppingCart = () => {
  const contextData = useContext(mainContext);
  const [showSnack, setShowSnack] = useState({
    title: "",
    status: "",
    time: 0,
  });
  const [emptyImage, setEmptyImage] = useState(true); // true => at farst was empty /// false empty after buy
  const [title, settitle] = useState("");

  const totalPrice = contextData.cartCourses.reduce((prev, current) => {
    return prev + current.nuumberprice;
  }, 0);
  const handleEmptyCart = () => {
    if (contextData.cartCourses.length) {
      contextData.handleCartCourses([]);
      contextData.handleShowSnack("سبد شما خالی شد", 3000, "seccess");
    } else {
      contextData.handleShowSnack("محصولی در سبد شما نیست", 3000, "error");
    }
  };
  const handleDeleteFromCart = (courseID) => {
    const newCartCourses = [...contextData.cartCourses].filter(
      (course) => course.id !== courseID
    );
    contextData.handleCartCourses(newCartCourses);
  };
  useEffect(() => {
    settitle(
      contextData.cartCourses?.length ? "سبد خرید" : "محصولی در سبد شما نیست"
    );
  });
  return (
    <>
      {showSnack.title ? <Snack {...showSnack} /> : null}
      <h1 className="dark:text-white text-[#4c5c84] lg:text-[25px] text-2xl font-bold text-center">
        {title}
      </h1>
      <div className="mt-10 grid lg:grid-cols-8 grid-cols-1 gap-4 lg:p-0 p-5">
        <aside className="shadow-md bg-white dark:bg-[#393939] p-3 border dark:border-none rounded-md grid gap-4 h-fit lg:sticky lg:top-[100px] lg:col-span-2 col-span-1">
          <section className="w-full flex justify-between items-center">
            <b>مجموع : </b>
            <span>{totalPrice} تومان</span>
          </section>
          <section className="relative">
            <input
              type="text"
              placeholder="کد تخفیف"
              className="bg-[#f5f5f5] px-2 py-1 rounded-md shadow-sm w-full outline-none pr-4"
            />
            <button className="bg-blue-400 text-white absolute top-0 left-0 rounded-e-md h-full px-2">
              اعمال کد
            </button>
          </section>
          <button
            className="w-full bg-green-500 text-white rounded-md py-2 mb-3"
            onClick={() => {
              contextData.handleBuy();
              setEmptyImage(false);
            }}
          >
            خرید
          </button>
          <hr />
          <button
            className="w-full bg-red-500 text-white rounded-md py-2 mb-3"
            onClick={() =>
              contextData.handleShowModal(
                "ایا مطمئنید میخواهید دوره های موجود در سبد را پاک کنید؟",
                "error",
                handleEmptyCart
              )
            }
          >
            حذف همه
          </button>
        </aside>
        <ul className="w-full grid grid-cols-1 gap-3 lg:col-span-6 col-span-1">
          {contextData?.cartCourses?.length ? (
            contextData?.cartCourses?.map((course) => (
              <Course
                {...course}
                view="row"
                cartCourse
                handleDeleteCourse={handleDeleteFromCart}
              />
            ))
          ) : (
            <div className="w-full flex justify-center rounded-md flex-wrap flex-row">
              <img
                src={emptyImage ? "images/empty.jpg" : "images/emptybuy.jpg"}
                className="rounded-md lg:w-1/2 md:w-[75%] w-full"
              />
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ShoppingCart;
