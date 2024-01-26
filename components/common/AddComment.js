import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

const AddComment = ({ handleSubmit, parentID, handleCloseReplay }) => {
  return (
    <div className="mt-5 text-black">
      <Formik
        onSubmit={(value, event) => {
          handleSubmit(value, event, parentID);
          if (parentID) {
            handleCloseReplay();
          }
        }}
        initialValues={{ fullName: "", text: "" }}
        validationSchema={yup.object({
          fullName: yup
            .string("نام شما معتبر نیست")
            .required("لطفا نام خود را وارد کنید"),
          text: yup.string().required("لطفا متن نظر خود را وارد کنید"),
        })}
      >
        <Form>
          <div
            className="w-full mb-4 text-black dark:text-white"
            placeholder="نام و نام خوانوادگی"
          >
            <Field
              className="w-full h-10 rounded-md outline-none pr-1 border dark:bg-black"
              name="fullName"
              placeholder={"نام و نام خوانوادگی"}
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="fullName" />
            </span>
          </div>
          <div className="w-full" placeholder="نظر خود را وارد کنید">
            <Field
              name="text"
              className="w-full text-black h-52 rounded-md resize-none outline-none p-3 border dark:bg-black"
              as="textarea"
              placeholder={"متن پیام"}
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="text" />
            </span>
          </div>
          <button
            type="submit"
            className="mt-3 bg-green-500 text-white w-full h-14 rounded-md"
          >
            ثبت نظر
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddComment;
