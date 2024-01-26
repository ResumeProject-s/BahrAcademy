import mainContext from "@/context/mainContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";

const PrivateRoute = ({ children, message }) => {
  const contextData = useContext(mainContext);

  const [countdown, setCountdown] = useState(5);
  const countdownRef = useRef(countdown);

  const router = useRouter();

  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (countdownRef.current > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  useEffect(() => {
    if (countdown === 0 && !contextData.currentUser) {
      router.replace("/Authentication/login");
    }
  }, [countdown]);

  return (
    <>
      {contextData.currentUser ? (
        children
      ) : (
        <div className="mt-[100px]">
          <h1 className="dark:text-white text-black text-center text-5xl">
            {message}
          </h1>
          <div className="flex justify-center w-full">
            <img
              src="/images/accessUserPanel.jpg"
              alt="image"
              className="w-1/3 rounded-xl mt-16"
            />
          </div>
          <div className="w-full flex justify-center items-center gap-3 text-black dark:text-white mt-5">
            <span className="text-xl">
              شما به صفحه ورود انتقال داده میشوید در :
            </span>
            {countdown ? <span className="text-xl">{countdown}</span> : null}
          </div>
          <div className="relative w-fit mx-auto pt-3">
            <Link
              href="/Authentication/login"
              className="w-32 h-12 bg-[#2396f3] text-white text-center rounded-md relative leading-[50px] text-sm flex justify-center items-center gap-3 border border-gray-300"
            >
              <span>صفحه ورود</span>
              <AiOutlineLogin size="25px" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
