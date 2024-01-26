import mainContext from "@/context/mainContext";
import { forgetPasswordStepThree } from "@/core/validation/validation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as yup from "yup";

const StepThree = ({ next, prev }) => {
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepateValue, setPasswordRepateValue] = useState("");
  const [passwordCharectersNumber, setPasswordCharectersNumber] =
    useState(false);
  const [passwordSpecialCharecters, setPasswordSpecialCharecters] =
    useState(false);
  const [passwordSmallAndBigCharecters, setPasswordSmallAndBigCharecters] =
    useState(false);
  const [passwordHasNumber, setpasswordHasNumber] = useState(false);

  const contextData = useContext(mainContext);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPasswordValue(value);
  };
  const handlePasswordrepeteChange = (event) => {
    const value = event.target.value;
    setPasswordRepateValue(value);
  };
  const handleSubmit = (values) => {
    if (passwordValue === passwordRepateValue) {
      // contextData.handleShowSnack(
      //   "تغییر رمز با موفقیا انجام شد",
      //   2000,
      //   "seccess"
      // );
      // useLocalStorage("userData");
      // setTimeout(() => {
      //   next(values, false, true);
      // }, 2000);
      next(values);
    } else {
      contextData.handleShowSnack(
        "رمز های وارد شده مطابقت نداشت",
        3000,
        "error"
      );
    }
  };

  const [passwordInputIsHidden, setPasswordInputIsHidden] = useState(true);
  const [passwordRepeteInputHidden, setpasswordRepeteInputHidden] =
    useState(true);

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
    <>
      <Formik
        initialValues={{ password: "", passwordRepete: "" }}
        onSubmit={handleSubmit}
        validationSchema={forgetPasswordStepThree}
      >
        {(formprops) => (
          <Form>
            <div className="flex justify-center flex-row flex-wrap">
              <div className="w-full flex justify-center">
                <img src="/images/logo.png" alt="logo" className="w-[100px]" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-8">
                رمز عبور جدید
              </h1>
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
                <span className="text-[#ff3434] font-bold">
                  <ErrorMessage name="password" />
                </span>
                <ul
                  className="flex justify-start items-center gap-1 font-bold text-3xl text-gray-500"
                  dir="ltr"
                >
                  <li
                    className={
                      passwordCharectersNumber ? "text-green-500" : null
                    }
                  >
                    -
                  </li>
                  <li
                    className={
                      passwordSmallAndBigCharecters ? "text-green-500" : null
                    }
                  >
                    -
                  </li>
                  <li className={passwordHasNumber ? "text-green-500" : null}>
                    -
                  </li>
                  <li
                    className={
                      passwordSpecialCharecters ? "text-green-500" : null
                    }
                  >
                    -
                  </li>
                </ul>
                <div className="grid grid-cols-1 ">
                  <span
                    className={`${
                      passwordCharectersNumber
                        ? "text-green-500"
                        : "text-gray-500"
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
                      passwordSpecialCharecters
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    شامل کاراکتر های خاص (نماد ها ) باشد
                  </span>
                </div>
                <div className="absolute left-3 top-7">
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
              </div>
            </div>
            <div className="relative">
              <Field
                className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
                placeholder="رمز عبور"
                name="passwordRepete"
                onKeyUp={handlePasswordrepeteChange}
                type={passwordRepeteInputHidden ? "password" : "text"}
              />
              <span className="text-[#ff3434] font-bold">
                <ErrorMessage name="passwordRepete" />
              </span>
              <div className="absolute left-3 top-7">
                {passwordRepeteInputHidden ? (
                  <AiFillEyeInvisible
                    onClick={() =>
                      setpasswordRepeteInputHidden((prev) => !prev)
                    }
                    size={"25px"}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={() =>
                      setpasswordRepeteInputHidden((prev) => !prev)
                    }
                    size={"25px"}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
              disabled={
                !(
                  passwordCharectersNumber &&
                  passwordSpecialCharecters &&
                  passwordSmallAndBigCharecters
                )
              }
            >
              تغییر رمز
            </button>
            <button
              type="button"
              class="w-full bg-[#2396f3] text-white py-2 rounded-md cursor-pointer mt-4 h-12"
              onClick={() => prev(formprops.values, 0)}
            >
              قبلی
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StepThree;
