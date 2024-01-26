import React, { useState } from "react";
import RatingStar from "./RatingStar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { TopCommentData } from "@/DB/DataBase";

const Rating = ({ handleSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingSelected, setRatingSelected] = useState(false);

  const handleRatingHover = (hoveredRating) => {
    setSelectedRating(hoveredRating);
  };

  const handleRatingClick = (clickedRating) => {
    setRatingSelected(true);
    setSelectedRating(clickedRating);
  };
  return (
    <div className=" mt-16">
      <h1 className="md:text-3xl sm:text-2xl text-center text-xl dark:text-white text-[#4c5c84] mb-8">
        انتقادات و پیشنهادات
      </h1>
      <div className="w-full h-fit grid lg:grid-cols-2 col-span-1 gap-10 relative">
        <div className="col-span-1 h-fit z-[1]" data-aos="fade-left">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ fullName: "", text: "", star: "" }}
            validationSchema={yup.object({
              fullName: yup
                .string("نام شما معتبر نیست")
                .required("لطفاً نام خود را وارد کنید"),
              text: yup
                .string("نظر شما معتبر نیست")
                .required("لطفاً نظر خود را وارد کنید"),
              star: yup.number().required("لطفا ستاره را وارد کنید"),
            })}
          >
            <Form className="p-10 bg-[#2396f3] box-border rounded-xl text-black h-full relative justify-center">
              <div className=" mb-6">
                <Field
                  className="w-full h-12 rounded-md pr-3 outline-none mb-2 dark:bg-[#2e2e2e] dark:text-white"
                  placeholder="نام و نام خوانوادگی"
                  name={"fullName"}
                />
                <span className="text-[#ff3434] font-bold">
                  <ErrorMessage name="fullName" />
                </span>
              </div>
              <div className="flex justify-start items-center gap-5 h-[50px]">
                <RatingStar
                  handleRatingClick={handleRatingClick}
                  handleRatingHover={handleRatingHover}
                  selectedRating={selectedRating}
                  ratingSelected={ratingSelected}
                />
              </div>
              <div>
                <Field
                  as="textarea"
                  className="w-full h-[200px] rounded-md pr-3 outline-none pt-3 resize-none mb-1 dark:bg-[#2e2e2e] dark:text-white"
                  placeholder="نظر خود را با ما به اشتراک بگذارید"
                  name={"text"}
                />
                <span className="text-[#ff3434] font-bold">
                  <ErrorMessage name="text" />
                </span>
              </div>
              <button
                type="submit"
                className="w-full mt-4 h-8 bg-green-400 py-6 rounded-md text-lg text-white leading-[5px]"
              >
                افزورن نظر
              </button>
            </Form>
          </Formik>
        </div>
        <div
          className="col-span-1 lg:static absolute top-0 right-0 md:block hidden"
          data-aos="flip-right"
        >
          <img
            src="/images/rating.png"
            alt="rating"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;
