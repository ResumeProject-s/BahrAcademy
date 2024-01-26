import Progress from "@/components/common/Progress";
import StepOne from "@/components/signup/StepOne";
import StepSecend from "@/components/signup/StepSecend";
import StepThree from "@/components/signup/StepThree";
import mainContext from "@/context/mainContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import HomeButton from "@/components/common/HomeButton";
import { SendVerifyMessage, VerifyMessage } from "@/core/services/API/message";
import { Register } from "@/core/services/API/authentication";

const signup = () => {
  const contextData = useContext(mainContext);
  const router = useRouter();
  const [recoveryCode, setRecoveryCode] = useState(0);

  const [data, setData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
  });
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepSecend
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      recoveryCode={recoveryCode}
    />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  const [currentStep, setCurrentStep] = useState(0);

  async function handleNextStep(newData) {
    setData((prev) => ({ ...prev, ...newData }));
    if (currentStep === 2) {
      const userInfo = {
        phoneNumber: newData.phoneNumber,
        gmail: newData.email,
        password: newData.password,
      };
      const result = await Register(userInfo);
      if (result.data.success) {
        contextData.handleLoginUser(true);
        router.replace("/Authentication/login");
      } else {
        contextData.handleShowSnack(
          "ایمیل یا شماره تماس شما قبلا ثبت شده",
          3000,
          "error"
        );
      }

      return;
    } else if (currentStep === 1) {
      const data = {
        phoneNumber: newData.phoneNumber,
        verifyCode: newData.code,
      };
      const result = await VerifyMessage(data);
      if (result.data.success) {
        contextData.handleShowSnack("کد وارد شده صحیح بود", 3000, "seccess");
      } else {
        contextData.handleShowSnack("کد وارد شده صحیح نبود", 3000, "error");
        return;
      }
    } else if (currentStep === 0) {
      try {
        const result = await SendVerifyMessage(newData.phoneNumber);
        if (result.data.success) {
          contextData.handleShowSnack(
            "کد برای شما فرستاده شد",
            3000,
            "seccess"
          );
        } else {
          contextData.handleShowSnack("لطفا دوباره تلاش کنید", 3000, "error");
          return;
        }
      } catch (error) {
        contextData.handleShowSnack("لطفا دوباره تلاش کنید", 3000, "error");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep(newData) {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  }
  return (
    <>
      <HomeButton />
      <div className="flex justify-between">
        <div className="h-[100vh] dark:lg:bg-[#2396f3] bg-[#2396f3] dark:bg-[#2e2e2e] lg:w-1/3 w-full flex items-center lg:justify-end justify-center right-0 top-0 lg:rounded-e-[200px]">
          <div className="">
            <Progress currentStep={currentStep} stepsNumber={3} />
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

export default signup;
