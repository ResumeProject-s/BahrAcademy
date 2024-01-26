import mainContext from "@/context/mainContext";
import { SendVerifyMessage } from "@/core/services/API/message";
import { signUpStepTwo } from "@/core/validation/validation";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";

const StepSecend = ({ next, prev, data }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  const [remainingTime, setRemainingTime] = useState(60);
  const number = useRef(60);

  useEffect(() => {
    const timer = setInterval(() => {
      number.current -= 1;
      setRemainingTime(number.current);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const contextData = useContext(mainContext);

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={signUpStepTwo}
    >
      {(formprops) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">مرحله دوم</h1>
          </div>
          {/* <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="کد ملی"
              name="nationalCode"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="nationalCode" />
            </span>
          </div> */}
          <div className="relative">
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="کد"
              name="code"
            />
            {number.current >= 0 ? (
              <span className="block absolute top-7 left-3 h-8 text-[#2395f3] cursor-pointer">
                {number.current}
              </span>
            ) : (
              <button
                className="absolute top-6 left-3 text-[#2396f3] rounded-md cursor-pointer w-16 h-8 text-sm"
                onClick={async () => {
                  await SendVerifyMessage(data.phoneNumber);
                  contextData.handleShowSnack(
                    "کد برای شما فرستاده شد",
                    3000,
                    "seccess"
                  );
                  number.current = 60;
                  setRemainingTime(number.current);
                }}
              >
                ارسال مجدد
              </button>
            )}
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="code" />
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            بعدی
          </button>
          <button
            onClick={() => prev(formprops.values)}
            type="button"
            className="w-full bg-[#2396f3] text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            قبلی
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StepSecend;
