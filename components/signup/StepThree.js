import { usersData } from "@/DB/DataBase";
import mainContext from "@/context/mainContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as yup from "yup";

const StepThree = ({ next, prev, data }) => {
  const contextData = useContext(mainContext);

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCharectersNumber, setPasswordCharectersNumber] =
    useState(false);
  const [passwordSpecialCharecters, setPasswordSpecialCharecters] =
    useState(false);
  const [passwordSmallAndBigCharecters, setPasswordSmallAndBigCharecters] =
    useState(false);
  const [passwordHasNumber, setpasswordHasNumber] = useState(false);
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPasswordValue(value);
  };
  const [passwordInputIsHidden, setPasswordInputIsHidden] = useState(true);
  const [sholdeSaveUser, setSholdeSaveUser] = useState(false);

  const handleSubmit = (values) => {
    next(values);
  };
  useEffect(() => {
    passwordValue.length >= 8
      ? setPasswordCharectersNumber(true)
      : setPasswordCharectersNumber(false);
    passwordValue.match(/[-_@.,]/)
      ? setPasswordSpecialCharecters(true)
      : setPasswordSpecialCharecters(false);
    passwordValue.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/)
      ? setPasswordSmallAndBigCharecters(true)
      : setPasswordSmallAndBigCharecters(false);
    passwordValue.match(/\d/)
      ? setpasswordHasNumber(true)
      : setpasswordHasNumber(false);
  }, [passwordValue]);
  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        email: yup
          .string("ایمیل شما معتبر نمی باشد")
          .email("ایمیل شما معتبر نمی باشد")
          .required("لطفا ایمیل خود را وارد کنید"),
        password: yup
          .string("رمز عبور شما معتبر نمی باشد")
          .test(
            "password-validation",
            "رمز عبور شما معتبر نمی باشد",
            (value) => {
              return (
                passwordCharectersNumber &&
                passwordSpecialCharecters &&
                passwordSmallAndBigCharecters
              );
            }
          )
          .required("لطفا رمز عبور خود را وارد کنید"),
      })}
    >
      {(formprops) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">مرحله سوم</h1>
          </div>
          <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="ایمیل"
              name="email"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="email" />
            </span>
          </div>
          <div>
            <div className="relative">
              <Field
                className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
                placeholder="رمز عبور"
                name="password"
                onKeyUp={handlePasswordChange}
                type={passwordInputIsHidden ? "password" : "text"}
              />
              <div className="absolute left-3 top-7 text-black">
                {passwordInputIsHidden ? (
                  <AiFillEyeInvisible
                    onClick={() => setPasswordInputIsHidden((prev) => !prev)}
                    size={"25px"}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setPasswordInputIsHidden((prev) => !prev)}
                    size={"25px"}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <span className="text-[#ff3434] font-bold">
                <ErrorMessage name="password" />
              </span>
            </div>
          </div>
          <ul
            className="flex justify-start items-center gap-1 font-bold text-3xl text-gray-500"
            dir="ltr"
          >
            <li className={passwordCharectersNumber ? "text-green-500" : null}>
              -
            </li>
            <li
              className={
                passwordSmallAndBigCharecters ? "text-green-500" : null
              }
            >
              -
            </li>
            <li className={passwordHasNumber ? "text-green-500" : null}>-</li>
            <li className={passwordSpecialCharecters ? "text-green-500" : null}>
              -
            </li>
          </ul>
          <div className="grid grid-cols-1 ">
            <span
              className={`${
                passwordCharectersNumber ? "text-green-500" : "text-gray-500"
              }`}
            >
              حداقل 8 کاراکتر باشد
            </span>
            <span
              className={`${
                passwordSmallAndBigCharecters
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              ترکیبی از حروف بزرگ و کوچک باشد
            </span>
            <span
              className={`${
                passwordHasNumber ? "text-green-500" : "text-gray-500"
              }`}
            >
              شامل اعداد باشد
            </span>
            <span
              className={`${
                passwordSpecialCharecters ? "text-green-500" : "text-gray-500"
              }`}
            >
              شامل کاراکتر های خاص (نماد ها ) باشد
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
            onClick={() => setSholdeSaveUser(true)}
            disabled={
              !(
                passwordCharectersNumber &&
                passwordSpecialCharecters &&
                passwordSmallAndBigCharecters
              )
            }
          >
            ثبت نام
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

export default StepThree;
