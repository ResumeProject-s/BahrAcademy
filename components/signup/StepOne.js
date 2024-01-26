import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import * as yup from "yup";
import { signUpStepOne } from "@/core/validation/validation";

const StepOne = ({ next, data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (values) => {
    setSelectedDate(new Date());
    next(values);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={signUpStepOne}
    >
      {(formProps) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap w-full">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">مرحله اول</h1>
          </div>
          <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="شماره تلفن"
              name="phoneNumber"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="phoneNumber" />
            </span>
          </div>
          {/* <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="نام"
              name="fullName"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="fullName" />
            </span>
          </div>
          <div>
            <DatePicker
              onChange={(value) => {
                setSelectedDate(value?.format());
                {
                  formProps.values.barthDate = value.format();
                }
              }}
              value={selectedDate}
              calendar={persian}
              locale={persian_fa}
              name="barthDate"
              containerClassName="w-full !h-12 my-4"
              inputClass="shadow-md border w-full rounded-md outline-none pr-3 h-12 dark:text-gray-700"
              placeholder="تاریخ تولد"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="barthDate" />
            </span>
          </div> */}

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            بعدی
          </button>
          <Link href="/Authentication/login">
            <span className="text-[#2396f3] block mt-5 w-full text-center">
              ورود
            </span>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
