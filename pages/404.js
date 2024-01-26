import HomeButton from "@/components/common/HomeButton";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Error404 = () => {
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
    if (countdown === 0) {
      router.replace("/");
    }
  }, [countdown]);

  return (
    <div className="w-full">
      <img src="/images/404.png" alt="404" className="w-[800px] mx-auto" />
      <div className="w-full flex justify-center items-center gap-3 text-black dark:text-white">
        {countdown ? <span className="text-xl">{countdown}</span> : null}
        <span className="text-xl">
          {countdown
            ? "این صفحه یافت نشد"
            : "شما به صفحه اصلی انتقال داده میشوید"}
        </span>
      </div>
      <div className="relative w-fit mx-auto pt-3">
        <HomeButton relative />
      </div>
    </div>
  );
};

export default Error404;
