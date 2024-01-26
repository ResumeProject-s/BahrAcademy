import mainContext from "@/context/mainContext";
import React, { useContext, useEffect, useRef } from "react";
import ProfileField from "./ProfileField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { AiFillCamera } from "react-icons/ai";
import useLocalStorage from "@/hooks/useLocalStorage";
import { userPanelProfile } from "@/core/validation/validation";
import { useRouter } from "next/router";
const Profile = (props) => {
  const background = useRef();

  const contextData = useContext(mainContext);
  const router = useRouter();

  useEffect(() => {
    background.current.style.background = `linear-gradient(${contextData.themeColor[0]},${contextData.themeColor[2]})`;
  });

  const fields = [
    {
      id: 1,
      type: "text",
      placeholder: "نام و نام خوانوادگی",
      name: "fullName",
    },
    { id: 2, type: "date", placeholder: "تاریخ تولد", name: "barthDate" },
    {
      id: 3,
      type: "text",
      placeholder: "کد ملی",
      name: "nationalCode",
      disabled: true,
    },
    { id: 4, type: "text", placeholder: "شماره تماس", name: "phoneNumber" },
    {
      id: 5,
      type: "text",
      placeholder: "ایمیل",
      name: "email",
      disabled: true,
    },
    { id: 6, type: "image", placeholder: "پروفایل", name: "profile" },
  ];
  return (
    <div>
      <div
        className="w-full absolute -top-32 right-0 h-[300px] md:rounded-b-full dark:!to-red-500 flex justify-center items-center"
        ref={background}
      >
        <h1 className="text-white z-[1] text-center text-3xl h-fit relative top-[30px]">
          ویرایش پروفایل
        </h1>
      </div>
      <Formik
        initialValues={{
          profile: contextData.currentUser?.profile
            ? contextData.currentUser.profile
            : "/images/icons/profile.jpg",
          fullName: contextData.currentUser.fullName,
          barthDate: contextData.currentUser.barthDate,
          phoneNumber: contextData.currentUser.phoneNumber,
          nationalCode: contextData.currentUser.nationalCode,
          email: contextData.currentUser.email,
        }}
        onSubmit={(values) => {
          values.id = contextData.currentUser.id;
          values.password = contextData.currentUser.password;
          useLocalStorage("userData", values, true);
          contextData.setCurrentUser(values);
          const newUsers = contextData.users.map((user) =>
            user.id === values.id ? values : user
          );
          contextData.setUsers(newUsers);
          useLocalStorage("users", newUsers, true);
          contextData.currentUser = values;
          props.handleItemChange({ textContent: "داشبورد" });
        }}
        validationSchema={userPanelProfile}
      >
        <Form>
          <div className="z-1 relative flex justify-center mt-20">
            <Field type="file" name="profile">
              {({ field }) => {
                return (
                  <div className="">
                    <label
                      htmlFor="profile"
                      className="cursor-pointer relative flex justify-center"
                    >
                      <img
                        src={field.value || "/images/icons/profile.jpg"}
                        alt="profile"
                        className="rounded-full sm:h-[200px] h-[150px]"
                      />
                    </label>
                    <ErrorMessage name="profile">
                      {(msg) => (
                        <span className="relative top-5 text-red-500">
                          {msg}
                        </span>
                      )}
                    </ErrorMessage>
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="lg:w-[70%] w-full mt-20 grid sm:grid-cols-2 grid-cols-1 gap-20 mx-auto">
            {fields.map((field) => (
              <ProfileField {...field} key={field.id} />
            ))}
          </div>
          <div className="w-full flex justify-center gap-8 md:mt-10 mt-0">
            <button
              className="rounded-md text-white bg-green-500 px-4 py-2"
              type="submit"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Profile;
