import Progress from "@/components/common/Progress";
import StepOne from "@/components/ForgetPass/StepOne";
import StepThree from "@/components/ForgetPass/StepThree";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import HomeButton from "@/components/common/HomeButton";
import mainContext from "@/context/mainContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  resetPasswordStepOne,
  resetPasswordStepThree,
} from "@/core/services/API/authentication";
import { useLocation } from "react-use";
import { values } from "lodash";
import StepSecend from "@/components/ForgetPass/StepSecend";

const ForgetPass = () => {
  const router = useRouter();
  const [recoveryCode, setRecoveryCode] = useState(0);
  const url = useLocation();

  const contextData = useContext(mainContext);

  const [data, setData] = useState({ email: "" });
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const steps = [
    <StepOne
      next={handleNextStep}
      data={data}
      setStep={setCurrentStep}
      setUserData={setUserData}
    />,
    <StepSecend />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  async function handleNextStep(newData) {
    if (currentStep === 2) {
      // const currentUserIndex = contextData.users.findIndex(
      //   (user) => user.email === data.email
      // );
      // const currentUser = [...contextData.users][currentUserIndex];
      // currentUser.password = newData.password;
      // const newUsers = contextData.users.map((user) =>
      //   user.id === currentUser.id ? currentUser : user
      // );
      // contextData.setUsers(newUsers);
      // contextData.currentUser = currentUser;
      // useLocalStorage("users", contextData.users, true);
      // useLocalStorage("userData", currentUser, true);
      // router.replace("/Authentication/login");
      // return;
      const obj = {
        userId: userData.id,
        newPassword: newData.password,
        resetValue: userData.message,
      };
      const result = await resetPasswordStepThree(obj);
      if (result.data.success) {
        router.replace("/Authentication/login");
        contextData.handleShowSnack(
          "تغییر رمز با موفقت انجام شد",
          3000,
          "seccess"
        );
      } else {
        contextData.handleShowSnack(result.data.message, 3000, "error");
      }
      return;
    }
    try {
      const result = await resetPasswordStepOne(
        newData.email,
        "http://localhost:3000/Authentication"
      );
      if (result.data?.success) {
        setData(newData);
        setCurrentStep((prev) => prev + 1);
      } else {
        contextData.handleShowSnack("ایمیل شما یافت نشد", 3000, "error");
      }
    } catch (error) {
      contextData.handleShowSnack(error.message, 3000, "error");
    }
  }

  async function handlePrevStep(newData, page) {
    setData((prev) => ({ ...prev, ...newData }));
    if (typeof page === "number") {
      await router.replace("http://localhost:3000/Authentication/forgetPass");
      setCurrentStep(page);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  }
  return (
    <>
      <HomeButton />
      <div className="flex justify-between">
        <div className="h-[100vh] dark:lg:bg-[#2396f3] bg-[#2396f3] dark:bg-[#2e2e2e] lg:w-1/3 w-full flex items-center lg:justify-end justify-center right-0 top-0 lg:rounded-e-[200px]">
          <div>
            <Progress currentStep={currentStep} stepsNumber={steps.length} />
            <div className="rounded-b-3xl relative lg:-left-24 shadow-lg lg:w-[400px] w-[350px] z-[2] bg-white p-6">
              {steps[currentStep]}
            </div>
          </div>
        </div>
        <img
          src="/images/Authentication/signup.png"
          alt="ثبت نام"
          className="w-[1000px] lg:block hidden"
        />
      </div>
    </>
  );
};

export default ForgetPass;
